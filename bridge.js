"use strict";
(() => {
  // v2/browser-bridge/src/core-types.ts
  var EdBackendType = {
    NONE: 0,
    WEBGPU: 1,
    WEBGL2: 2,
    CPU: 3
  };
  var EdDeviceState = {
    OK: 0,
    LOST: 1,
    RECOVERING: 2
  };

  // v2/browser-bridge/src/bridge/utils/encoding.ts
  function handleToBigInt(handle) {
    if (typeof handle === "bigint") {
      return handle;
    }
    if (typeof handle === "number") {
      if (!Number.isInteger(handle)) {
        throw new TypeError(`Cannot convert non-integer handle ${String(handle)} to BigInt.`);
      }
      return BigInt(handle);
    }
    if (typeof handle === "string") {
      return BigInt(handle);
    }
    const primitive = handle.valueOf();
    if (typeof primitive === "bigint") {
      return primitive;
    }
    if (typeof primitive === "number") {
      if (!Number.isInteger(primitive)) {
        throw new TypeError(`Cannot convert non-integer handle ${String(primitive)} to BigInt.`);
      }
      return BigInt(primitive);
    }
    if (typeof primitive === "string") {
      return BigInt(primitive);
    }
    return BigInt(handle.toString());
  }
  function handleToString(handle) {
    return handleToBigInt(handle).toString();
  }
  function pointerToHeapOffset(pointer) {
    if (typeof pointer === "number") {
      if (!Number.isInteger(pointer)) {
        throw new TypeError(`Cannot convert non-integer pointer ${String(pointer)} to a heap offset.`);
      }
      return pointer;
    }
    const value = handleToBigInt(pointer);
    if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
      throw new RangeError(`Pointer ${value.toString()} exceeds JavaScript heap offset precision.`);
    }
    return Number(value);
  }
  function normalizePointerForWasm(module, pointer) {
    return module.usesMemory64 === true ? handleToBigInt(pointer) : pointerToHeapOffset(pointer);
  }
  function normalizeBackendType(value) {
    switch (value) {
      case EdBackendType.WEBGPU:
      case EdBackendType.WEBGL2:
      case EdBackendType.CPU:
        return value;
      default:
        return EdBackendType.NONE;
    }
  }
  function normalizeDeviceState(value) {
    switch (value) {
      case EdDeviceState.LOST:
      case EdDeviceState.RECOVERING:
        return value;
      default:
        return EdDeviceState.OK;
    }
  }
  function computeModifiers(event) {
    let modifiers = 0;
    if (event.shiftKey) {
      modifiers |= 1 << 0;
    }
    if (event.ctrlKey) {
      modifiers |= 1 << 1;
    }
    if (event.altKey) {
      modifiers |= 1 << 2;
    }
    if (event.metaKey) {
      modifiers |= 1 << 3;
    }
    return modifiers;
  }

  // v2/browser-bridge/src/bridge/utils/backends.ts
  var WEBGPU_INIT_TIMEOUT_MS = 1500;
  var DEFAULT_BACKEND_LADDER = [EdBackendType.WEBGL2, EdBackendType.CPU];
  function backendTypeToRenderer(backendType) {
    switch (backendType) {
      case EdBackendType.WEBGPU:
        return "webgpu";
      case EdBackendType.WEBGL2:
        return "webgl2";
      case EdBackendType.CPU:
        return "cpu";
      default:
        return "none";
    }
  }
  function setActiveRenderer(loaderInfo, backendType) {
    loaderInfo.activeRenderer = backendTypeToRenderer(backendType);
    window.__bridgeLoaderInfo = loaderInfo;
  }
  async function waitForAnimationFrame() {
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  }
  async function waitForWebGpuInit(core) {
    const deadline = performance.now() + WEBGPU_INIT_TIMEOUT_MS;
    while (performance.now() < deadline) {
      const backendType = normalizeBackendType(core._ed_get_backend_type());
      const deviceState = normalizeDeviceState(core._ed_get_device_state());
      if (backendType === EdBackendType.WEBGPU) {
        return backendType;
      }
      if (deviceState !== EdDeviceState.RECOVERING) {
        return backendType;
      }
      await waitForAnimationFrame();
    }
    return normalizeBackendType(core._ed_get_backend_type());
  }
  async function probeWebGpuAdapter() {
    const nav = navigator;
    if (typeof nav.gpu?.requestAdapter !== "function") {
      return false;
    }
    try {
      const adapter = await nav.gpu.requestAdapter();
      return adapter !== null && adapter !== void 0;
    } catch {
      return false;
    }
  }
  function backendLabel(backend) {
    if (backend === EdBackendType.WEBGPU) return "WebGPU";
    if (backend === EdBackendType.WEBGL2) return "WebGL2";
    if (backend === EdBackendType.CPU) return "Software/Raster";
    return "None";
  }
  async function tryReviveBackend(core, canvas, dpr, backend) {
    const w = canvas.width;
    const h = canvas.height;
    try {
      if (backend === EdBackendType.WEBGPU) {
        if (!await probeWebGpuAdapter()) return false;
        core._ed_init(w, h, dpr);
        return await waitForWebGpuInit(core) === EdBackendType.WEBGPU;
      }
      if (backend === EdBackendType.WEBGL2) {
        core._ed_init_webgl(w, h, dpr);
        return normalizeBackendType(core._ed_get_backend_type()) === EdBackendType.WEBGL2;
      }
      core._ed_init_sw(w, h, dpr);
      return normalizeBackendType(core._ed_get_backend_type()) === EdBackendType.CPU;
    } catch {
      return false;
    }
  }
  async function initRenderer(core, canvas, dpr, loaderInfo, backendLadder = DEFAULT_BACKEND_LADDER) {
    const physicalWidth = canvas.width;
    const physicalHeight = canvas.height;
    const ladder = backendLadder.length > 0 ? backendLadder : DEFAULT_BACKEND_LADDER;
    const firstBackend = ladder[0] ?? EdBackendType.WEBGPU;
    let webGpuAttempted = false;
    let webGl2Attempted = false;
    for (const backend of ladder) {
      if (backend === EdBackendType.WEBGPU) {
        if (!await probeWebGpuAdapter()) {
          continue;
        }
        webGpuAttempted = true;
        core._ed_init(physicalWidth, physicalHeight, dpr);
        const resolvedBackend = await waitForWebGpuInit(core);
        if (resolvedBackend === EdBackendType.WEBGPU) {
          setActiveRenderer(loaderInfo, resolvedBackend);
          return resolvedBackend;
        }
        continue;
      }
      if (backend === EdBackendType.WEBGL2) {
        webGl2Attempted = true;
        core._ed_init_webgl(physicalWidth, physicalHeight, dpr);
        if (normalizeBackendType(core._ed_get_backend_type()) === EdBackendType.WEBGL2) {
          if (webGpuAttempted || firstBackend === EdBackendType.WEBGPU) {
            console.warn("RENDERER FALLBACK: WebGPU failed to initialize or unavailable! Fell back to WebGL2");
          }
          setActiveRenderer(loaderInfo, EdBackendType.WEBGL2);
          return EdBackendType.WEBGL2;
        }
        continue;
      }
      core._ed_init_sw(physicalWidth, physicalHeight, dpr);
      if (normalizeBackendType(core._ed_get_backend_type()) === EdBackendType.CPU) {
        const triedBackends = [
          webGpuAttempted ? "WebGPU" : null,
          webGl2Attempted ? "WebGL2" : null
        ].filter(Boolean).join(" and ");
        const reason = triedBackends.length > 0 ? `${triedBackends} failed to initialize or unavailable!` : "No GPU backend available.";
        console.error(`RENDERER FALLBACK: ${reason} Fell back to Software/Raster - performance will be painfully slow`);
        setActiveRenderer(loaderInfo, EdBackendType.CPU);
        return EdBackendType.CPU;
      }
    }
    setActiveRenderer(loaderInfo, EdBackendType.NONE);
    throw new Error("Failed to initialize any renderer backend.");
  }

  // v2/browser-bridge/src/bridge/utils/fetch.ts
  var ASSET_FETCH_ATTEMPTS = 4;
  var ASSET_RETRY_DELAY_MS = 100;
  function delay(ms) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }
  function resolveAssetUrl(url) {
    return new URL(url, document.baseURI).toString();
  }
  function normalizeFetchIntegrity(integrity) {
    if (integrity === null || integrity === void 0 || integrity.length === 0) {
      return null;
    }
    const value = integrity;
    if (!value.startsWith("sha256-")) {
      return value;
    }
    let digest = value.slice(7).replace(/-/g, "+").replace(/_/g, "/");
    while (digest.length % 4 !== 0) {
      digest += "=";
    }
    return `sha256-${digest}`;
  }
  function bytesToBase64(bytes) {
    let binary = "";
    for (let index = 0; index < bytes.length; index += 32768) {
      const chunk = bytes.subarray(index, Math.min(index + 32768, bytes.length));
      binary += String.fromCharCode(...chunk);
    }
    return window.btoa(binary);
  }
  async function verifyFetchedIntegrity(assetUrl, buffer, integrity) {
    const normalizedIntegrity = normalizeFetchIntegrity(integrity);
    if (normalizedIntegrity === null) {
      return buffer;
    }
    const digestBuffer = await globalThis.crypto.subtle.digest("SHA-256", buffer);
    const actualIntegrity = `sha256-${bytesToBase64(new Uint8Array(digestBuffer))}`;
    if (actualIntegrity !== normalizedIntegrity) {
      throw new Error(`Integrity mismatch for ${assetUrl}`);
    }
    return buffer;
  }
  function buildFetchInit(integrity, cache = "force-cache") {
    const fetchIntegrity = normalizeFetchIntegrity(integrity);
    const init = {
      credentials: "same-origin",
      cache
    };
    if (fetchIntegrity !== null) {
      init.integrity = fetchIntegrity;
    }
    return init;
  }
  async function fetchWithRetry(url, attempts, read, init) {
    let lastError = null;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        const response = await fetch(url, init);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${String(response.status)}`);
        }
        return await read(response);
      } catch (error) {
        lastError = error;
        if (attempt === attempts) {
          break;
        }
        await delay(ASSET_RETRY_DELAY_MS * attempt);
      }
    }
    throw lastError instanceof Error ? lastError : new Error(`Failed to fetch ${url}`);
  }
  async function fetchBinaryAsset(url, integrity) {
    const assetUrl = resolveAssetUrl(url);
    const buffer = await fetchWithRetry(
      assetUrl,
      ASSET_FETCH_ATTEMPTS,
      async (response) => await response.arrayBuffer(),
      buildFetchInit(integrity)
    );
    return new Uint8Array(await verifyFetchedIntegrity(assetUrl, buffer, integrity));
  }
  async function fetchResponseWithRetry(url, integrity) {
    const assetUrl = resolveAssetUrl(url);
    return await fetchWithRetry(
      assetUrl,
      ASSET_FETCH_ATTEMPTS,
      (response) => response,
      buildFetchInit(integrity)
    );
  }
  async function loadScriptResource(scriptUrl, integrity) {
    const absoluteUrl = resolveAssetUrl(scriptUrl);
    const scriptBytes = await fetchBinaryAsset(absoluteUrl, integrity);
    const sourceText = new TextDecoder("utf-8").decode(scriptBytes);
    const blobSource = sourceText.includes("//# sourceURL=") ? sourceText : `${sourceText}
//# sourceURL=${absoluteUrl.replace(/\s/g, "%20")}`;
    const blobUrl = URL.createObjectURL(new Blob([blobSource], { type: "application/javascript" }));
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = blobUrl;
        script.async = true;
        script.addEventListener("load", () => {
          resolve();
        });
        script.addEventListener("error", () => {
          reject(new Error(`Failed to execute ${absoluteUrl}`));
        });
        document.head.appendChild(script);
      });
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
  }

  // v2/browser-bridge/src/bridge/utils/heap.ts
  var textEncoder = new TextEncoder();
  function writeUtf8ToHeap(module, text) {
    const bytes = textEncoder.encode(text);
    const ptr = normalizePointerForWasm(module, bytes.byteLength === 0 ? 0 : module._malloc(bytes.byteLength));
    const offset = pointerToHeapOffset(ptr);
    module.refreshHeapViews?.();
    if (bytes.byteLength > 0 && offset === 0) {
      throw new Error("WASM string malloc failed.");
    }
    if (bytes.byteLength > 0) {
      module.HEAPU8.set(bytes, offset);
    }
    return {
      ptr,
      offset,
      len: bytes.byteLength,
      dispose: () => {
        if (offset !== 0) {
          module._free(ptr);
        }
      }
    };
  }
  function writeBytesToHeap(module, bytes) {
    const ptr = normalizePointerForWasm(module, bytes.byteLength === 0 ? 0 : module._malloc(bytes.byteLength));
    const offset = pointerToHeapOffset(ptr);
    module.refreshHeapViews?.();
    if (bytes.byteLength > 0 && offset === 0) {
      throw new Error("WASM bytes malloc failed.");
    }
    if (bytes.byteLength > 0) {
      module.HEAPU8.set(bytes, offset);
    }
    return {
      ptr,
      offset,
      len: bytes.byteLength,
      dispose: () => {
        if (offset !== 0) {
          module._free(ptr);
        }
      }
    };
  }
  function extractCommandBuffer(ui) {
    const lengthPtr = normalizePointerForWasm(ui, ui._malloc(4));
    const lengthOffset = pointerToHeapOffset(lengthPtr);
    if (lengthOffset === 0) {
      throw new Error("ui length malloc failed.");
    }
    try {
      const bufferPtr = ui._ui_get_command_buffer(lengthPtr);
      ui.refreshHeapViews?.();
      const wordCount = ui.HEAPU32[lengthOffset >>> 2] ?? 0;
      const bufferOffset = pointerToHeapOffset(normalizePointerForWasm(ui, bufferPtr));
      if (bufferOffset === 0 || wordCount === 0) {
        return new Uint32Array();
      }
      const wordOffset = bufferOffset >>> 2;
      return ui.HEAPU32.slice(wordOffset, wordOffset + wordCount);
    } finally {
      ui._free(lengthPtr);
    }
  }
  function extractSemanticBuffer(ui) {
    const lengthPtr = normalizePointerForWasm(ui, ui._malloc(4));
    const lengthOffset = pointerToHeapOffset(lengthPtr);
    if (lengthOffset === 0) {
      throw new Error("ui semantic length malloc failed.");
    }
    try {
      const bufferPtr = ui._ui_get_semantic_buffer(lengthPtr);
      ui.refreshHeapViews?.();
      const wordCount = ui.HEAPU32[lengthOffset >>> 2] ?? 0;
      const bufferOffset = pointerToHeapOffset(normalizePointerForWasm(ui, bufferPtr));
      if (bufferOffset === 0 || wordCount === 0) {
        return new Uint32Array();
      }
      const wordOffset = bufferOffset >>> 2;
      return ui.HEAPU32.slice(wordOffset, wordOffset + wordCount);
    } finally {
      ui._free(lengthPtr);
    }
  }
  function executeCommandBuffer(core, words) {
    if (words.length === 0) {
      return;
    }
    const ptr = normalizePointerForWasm(core, core._malloc(words.byteLength));
    const offset = pointerToHeapOffset(ptr);
    core.refreshHeapViews?.();
    if (offset === 0) {
      throw new Error("core command malloc failed.");
    }
    try {
      core.HEAPU32.set(words, offset >>> 2);
      core._ed_execute_command_buffer(ptr, words.length);
    } finally {
      core._free(ptr);
    }
  }

  // v2/browser-bridge/src/bridge/utils/assets.ts
  var MEMORY64_VALIDATION_MODULE_BYTES = new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    15,
    3,
    96,
    2,
    127,
    126,
    1,
    127,
    96,
    1,
    126,
    0,
    96,
    0,
    1,
    126,
    3,
    4,
    3,
    0,
    1,
    2,
    4,
    5,
    1,
    112,
    5,
    1,
    1,
    5,
    6,
    1,
    5,
    130,
    2,
    130,
    2,
    6,
    8,
    1,
    126,
    1,
    66,
    128,
    136,
    4,
    11,
    7,
    104,
    5,
    6,
    109,
    101,
    109,
    111,
    114,
    121,
    2,
    0,
    4,
    109,
    97,
    105,
    110,
    0,
    0,
    25,
    95,
    95,
    105,
    110,
    100,
    105,
    114,
    101,
    99,
    116,
    95,
    102,
    117,
    110,
    99,
    116,
    105,
    111,
    110,
    95,
    116,
    97,
    98,
    108,
    101,
    1,
    0,
    25,
    95,
    101,
    109,
    115,
    99,
    114,
    105,
    112,
    116,
    101,
    110,
    95,
    115,
    116,
    97,
    99,
    107,
    95,
    114,
    101,
    115,
    116,
    111,
    114,
    101,
    0,
    1,
    28,
    101,
    109,
    115,
    99,
    114,
    105,
    112,
    116,
    101,
    110,
    95,
    115,
    116,
    97,
    99,
    107,
    95,
    103,
    101,
    116,
    95,
    99,
    117,
    114,
    114,
    101,
    110,
    116,
    0,
    2,
    10,
    18,
    3,
    4,
    0,
    65,
    0,
    11,
    6,
    0,
    32,
    0,
    36,
    0,
    11,
    4,
    0,
    35,
    0,
    11
  ]);
  var SIMD_VALIDATION_MODULE_BYTES = new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    4,
    1,
    96,
    0,
    0,
    3,
    2,
    1,
    0,
    10,
    23,
    1,
    21,
    0,
    253,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    26,
    11
  ]);
  function showIcuError(message) {
    const errorBox = document.getElementById("icu-error");
    const messageNode = document.getElementById("icu-error-message");
    if (errorBox instanceof HTMLElement && messageNode instanceof HTMLElement) {
      messageNode.textContent = message;
      errorBox.style.display = "block";
      return;
    }
    const overlay = document.getElementById("effindom-loading-overlay");
    const overlayTitle = document.getElementById("effindom-loading-title");
    const overlayDetail = document.getElementById("effindom-loading-detail");
    if (overlay instanceof HTMLElement && overlayTitle instanceof HTMLElement && overlayDetail instanceof HTMLElement) {
      overlay.dataset.state = "error";
      overlay.hidden = false;
      overlay.setAttribute("aria-hidden", "false");
      overlayTitle.textContent = "The typesetter dragon sneezed on the runtime.";
      overlayDetail.textContent = message;
    }
  }
  function createErrorWithCause(message, cause) {
    const wrappedError = new Error(message);
    wrappedError.cause = cause;
    return wrappedError;
  }
  function delay2(ms) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }
  function clearRecordMap(recordMap) {
    for (const key of Object.keys(recordMap)) {
      Reflect.deleteProperty(recordMap, key);
    }
  }
  function resetBridgeLogs(logs) {
    logs.pointerEvents.length = 0;
    logs.focusEvents.length = 0;
    logs.textChanges.length = 0;
    logs.selectionChanges.length = 0;
    logs.crossSelectionChanges.length = 0;
    logs.clipboardWrites.length = 0;
    logs.clipboardReadRequests.length = 0;
    logs.scrollEvents.length = 0;
  }
  function supportsMemory64() {
    try {
      new WebAssembly.Memory({ initial: 1, maximum: 1, index: "i64" });
      if (typeof WebAssembly.validate === "function") {
        return WebAssembly.validate(MEMORY64_VALIDATION_MODULE_BYTES);
      }
      void new WebAssembly.Module(MEMORY64_VALIDATION_MODULE_BYTES);
      return true;
    } catch {
      return false;
    }
  }
  function supportsSimd() {
    try {
      if (typeof WebAssembly.validate === "function") {
        return WebAssembly.validate(SIMD_VALIDATION_MODULE_BYTES);
      }
      void new WebAssembly.Module(SIMD_VALIDATION_MODULE_BYTES);
      return true;
    } catch {
      return false;
    }
  }
  function normalizeWasmArchitecture(requestedArchitecture) {
    const value = (requestedArchitecture ?? "auto").toLowerCase();
    if (value === "wasm32" || value === "wasm32-simd" || value === "wasm64" || value === "wasm64-simd") {
      return value;
    }
    return "auto";
  }
  function getManifestArchitectureEntry(manifest, architecture) {
    return manifest.architectures[architecture] ?? null;
  }
  function selectManifestArchitecture(manifest, requestedArchitecture) {
    const normalizedRequest = normalizeWasmArchitecture(requestedArchitecture);
    const memory64Supported = supportsMemory64();
    const simdSupported = supportsSimd();
    const availableArchitectures = Object.keys(manifest.architectures).filter((architecture) => manifest.architectures[architecture] !== void 0);
    let selectedArchitecture = null;
    let selectionReason;
    const architectureUsesMemory64 = (architecture) => architecture.startsWith("wasm64");
    const architectureUsesSimd = (architecture) => architecture.endsWith("-simd");
    if (normalizedRequest !== "auto") {
      const explicitEntry = getManifestArchitectureEntry(manifest, normalizedRequest);
      if (explicitEntry === null) {
        throw new Error(`Manifest does not include ${normalizedRequest} bundles.`);
      }
      if (architectureUsesMemory64(normalizedRequest) && !memory64Supported) {
        throw new Error(`${normalizedRequest} was explicitly requested but this browser does not support Memory64.`);
      }
      if (architectureUsesSimd(normalizedRequest) && !simdSupported) {
        throw new Error(`${normalizedRequest} was explicitly requested but this browser does not support WebAssembly SIMD.`);
      }
      selectedArchitecture = normalizedRequest;
      selectionReason = `Explicit ${normalizedRequest} request.`;
    } else {
      const preferredArchitectures = [];
      if (memory64Supported && simdSupported) {
        preferredArchitectures.push("wasm64-simd");
      }
      if (memory64Supported) {
        preferredArchitectures.push("wasm64");
      }
      if (simdSupported) {
        preferredArchitectures.push("wasm32-simd");
      }
      preferredArchitectures.push("wasm32");
      for (const candidate of preferredArchitectures) {
        if (getManifestArchitectureEntry(manifest, candidate) !== null) {
          selectedArchitecture = candidate;
          break;
        }
      }
      if (selectedArchitecture === null) {
        throw new Error("Manifest does not expose any wasm bundle architectures compatible with this browser.");
      }
      if (selectedArchitecture === "wasm64-simd") {
        selectionReason = "Browser supports Memory64 + SIMD, so EffinDom selected the wasm64-simd bundle set.";
      } else if (selectedArchitecture === "wasm64") {
        selectionReason = "Browser supports Memory64, so EffinDom selected the wasm64 bundle set.";
      } else if (selectedArchitecture === "wasm32-simd") {
        selectionReason = "Browser supports SIMD, so EffinDom selected the wasm32-simd bundle set.";
      } else {
        selectionReason = "Browser selected the wasm32 bundle set.";
      }
    }
    const manifestEntry = getManifestArchitectureEntry(manifest, selectedArchitecture);
    if (manifestEntry === null) {
      throw new Error(`Manifest entry for ${selectedArchitecture} is missing.`);
    }
    return {
      requestedArchitecture: normalizedRequest,
      selectedArchitecture,
      availableArchitectures,
      memory64Supported,
      simdSupported,
      selectionReason,
      manifestEntry
    };
  }
  function readManifestUrl() {
    const runtimeConfig = window.__effindomRuntime;
    if (runtimeConfig === void 0) {
      throw new Error("Missing effindom-runtime-config.js. Expected window.__effindomRuntime.manifestUrl before bridge.js loads.");
    }
    if (typeof runtimeConfig.manifestUrl !== "string" || runtimeConfig.manifestUrl.length === 0) {
      throw new Error("Malformed effindom-runtime-config.js. Expected window.__effindomRuntime.manifestUrl to be a non-empty string.");
    }
    return runtimeConfig.manifestUrl;
  }
  function resolveManifestAssetUrl(manifestUrl, assetUrl) {
    return new URL(assetUrl, manifestUrl).toString();
  }
  async function loadRuntimeManifest() {
    const manifestUrl = resolveAssetUrl(readManifestUrl());
    const manifest = await fetchWithRetry(
      manifestUrl,
      ASSET_FETCH_ATTEMPTS,
      async (response) => await response.json(),
      { cache: "no-store" }
    );
    return {
      manifest,
      manifestUrl
    };
  }
  async function instantiatePreparedWasm(preparedAsset, imports) {
    const response = await preparedAsset.responsePromise;
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        const result2 = await WebAssembly.instantiateStreaming(response.clone(), imports);
        return { instance: result2.instance, module: result2.module, compileMode: "streaming" };
      } catch {
      }
    }
    const buffer = await response.arrayBuffer();
    await verifyFetchedIntegrity(preparedAsset.url, buffer, preparedAsset.integrity);
    const result = await WebAssembly.instantiate(buffer, imports);
    return { instance: result.instance, module: result.module, compileMode: "buffer" };
  }
  async function loadIcuData(ui, preparedAssets) {
    const bytes = await preparedAssets.icu.bytesPromise;
    const heapBytes = writeBytesToHeap(ui, bytes);
    try {
      ui._ui_register_icu_data(heapBytes.ptr, heapBytes.len);
    } finally {
      heapBytes.dispose();
    }
  }
  function describeAbortReason(value, fallback) {
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
    if (value instanceof Error && value.message.length > 0) {
      return value.message;
    }
    return fallback;
  }
  async function loadCoreModule(bundle, preparedWasm, canvas, loaderInfo) {
    return await new Promise((resolve, reject) => {
      const module = {
        HEAPU8: new Uint8Array(),
        HEAPU32: new Uint32Array(),
        usesMemory64: loaderInfo.selectedWasmArchitecture.startsWith("wasm64"),
        locateFile: (path) => {
          if (path.endsWith(".wasm")) {
            return resolveAssetUrl(bundle.wasm);
          }
          return resolveAssetUrl(path);
        },
        instantiateWasm: (imports, receiveInstance) => {
          void instantiatePreparedWasm(preparedWasm, imports).then((result) => {
            loaderInfo.coreCompileMode = result.compileMode;
            receiveInstance(result.instance, result.module);
          }).catch((error) => {
            reject(createErrorWithCause("Failed to instantiate Tier 1 wasm.", error));
          });
          return {};
        },
        onAbort: (what) => {
          reject(new Error(describeAbortReason(what, "Tier 1 wasm aborted.")));
        },
        refreshHeapViews: () => {
          if (module.wasmMemory !== void 0) {
            const buffer = module.wasmMemory.buffer;
            module.HEAPU8 = new Uint8Array(buffer);
            module.HEAPU32 = new Uint32Array(buffer);
          } else if (typeof HEAPU8 !== "undefined") {
            module.HEAPU8 = HEAPU8;
            if (typeof HEAPU32 !== "undefined") {
              module.HEAPU32 = HEAPU32;
            }
          }
        },
        canvas,
        onRuntimeInitialized: () => {
          const emMemory = module.memory;
          if (emMemory instanceof WebAssembly.Memory) {
            module.wasmMemory = emMemory;
          }
          module.refreshHeapViews?.();
          resolve(module);
        },
        _malloc: () => 0,
        _free: () => void 0,
        _ed_init: () => void 0,
        _ed_init_webgl: () => void 0,
        _ed_init_sw: () => void 0,
        _ed_resize: () => void 0,
        _ed_register_font: () => void 0,
        _ed_execute_command_buffer: () => void 0,
        _ed_reset_scene: () => void 0,
        _ed_render_frame: () => void 0,
        _ed_clear_focus_state: () => void 0,
        _ed_clear_text_input_state: () => void 0,
        _ed_recover_device: () => void 0,
        _ed_hit_test: () => 0,
        _ed_get_sw_framebuffer: () => 0,
        _ed_get_backend_type: () => EdBackendType.NONE,
        _ed_get_device_state: () => EdDeviceState.OK,
        _ed_debug_simulate_device_lost: () => void 0
      };
      window.Module = module;
      void loadScriptResource(bundle.js, bundle.js_integrity ?? null).catch(reject);
    });
  }
  async function loadUiModule(bundle, preparedWasm, loaderInfo) {
    await loadScriptResource(bundle.js, bundle.js_integrity ?? null);
    if (window.EffinDomUiV2ModuleFactory === void 0) {
      throw new Error("EffinDomUiV2ModuleFactory did not load.");
    }
    let rejectInstantiation = null;
    const instantiationFailure = new Promise((_, reject) => {
      rejectInstantiation = reject;
    });
    const modulePromise = window.EffinDomUiV2ModuleFactory({
      locateFile: (path) => {
        if (path.endsWith(".wasm")) {
          return resolveAssetUrl(bundle.wasm);
        }
        return resolveAssetUrl(path);
      },
      instantiateWasm: (imports, receiveInstance) => {
        void instantiatePreparedWasm(preparedWasm, imports).then((result) => {
          loaderInfo.uiCompileMode = result.compileMode;
          receiveInstance(result.instance, result.module);
        }).catch((error) => {
          rejectInstantiation?.(createErrorWithCause("Failed to instantiate Tier 2 wasm.", error));
        });
        return {};
      },
      onAbort: (what) => {
        rejectInstantiation?.(new Error(describeAbortReason(what, "Tier 2 wasm aborted.")));
      }
    });
    const ui = await Promise.race([modulePromise, instantiationFailure]);
    ui.usesMemory64 = loaderInfo.selectedWasmArchitecture.startsWith("wasm64");
    const uiEmMemory = ui.memory;
    if (uiEmMemory instanceof WebAssembly.Memory) {
      ui.wasmMemory = uiEmMemory;
    }
    ui.refreshHeapViews = () => {
      if (ui.wasmMemory !== void 0) {
        const buffer = ui.wasmMemory.buffer;
        ui.HEAPU8 = new Uint8Array(buffer);
        ui.HEAPU32 = new Uint32Array(buffer);
      }
    };
    ui.refreshHeapViews();
    return ui;
  }
  function readRequestedArchitecture() {
    return new URLSearchParams(window.location.search).get("arch");
  }
  function readRequestedRendererBackend() {
    const value = new URLSearchParams(window.location.search).get("backend")?.toLowerCase() ?? "auto";
    if (value === "webgpu" || value === "graphite") {
      return "webgpu";
    }
    if (value === "webgl2" || value === "ganesh") {
      return "webgl2";
    }
    if (value === "software" || value === "raster" || value === "cpu") {
      return "cpu";
    }
    return "auto";
  }
  function buildBackendLadder(requestedBackend) {
    if (requestedBackend === "webgpu") {
      return [EdBackendType.WEBGL2, EdBackendType.CPU];
    }
    if (requestedBackend === "webgl2") {
      return [EdBackendType.WEBGL2, EdBackendType.CPU];
    }
    if (requestedBackend === "cpu") {
      return [EdBackendType.CPU];
    }
    return DEFAULT_BACKEND_LADDER;
  }
  async function prepareRuntimeAssets() {
    const loadedManifest = await loadRuntimeManifest();
    const manifest = loadedManifest.manifest;
    const manifestUrl = loadedManifest.manifestUrl;
    const selection = selectManifestArchitecture(manifest, readRequestedArchitecture());
    const requestedRendererBackend = readRequestedRendererBackend();
    const coreBundle = {
      ...selection.manifestEntry.core,
      js: resolveManifestAssetUrl(manifestUrl, selection.manifestEntry.core.js),
      wasm: resolveManifestAssetUrl(manifestUrl, selection.manifestEntry.core.wasm)
    };
    const uiBundle = {
      ...selection.manifestEntry.ui,
      js: resolveManifestAssetUrl(manifestUrl, selection.manifestEntry.ui.js),
      wasm: resolveManifestAssetUrl(manifestUrl, selection.manifestEntry.ui.wasm)
    };
    const icuAsset = manifest.assets?.icu;
    if (icuAsset === void 0) {
      throw new Error("Manifest is missing the ICU asset descriptor.");
    }
    const loaderInfo = {
      manifestHash: manifest.manifest_hash ?? null,
      requestedWasmArchitecture: selection.requestedArchitecture,
      requestedRendererBackend,
      selectedWasmArchitecture: selection.selectedArchitecture,
      availableWasmArchitectures: selection.availableArchitectures,
      memory64Supported: selection.memory64Supported,
      simdSupported: selection.simdSupported,
      coreCompileMode: "buffer",
      uiCompileMode: "buffer",
      icuDataUrl: resolveManifestAssetUrl(manifestUrl, icuAsset.url),
      activeRenderer: "none",
      deviceRecoveryCount: 0
    };
    return {
      manifest,
      selection,
      loaderInfo,
      coreBundle,
      uiBundle,
      coreWasm: {
        url: coreBundle.wasm,
        integrity: coreBundle.wasm_integrity ?? null,
        responsePromise: fetchResponseWithRetry(coreBundle.wasm, coreBundle.wasm_integrity ?? null)
      },
      uiWasm: {
        url: uiBundle.wasm,
        integrity: uiBundle.wasm_integrity ?? null,
        responsePromise: fetchResponseWithRetry(uiBundle.wasm, uiBundle.wasm_integrity ?? null)
      },
      icu: {
        url: resolveManifestAssetUrl(manifestUrl, icuAsset.url),
        integrity: icuAsset.integrity ?? null,
        bytesPromise: fetchBinaryAsset(resolveManifestAssetUrl(manifestUrl, icuAsset.url), icuAsset.integrity ?? null)
      }
    };
  }

  // v2/browser-bridge/src/bridge/events.ts
  var DEFAULT_LOGICAL_WIDTH = 320;
  var DEFAULT_LOGICAL_HEIGHT = 220;
  var UI_EVENT_POINTER_DOWN = 1;
  var UI_EVENT_POINTER_UP = 2;
  var UI_EVENT_POINTER_MOVE = 3;
  var UI_EVENT_POINTER_LEAVE = 5;
  var UI_KEY_EVENT_DOWN = 1;
  var UI_KEY_EVENT_UP = 2;
  var EDGE_AUTOSCROLL_THRESHOLD = 30;
  var TOUCH_SCROLL_THRESHOLD = 8;
  function currentInteractionTimeMs() {
    return BigInt(Math.floor(performance.now()));
  }
  function ensureCanvasLogicalSize(canvas) {
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      canvas.style.width = `${String(DEFAULT_LOGICAL_WIDTH)}px`;
      canvas.style.height = `${String(DEFAULT_LOGICAL_HEIGHT)}px`;
    }
  }
  function getCanvasSizeSource(canvas) {
    const source = canvas.closest("[data-effindom-canvas-size-source]");
    return source instanceof HTMLElement ? source : canvas;
  }
  function readCanvasLogicalSize(canvas) {
    const sizeSource = getCanvasSizeSource(canvas);
    if (sizeSource.clientWidth > 0 && sizeSource.clientHeight > 0) {
      return {
        width: sizeSource.clientWidth,
        height: sizeSource.clientHeight
      };
    }
    const styleWidth = Number.parseFloat(canvas.style.width);
    const styleHeight = Number.parseFloat(canvas.style.height);
    if (Number.isFinite(styleWidth) && styleWidth > 0 && Number.isFinite(styleHeight) && styleHeight > 0) {
      return { width: styleWidth, height: styleHeight };
    }
    return {
      width: canvas.clientWidth || DEFAULT_LOGICAL_WIDTH,
      height: canvas.clientHeight || DEFAULT_LOGICAL_HEIGHT
    };
  }
  function getPointerPosition(canvas, event) {
    const sizeSource = getCanvasSizeSource(canvas);
    const rect = sizeSource.getBoundingClientRect();
    const logicalSize = readCanvasLogicalSize(canvas);
    const contentLeft = rect.left + sizeSource.clientLeft;
    const contentTop = rect.top + sizeSource.clientTop;
    const displayWidth = sizeSource.clientWidth || rect.width - (sizeSource.clientLeft + sizeSource.clientLeft) || DEFAULT_LOGICAL_WIDTH;
    const displayHeight = sizeSource.clientHeight || rect.height - (sizeSource.clientTop + sizeSource.clientTop) || DEFAULT_LOGICAL_HEIGHT;
    const x = displayWidth > 0 ? (event.clientX - contentLeft) / displayWidth * logicalSize.width : 0;
    const y = displayHeight > 0 ? (event.clientY - contentTop) / displayHeight * logicalSize.height : 0;
    return { x, y };
  }
  function isPointerInsideCanvas(canvas, event) {
    const rect = getCanvasSizeSource(canvas).getBoundingClientRect();
    return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  }
  function normalizeWheelDelta(event, canvas) {
    let deltaX = event.deltaX;
    let deltaY = event.deltaY;
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
      deltaX *= 16;
      deltaY *= 16;
    } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      const logicalSize = readCanvasLogicalSize(canvas);
      deltaX *= logicalSize.width;
      deltaY *= logicalSize.height;
    }
    if (event.shiftKey && Math.abs(deltaX) < 1e-3 && Math.abs(deltaY) > 0) {
      return { x: deltaY, y: 0 };
    }
    return { x: deltaX, y: deltaY };
  }
  function detectCoarsePointerMode() {
    return window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
  }
  function installEventHandlers(runtime, interactionState) {
    const { canvas, ui } = runtime;
    canvas.tabIndex = 0;
    canvas.style.touchAction = "none";
    canvas.style.outline = "none";
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const updateCoarsePointerMode = () => {
      ui._ui_set_coarse_pointer_mode(detectCoarsePointerMode() ? 1 : 0);
    };
    updateCoarsePointerMode();
    coarsePointerQuery.addEventListener?.("change", updateCoarsePointerMode);
    let primaryPointerDown = false;
    let suppressedContextMenuPointerId = null;
    let edgeAutoScrollTickScheduled = false;
    let pointerMoveFrameScheduled = false;
    let activePrimaryPointerType = null;
    let activeTouchGesture = null;
    let pendingPointerMove = null;
    const applySelectionAutoScroll = (x, y) => {
      if (!primaryPointerDown || activePrimaryPointerType === "touch") {
        return;
      }
      if (handleToBigInt(ui._ui_selection_autoscroll(x, y, EDGE_AUTOSCROLL_THRESHOLD)) === 0n) {
        return;
      }
      runtime.flushPendingCommit();
      runtime.requestFrame();
    };
    const processPointerMove = (pending) => {
      interactionState.setPointerInsideCanvas(pending.pointerInsideCanvas);
      interactionState.setLastPointerPosition(pending.x, pending.y);
      ui._ui_set_interaction_time(currentInteractionTimeMs());
      ui._ui_on_pointer_event(UI_EVENT_POINTER_MOVE, pending.handle, pending.x, pending.y);
      runtime.commitFrame();
      if (pending.handle === 0n) {
        const appCapturedHandle = runtime.getCapturedPointerHandle();
        if (appCapturedHandle !== null) {
          window.__effindomCallbacks?.onPointerEventWithCoords?.(UI_EVENT_POINTER_MOVE, appCapturedHandle, pending.x, pending.y, pending.modifiers);
        }
      }
      applySelectionAutoScroll(pending.x, pending.y);
      scheduleEdgeAutoScrollTick();
    };
    const schedulePointerMoveFlush = () => {
      if (pointerMoveFrameScheduled) {
        return;
      }
      pointerMoveFrameScheduled = true;
      requestAnimationFrame(() => {
        pointerMoveFrameScheduled = false;
        const pending = pendingPointerMove;
        pendingPointerMove = null;
        if (pending === null) {
          return;
        }
        processPointerMove(pending);
        if (pendingPointerMove !== null) {
          schedulePointerMoveFlush();
        }
      });
    };
    const scheduleEdgeAutoScrollTick = () => {
      if (edgeAutoScrollTickScheduled || !primaryPointerDown || activePrimaryPointerType === "touch") {
        return;
      }
      edgeAutoScrollTickScheduled = true;
      requestAnimationFrame(() => {
        edgeAutoScrollTickScheduled = false;
        if (!primaryPointerDown) {
          return;
        }
        const { x, y } = interactionState.getLastPointerPosition();
        if (handleToBigInt(ui._ui_selection_autoscroll(x, y, EDGE_AUTOSCROLL_THRESHOLD)) === 0n) {
          return;
        }
        runtime.commitFrame();
        runtime.flushPendingCommit();
        runtime.requestFrame();
        scheduleEdgeAutoScrollTick();
      });
    };
    const releaseCanvasPointerCapture = (pointerId) => {
      if (canvas.hasPointerCapture(pointerId)) {
        canvas.releasePointerCapture(pointerId);
      }
    };
    const captureCanvasPointer = (pointerId) => {
      try {
        canvas.setPointerCapture(pointerId);
      } catch {
      }
    };
    const cancelPressedPointerInteraction = (x, y) => {
      const capturedHandle = interactionState.getCapturedPointerHandle();
      interactionState.setCapturedPointerHandle(null);
      primaryPointerDown = false;
      pendingPointerMove = null;
      ui._ui_set_interaction_time(currentInteractionTimeMs());
      ui._ui_on_pointer_event(UI_EVENT_POINTER_LEAVE, capturedHandle ?? 0n, x, y);
      runtime.commitFrame();
    };
    const handleTouchPointerScroll = (event, position, modifiers) => {
      if (event.pointerType !== "touch" || activeTouchGesture === null || activeTouchGesture.pointerId !== event.pointerId) {
        return false;
      }
      if (!activeTouchGesture.scrolling) {
        const deltaFromStartX = position.x - activeTouchGesture.startX;
        const deltaFromStartY = position.y - activeTouchGesture.startY;
        if (deltaFromStartX * deltaFromStartX + deltaFromStartY * deltaFromStartY < TOUCH_SCROLL_THRESHOLD * TOUCH_SCROLL_THRESHOLD) {
          event.preventDefault();
          return true;
        }
        activeTouchGesture.scrolling = true;
        cancelPressedPointerInteraction(position.x, position.y);
        ui._ui_touch_scroll_begin(
          ui._ui_touch_scroll_target_at_point(activeTouchGesture.startX, activeTouchGesture.startY),
          activeTouchGesture.startX,
          activeTouchGesture.startY
        );
      }
      const deltaX = activeTouchGesture.lastX - position.x;
      const deltaY = activeTouchGesture.lastY - position.y;
      activeTouchGesture.lastX = position.x;
      activeTouchGesture.lastY = position.y;
      interactionState.setPointerInsideCanvas(isPointerInsideCanvas(canvas, event));
      interactionState.setLastPointerPosition(position.x, position.y);
      interactionState.setLastPointerModifiers(modifiers);
      ui._ui_set_interaction_time(currentInteractionTimeMs());
      ui._ui_on_pointer_event(UI_EVENT_POINTER_MOVE, runtime.getHandleFromPoint(position.x, position.y), position.x, position.y);
      ui._ui_touch_scroll_update(deltaX, deltaY);
      runtime.commitFrame();
      event.preventDefault();
      return true;
    };
    const forwardPointerEvent = (type, useHitTest = true) => (event) => {
      const modifiers = computeModifiers(event);
      const pointerInsideCanvas = type === UI_EVENT_POINTER_LEAVE ? false : isPointerInsideCanvas(canvas, event);
      const position = getPointerPosition(canvas, event);
      if (type === UI_EVENT_POINTER_DOWN && event.button === 2) {
        suppressedContextMenuPointerId = event.pointerId;
        interactionState.setPointerInsideCanvas(pointerInsideCanvas);
        interactionState.setLastPointerPosition(position.x, position.y);
        interactionState.setLastPointerModifiers(modifiers);
        canvas.focus({ preventScroll: true });
        ui._ui_set_interaction_time(currentInteractionTimeMs());
        window.__effindomCallbacks?.onContextMenu?.(
          runtime.getHandleFromPoint(position.x, position.y),
          position.x,
          position.y
        );
        event.preventDefault();
        return;
      }
      if (suppressedContextMenuPointerId === event.pointerId) {
        interactionState.setPointerInsideCanvas(pointerInsideCanvas);
        interactionState.setLastPointerPosition(position.x, position.y);
        interactionState.setLastPointerModifiers(modifiers);
        if (type === UI_EVENT_POINTER_UP || type === UI_EVENT_POINTER_LEAVE) {
          suppressedContextMenuPointerId = null;
        }
        event.preventDefault();
        return;
      }
      if (type === UI_EVENT_POINTER_DOWN) {
        captureCanvasPointer(event.pointerId);
        primaryPointerDown = true;
        activePrimaryPointerType = event.pointerType;
        if (event.pointerType === "touch") {
          activeTouchGesture = {
            pointerId: event.pointerId,
            startX: position.x,
            startY: position.y,
            lastX: position.x,
            lastY: position.y,
            scrolling: false
          };
        }
      } else if (activeTouchGesture !== null && activeTouchGesture.pointerId === event.pointerId) {
        if (type === UI_EVENT_POINTER_MOVE && handleTouchPointerScroll(event, position, modifiers)) {
          return;
        }
        if (type === UI_EVENT_POINTER_UP || type === UI_EVENT_POINTER_LEAVE) {
          const scrolling = activeTouchGesture.scrolling;
          activeTouchGesture = null;
          if (scrolling) {
            interactionState.setCapturedPointerHandle(null);
            primaryPointerDown = false;
            activePrimaryPointerType = null;
            pendingPointerMove = null;
            ui._ui_touch_scroll_end();
            releaseCanvasPointerCapture(event.pointerId);
            event.preventDefault();
            return;
          }
        }
      }
      const capturedHandle = interactionState.getCapturedPointerHandle();
      const hitHandle = useHitTest ? runtime.getHandleFromPoint(position.x, position.y) : 0n;
      const handle = type === UI_EVENT_POINTER_DOWN ? hitHandle : useHitTest && pointerInsideCanvas ? hitHandle : capturedHandle ?? hitHandle;
      if ((type === UI_EVENT_POINTER_UP || type === UI_EVENT_POINTER_LEAVE) && pendingPointerMove !== null) {
        const pending = pendingPointerMove;
        pendingPointerMove = null;
        processPointerMove(pending);
      }
      if (type === UI_EVENT_POINTER_DOWN) {
        interactionState.setPointerInsideCanvas(pointerInsideCanvas);
        interactionState.setLastPointerPosition(position.x, position.y);
        interactionState.setLastPointerModifiers(modifiers);
        canvas.focus({ preventScroll: true });
        ui._ui_set_interaction_time(currentInteractionTimeMs());
        interactionState.setCapturedPointerHandle(handle === 0n ? null : handle);
        ui._ui_on_pointer_event(type, handle, position.x, position.y);
        runtime.commitFrame();
        scheduleEdgeAutoScrollTick();
      } else if (type === UI_EVENT_POINTER_MOVE && primaryPointerDown) {
        pendingPointerMove = {
          handle,
          x: position.x,
          y: position.y,
          pointerInsideCanvas,
          modifiers
        };
        schedulePointerMoveFlush();
        return;
      } else {
        interactionState.setPointerInsideCanvas(pointerInsideCanvas);
        interactionState.setLastPointerPosition(position.x, position.y);
        interactionState.setLastPointerModifiers(modifiers);
        ui._ui_set_interaction_time(currentInteractionTimeMs());
        ui._ui_on_pointer_event(type, handle, position.x, position.y);
        runtime.commitFrame();
        if (handle === 0n) {
          const appCapturedHandle = runtime.getCapturedPointerHandle();
          if (appCapturedHandle !== null) {
            window.__effindomCallbacks?.onPointerEventWithCoords?.(type, appCapturedHandle, position.x, position.y, modifiers);
          }
        }
        scheduleEdgeAutoScrollTick();
      }
      if (type === UI_EVENT_POINTER_UP || type === UI_EVENT_POINTER_LEAVE) {
        primaryPointerDown = false;
        activePrimaryPointerType = null;
        interactionState.setCapturedPointerHandle(null);
      }
      if (type === UI_EVENT_POINTER_UP || type === UI_EVENT_POINTER_LEAVE) {
        releaseCanvasPointerCapture(event.pointerId);
      }
    };
    canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
    canvas.addEventListener("pointerdown", forwardPointerEvent(UI_EVENT_POINTER_DOWN));
    canvas.addEventListener("pointerup", forwardPointerEvent(UI_EVENT_POINTER_UP));
    canvas.addEventListener("pointermove", forwardPointerEvent(UI_EVENT_POINTER_MOVE));
    canvas.addEventListener("pointerleave", (event) => {
      if (canvas.hasPointerCapture(event.pointerId)) {
        return;
      }
      forwardPointerEvent(UI_EVENT_POINTER_LEAVE, false)(event);
    });
    canvas.addEventListener("pointercancel", (event) => {
      forwardPointerEvent(UI_EVENT_POINTER_LEAVE, false)(event);
    });
    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      const position = getPointerPosition(canvas, event);
      interactionState.setPointerInsideCanvas(isPointerInsideCanvas(canvas, event));
      interactionState.setLastPointerPosition(position.x, position.y);
      interactionState.setLastPointerModifiers(computeModifiers(event));
      ui._ui_set_interaction_time(currentInteractionTimeMs());
      const handle = runtime.getHandleFromPoint(position.x, position.y);
      ui._ui_on_pointer_event(UI_EVENT_POINTER_MOVE, handle, position.x, position.y);
      const delta = normalizeWheelDelta(event, canvas);
      ui._ui_on_wheel_event(delta.x, delta.y);
      runtime.commitFrame();
    }, { passive: false });
    const forwardKeyEvent = (type) => (event) => {
      const modifiers = computeModifiers(event);
      ui._ui_set_interaction_time(currentInteractionTimeMs());
      if (event.key === "Tab" || (event.ctrlKey || event.metaKey) && (event.key === "c" || event.key === "C" || event.key === "x" || event.key === "X" || event.key === "v" || event.key === "V" || event.key === "z" || event.key === "Z" || event.key === "y" || event.key === "Y")) {
        event.preventDefault();
      }
      const heapString = writeUtf8ToHeap(ui, event.key);
      try {
        ui._ui_on_key_event(type, heapString.ptr, heapString.len, modifiers);
      } finally {
        heapString.dispose();
      }
      runtime.commitFrame();
      window.__effindomCallbacks?.onKeyEventWithKey?.(type, event.key, modifiers);
    };
    window.addEventListener("keydown", forwardKeyEvent(UI_KEY_EVENT_DOWN));
    window.addEventListener("keyup", forwardKeyEvent(UI_KEY_EVENT_UP));
    window.addEventListener("resize", () => {
      runtime.updateCanvasSize();
      runtime.commitFrame();
    });
  }

  // v2/browser-bridge/src/bridge/interaction.ts
  function currentInteractionTimeMs2() {
    return BigInt(Math.floor(performance.now()));
  }
  function createBridgeLogs() {
    return {
      pointerEvents: [],
      focusEvents: [],
      textChanges: [],
      selectionChanges: [],
      crossSelectionChanges: [],
      clipboardWrites: [],
      clipboardReadRequests: [],
      scrollEvents: []
    };
  }
  function createHiddenInput() {
    const input = document.createElement("input");
    input.type = "text";
    input.autocapitalize = "off";
    input.autocomplete = "off";
    input.autocorrect = false;
    input.spellcheck = false;
    input.tabIndex = -1;
    input.setAttribute("aria-hidden", "true");
    input.style.position = "fixed";
    input.style.left = "-9999px";
    input.style.top = "0";
    input.style.width = "1px";
    input.style.height = "1px";
    input.style.opacity = "0";
    input.style.pointerEvents = "none";
    document.body.appendChild(input);
    return input;
  }
  function tryUpdateEditContext(editContext, text, start, end) {
    if (editContext === null) {
      return;
    }
    const clampedStart = Math.max(0, Math.min(start, text.length));
    const clampedEnd = Math.max(0, Math.min(end, text.length));
    if (typeof editContext.updateText === "function") {
      editContext.updateText(0, editContext.text?.length ?? 0, text);
    } else {
      editContext.text = text;
    }
    if (typeof editContext.updateSelection === "function") {
      editContext.updateSelection(clampedStart, clampedEnd);
    } else {
      editContext.selectionStart = clampedStart;
      editContext.selectionEnd = clampedEnd;
    }
  }
  function tryUpdateEditContextBounds(editContext, canvas, node, logicalWidth, logicalHeight) {
    if (editContext === null || node === null) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const displayWidth = canvas.clientWidth || rect.width;
    const displayHeight = canvas.clientHeight || rect.height;
    const scaleX = logicalWidth > 0 ? displayWidth / logicalWidth : 1;
    const scaleY = logicalHeight > 0 ? displayHeight / logicalHeight : 1;
    const bounds = {
      x: rect.left + node.bounds.x * scaleX,
      y: rect.top + node.bounds.y * scaleY,
      width: node.bounds.width * scaleX,
      height: node.bounds.height * scaleY
    };
    editContext.__effindomControlBounds = bounds;
    if (typeof editContext.updateControlBounds === "function") {
      editContext.updateControlBounds(new DOMRect(bounds.x, bounds.y, bounds.width, bounds.height));
    }
  }
  function installCallbacks(runtimeRef) {
    const logs = createBridgeLogs();
    const textByHandle = /* @__PURE__ */ Object.create(null);
    const selectionsByHandle = /* @__PURE__ */ Object.create(null);
    const hiddenInput = createHiddenInput();
    const editContext = window.EditContext !== void 0 ? new window.EditContext() : null;
    let activeTextHandle = null;
    let hiddenInputIsComposing = false;
    let editContextIsComposing = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastPointerModifiers = 0;
    let lastInteractivePointerHandle = null;
    let capturedPointerHandle = null;
    let pointerInsideCanvas = false;
    window.__bridgeLogs = logs;
    window.__bridgeTextByHandle = textByHandle;
    window.__bridgeSelectionsByHandle = selectionsByHandle;
    const clampSelectionToText = (text, selection) => ({
      start: Math.max(0, Math.min(selection.start, text.length)),
      end: Math.max(0, Math.min(selection.end, text.length))
    });
    const detachBridgeTextInput = () => {
      hiddenInput.blur();
      const runtime = runtimeRef.current;
      if (runtime !== null) {
        delete runtime.canvas.editContext;
      }
    };
    const isEditableHandle = (handleKey) => {
      const runtime = runtimeRef.current;
      if (runtime === null) {
        return false;
      }
      const node = runtime.getSemanticTree().find((entry) => entry.handle === handleKey);
      return node?.roleName === "textbox";
    };
    const syncFocusedInputState = () => {
      if (activeTextHandle === null) {
        detachBridgeTextInput();
        return;
      }
      const handleKey = activeTextHandle.toString();
      const text = textByHandle[handleKey] ?? "";
      const selection = selectionsByHandle[handleKey] ?? { start: text.length, end: text.length };
      const { start, end } = clampSelectionToText(text, selection);
      const normalizedStart = Math.min(start, end);
      const normalizedEnd = Math.max(start, end);
      const direction = start === end ? "none" : start < end ? "forward" : "backward";
      if (hiddenInput.value !== text) {
        hiddenInput.value = text;
      }
      hiddenInput.setSelectionRange(normalizedStart, normalizedEnd, direction);
      tryUpdateEditContext(editContext, text, normalizedStart, normalizedEnd);
    };
    const commitImeText = (text, caret) => {
      const runtime = runtimeRef.current;
      if (runtime === null || activeTextHandle === null) {
        return;
      }
      runtime.ui._ui_set_interaction_time(currentInteractionTimeMs2());
      const heapString = writeUtf8ToHeap(runtime.ui, text);
      const clampedCaret = Math.max(0, Math.min(caret, text.length));
      try {
        runtime.ui._ui_on_ime_update(activeTextHandle, heapString.ptr, heapString.len, clampedCaret);
      } finally {
        heapString.dispose();
      }
      runtime.commitFrame();
    };
    hiddenInput.addEventListener("compositionstart", () => {
      hiddenInputIsComposing = true;
    });
    hiddenInput.addEventListener("input", () => {
      if (hiddenInputIsComposing) {
        return;
      }
      commitImeText(hiddenInput.value, hiddenInput.selectionStart ?? hiddenInput.value.length);
    });
    hiddenInput.addEventListener("compositionend", () => {
      hiddenInputIsComposing = false;
      commitImeText(hiddenInput.value, hiddenInput.selectionStart ?? hiddenInput.value.length);
    });
    const callbacks = {
      onPointerEvent: (handle, eventType) => {
        const entry = { handle: handleToString(handle), eventType };
        logs.pointerEvents.push(entry);
        window.__effindomCallbacks?.onPointerEventWithCoords?.(
          eventType,
          handle,
          lastPointerX,
          lastPointerY,
          lastPointerModifiers
        );
      },
      onFocusChanged: (handle, isFocused) => {
        const handleKey = handleToString(handle);
        const entry = { handle: handleKey, isFocused };
        logs.focusEvents.push(entry);
        if (isFocused) {
          if (!isEditableHandle(handleKey)) {
            activeTextHandle = null;
            syncFocusedInputState();
            return;
          }
          activeTextHandle = handleToBigInt(handle);
          syncFocusedInputState();
          if (editContext === null) {
            hiddenInput.focus({ preventScroll: true });
          } else {
            const runtime = runtimeRef.current;
            if (runtime !== null) {
              runtime.canvas.editContext = editContext;
              runtime.canvas.focus({ preventScroll: true });
            }
          }
        } else if (activeTextHandle !== null && activeTextHandle.toString() === handleKey) {
          activeTextHandle = null;
          syncFocusedInputState();
        }
      },
      onTextChanged: (handle, text) => {
        const handleKey = handleToString(handle);
        textByHandle[handleKey] = text;
        const entry = { handle: handleKey, text };
        logs.textChanges.push(entry);
        if (activeTextHandle !== null && activeTextHandle.toString() === handleKey) {
          syncFocusedInputState();
        }
      },
      onSelectionChanged: (handle, start, end) => {
        const handleKey = handleToString(handle);
        selectionsByHandle[handleKey] = { start, end };
        const entry = { handle: handleKey, start, end };
        logs.selectionChanges.push(entry);
        if (activeTextHandle !== null && activeTextHandle.toString() === handleKey) {
          syncFocusedInputState();
        }
      },
      onScroll: (handle, offsetX, offsetY, contentWidth, contentHeight, viewportWidth, viewportHeight) => {
        const entry = {
          handle: handleToString(handle),
          offsetX,
          offsetY,
          contentWidth,
          contentHeight,
          viewportWidth,
          viewportHeight
        };
        logs.scrollEvents.push(entry);
      },
      onCrossSelectionChanged: (areaHandle, text) => {
        logs.crossSelectionChanges.push({ areaHandle: handleToString(areaHandle), text });
      },
      onClipboardWrite: (text) => {
        logs.clipboardWrites.push(text);
        void navigator.clipboard.writeText(text).catch(() => void 0);
      },
      onClipboardRead: (handle) => {
        const runtime = runtimeRef.current;
        if (runtime === null) {
          return;
        }
        const handleValue = handleToBigInt(handle);
        logs.clipboardReadRequests.push(handleValue.toString());
        void navigator.clipboard.readText().then((text) => {
          runtime.ui._ui_set_interaction_time(currentInteractionTimeMs2());
          const heapString = writeUtf8ToHeap(runtime.ui, text);
          try {
            runtime.ui._ui_on_paste_text(handleValue, heapString.ptr, heapString.len);
          } finally {
            heapString.dispose();
          }
          runtime.commitFrame();
        }).catch(() => void 0);
      },
      onRequestFontLoad: (fontId, url) => {
        const runtime = runtimeRef.current;
        if (runtime === null || url.length === 0) {
          return;
        }
        void runtime.loadFont(fontId, url).catch((error) => {
          window.__bridgeError = error instanceof Error ? error.message : String(error);
        });
      }
    };
    if (editContext !== null) {
      editContext.addEventListener("compositionstart", () => {
        editContextIsComposing = true;
      });
      editContext.addEventListener("textupdate", (event) => {
        if (editContextIsComposing) {
          return;
        }
        const textUpdate = event;
        commitImeText(textUpdate.text, textUpdate.selectionStart);
      });
      editContext.addEventListener("compositionend", () => {
        editContextIsComposing = false;
        commitImeText(editContext.text ?? "", editContext.selectionStart ?? (editContext.text?.length ?? 0));
      });
    }
    window.__effindomCallbacks = callbacks;
    return {
      logs,
      textByHandle,
      selectionsByHandle,
      getActiveTextHandle: () => activeTextHandle,
      getCapturedPointerHandle: () => capturedPointerHandle,
      getEditContext: () => editContext,
      getLastPointerPosition: () => ({ x: lastPointerX, y: lastPointerY }),
      getLastPointerModifiers: () => lastPointerModifiers,
      getLastInteractivePointerHandle: () => lastInteractivePointerHandle,
      isPointerInsideCanvas: () => pointerInsideCanvas,
      setCapturedPointerHandle: (handle) => {
        capturedPointerHandle = handle;
      },
      setLastPointerModifiers: (modifiers) => {
        lastPointerModifiers = modifiers;
      },
      setLastPointerPosition: (x, y) => {
        lastPointerX = x;
        lastPointerY = y;
      },
      setLastInteractivePointerHandle: (handle) => {
        lastInteractivePointerHandle = handle;
      },
      setPointerInsideCanvas: (flag) => {
        pointerInsideCanvas = flag;
      }
    };
  }

  // v2/browser-bridge/src/semantic.ts
  var ROLE_NONE = 0;
  var ROLE_BUTTON = 1;
  var ROLE_TEXTBOX = 2;
  var ROLE_LINK = 3;
  var ROLE_HEADING = 4;
  var ROLE_FORM = 5;
  var ROLE_LIST = 6;
  var ROLE_LIST_ITEM = 7;
  var ROLE_IMAGE = 8;
  var ROLE_DIALOG = 9;
  var ROLE_STATIC_TEXT = 10;
  var ROLE_CHECKBOX = 11;
  var ROLE_RADIO = 12;
  var ROLE_RADIO_GROUP = 13;
  var ROLE_SWITCH = 14;
  var ROLE_SLIDER = 15;
  var ROLE_COMBOBOX = 16;
  var STATE_HAS_SELECTED = 1 << 0;
  var STATE_IS_SELECTED = 1 << 1;
  var STATE_HAS_EXPANDED = 1 << 2;
  var STATE_IS_EXPANDED = 1 << 3;
  var STATE_HAS_DISABLED = 1 << 4;
  var STATE_IS_DISABLED = 1 << 5;
  var STATE_HAS_VALUE_RANGE = 1 << 6;
  var CHECKED_NONE = 0;
  var CHECKED_FALSE = 1;
  var CHECKED_TRUE = 2;
  var CHECKED_MIXED = 3;
  var ORIENTATION_NONE = 0;
  var ORIENTATION_HORIZONTAL = 1;
  var ORIENTATION_VERTICAL = 2;
  var textDecoder = new TextDecoder();
  var floatWordView = new DataView(new ArrayBuffer(4));
  var SEMANTIC_ROLE_DESCRIPTORS = {
    [ROLE_NONE]: { roleName: "none", tagName: "span", ariaRole: null },
    [ROLE_BUTTON]: { roleName: "button", tagName: "button", ariaRole: "button" },
    [ROLE_TEXTBOX]: { roleName: "textbox", tagName: "input", ariaRole: "textbox" },
    [ROLE_LINK]: { roleName: "link", tagName: "a", ariaRole: "link" },
    [ROLE_HEADING]: { roleName: "heading", tagName: "h1", ariaRole: "heading" },
    [ROLE_FORM]: { roleName: "form", tagName: "form", ariaRole: "form" },
    [ROLE_LIST]: { roleName: "list", tagName: "ul", ariaRole: "list" },
    [ROLE_LIST_ITEM]: { roleName: "listitem", tagName: "li", ariaRole: "listitem" },
    [ROLE_IMAGE]: { roleName: "img", tagName: "img", ariaRole: "img" },
    [ROLE_DIALOG]: { roleName: "dialog", tagName: "dialog", ariaRole: "dialog" },
    [ROLE_STATIC_TEXT]: { roleName: "text", tagName: "p", ariaRole: null },
    [ROLE_CHECKBOX]: { roleName: "checkbox", tagName: "input", ariaRole: "checkbox" },
    [ROLE_RADIO]: { roleName: "radio", tagName: "input", ariaRole: "radio" },
    [ROLE_RADIO_GROUP]: { roleName: "radiogroup", tagName: "div", ariaRole: "radiogroup" },
    [ROLE_SWITCH]: { roleName: "switch", tagName: "button", ariaRole: "switch" },
    [ROLE_SLIDER]: { roleName: "slider", tagName: "div", ariaRole: "slider" },
    [ROLE_COMBOBOX]: { roleName: "combobox", tagName: "div", ariaRole: "combobox" }
  };
  function decodeCheckedState(checkedState) {
    if (checkedState === CHECKED_FALSE) {
      return "false";
    }
    if (checkedState === CHECKED_TRUE) {
      return "true";
    }
    if (checkedState === CHECKED_MIXED) {
      return "mixed";
    }
    return void 0;
  }
  function decodeOrientation(orientation) {
    if (orientation === ORIENTATION_HORIZONTAL) {
      return "horizontal";
    }
    if (orientation === ORIENTATION_VERTICAL) {
      return "vertical";
    }
    return void 0;
  }
  function wordToFloat(word) {
    floatWordView.setUint32(0, word >>> 0, true);
    return floatWordView.getFloat32(0, true);
  }
  function describeRole(role) {
    return SEMANTIC_ROLE_DESCRIPTORS[role] ?? {
      roleName: `unknown-${String(role)}`,
      tagName: "span",
      ariaRole: null
    };
  }
  function decodeLabel(words, startWordIndex, labelLength) {
    if (labelLength === 0) {
      return "";
    }
    const byteOffset = words.byteOffset + startWordIndex * 4;
    const paddedByteLength = Math.ceil(labelLength / 4) * 4;
    const labelBytes = new Uint8Array(words.buffer, byteOffset, paddedByteLength);
    return textDecoder.decode(labelBytes.subarray(0, labelLength));
  }
  function parseSemanticBuffer(words) {
    if (words.length === 0) {
      return [];
    }
    const recordCount = words[0] ?? 0;
    if (recordCount === 0) {
      return [];
    }
    let index = 1;
    const nodes = [];
    nodes.length = 0;
    for (let recordIndex = 0; recordIndex < recordCount; recordIndex += 1) {
      if (index + 14 > words.length) {
        throw new Error("Semantic buffer ended mid-record.");
      }
      const role = words[index] ?? ROLE_NONE;
      const handleLow = words[index + 1] ?? 0;
      const handleHigh = words[index + 2] ?? 0;
      const stateFlags = words[index + 7] ?? 0;
      const checkedState = words[index + 8] ?? CHECKED_NONE;
      const orientation = words[index + 9] ?? ORIENTATION_NONE;
      const valueNow = wordToFloat(words[index + 10] ?? 0);
      const valueMin = wordToFloat(words[index + 11] ?? 0);
      const valueMax = wordToFloat(words[index + 12] ?? 0);
      const labelLength = words[index + 13] ?? 0;
      const labelWordCount = Math.ceil(labelLength / 4);
      const descriptor = describeRole(role);
      const handle = (BigInt(handleHigh) << 32n | BigInt(handleLow)).toString();
      const bounds = {
        x: wordToFloat(words[index + 3] ?? 0),
        y: wordToFloat(words[index + 4] ?? 0),
        width: wordToFloat(words[index + 5] ?? 0),
        height: wordToFloat(words[index + 6] ?? 0)
      };
      const state = {};
      const checked = decodeCheckedState(checkedState);
      if (checked !== void 0) {
        state.checked = checked;
      }
      if ((stateFlags & STATE_HAS_SELECTED) !== 0) {
        state.selected = (stateFlags & STATE_IS_SELECTED) !== 0;
      }
      if ((stateFlags & STATE_HAS_EXPANDED) !== 0) {
        state.expanded = (stateFlags & STATE_IS_EXPANDED) !== 0;
      }
      if ((stateFlags & STATE_HAS_DISABLED) !== 0) {
        state.disabled = (stateFlags & STATE_IS_DISABLED) !== 0;
      }
      const decodedOrientation = decodeOrientation(orientation);
      if (decodedOrientation !== void 0) {
        state.orientation = decodedOrientation;
      }
      if ((stateFlags & STATE_HAS_VALUE_RANGE) !== 0) {
        state.valueNow = valueNow;
        state.valueMin = valueMin;
        state.valueMax = valueMax;
      }
      index += 14;
      if (index + labelWordCount > words.length) {
        throw new Error("Semantic buffer label exceeded record bounds.");
      }
      const label = decodeLabel(words, index, labelLength);
      index += labelWordCount;
      nodes.push({
        role,
        roleName: descriptor.roleName,
        handle,
        bounds,
        label,
        state
      });
    }
    return nodes;
  }
  function applyNodeFrame(element, bounds) {
    element.style.left = `${String(bounds.x)}px`;
    element.style.top = `${String(bounds.y)}px`;
    element.style.width = `${String(bounds.width)}px`;
    element.style.height = `${String(bounds.height)}px`;
  }
  function boundsContain(container, candidate) {
    return candidate.x >= container.x && candidate.y >= container.y && candidate.x + candidate.width <= container.x + container.width && candidate.y + candidate.height <= container.y + container.height;
  }
  function ensureProjectedElement(layer, byHandle, node) {
    const descriptor = describeRole(node.role);
    const existing = byHandle.get(node.handle);
    if (existing?.tagName.toLowerCase() === descriptor.tagName) {
      return existing;
    }
    const created = document.createElement(descriptor.tagName);
    created.setAttribute("data-handle", node.handle);
    created.style.position = "absolute";
    created.style.pointerEvents = "none";
    created.style.margin = "0";
    created.style.padding = "0";
    created.style.boxSizing = "border-box";
    created.style.background = "transparent";
    created.style.border = "0";
    created.style.outline = "none";
    created.style.appearance = "none";
    created.style.webkitAppearance = "none";
    created.tabIndex = -1;
    if (descriptor.tagName === "input") {
      const input = created;
      if (node.role === ROLE_CHECKBOX) {
        input.type = "checkbox";
      } else if (node.role === ROLE_RADIO) {
        input.type = "radio";
      } else {
        input.type = "text";
      }
      input.readOnly = true;
    }
    if (existing?.parentElement === layer) {
      layer.replaceChild(created, existing);
    } else {
      layer.appendChild(created);
    }
    byHandle.set(node.handle, created);
    return created;
  }
  function cloneNode(node) {
    return {
      role: node.role,
      roleName: node.roleName,
      handle: node.handle,
      bounds: {
        x: node.bounds.x,
        y: node.bounds.y,
        width: node.bounds.width,
        height: node.bounds.height
      },
      label: node.label,
      state: { ...node.state }
    };
  }
  function roleNeedsAriaLabel(role) {
    return role === ROLE_TEXTBOX || role === ROLE_IMAGE || role === ROLE_DIALOG || role === ROLE_CHECKBOX || role === ROLE_RADIO || role === ROLE_SLIDER || role === ROLE_COMBOBOX;
  }
  function roleUsesTextContent(role) {
    return true;
  }
  var HiddenDomProjector = class {
    constructor(canvas) {
      this.elementsByHandle = /* @__PURE__ */ new Map();
      const parent = canvas.parentElement;
      if (!(parent instanceof HTMLElement)) {
        throw new Error("Expected canvas parent element for semantic projection.");
      }
      const shell = document.createElement("div");
      shell.id = "scene-shell";
      shell.style.position = "relative";
      shell.style.display = "inline-block";
      shell.style.lineHeight = "0";
      parent.replaceChild(shell, canvas);
      const layer = document.createElement("div");
      layer.id = "semantic-layer";
      layer.style.position = "absolute";
      layer.style.left = "0";
      layer.style.top = "0";
      layer.style.pointerEvents = "none";
      layer.style.overflow = "hidden";
      layer.setAttribute("data-visibility", "screen-reader-only");
      const content = document.createElement("div");
      content.id = "semantic-content";
      content.style.position = "absolute";
      content.style.left = "0";
      content.style.top = "0";
      content.style.width = "1px";
      content.style.height = "1px";
      content.style.margin = "-1px";
      content.style.padding = "0";
      content.style.border = "0";
      content.style.overflow = "hidden";
      content.style.clip = "rect(0 0 0 0)";
      content.style.clipPath = "inset(50%)";
      content.style.whiteSpace = "nowrap";
      layer.appendChild(content);
      shell.appendChild(canvas);
      shell.appendChild(layer);
      canvas.setAttribute("role", "application");
      canvas.setAttribute("aria-label", "EffinDom application");
      this.shell = shell;
      this.layer = layer;
      this.content = content;
    }
    syncSize(logicalWidth, logicalHeight) {
      const width = `${String(logicalWidth)}px`;
      const height = `${String(logicalHeight)}px`;
      this.shell.style.width = width;
      this.shell.style.height = height;
      this.layer.style.width = width;
      this.layer.style.height = height;
    }
    update(nodes, textByHandle) {
      const seenHandles = /* @__PURE__ */ new Set();
      for (const node of nodes) {
        seenHandles.add(node.handle);
        const descriptor = describeRole(node.role);
        const element = ensureProjectedElement(this.content, this.elementsByHandle, node);
        const label = node.role === ROLE_TEXTBOX && node.label.length === 0 ? textByHandle[node.handle] ?? "" : node.label;
        if (descriptor.ariaRole === null) {
          element.removeAttribute("role");
        } else {
          element.setAttribute("role", descriptor.ariaRole);
        }
        if (label.length === 0 || !roleNeedsAriaLabel(node.role)) {
          element.removeAttribute("aria-label");
        } else {
          element.setAttribute("aria-label", label);
        }
        if (node.role === ROLE_DIALOG) {
          element.setAttribute("aria-modal", "true");
          if (element instanceof HTMLDialogElement) {
            element.setAttribute("open", "");
          }
        } else {
          element.removeAttribute("aria-modal");
        }
        if (node.state.checked === void 0) {
          element.removeAttribute("aria-checked");
        } else {
          element.setAttribute("aria-checked", node.state.checked);
        }
        if (node.state.selected === void 0) {
          element.removeAttribute("aria-selected");
        } else {
          element.setAttribute("aria-selected", node.state.selected ? "true" : "false");
        }
        if (node.state.expanded === void 0) {
          element.removeAttribute("aria-expanded");
        } else {
          element.setAttribute("aria-expanded", node.state.expanded ? "true" : "false");
        }
        if (node.state.disabled === void 0) {
          element.removeAttribute("aria-disabled");
        } else {
          element.setAttribute("aria-disabled", node.state.disabled ? "true" : "false");
        }
        if (node.state.orientation === void 0) {
          element.removeAttribute("aria-orientation");
        } else {
          element.setAttribute("aria-orientation", node.state.orientation);
        }
        if (node.state.valueNow === void 0) {
          element.removeAttribute("aria-valuenow");
          element.removeAttribute("aria-valuemin");
          element.removeAttribute("aria-valuemax");
        } else {
          element.setAttribute("aria-valuenow", String(node.state.valueNow));
          element.setAttribute("aria-valuemin", String(node.state.valueMin ?? 0));
          element.setAttribute("aria-valuemax", String(node.state.valueMax ?? 0));
        }
        element.id = `semantic-node-${node.handle}`;
        element.setAttribute("data-role", node.roleName);
        applyNodeFrame(element, node.bounds);
        if (element instanceof HTMLInputElement) {
          if (node.role === ROLE_CHECKBOX) {
            element.checked = node.state.checked === "true";
            element.indeterminate = node.state.checked === "mixed";
          } else if (node.role === ROLE_RADIO) {
            element.checked = node.state.checked === "true";
          } else {
            element.value = textByHandle[node.handle] ?? node.label;
          }
        } else if (roleUsesTextContent(node.role)) {
          element.textContent = label;
        } else {
          element.textContent = "";
        }
      }
      for (const node of nodes) {
        if (node.role !== ROLE_DIALOG) {
          continue;
        }
        const dialogElement = this.elementsByHandle.get(node.handle);
        if (!(dialogElement instanceof HTMLElement)) {
          continue;
        }
        const heading = nodes.find((candidate) => candidate.handle !== node.handle && candidate.role === ROLE_HEADING && boundsContain(node.bounds, candidate.bounds));
        const descriptionNodes = nodes.filter((candidate) => candidate.handle !== node.handle && candidate.role === ROLE_STATIC_TEXT && boundsContain(node.bounds, candidate.bounds));
        if (heading !== void 0) {
          dialogElement.setAttribute("aria-labelledby", `semantic-node-${heading.handle}`);
        } else {
          dialogElement.removeAttribute("aria-labelledby");
        }
        if (descriptionNodes.length > 0) {
          dialogElement.setAttribute(
            "aria-describedby",
            descriptionNodes.map((candidate) => `semantic-node-${candidate.handle}`).join(" ")
          );
        } else {
          dialogElement.removeAttribute("aria-describedby");
        }
      }
      for (const [handle, element] of this.elementsByHandle.entries()) {
        if (seenHandles.has(handle)) {
          continue;
        }
        element.remove();
        this.elementsByHandle.delete(handle);
      }
    }
  };
  function cloneSemanticTree(nodes) {
    return nodes.map((node) => cloneNode(node));
  }

  // v2/browser-bridge/src/bridge/runtime.ts
  var DEFAULT_LOGICAL_WIDTH2 = 320;
  var DEFAULT_LOGICAL_HEIGHT2 = 220;
  var UI_EVENT_POINTER_ENTER = 4;
  var UI_EVENT_POINTER_LEAVE2 = 5;
  function createBridgeRuntime(core, ui, canvas, interactionState, loaderInfo) {
    const projector = new HiddenDomProjector(canvas);
    let logicalWidth = DEFAULT_LOGICAL_WIDTH2;
    let logicalHeight = DEFAULT_LOGICAL_HEIGHT2;
    let semanticTree = [];
    let needsCommit = false;
    let appFrameHandler = null;
    let appFrameHandlerContinuous = false;
    let frameRequester = null;
    const openCanvasApi = {
      getSemanticTree: () => cloneSemanticTree(semanticTree),
      getBoundingBox: (handle) => {
        const node = semanticTree.find((entry) => entry.handle === handle);
        return node === void 0 ? null : { ...node.bounds };
      }
    };
    const syncSemanticState = () => {
      semanticTree = parseSemanticBuffer(extractSemanticBuffer(ui));
      projector.update(semanticTree, interactionState.textByHandle);
      window.__bridgeSemanticTree = cloneSemanticTree(semanticTree);
      const activeTextHandle = interactionState.getActiveTextHandle();
      const activeHandleKey = activeTextHandle?.toString() ?? null;
      const activeNode = activeHandleKey === null ? null : semanticTree.find((entry) => entry.handle === activeHandleKey) ?? null;
      if (activeHandleKey !== null) {
        const text = interactionState.textByHandle[activeHandleKey] ?? activeNode?.label ?? "";
        const selection = interactionState.selectionsByHandle[activeHandleKey] ?? { start: text.length, end: text.length };
        tryUpdateEditContext(interactionState.getEditContext(), text, selection.start, selection.end);
      }
      tryUpdateEditContextBounds(interactionState.getEditContext(), canvas, activeNode, logicalWidth, logicalHeight);
    };
    const dispatchAppPointerEvent = (eventType, handle, x, y, modifiers = 0) => {
      if (handle === 0n) {
        return;
      }
      window.__effindomCallbacks?.onPointerEventWithCoords?.(eventType, handle, x, y, modifiers);
    };
    const syncAppPointerHover = () => {
      const { x, y } = interactionState.getLastPointerPosition();
      const previousHandle = interactionState.getLastInteractivePointerHandle();
      const capturedHandle = interactionState.getCapturedPointerHandle();
      if (capturedHandle !== null) {
        if (previousHandle === capturedHandle) {
          return;
        }
        if (previousHandle !== null) {
          dispatchAppPointerEvent(UI_EVENT_POINTER_LEAVE2, previousHandle, x, y);
        }
        interactionState.setLastInteractivePointerHandle(capturedHandle);
        dispatchAppPointerEvent(UI_EVENT_POINTER_ENTER, capturedHandle, x, y);
        return;
      }
      if (!interactionState.isPointerInsideCanvas()) {
        if (previousHandle !== null) {
          interactionState.setLastInteractivePointerHandle(null);
          dispatchAppPointerEvent(UI_EVENT_POINTER_LEAVE2, previousHandle, x, y);
        }
        return;
      }
      const hitHandle = handleToBigInt(core._ed_hit_test(x, y));
      const currentHandle = hitHandle === 0n ? null : hitHandle;
      if (currentHandle === previousHandle) {
        return;
      }
      if (previousHandle !== null) {
        dispatchAppPointerEvent(UI_EVENT_POINTER_LEAVE2, previousHandle, x, y);
      }
      interactionState.setLastInteractivePointerHandle(currentHandle);
      if (currentHandle !== null) {
        dispatchAppPointerEvent(UI_EVENT_POINTER_ENTER, currentHandle, x, y);
      }
    };
    window.__OPEN_CANVAS_API__ = openCanvasApi;
    const updateCanvasSize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const size = readCanvasLogicalSize(canvas);
      logicalWidth = size.width;
      logicalHeight = size.height;
      const physicalWidth = Math.round(logicalWidth * dpr);
      const physicalHeight = Math.round(logicalHeight * dpr);
      canvas.style.width = `${String(logicalWidth)}px`;
      canvas.style.height = `${String(logicalHeight)}px`;
      if (physicalWidth !== canvas.width || physicalHeight !== canvas.height) {
        canvas.width = physicalWidth;
        canvas.height = physicalHeight;
      }
      projector.syncSize(logicalWidth, logicalHeight);
      core._ed_resize(physicalWidth, physicalHeight, dpr);
      ui._ui_resize_window(logicalWidth, logicalHeight);
      syncSemanticState();
      setActiveRenderer(loaderInfo, normalizeBackendType(core._ed_get_backend_type()));
    };
    const runtime = {
      core,
      ui,
      canvas,
      logs: interactionState.logs,
      updateCanvasSize,
      extractCommandBuffer: () => extractCommandBuffer(ui),
      executeCommandBuffer: (words) => {
        executeCommandBuffer(core, words);
      },
      syncCommandBufferToCore: () => {
        const words = extractCommandBuffer(ui);
        executeCommandBuffer(core, words);
        syncSemanticState();
        syncAppPointerHover();
        return words;
      },
      flushPendingCommit: () => {
        if (!needsCommit) {
          return null;
        }
        needsCommit = false;
        return runtime.syncCommandBufferToCore();
      },
      hasPendingCommit: () => needsCommit,
      commitFrame: () => {
        if (needsCommit) {
          runtime.flushPendingCommit();
        }
        ui._ui_commit_frame();
        needsCommit = true;
        frameRequester?.();
      },
      requestFrame: () => {
        frameRequester?.();
      },
      setFrameRequester: (requester) => {
        frameRequester = requester;
      },
      getSemanticTree: () => semanticTree,
      getActiveTextHandle: () => interactionState.getActiveTextHandle(),
      getCapturedPointerHandle: () => interactionState.getCapturedPointerHandle(),
      setCapturedPointerHandle: (handle) => {
        interactionState.setCapturedPointerHandle(handle);
      },
      setAppFrameHandler: (handler, continuous = false) => {
        appFrameHandler = handler;
        appFrameHandlerContinuous = handler !== null && continuous;
        frameRequester?.();
      },
      hasContinuousAppFrames: () => appFrameHandlerContinuous,
      runAppFrameHandler: (timestampMs) => {
        appFrameHandler?.(timestampMs);
      },
      uiNeedsAnimationFrame: () => ui._ui_needs_animation_frame() !== 0,
      getHandleFromPoint: (x, y) => handleToBigInt(core._ed_hit_test(x, y)),
      clearPointerHover: () => {
        interactionState.setLastInteractivePointerHandle(null);
      },
      loadFont: async (fontId, url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch font ${url}: ${String(response.status)}`);
        }
        const bytes = new Uint8Array(await response.arrayBuffer());
        const coreBytes = writeBytesToHeap(core, bytes);
        const uiBytes = writeBytesToHeap(ui, bytes);
        try {
          core._ed_register_font(fontId, coreBytes.ptr, coreBytes.len);
          ui._ui_register_font(fontId, uiBytes.ptr, uiBytes.len);
          ui._ui_font_loaded(fontId);
        } finally {
          coreBytes.dispose();
          uiBytes.dispose();
        }
        runtime.commitFrame();
      },
      resetLogs: () => {
        resetBridgeLogs(interactionState.logs);
        clearRecordMap(window.__bridgeTextByHandle ?? {});
        clearRecordMap(window.__bridgeSelectionsByHandle ?? {});
      }
    };
    const refreshCanvas = () => {
      runtime.updateCanvasSize();
      runtime.commitFrame();
    };
    const canvasSizeSource = getCanvasSizeSource(canvas);
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
      refreshCanvas();
    }) : null;
    if (resizeObserver !== null) {
      resizeObserver.observe(canvasSizeSource);
    }
    return runtime;
  }

  // v2/browser-bridge/src/bridge/render-loop.ts
  var DEVICE_LOST_RETRY_DELAYS_MS = [500, 1e3, 2e3, 4e3];
  function ensureSoftwarePresenter(presenter, canvas) {
    if (presenter !== null) {
      return presenter;
    }
    const overlay = document.createElement("canvas");
    overlay.dataset.effindomSoftwareOverlay = "true";
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.position = "absolute";
    overlay.style.pointerEvents = "none";
    overlay.style.display = "none";
    overlay.style.zIndex = "1";
    const parent = canvas.parentElement;
    if (parent !== null) {
      if (getComputedStyle(parent).position === "static") {
        parent.style.position = "relative";
      }
      parent.appendChild(overlay);
    } else {
      document.body.appendChild(overlay);
    }
    const ctx = overlay.getContext("2d");
    if (ctx === null) {
      throw new Error("Canvas 2D context is unavailable for software rendering.");
    }
    return {
      canvas: overlay,
      ctx,
      imageData: null,
      width: 0,
      height: 0
    };
  }
  function presentSoftwareFrame(core, canvas, presenter) {
    const ptr = normalizePointerForWasm(core, core._ed_get_sw_framebuffer());
    const offset = pointerToHeapOffset(ptr);
    if (offset === 0) {
      return;
    }
    presenter.canvas.style.left = `${String(canvas.offsetLeft)}px`;
    presenter.canvas.style.top = `${String(canvas.offsetTop)}px`;
    presenter.canvas.style.width = canvas.style.width || `${String(canvas.clientWidth)}px`;
    presenter.canvas.style.height = canvas.style.height || `${String(canvas.clientHeight)}px`;
    presenter.canvas.style.borderRadius = getComputedStyle(canvas).borderRadius;
    presenter.canvas.style.display = "";
    if (presenter.imageData === null || presenter.width !== canvas.width || presenter.height !== canvas.height) {
      presenter.canvas.width = canvas.width;
      presenter.canvas.height = canvas.height;
      presenter.imageData = presenter.ctx.createImageData(canvas.width, canvas.height);
      presenter.width = canvas.width;
      presenter.height = canvas.height;
    }
    const byteLength = canvas.width * canvas.height * 4;
    const src = core.HEAPU8.subarray(offset, offset + byteLength);
    presenter.imageData.data.set(src);
    presenter.ctx.putImageData(presenter.imageData, 0, 0);
  }
  function installRenderLoop(runtime, loaderInfo, fallbackLadder = DEFAULT_BACKEND_LADDER) {
    const { core, canvas } = runtime;
    let activeBackend = normalizeBackendType(core._ed_get_backend_type());
    let softwarePresenter = null;
    let frameScheduled = false;
    let lastAttemptedBackend = activeBackend;
    let recoveryAttempts = 0;
    let recoveryExhausted = false;
    let recoveryPromise = null;
    async function runRecovery() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      while (recoveryAttempts < DEVICE_LOST_RETRY_DELAYS_MS.length) {
        const delayMs = DEVICE_LOST_RETRY_DELAYS_MS[recoveryAttempts];
        await delay2(delayMs);
        if (await tryReviveBackend(core, canvas, dpr, lastAttemptedBackend)) {
          recoveryAttempts = 0;
          recoveryExhausted = false;
          activeBackend = lastAttemptedBackend;
          loaderInfo.deviceRecoveryCount += 1;
          setActiveRenderer(loaderInfo, lastAttemptedBackend);
          console.info(`RENDERER RECOVERY: ${backendLabel(lastAttemptedBackend)} recovered successfully.`);
          runtime.commitFrame();
          return;
        }
        recoveryAttempts += 1;
      }
      recoveryExhausted = true;
      const nextIndex = fallbackLadder.indexOf(lastAttemptedBackend) + 1;
      for (let i = nextIndex; i < fallbackLadder.length; i += 1) {
        const fallback = fallbackLadder[i];
        if (await tryReviveBackend(core, canvas, dpr, fallback)) {
          activeBackend = fallback;
          loaderInfo.deviceRecoveryCount += 1;
          setActiveRenderer(loaderInfo, fallback);
          if (fallback === EdBackendType.CPU) {
            console.error(
              `RENDERER FALLBACK: ${backendLabel(lastAttemptedBackend)} device lost and recovery failed! Fell back to Software/Raster - performance will be painfully slow`
            );
          } else {
            console.warn(
              `RENDERER FALLBACK: ${backendLabel(lastAttemptedBackend)} device lost and recovery failed! Fell back to ${backendLabel(fallback)}`
            );
          }
          runtime.commitFrame();
          return;
        }
      }
      throw new Error(
        `Renderer recovery failed: all backends exhausted after ${backendLabel(lastAttemptedBackend)} device loss.`
      );
    }
    function scheduleRecovery(lostBackend) {
      if (recoveryPromise !== null) return;
      lastAttemptedBackend = lostBackend;
      recoveryAttempts = 0;
      recoveryExhausted = false;
      setActiveRenderer(loaderInfo, EdBackendType.NONE);
      recoveryPromise = runRecovery().catch((error) => {
        const message = error instanceof Error ? error.message : String(error);
        window.__bridgeError = message;
      }).finally(() => {
        recoveryPromise = null;
      });
    }
    const scheduleFrame = () => {
      if (frameScheduled) {
        return;
      }
      frameScheduled = true;
      requestAnimationFrame(frame);
    };
    runtime.setFrameRequester(scheduleFrame);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") return;
      if (!recoveryExhausted) return;
      if (recoveryPromise !== null) return;
      console.info(
        `RENDERER RECOVERY: Page visible \u2014 attempting to revive ${backendLabel(lastAttemptedBackend)} after sleep/wake.`
      );
      recoveryAttempts = 0;
      recoveryPromise = runRecovery().catch((error) => {
        const message = error instanceof Error ? error.message : String(error);
        window.__bridgeError = message;
      }).finally(() => {
        recoveryPromise = null;
      });
    });
    const frame = (now) => {
      frameScheduled = false;
      if (recoveryPromise !== null) {
        scheduleFrame();
        return;
      }
      core.refreshHeapViews?.();
      runtime.ui.refreshHeapViews?.();
      runtime.runAppFrameHandler(now);
      if (!runtime.hasPendingCommit() && runtime.uiNeedsAnimationFrame()) {
        runtime.commitFrame();
      }
      runtime.flushPendingCommit();
      core._ed_render_frame(now);
      core.refreshHeapViews?.();
      const deviceState = normalizeDeviceState(core._ed_get_device_state());
      const backendType = normalizeBackendType(core._ed_get_backend_type());
      if (deviceState === EdDeviceState.LOST) {
        scheduleRecovery(activeBackend);
        scheduleFrame();
        return;
      }
      activeBackend = backendType;
      setActiveRenderer(loaderInfo, backendType);
      if (backendType === EdBackendType.CPU) {
        softwarePresenter = ensureSoftwarePresenter(softwarePresenter, canvas);
        presentSoftwareFrame(core, canvas, softwarePresenter);
      } else if (softwarePresenter !== null) {
        softwarePresenter.canvas.style.display = "none";
      }
      if (runtime.hasPendingCommit() || runtime.uiNeedsAnimationFrame() || runtime.hasContinuousAppFrames()) {
        scheduleFrame();
      }
    };
    scheduleFrame();
  }

  // v2/browser-bridge/src/bridge/init.ts
  var DEFAULT_FONT_URL = "./NotoSans-Regular.ttf";
  var DEFAULT_FONT_ID = 1;
  var DEFAULT_HEADING_FONT_URL = "./NotoSans-Bold.ttf";
  var DEFAULT_HEADING_FONT_ID = 2;
  var DEFAULT_SYMBOL_FONT_URL = "./NotoSansSymbols2-Regular.ttf";
  var DEFAULT_SYMBOL_FONT_ID = 3;
  function requireCanvas(id) {
    const element = document.getElementById(id);
    if (!(element instanceof HTMLCanvasElement)) {
      throw new Error(`Expected #${id} canvas.`);
    }
    return element;
  }
  async function initializeBridge() {
    const canvas = requireCanvas("scene");
    ensureCanvasLogicalSize(canvas);
    const runtimeRef = { current: null };
    const interactionState = installCallbacks(runtimeRef);
    const preparedAssets = await prepareRuntimeAssets();
    window.__bridgeLoaderInfo = preparedAssets.loaderInfo;
    const [core, ui] = await Promise.all([
      loadCoreModule(preparedAssets.coreBundle, preparedAssets.coreWasm, canvas, preparedAssets.loaderInfo),
      loadUiModule(preparedAssets.uiBundle, preparedAssets.uiWasm, preparedAssets.loaderInfo)
    ]);
    const runtime = createBridgeRuntime(core, ui, canvas, interactionState, preparedAssets.loaderInfo);
    runtimeRef.current = runtime;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const fallbackLadder = buildBackendLadder(preparedAssets.loaderInfo.requestedRendererBackend);
    await initRenderer(core, canvas, dpr, preparedAssets.loaderInfo, fallbackLadder);
    ui._ui_reset();
    try {
      await loadIcuData(ui, preparedAssets);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load text engine.";
      showIcuError(message);
      throw createErrorWithCause(message, error);
    }
    runtime.updateCanvasSize();
    installEventHandlers(runtime, interactionState);
    installRenderLoop(runtime, preparedAssets.loaderInfo, fallbackLadder);
    await Promise.all([
      runtime.loadFont(DEFAULT_FONT_ID, DEFAULT_FONT_URL),
      runtime.loadFont(DEFAULT_HEADING_FONT_ID, DEFAULT_HEADING_FONT_URL),
      runtime.loadFont(DEFAULT_SYMBOL_FONT_ID, DEFAULT_SYMBOL_FONT_URL)
    ]);
    ui._ui_register_font_fallback(DEFAULT_FONT_ID, DEFAULT_SYMBOL_FONT_ID);
    ui._ui_register_font_fallback(DEFAULT_HEADING_FONT_ID, DEFAULT_SYMBOL_FONT_ID);
    delete window.__bridgeError;
    return runtime;
  }

  // v2/browser-bridge/src/bridge.ts
  var currentRuntime = null;
  var ready = initializeBridge().then((runtime) => {
    currentRuntime = runtime;
    window.__bridgeReady = true;
    window.__bridgeDebug = {
      forceDeviceLost() {
        runtime.core._ed_debug_simulate_device_lost?.();
      }
    };
    return runtime;
  }).catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    window.__bridgeReady = false;
    window.__bridgeError = message;
    throw error;
  });
  var bridgeState = {
    ready,
    getRuntime: () => currentRuntime,
    resetLogs: () => {
      if (currentRuntime !== null) {
        currentRuntime.resetLogs();
      }
    }
  };
  window.__bridgeReady = false;
  window.EffinDomBrowserBridge = bridgeState;
})();
//# sourceMappingURL=bridge.js.map

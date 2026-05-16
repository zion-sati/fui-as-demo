// node_modules/@assemblyscript/loader/index.js
var ID_OFFSET = -8;
var SIZE_OFFSET = -4;
var ARRAYBUFFER_ID = 1;
var STRING_ID = 2;
var ARRAYBUFFERVIEW = 1 << 0;
var ARRAY = 1 << 1;
var STATICARRAY = 1 << 2;
var VAL_ALIGN_OFFSET = 6;
var VAL_SIGNED = 1 << 11;
var VAL_FLOAT = 1 << 12;
var VAL_MANAGED = 1 << 14;
var ARRAYBUFFERVIEW_BUFFER_OFFSET = 0;
var ARRAYBUFFERVIEW_DATASTART_OFFSET = 4;
var ARRAYBUFFERVIEW_BYTELENGTH_OFFSET = 8;
var ARRAYBUFFERVIEW_SIZE = 12;
var ARRAY_LENGTH_OFFSET = 12;
var ARRAY_SIZE = 16;
var E_NO_EXPORT_TABLE = "Operation requires compiling with --exportTable";
var E_NO_EXPORT_RUNTIME = "Operation requires compiling with --exportRuntime";
var F_NO_EXPORT_RUNTIME = () => {
  throw Error(E_NO_EXPORT_RUNTIME);
};
var BIGINT = typeof BigUint64Array !== "undefined";
var THIS = /* @__PURE__ */ Symbol();
var STRING_SMALLSIZE = 192;
var STRING_CHUNKSIZE = 1024;
var utf16 = new TextDecoder("utf-16le", { fatal: true });
Object.hasOwn = Object.hasOwn || function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
function getStringImpl(buffer, ptr) {
  let len = new Uint32Array(buffer)[ptr + SIZE_OFFSET >>> 2] >>> 1;
  const wtf16 = new Uint16Array(buffer, ptr, len);
  if (len <= STRING_SMALLSIZE) return String.fromCharCode(...wtf16);
  try {
    return utf16.decode(wtf16);
  } catch {
    let str = "", off = 0;
    while (len - off > STRING_CHUNKSIZE) {
      str += String.fromCharCode(...wtf16.subarray(off, off += STRING_CHUNKSIZE));
    }
    return str + String.fromCharCode(...wtf16.subarray(off));
  }
}
function preInstantiate(imports) {
  const extendedExports = {};
  function getString(memory, ptr) {
    if (!memory) return "<yet unknown>";
    return getStringImpl(memory.buffer, ptr);
  }
  const env = imports.env = imports.env || {};
  env.abort = env.abort || function abort(msg, file, line, colm) {
    const memory = extendedExports.memory || env.memory;
    throw Error(`abort: ${getString(memory, msg)} at ${getString(memory, file)}:${line}:${colm}`);
  };
  env.trace = env.trace || function trace(msg, n, ...args) {
    const memory = extendedExports.memory || env.memory;
    console.log(`trace: ${getString(memory, msg)}${n ? " " : ""}${args.slice(0, n).join(", ")}`);
  };
  env.seed = env.seed || Date.now;
  imports.Math = imports.Math || Math;
  imports.Date = imports.Date || Date;
  return extendedExports;
}
function postInstantiate(extendedExports, instance) {
  const exports = instance.exports;
  const memory = exports.memory;
  const table = exports.table;
  const __new = exports.__new || F_NO_EXPORT_RUNTIME;
  const __pin = exports.__pin || F_NO_EXPORT_RUNTIME;
  const __unpin = exports.__unpin || F_NO_EXPORT_RUNTIME;
  const __collect = exports.__collect || F_NO_EXPORT_RUNTIME;
  const __rtti_base = exports.__rtti_base;
  const getTypeinfoCount = __rtti_base ? (arr) => arr[__rtti_base >>> 2] : F_NO_EXPORT_RUNTIME;
  extendedExports.__new = __new;
  extendedExports.__pin = __pin;
  extendedExports.__unpin = __unpin;
  extendedExports.__collect = __collect;
  function getTypeinfo(id) {
    const U32 = new Uint32Array(memory.buffer);
    if ((id >>>= 0) >= getTypeinfoCount(U32)) throw Error(`invalid id: ${id}`);
    return U32[(__rtti_base + 4 >>> 2) + id];
  }
  function getArrayInfo(id) {
    const info = getTypeinfo(id);
    if (!(info & (ARRAYBUFFERVIEW | ARRAY | STATICARRAY))) throw Error(`not an array: ${id}, flags=${info}`);
    return info;
  }
  function getValueAlign(info) {
    return 31 - Math.clz32(info >>> VAL_ALIGN_OFFSET & 31);
  }
  function __newString(str) {
    if (str == null) return 0;
    const length = str.length;
    const ptr = __new(length << 1, STRING_ID);
    const U16 = new Uint16Array(memory.buffer);
    for (let i = 0, p = ptr >>> 1; i < length; ++i) U16[p + i] = str.charCodeAt(i);
    return ptr;
  }
  extendedExports.__newString = __newString;
  function __newArrayBuffer(buf) {
    if (buf == null) return 0;
    const bufview = new Uint8Array(buf);
    const ptr = __new(bufview.length, ARRAYBUFFER_ID);
    const U8 = new Uint8Array(memory.buffer);
    U8.set(bufview, ptr);
    return ptr;
  }
  extendedExports.__newArrayBuffer = __newArrayBuffer;
  function __getString(ptr) {
    if (!ptr) return null;
    const buffer = memory.buffer;
    const id = new Uint32Array(buffer)[ptr + ID_OFFSET >>> 2];
    if (id !== STRING_ID) throw Error(`not a string: ${ptr}`);
    return getStringImpl(buffer, ptr);
  }
  extendedExports.__getString = __getString;
  function getView(alignLog2, signed, float) {
    const buffer = memory.buffer;
    if (float) {
      switch (alignLog2) {
        case 2:
          return new Float32Array(buffer);
        case 3:
          return new Float64Array(buffer);
      }
    } else {
      switch (alignLog2) {
        case 0:
          return new (signed ? Int8Array : Uint8Array)(buffer);
        case 1:
          return new (signed ? Int16Array : Uint16Array)(buffer);
        case 2:
          return new (signed ? Int32Array : Uint32Array)(buffer);
        case 3:
          return new (signed ? BigInt64Array : BigUint64Array)(buffer);
      }
    }
    throw Error(`unsupported align: ${alignLog2}`);
  }
  function __newArray(id, valuesOrCapacity = 0) {
    const input = valuesOrCapacity;
    const info = getArrayInfo(id);
    const align = getValueAlign(info);
    const isArrayLike = typeof input !== "number";
    const length = isArrayLike ? input.length : input;
    const buf = __new(length << align, info & STATICARRAY ? id : ARRAYBUFFER_ID);
    let result;
    if (info & STATICARRAY) {
      result = buf;
    } else {
      __pin(buf);
      const arr = __new(info & ARRAY ? ARRAY_SIZE : ARRAYBUFFERVIEW_SIZE, id);
      __unpin(buf);
      const U32 = new Uint32Array(memory.buffer);
      U32[arr + ARRAYBUFFERVIEW_BUFFER_OFFSET >>> 2] = buf;
      U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2] = buf;
      U32[arr + ARRAYBUFFERVIEW_BYTELENGTH_OFFSET >>> 2] = length << align;
      if (info & ARRAY) U32[arr + ARRAY_LENGTH_OFFSET >>> 2] = length;
      result = arr;
    }
    if (isArrayLike) {
      const view = getView(align, info & VAL_SIGNED, info & VAL_FLOAT);
      const start = buf >>> align;
      if (info & VAL_MANAGED) {
        for (let i = 0; i < length; ++i) {
          view[start + i] = input[i];
        }
      } else {
        view.set(input, start);
      }
    }
    return result;
  }
  extendedExports.__newArray = __newArray;
  function __getArrayView(arr) {
    const U32 = new Uint32Array(memory.buffer);
    const id = U32[arr + ID_OFFSET >>> 2];
    const info = getArrayInfo(id);
    const align = getValueAlign(info);
    let buf = info & STATICARRAY ? arr : U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
    const length = info & ARRAY ? U32[arr + ARRAY_LENGTH_OFFSET >>> 2] : U32[buf + SIZE_OFFSET >>> 2] >>> align;
    return getView(align, info & VAL_SIGNED, info & VAL_FLOAT).subarray(buf >>>= align, buf + length);
  }
  extendedExports.__getArrayView = __getArrayView;
  function __getArray(arr) {
    const input = __getArrayView(arr);
    const len = input.length;
    const out = new Array(len);
    for (let i = 0; i < len; i++) out[i] = input[i];
    return out;
  }
  extendedExports.__getArray = __getArray;
  function __getArrayBuffer(ptr) {
    const buffer = memory.buffer;
    const length = new Uint32Array(buffer)[ptr + SIZE_OFFSET >>> 2];
    return buffer.slice(ptr, ptr + length);
  }
  extendedExports.__getArrayBuffer = __getArrayBuffer;
  function __getFunction(ptr) {
    if (!table) throw Error(E_NO_EXPORT_TABLE);
    const index = new Uint32Array(memory.buffer)[ptr >>> 2];
    return table.get(index);
  }
  extendedExports.__getFunction = __getFunction;
  function getTypedArray(Type, alignLog2, ptr) {
    return new Type(getTypedArrayView(Type, alignLog2, ptr));
  }
  function getTypedArrayView(Type, alignLog2, ptr) {
    const buffer = memory.buffer;
    const U32 = new Uint32Array(buffer);
    return new Type(
      buffer,
      U32[ptr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2],
      U32[ptr + ARRAYBUFFERVIEW_BYTELENGTH_OFFSET >>> 2] >>> alignLog2
    );
  }
  function attachTypedArrayFunctions(ctor, name, align) {
    extendedExports[`__get${name}`] = getTypedArray.bind(null, ctor, align);
    extendedExports[`__get${name}View`] = getTypedArrayView.bind(null, ctor, align);
  }
  [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
  ].forEach((ctor) => {
    attachTypedArrayFunctions(ctor, ctor.name, 31 - Math.clz32(ctor.BYTES_PER_ELEMENT));
  });
  if (BIGINT) {
    [BigUint64Array, BigInt64Array].forEach((ctor) => {
      attachTypedArrayFunctions(ctor, ctor.name.slice(3), 3);
    });
  }
  extendedExports.memory = extendedExports.memory || memory;
  extendedExports.table = extendedExports.table || table;
  return demangle(exports, extendedExports);
}
function isResponse(src) {
  return typeof Response !== "undefined" && src instanceof Response;
}
function isModule(src) {
  return src instanceof WebAssembly.Module;
}
async function instantiate(source, imports = {}) {
  if (isResponse(source = await source)) return instantiateStreaming(source, imports);
  const module = isModule(source) ? source : await WebAssembly.compile(source);
  const extended = preInstantiate(imports);
  const instance = await WebAssembly.instantiate(module, imports);
  const exports = postInstantiate(extended, instance);
  return { module, instance, exports };
}
async function instantiateStreaming(source, imports = {}) {
  if (!WebAssembly.instantiateStreaming) {
    return instantiate(
      isResponse(source = await source) ? source.arrayBuffer() : source,
      imports
    );
  }
  const extended = preInstantiate(imports);
  const result = await WebAssembly.instantiateStreaming(source, imports);
  const exports = postInstantiate(extended, result.instance);
  return { ...result, exports };
}
function demangle(exports, extendedExports = {}) {
  const setArgumentsLength = exports["__argumentsLength"] ? (length) => {
    exports["__argumentsLength"].value = length;
  } : exports["__setArgumentsLength"] || exports["__setargc"] || (() => {
  });
  for (let internalName of Object.keys(exports)) {
    const elem = exports[internalName];
    let parts = internalName.split(".");
    let curr = extendedExports;
    while (parts.length > 1) {
      let part = parts.shift();
      if (!Object.hasOwn(curr, part)) curr[part] = {};
      curr = curr[part];
    }
    let name = parts[0];
    let hash = name.indexOf("#");
    if (hash >= 0) {
      const className = name.substring(0, hash);
      const classElem = curr[className];
      if (typeof classElem === "undefined" || !classElem.prototype) {
        const ctor = function(...args) {
          return ctor.wrap(ctor.prototype.constructor(0, ...args));
        };
        ctor.prototype = {
          valueOf() {
            return this[THIS];
          }
        };
        ctor.wrap = function(thisValue) {
          return Object.create(ctor.prototype, { [THIS]: { value: thisValue, writable: false } });
        };
        if (classElem) Object.getOwnPropertyNames(classElem).forEach(
          (name2) => Object.defineProperty(ctor, name2, Object.getOwnPropertyDescriptor(classElem, name2))
        );
        curr[className] = ctor;
      }
      name = name.substring(hash + 1);
      curr = curr[className].prototype;
      if (/^(get|set):/.test(name)) {
        if (!Object.hasOwn(curr, name = name.substring(4))) {
          let getter = exports[internalName.replace("set:", "get:")];
          let setter = exports[internalName.replace("get:", "set:")];
          Object.defineProperty(curr, name, {
            get() {
              return getter(this[THIS]);
            },
            set(value) {
              setter(this[THIS], value);
            },
            enumerable: true
          });
        }
      } else {
        if (name === "constructor") {
          (curr[name] = function(...args) {
            setArgumentsLength(args.length);
            return elem(...args);
          }).original = elem;
        } else {
          (curr[name] = function(...args) {
            setArgumentsLength(args.length);
            return elem(this[THIS], ...args);
          }).original = elem;
        }
      }
    } else {
      if (/^(get|set):/.test(name)) {
        if (!Object.hasOwn(curr, name = name.substring(4))) {
          Object.defineProperty(curr, name, {
            get: exports[internalName.replace("set:", "get:")],
            set: exports[internalName.replace("get:", "set:")],
            enumerable: true
          });
        }
      } else if (typeof elem === "function" && elem !== setArgumentsLength) {
        (curr[name] = (...args) => {
          setArgumentsLength(args.length);
          return elem(...args);
        }).original = elem;
      } else {
        curr[name] = elem;
      }
    }
  }
  return extendedExports;
}

// browser/common-harness.ts
var managedHistoryInitialized = false;
var managedHistoryEntries = [];
var managedHistoryIndex = 0;
function ensureManagedHistoryInitialized(currentUrl = new URL(window.location.href)) {
  if (managedHistoryInitialized) {
    return;
  }
  managedHistoryEntries = [currentUrl.href];
  managedHistoryIndex = 0;
  managedHistoryInitialized = true;
}
function pushManagedHistoryEntry(target) {
  ensureManagedHistoryInitialized(target);
  managedHistoryEntries = managedHistoryEntries.slice(0, managedHistoryIndex + 1);
  managedHistoryEntries.push(target.href);
  managedHistoryIndex = managedHistoryEntries.length - 1;
  window.history.pushState({ href: target.href }, "", target.href);
}
function replaceManagedHistoryEntry(target) {
  ensureManagedHistoryInitialized(target);
  managedHistoryEntries[managedHistoryIndex] = target.href;
  window.history.replaceState({ href: target.href }, "", target.href);
}
function syncManagedHistoryPop(target) {
  ensureManagedHistoryInitialized(target);
  if (managedHistoryIndex > 0 && managedHistoryEntries[managedHistoryIndex - 1] === target.href) {
    managedHistoryIndex -= 1;
    return;
  }
  if (managedHistoryIndex + 1 < managedHistoryEntries.length && managedHistoryEntries[managedHistoryIndex + 1] === target.href) {
    managedHistoryIndex += 1;
    return;
  }
  const existingIndex = managedHistoryEntries.lastIndexOf(target.href);
  if (existingIndex >= 0) {
    managedHistoryIndex = existingIndex;
    return;
  }
  managedHistoryEntries = [target.href];
  managedHistoryIndex = 0;
}
function canManagedNavigateBack() {
  ensureManagedHistoryInitialized();
  return managedHistoryIndex > 0;
}
function canManagedNavigateForward() {
  ensureManagedHistoryInitialized();
  return managedHistoryIndex + 1 < managedHistoryEntries.length;
}
function getBrowserNavigationApi() {
  const windowWithNavigation = window;
  return windowWithNavigation.navigation ?? null;
}
function canBrowserNavigateBack() {
  const navigationApi = getBrowserNavigationApi();
  if (navigationApi?.canGoBack !== void 0) {
    return navigationApi.canGoBack;
  }
  return canManagedNavigateBack();
}
function canBrowserNavigateForward() {
  const navigationApi = getBrowserNavigationApi();
  if (navigationApi?.canGoForward !== void 0) {
    return navigationApi.canGoForward;
  }
  return canManagedNavigateForward();
}
function navigateBrowserBack() {
  if (!canBrowserNavigateBack()) {
    return;
  }
  const navigationApi = getBrowserNavigationApi();
  if (typeof navigationApi?.back === "function") {
    void navigationApi.back();
    return;
  }
  window.history.back();
}
function navigateBrowserForward() {
  if (!canBrowserNavigateForward()) {
    return;
  }
  const navigationApi = getBrowserNavigationApi();
  if (typeof navigationApi?.forward === "function") {
    void navigationApi.forward();
    return;
  }
  window.history.forward();
}
var decoder = new TextDecoder();
var encoder = new TextEncoder();
var DEFAULT_ACCENT_COLOR = 627305471;
var URL_PREVIEW_BAR_ID = "fui-url-bar";
var PLATFORM_FAMILY_UNKNOWN = 0;
var PLATFORM_FAMILY_APPLE = 1;
var PLATFORM_FAMILY_WINDOWS = 2;
var PLATFORM_FAMILY_LINUX = 3;
var LOADING_OVERLAY_ID = "effindom-loading-overlay";
var LOADING_TITLE_ID = "effindom-loading-title";
var LOADING_DETAIL_ID = "effindom-loading-detail";
function toBigIntHandle(handle) {
  if (typeof handle === "bigint") {
    return handle;
  }
  if (typeof handle === "number") {
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
    return BigInt(primitive);
  }
  if (typeof primitive === "string") {
    return BigInt(primitive);
  }
  return BigInt(handle.toString());
}
function toNumberHandle(handle) {
  return Number(toBigIntHandle(handle));
}
function zeroPointer(runtime) {
  return runtime.ui.usesMemory64 === true ? 0n : 0;
}
function normalizePointer(runtime, ptr) {
  return runtime.ui.usesMemory64 === true ? toBigIntHandle(ptr) : typeof ptr === "number" ? ptr : toNumberHandle(ptr);
}
function waitForFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}
function packColor(red, green, blue, alpha = 255) {
  return ((red & 255) << 24 | (green & 255) << 16 | (blue & 255) << 8 | alpha & 255) >>> 0;
}
function parseCssColorToRgba(colorValue) {
  const probeParent = document.body ?? document.documentElement;
  const probe = document.createElement("span");
  probe.style.color = colorValue;
  if (probe.style.color.length === 0) {
    return null;
  }
  probe.style.position = "absolute";
  probe.style.pointerEvents = "none";
  probe.style.opacity = "0";
  probeParent.appendChild(probe);
  const computed = getComputedStyle(probe).color.trim();
  probe.remove();
  const match = /^rgba?\(([^)]+)\)$/.exec(computed);
  if (match === null) {
    return null;
  }
  const parts = match[1].split(",").map((part) => part.trim());
  if (parts.length < 3) {
    return null;
  }
  const red = Number.parseInt(parts[0] ?? "", 10);
  const green = Number.parseInt(parts[1] ?? "", 10);
  const blue = Number.parseInt(parts[2] ?? "", 10);
  if ([red, green, blue].some((channel) => Number.isNaN(channel))) {
    return null;
  }
  const alphaPart = parts[3];
  const alpha = alphaPart === void 0 ? 255 : Math.max(0, Math.min(255, Math.round(Number.parseFloat(alphaPart) * 255)));
  return packColor(red, green, blue, alpha);
}
function setLoadingOverlay(state, title, detail) {
  const overlay = document.getElementById(LOADING_OVERLAY_ID);
  const titleNode = document.getElementById(LOADING_TITLE_ID);
  const detailNode = document.getElementById(LOADING_DETAIL_ID);
  if (!(overlay instanceof HTMLElement) || !(titleNode instanceof HTMLElement) || !(detailNode instanceof HTMLElement)) {
    return;
  }
  overlay.dataset.state = state;
  overlay.hidden = false;
  overlay.setAttribute("aria-hidden", "false");
  titleNode.textContent = title;
  detailNode.textContent = detail;
}
function hideLoadingOverlay() {
  const overlay = document.getElementById(LOADING_OVERLAY_ID);
  if (!(overlay instanceof HTMLElement)) {
    return;
  }
  overlay.hidden = true;
  overlay.dataset.state = "ready";
  overlay.setAttribute("aria-hidden", "true");
}
function ensureUrlPreviewBar() {
  const existing = document.getElementById(URL_PREVIEW_BAR_ID);
  if (existing instanceof HTMLDivElement) {
    return existing;
  }
  const bar = document.createElement("div");
  bar.id = URL_PREVIEW_BAR_ID;
  bar.hidden = true;
  bar.dataset.visible = "false";
  bar.setAttribute("aria-hidden", "true");
  bar.style.position = "fixed";
  bar.style.left = "12px";
  bar.style.bottom = "12px";
  bar.style.maxWidth = "min(60vw, 720px)";
  bar.style.padding = "6px 10px";
  bar.style.borderRadius = "10px";
  bar.style.background = "rgba(15, 23, 42, 0.84)";
  bar.style.color = "#f8fafc";
  bar.style.font = '12px/1.4 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  bar.style.letterSpacing = "0.01em";
  bar.style.whiteSpace = "nowrap";
  bar.style.overflow = "hidden";
  bar.style.textOverflow = "ellipsis";
  bar.style.pointerEvents = "none";
  bar.style.opacity = "0";
  bar.style.transform = "translateY(6px)";
  bar.style.transition = "opacity 120ms ease, transform 120ms ease";
  bar.style.backdropFilter = "blur(12px)";
  bar.style.boxShadow = "0 10px 28px rgba(2, 6, 23, 0.24)";
  bar.style.zIndex = "2147483647";
  (document.body ?? document.documentElement).appendChild(bar);
  return bar;
}
function setUrlPreviewText(text) {
  const bar = ensureUrlPreviewBar();
  if (text.length === 0) {
    bar.textContent = "";
    bar.hidden = true;
    bar.dataset.visible = "false";
    bar.style.opacity = "0";
    bar.style.transform = "translateY(6px)";
    window.__fuiUrlPreviewText = "";
    return;
  }
  bar.textContent = text;
  bar.hidden = false;
  bar.dataset.visible = "true";
  bar.style.opacity = "1";
  bar.style.transform = "translateY(0)";
  window.__fuiUrlPreviewText = text;
}
function tryResolveNavigationTarget(target) {
  try {
    return new URL(target, window.location.href);
  } catch {
    return null;
  }
}
function toAppRoute(url) {
  return `${url.pathname}${url.search}${url.hash}`;
}
function detectPlatformFamily() {
  const navigatorWithUserAgentData = navigator;
  const platform = (navigatorWithUserAgentData.userAgentData?.platform ?? navigator.platform ?? navigator.userAgent).toLowerCase();
  if (platform.indexOf("mac") >= 0 || platform.indexOf("iphone") >= 0 || platform.indexOf("ipad") >= 0 || platform.indexOf("ipod") >= 0 || platform.indexOf("ios") >= 0) {
    return PLATFORM_FAMILY_APPLE;
  }
  if (platform.indexOf("win") >= 0) {
    return PLATFORM_FAMILY_WINDOWS;
  }
  if (platform.indexOf("linux") >= 0 || platform.indexOf("android") >= 0 || platform.indexOf("x11") >= 0 || platform.indexOf("cros") >= 0) {
    return PLATFORM_FAMILY_LINUX;
  }
  return PLATFORM_FAMILY_UNKNOWN;
}
function detectCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
}
function getCanvasSizeSource(canvas) {
  const source = canvas.closest("[data-effindom-canvas-size-source]");
  return source instanceof HTMLElement ? source : canvas;
}
function startHarness(options) {
  startManagedHarness({
    async onReady(controller) {
      await controller.loadApp(options);
    },
    onError: options.onError
  });
}
function startManagedHarness(options) {
  let cleanup = () => {
    delete window.__fui_debug;
  };
  setLoadingOverlay(
    "loading",
    "Teaching the pixels their lines...",
    "The runtime orchestra is tuning up behind the canvas."
  );
  void window.EffinDomBrowserBridge?.ready.then(async (runtime) => {
    ensureManagedHistoryInitialized();
    const debugLogsEnabled = new URLSearchParams(window.location.search).get("debug-logs") === "1";
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let currentSession = null;
    let navigationHandler = null;
    let harnessFrameQueued = false;
    let appFlushRequested = false;
    let latestCommandWords = [];
    let latestRootHandle = null;
    const wasmByteCache = /* @__PURE__ */ new Map();
    const pendingGradients = /* @__PURE__ */ new Map();
    setUrlPreviewText("");
    function getCurrentSession() {
      if (currentSession === null) {
        throw new Error("No AssemblyScript app is currently mounted.");
      }
      return currentSession;
    }
    function getCurrentMemory() {
      return getCurrentSession().memory;
    }
    function updateState() {
      currentSession?.onStateUpdated?.({
        commandWordCount: latestCommandWords.length,
        commandWords: latestCommandWords,
        rootHandle: latestRootHandle
      });
    }
    function queueHarnessFrame() {
      if (harnessFrameQueued) {
        return;
      }
      harnessFrameQueued = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          latestCommandWords = Array.from(runtime.extractCommandBuffer());
          updateState();
          harnessFrameQueued = false;
        });
      });
    }
    function resetUiState() {
      pendingGradients.clear();
      latestCommandWords = [];
      latestRootHandle = null;
      updateState();
    }
    function readHostAccentColor() {
      const accent = getComputedStyle(document.documentElement).getPropertyValue("accent-color").trim();
      if (accent.length === 0 || accent === "auto") {
        return DEFAULT_ACCENT_COLOR;
      }
      return parseCssColorToRgba(accent) ?? DEFAULT_ACCENT_COLOR;
    }
    function notifyRouteChanged(session, route) {
      if (session === null || session.textBufferPtr === 0 || session.textBufferSize === 0 || typeof session.exports.__fui_on_route_changed !== "function") {
        return;
      }
      const encoded = encoder.encode(route);
      if (encoded.length > session.textBufferSize) {
        throw new Error("Route text exceeds the shared AssemblyScript text buffer.");
      }
      if (encoded.length > 0) {
        const memory = new Uint8Array(session.memory.buffer, session.textBufferPtr, encoded.length);
        memory.set(encoded);
      }
      session.exports.__fui_on_route_changed(session.textBufferPtr, encoded.length);
    }
    function notifyRouteForCurrentLocation(session = currentSession) {
      notifyRouteChanged(session, `${window.location.pathname}${window.location.search}${window.location.hash}`);
    }
    function notifyViewport(session = currentSession) {
      if (session === null || typeof session.exports.__fui_on_viewport_changed !== "function") {
        return;
      }
      const rect = runtime.canvas.getBoundingClientRect();
      const width = rect.width > 0 ? rect.width : runtime.canvas.width;
      const height = rect.height > 0 ? rect.height : runtime.canvas.height;
      session.exports.__fui_on_viewport_changed(width, height);
    }
    function notifySystemTheme(session = currentSession, isDark = darkModeQuery.matches) {
      if (session === null || typeof session.exports.__fui_on_system_dark_mode_changed !== "function") {
        return;
      }
      session.exports.__fui_on_system_dark_mode_changed(isDark);
    }
    function handleSameOriginNavigation(target, mode) {
      if (navigationHandler !== null) {
        void navigationHandler(target, mode);
        return;
      }
      if (mode === "push") {
        pushManagedHistoryEntry(target);
      } else if (mode === "replace") {
        replaceManagedHistoryEntry(target);
      }
      notifyRouteChanged(currentSession, toAppRoute(target));
    }
    function navigateWithinDocument(rawTarget, openInNewTab) {
      const target = tryResolveNavigationTarget(rawTarget);
      if (target === null) {
        throw new Error(`Invalid navigation target: ${rawTarget}`);
      }
      if (openInNewTab) {
        const anchor = document.createElement("a");
        anchor.href = target.href;
        anchor.target = "_blank";
        anchor.rel = "noopener";
        anchor.hidden = true;
        (document.body ?? document.documentElement).appendChild(anchor);
        anchor.click();
        anchor.remove();
        return;
      }
      const isWebUrl = target.protocol === "http:" || target.protocol === "https:";
      if (isWebUrl && target.origin === window.location.origin) {
        handleSameOriginNavigation(target, "push");
        return;
      }
      window.location.assign(target.href);
    }
    async function flushDebugInteraction(session) {
      session.exports.__flushRenders?.();
      while (appFlushRequested) {
        appFlushRequested = false;
        session.exports.__flushRenders?.();
      }
      const words = runtime.flushPendingCommit();
      latestCommandWords = words === null ? [] : Array.from(words);
      updateState();
      await waitForFrame();
      updateState();
    }
    function readAppUtf8(ptr, len) {
      if (len === 0) {
        return "";
      }
      return decoder.decode(new Uint8Array(getCurrentMemory().buffer, ptr, len));
    }
    function readAppFloats(ptr, count) {
      if (count === 0) {
        return new Float32Array(0);
      }
      return new Float32Array(getCurrentMemory().buffer.slice(ptr, ptr + count * 4));
    }
    function readAppBytes(ptr, len) {
      if (len === 0) {
        return new Uint8Array(0);
      }
      return new Uint8Array(getCurrentMemory().buffer.slice(ptr, ptr + len));
    }
    function withUiUtf8(text, callback) {
      if (text.length === 0) {
        callback(zeroPointer(runtime), 0);
        return;
      }
      const bytes = encoder.encode(text);
      const ptr = runtime.ui._malloc(bytes.length);
      const numericPtr = toNumberHandle(ptr);
      runtime.ui.HEAPU8.set(bytes, numericPtr);
      callback(normalizePointer(runtime, ptr), bytes.length);
      runtime.ui._free(ptr);
    }
    function withUiGridData(values, types, callback) {
      const valueBytes = new Uint8Array(values.buffer);
      const valuePtr = valueBytes.length > 0 ? runtime.ui._malloc(valueBytes.length) : zeroPointer(runtime);
      const valueNumericPtr = valueBytes.length > 0 ? toNumberHandle(valuePtr) : 0;
      if (valueBytes.length > 0) {
        runtime.ui.HEAPU8.set(valueBytes, valueNumericPtr);
      }
      const typePtr = types.length > 0 ? runtime.ui._malloc(types.length) : zeroPointer(runtime);
      const typeNumericPtr = types.length > 0 ? toNumberHandle(typePtr) : 0;
      if (types.length > 0) {
        runtime.ui.HEAPU8.set(types, typeNumericPtr);
      }
      callback(normalizePointer(runtime, valuePtr), normalizePointer(runtime, typePtr));
      if (types.length > 0) {
        runtime.ui._free(typePtr);
      }
      if (valueBytes.length > 0) {
        runtime.ui._free(valuePtr);
      }
    }
    function withUiGradientData(offsets, colors, callback) {
      const offsetBytes = new Uint8Array(offsets.buffer);
      const offsetPtr = offsetBytes.length > 0 ? runtime.ui._malloc(offsetBytes.length) : zeroPointer(runtime);
      const offsetNumericPtr = offsetBytes.length > 0 ? toNumberHandle(offsetPtr) : 0;
      if (offsetBytes.length > 0) {
        runtime.ui.HEAPU8.set(offsetBytes, offsetNumericPtr);
      }
      const colorBytes = new Uint8Array(colors.buffer);
      const colorPtr = colorBytes.length > 0 ? runtime.ui._malloc(colorBytes.length) : zeroPointer(runtime);
      const colorNumericPtr = colorBytes.length > 0 ? toNumberHandle(colorPtr) : 0;
      if (colorBytes.length > 0) {
        runtime.ui.HEAPU8.set(colorBytes, colorNumericPtr);
      }
      callback(normalizePointer(runtime, offsetPtr), normalizePointer(runtime, colorPtr));
      if (colorBytes.length > 0) {
        runtime.ui._free(colorPtr);
      }
      if (offsetBytes.length > 0) {
        runtime.ui._free(offsetPtr);
      }
    }
    function addUiPointer(ptr, byteOffset) {
      if (runtime.ui.usesMemory64 === true) {
        return toBigIntHandle(ptr) + BigInt(byteOffset);
      }
      return toNumberHandle(ptr) + byteOffset;
    }
    function syncUiHostCapabilities() {
      const coarsePointerMode = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
      runtime.ui._ui_set_coarse_pointer_mode(coarsePointerMode ? 1 : 0);
    }
    const imports = {
      effindom_v2_ui: {
        ui_reset() {
          runtime.ui._ui_reset();
          syncUiHostCapabilities();
          resetUiState();
        },
        ui_create_node(type) {
          return toBigIntHandle(runtime.ui._ui_create_node(type));
        },
        ui_set_node_id(handle, ptr, len) {
          const text = readAppUtf8(ptr, len);
          withUiUtf8(text, (uiPtr, uiLen) => {
            runtime.ui._ui_set_node_id(toBigIntHandle(handle), uiPtr, uiLen);
          });
        },
        ui_delete_node(handle) {
          runtime.ui._ui_delete_node(toBigIntHandle(handle));
        },
        ui_set_semantic_role(handle, role) {
          runtime.ui._ui_set_semantic_role(toBigIntHandle(handle), role);
        },
        ui_set_semantic_label(handle, ptr, len) {
          const text = readAppUtf8(ptr, len);
          withUiUtf8(text, (uiPtr, uiLen) => {
            runtime.ui._ui_set_semantic_label(toBigIntHandle(handle), uiPtr, uiLen);
          });
        },
        ui_set_semantic_checked(handle, checkedState) {
          runtime.ui._ui_set_semantic_checked(toBigIntHandle(handle), checkedState);
        },
        ui_set_semantic_selected(handle, hasSelected, selected) {
          runtime.ui._ui_set_semantic_selected(toBigIntHandle(handle), hasSelected, selected);
        },
        ui_set_semantic_expanded(handle, hasExpanded, expanded) {
          runtime.ui._ui_set_semantic_expanded(toBigIntHandle(handle), hasExpanded, expanded);
        },
        ui_set_semantic_disabled(handle, hasDisabled, disabled) {
          runtime.ui._ui_set_semantic_disabled(toBigIntHandle(handle), hasDisabled, disabled);
        },
        ui_set_semantic_value_range(handle, hasValueRange, valueNow, valueMin, valueMax) {
          runtime.ui._ui_set_semantic_value_range(toBigIntHandle(handle), hasValueRange, valueNow, valueMin, valueMax);
        },
        ui_set_semantic_orientation(handle, orientation) {
          runtime.ui._ui_set_semantic_orientation(toBigIntHandle(handle), orientation);
        },
        ui_push_semantic_scope(handle) {
          return runtime.ui._ui_push_semantic_scope(toBigIntHandle(handle));
        },
        ui_remove_semantic_scope(token) {
          runtime.ui._ui_remove_semantic_scope(token);
        },
        ui_node_add_child(parent, child) {
          runtime.ui._ui_node_add_child(toBigIntHandle(parent), toBigIntHandle(child));
        },
        ui_node_remove_child(parent, child) {
          runtime.ui._ui_node_remove_child(toBigIntHandle(parent), toBigIntHandle(child));
        },
        ui_set_is_portal(handle, flag) {
          runtime.ui._ui_set_is_portal(toBigIntHandle(handle), flag);
        },
        ui_set_root(handle) {
          const rootHandle = toBigIntHandle(handle);
          latestRootHandle = rootHandle.toString();
          runtime.ui._ui_set_root(rootHandle);
          updateState();
        },
        ui_set_width(handle, value, unit) {
          runtime.ui._ui_set_width(toBigIntHandle(handle), value, unit);
        },
        ui_set_height(handle, value, unit) {
          runtime.ui._ui_set_height(toBigIntHandle(handle), value, unit);
        },
        ui_set_flex_direction(handle, direction) {
          runtime.ui._ui_set_flex_direction(toBigIntHandle(handle), direction);
        },
        ui_set_flex_grow(handle, grow) {
          runtime.ui._ui_set_flex_grow(toBigIntHandle(handle), grow);
        },
        ui_set_justify_content(handle, justify) {
          runtime.ui._ui_set_justify_content(toBigIntHandle(handle), justify);
        },
        ui_set_align_items(handle, align) {
          runtime.ui._ui_set_align_items(toBigIntHandle(handle), align);
        },
        ui_set_padding(handle, left, top, right, bottom) {
          runtime.ui._ui_set_padding(toBigIntHandle(handle), left, top, right, bottom);
        },
        ui_set_position_type(handle, positionType) {
          runtime.ui._ui_set_position_type(toBigIntHandle(handle), positionType);
        },
        ui_set_position(handle, left, top, right, bottom) {
          runtime.ui._ui_set_position(toBigIntHandle(handle), left, top, right, bottom);
        },
        ui_grid_set_columns(handle, count, valuesPtr, typesPtr) {
          withUiGridData(readAppFloats(valuesPtr, count), readAppBytes(typesPtr, count), (uiValuesPtr, uiTypesPtr) => {
            runtime.ui._ui_grid_set_columns(toBigIntHandle(handle), count, uiValuesPtr, uiTypesPtr);
          });
        },
        ui_grid_set_rows(handle, count, valuesPtr, typesPtr) {
          withUiGridData(readAppFloats(valuesPtr, count), readAppBytes(typesPtr, count), (uiValuesPtr, uiTypesPtr) => {
            runtime.ui._ui_grid_set_rows(toBigIntHandle(handle), count, uiValuesPtr, uiTypesPtr);
          });
        },
        ui_node_set_grid_placement(handle, row, col, rowSpan, colSpan) {
          runtime.ui._ui_node_set_grid_placement(toBigIntHandle(handle), row, col, rowSpan, colSpan);
        },
        ui_set_bg_color(handle, color) {
          runtime.ui._ui_set_bg_color(toBigIntHandle(handle), color);
        },
        ui_set_box_style(handle, bgColor, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius, borderWidth, borderColor, borderStyle, borderDashOn, borderDashOff) {
          runtime.ui._ui_set_box_style(
            toBigIntHandle(handle),
            bgColor,
            topLeftRadius,
            topRightRadius,
            bottomRightRadius,
            bottomLeftRadius,
            borderWidth,
            borderColor,
            borderStyle,
            borderDashOn,
            borderDashOff
          );
        },
        ui_set_layer_effect(handle, opacity, blurSigma, blendMode) {
          runtime.ui._ui_set_layer_effect(toBigIntHandle(handle), opacity, blurSigma, blendMode);
        },
        ui_set_drop_shadow(handle, color, offsetX, offsetY, blurSigma, spread) {
          runtime.ui._ui_set_drop_shadow(toBigIntHandle(handle), color, offsetX, offsetY, blurSigma, spread);
        },
        ui_set_backdrop_blur(handle, blurSigma) {
          runtime.ui._ui_set_backdrop_blur(toBigIntHandle(handle), blurSigma);
        },
        ui_set_linear_gradient(handle, startX, startY, endX, endY, stopCount) {
          pendingGradients.set(toBigIntHandle(handle).toString(), {
            startX,
            startY,
            endX,
            endY,
            stopCount,
            offsets: [],
            colors: []
          });
        },
        ui_push_linear_gradient_stop(handle, offset, color) {
          const key = toBigIntHandle(handle).toString();
          const pending = pendingGradients.get(key);
          if (pending === void 0) {
            throw new Error("Gradient stop received before gradient header.");
          }
          pending.offsets.push(offset);
          pending.colors.push(color >>> 0);
          if (pending.offsets.length !== pending.stopCount) {
            return;
          }
          pendingGradients.delete(key);
          withUiGradientData(
            Float32Array.from(pending.offsets),
            Uint32Array.from(pending.colors),
            (uiOffsetsPtr, uiColorsPtr) => {
              runtime.ui._ui_set_linear_gradient(
                toBigIntHandle(handle),
                pending.startX,
                pending.startY,
                pending.endX,
                pending.endY,
                pending.stopCount,
                uiOffsetsPtr,
                uiColorsPtr
              );
            }
          );
        },
        ui_set_clip_to_bounds(handle, clip) {
          runtime.ui._ui_set_clip_to_bounds(toBigIntHandle(handle), clip);
        },
        ui_set_interactive(handle, flag) {
          runtime.ui._ui_set_interactive(toBigIntHandle(handle), flag);
        },
        ui_set_scroll_proxy_target(handle, scrollHandle) {
          runtime.ui._ui_set_scroll_proxy_target(toBigIntHandle(handle), toBigIntHandle(scrollHandle));
        },
        ui_set_scroll_enabled(handle, enabledX, enabledY) {
          runtime.ui._ui_set_scroll_enabled(toBigIntHandle(handle), enabledX, enabledY);
        },
        ui_set_show_scrollbars(handle, showScrollbars) {
          runtime.ui._ui_set_show_scrollbars(toBigIntHandle(handle), showScrollbars);
        },
        ui_set_scroll_friction(handle, friction) {
          runtime.ui._ui_set_scroll_friction(toBigIntHandle(handle), friction);
        },
        ui_set_focusable(handle, flag, tabIndex) {
          runtime.ui._ui_set_focusable(toBigIntHandle(handle), flag, tabIndex);
        },
        ui_request_focus(handle) {
          runtime.ui._ui_request_focus(toBigIntHandle(handle));
        },
        ui_set_font(handle, fontId, size) {
          runtime.ui._ui_set_font(toBigIntHandle(handle), fontId, size);
        },
        ui_register_font_fallback(fontId, fallbackFontId) {
          runtime.ui._ui_register_font_fallback(fontId, fallbackFontId);
        },
        ui_set_text_color(handle, color) {
          runtime.ui._ui_set_text_color(toBigIntHandle(handle), color);
        },
        ui_set_text_align(handle, align) {
          runtime.ui._ui_set_text_align(toBigIntHandle(handle), align);
        },
        ui_set_text_vertical_align(handle, align) {
          runtime.ui._ui_set_text_vertical_align(toBigIntHandle(handle), align);
        },
        ui_set_text_limits(handle, maxChars, maxLines) {
          runtime.ui._ui_set_text_limits(toBigIntHandle(handle), maxChars, maxLines);
        },
        ui_set_text_overflow(handle, overflow) {
          runtime.ui._ui_set_text_overflow(toBigIntHandle(handle), overflow);
        },
        ui_set_text_obscured(handle, obscured) {
          runtime.ui._ui_set_text_obscured(toBigIntHandle(handle), obscured);
        },
        ui_set_selectable(handle, selectable, selectionColor) {
          runtime.ui._ui_set_selectable(toBigIntHandle(handle), selectable, selectionColor);
        },
        ui_set_selection_area(handle, isArea) {
          runtime.ui._ui_set_selection_area(toBigIntHandle(handle), isArea);
        },
        ui_set_selection_area_barrier(handle, isBarrier) {
          runtime.ui._ui_set_selection_area_barrier(toBigIntHandle(handle), isBarrier);
        },
        ui_clear_selection(handle) {
          runtime.ui._ui_clear_selection(toBigIntHandle(handle));
        },
        ui_retarget_selection(fromHandle, toHandle) {
          runtime.ui._ui_retarget_selection(toBigIntHandle(fromHandle), toBigIntHandle(toHandle));
        },
        ui_is_point_in_selection(x, y) {
          return runtime.ui._ui_is_point_in_selection(x, y);
        },
        ui_clear_current_selection() {
          runtime.ui._ui_clear_current_selection();
        },
        ui_copy_current_selection() {
          runtime.ui._ui_copy_current_selection();
        },
        ui_set_scroll_offset(handle, x, y) {
          runtime.ui._ui_set_scroll_offset(toBigIntHandle(handle), x, y);
        },
        ui_get_bounds(handle, outX, outY, outWidth, outHeight) {
          const appMemory = getCurrentMemory();
          const boundsPtr = runtime.ui._malloc(16);
          const boundsOffset = toNumberHandle(boundsPtr);
          runtime.ui.refreshHeapViews?.();
          try {
            const found = runtime.ui._ui_get_bounds(
              toBigIntHandle(handle),
              normalizePointer(runtime, boundsPtr),
              addUiPointer(boundsPtr, 4),
              addUiPointer(boundsPtr, 8),
              addUiPointer(boundsPtr, 12)
            );
            if (found === 0) {
              return 0;
            }
            runtime.ui.refreshHeapViews?.();
            const uiView = new DataView(runtime.ui.HEAPU8.buffer);
            const appView = new DataView(appMemory.buffer);
            appView.setFloat32(outX, uiView.getFloat32(boundsOffset, true), true);
            appView.setFloat32(outY, uiView.getFloat32(boundsOffset + 4, true), true);
            appView.setFloat32(outWidth, uiView.getFloat32(boundsOffset + 8, true), true);
            appView.setFloat32(outHeight, uiView.getFloat32(boundsOffset + 12, true), true);
            return 1;
          } finally {
            runtime.ui._free(boundsPtr);
          }
        },
        ui_set_text(handle, ptr, len) {
          const text = readAppUtf8(ptr, len);
          withUiUtf8(text, (uiPtr, uiLen) => {
            runtime.ui._ui_set_text(toBigIntHandle(handle), uiPtr, uiLen);
          });
        },
        ui_commit_frame() {
          runtime.commitFrame();
          queueHarnessFrame();
        },
        ui_resize_window(width, height) {
          runtime.ui._ui_resize_window(width, height);
        }
      },
      fui_host: {
        request_render() {
          appFlushRequested = true;
          runtime.requestFrame();
          queueHarnessFrame();
        },
        get_viewport_width() {
          const sizeSource = getCanvasSizeSource(runtime.canvas);
          const rect = sizeSource.getBoundingClientRect();
          return sizeSource.clientWidth > 0 ? sizeSource.clientWidth : rect.width > 0 ? rect.width : runtime.canvas.width;
        },
        get_viewport_height() {
          const sizeSource = getCanvasSizeSource(runtime.canvas);
          const rect = sizeSource.getBoundingClientRect();
          return sizeSource.clientHeight > 0 ? sizeSource.clientHeight : rect.height > 0 ? rect.height : runtime.canvas.height;
        },
        fui_set_pointer_capture(handle) {
          runtime.setCapturedPointerHandle(toBigIntHandle(handle));
        },
        fui_release_pointer_capture() {
          runtime.setCapturedPointerHandle(null);
        },
        fui_reload_page() {
          window.location.reload();
        },
        fui_can_navigate_back() {
          return canBrowserNavigateBack() ? 1 : 0;
        },
        fui_can_navigate_forward() {
          return canBrowserNavigateForward() ? 1 : 0;
        },
        fui_navigate_back() {
          navigateBrowserBack();
        },
        fui_navigate_forward() {
          navigateBrowserForward();
        },
        fui_copy_text(ptr, len) {
          const text = readAppUtf8(ptr, len);
          window.__effindomCallbacks?.onClipboardWrite?.(text);
        },
        fui_set_cursor(style) {
          if (detectCoarsePointer()) {
            return;
          }
          const cursor = style === 1 ? "pointer" : style === 2 ? "text" : style === 3 ? "move" : style === 4 ? "grab" : style === 5 ? "grabbing" : style === 6 ? "ns-resize" : style === 7 ? "ew-resize" : "default";
          runtime.canvas.style.cursor = cursor;
        },
        fui_is_dark_mode() {
          return window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0;
        },
        fui_get_accent_color() {
          return readHostAccentColor();
        },
        fui_get_platform_family() {
          return detectPlatformFamily();
        },
        fui_is_coarse_pointer() {
          return detectCoarsePointer() ? 1 : 0;
        },
        fui_show_url_preview(ptr, len) {
          const rawTarget = readAppUtf8(ptr, len);
          const resolvedTarget = tryResolveNavigationTarget(rawTarget);
          setUrlPreviewText(resolvedTarget === null ? rawTarget : resolvedTarget.href);
        },
        fui_hide_url_preview() {
          setUrlPreviewText("");
        },
        fui_navigate_to(ptr, len, openInNewTab) {
          navigateWithinDocument(readAppUtf8(ptr, len), openInNewTab !== 0);
        },
        fui_log(catPtr, catLen, msgPtr, msgLen) {
          if (!debugLogsEnabled || currentSession === null) {
            return;
          }
          const category = readAppUtf8(catPtr, catLen);
          const message = readAppUtf8(msgPtr, msgLen);
          console.debug(`[fui:${category}] ${message}`);
        },
        fui_logs_enabled() {
          return debugLogsEnabled ? 1 : 0;
        }
      }
    };
    const callbacks = window.__effindomCallbacks ?? {};
    const previousPointerCallback = callbacks.onPointerEventWithCoords;
    callbacks.onPointerEventWithCoords = (type, handle, x, y, modifiers) => {
      previousPointerCallback?.(type, handle, x, y, modifiers);
      currentSession?.exports.__fui_on_pointer_event?.(type, toBigIntHandle(handle), x, y, modifiers ?? 0);
    };
    const previousContextMenu = callbacks.onContextMenu;
    callbacks.onContextMenu = (handle, x, y) => {
      previousContextMenu?.(handle, x, y);
      currentSession?.exports.__fui_on_context_menu?.(toBigIntHandle(handle), x, y);
    };
    const previousFocusChanged = callbacks.onFocusChanged;
    callbacks.onFocusChanged = (handle, isFocused) => {
      previousFocusChanged?.(handle, isFocused);
      currentSession?.exports.__fui_on_focus_changed?.(toBigIntHandle(handle), isFocused);
    };
    const previousCrossSelectionChanged = callbacks.onCrossSelectionChanged;
    callbacks.onCrossSelectionChanged = (handle, text) => {
      previousCrossSelectionChanged?.(handle, text);
      const session = currentSession;
      if (session === null || session.textBufferPtr === 0 || session.textBufferSize === 0 || typeof session.exports.__fui_on_cross_selection_changed !== "function") {
        return;
      }
      const encoded = encoder.encode(text);
      const length = Math.min(encoded.length, session.textBufferSize);
      if (length > 0) {
        const memory = new Uint8Array(session.memory.buffer, session.textBufferPtr, length);
        memory.set(encoded.subarray(0, length));
      }
      session.exports.__fui_on_cross_selection_changed(toBigIntHandle(handle), session.textBufferPtr, length);
    };
    const previousKeyEvent = callbacks.onKeyEventWithKey;
    callbacks.onKeyEventWithKey = (type, key, modifiers) => {
      previousKeyEvent?.(type, key, modifiers);
      const session = currentSession;
      if (session === null || session.keyBufferPtr === 0 || typeof session.exports.__fui_on_key_event !== "function") {
        return;
      }
      const encoded = encoder.encode(key);
      if (encoded.length > 256) {
        return;
      }
      const memory = new Uint8Array(session.memory.buffer, session.keyBufferPtr, encoded.length);
      memory.set(encoded);
      session.exports.__fui_on_key_event(type, session.keyBufferPtr, encoded.length, modifiers);
    };
    const previousScroll = callbacks.onScroll;
    callbacks.onScroll = (handle, offsetX, offsetY, contentWidth, contentHeight, viewportWidth, viewportHeight) => {
      previousScroll?.(handle, offsetX, offsetY, contentWidth, contentHeight, viewportWidth, viewportHeight);
      currentSession?.exports.__fui_on_scroll?.(
        toBigIntHandle(handle),
        offsetX,
        offsetY,
        contentWidth,
        contentHeight,
        viewportWidth,
        viewportHeight
      );
    };
    window.__effindomCallbacks = callbacks;
    const handleViewportChange = () => {
      notifyViewport();
    };
    window.addEventListener("resize", handleViewportChange);
    const handleDarkModeChange = (event) => {
      notifySystemTheme(currentSession, event.matches);
    };
    darkModeQuery.addEventListener("change", handleDarkModeChange);
    const handlePopState = () => {
      const target = new URL(window.location.href);
      syncManagedHistoryPop(target);
      handleSameOriginNavigation(target, "pop");
    };
    window.addEventListener("popstate", handlePopState);
    const dismissTransientUi = () => {
      currentSession?.exports.__fui_hide_active_context_menu?.();
      runtime.clearPointerHover();
      setUrlPreviewText("");
    };
    const handleWindowBlur = () => {
      dismissTransientUi();
    };
    const handleCanvasBlur = () => {
      dismissTransientUi();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        dismissTransientUi();
      }
    };
    window.addEventListener("blur", handleWindowBlur);
    runtime.canvas.addEventListener("blur", handleCanvasBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    cleanup = () => {
      setUrlPreviewText("");
      window.removeEventListener("resize", handleViewportChange);
      darkModeQuery.removeEventListener("change", handleDarkModeChange);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("blur", handleWindowBlur);
      runtime.canvas.removeEventListener("blur", handleCanvasBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      delete window.__fui_debug;
    };
    const debugApi = {
      async flush() {
        await flushDebugInteraction(getCurrentSession());
      },
      async pointerEvent(type, handle, x, y, modifiers = 0) {
        const session = getCurrentSession();
        if (typeof session.exports.__fui_debug_pointer_event !== "function") {
          throw new Error("Debug pointer events are not available for this app.");
        }
        session.exports.__fui_debug_pointer_event?.(type, toBigIntHandle(handle), x, y, modifiers);
        await flushDebugInteraction(session);
      },
      async focusChanged(handle, focused) {
        const session = getCurrentSession();
        if (typeof session.exports.__fui_debug_focus_changed !== "function") {
          throw new Error("Debug focus changes are not available for this app.");
        }
        session.exports.__fui_debug_focus_changed?.(toBigIntHandle(handle), focused);
        await flushDebugInteraction(session);
      },
      async keyEvent(type, key, modifiers = 0) {
        const session = getCurrentSession();
        if (session.keyBufferPtr === 0 || typeof session.exports.__fui_debug_key_event !== "function") {
          throw new Error("Debug key events are not available for this app.");
        }
        const encoded = encoder.encode(key);
        if (encoded.length > 256) {
          throw new Error("Debug key event exceeds the shared AssemblyScript key buffer.");
        }
        const memory = new Uint8Array(session.memory.buffer, session.keyBufferPtr, encoded.length);
        memory.set(encoded);
        session.exports.__fui_debug_key_event(type, session.keyBufferPtr, encoded.length, modifiers);
        await flushDebugInteraction(session);
      },
      async scroll(handle, offsetX, offsetY, contentWidth, contentHeight, viewportWidth, viewportHeight) {
        const session = getCurrentSession();
        if (typeof session.exports.__fui_debug_scroll !== "function") {
          throw new Error("Debug scroll events are not available for this app.");
        }
        session.exports.__fui_debug_scroll?.(
          toBigIntHandle(handle),
          offsetX,
          offsetY,
          contentWidth,
          contentHeight,
          viewportWidth,
          viewportHeight
        );
        await flushDebugInteraction(session);
      }
    };
    window.__fui_debug = debugApi;
    async function fetchWasmBytes(wasmPath) {
      const cached = wasmByteCache.get(wasmPath);
      if (cached !== void 0) {
        return cached;
      }
      const fetchPromise = fetch(wasmPath).then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load wasm app: ${wasmPath}`);
        }
        return response.arrayBuffer();
      });
      wasmByteCache.set(wasmPath, fetchPromise);
      return fetchPromise;
    }
    async function unloadApp() {
      const session = currentSession;
      if (session === null) {
        return;
      }
      session.onDispose?.(session.exports);
      currentSession = null;
      appFlushRequested = false;
      runtime.setAppFrameHandler(null, false);
      runtime.setCapturedPointerHandle(null);
      runtime.clearPointerHover();
      runtime.canvas.style.cursor = "default";
      setUrlPreviewText("");
      runtime.core._ed_clear_focus_state?.();
      runtime.core._ed_clear_text_input_state?.();
      runtime.core._ed_reset_scene();
      runtime.ui._ui_reset();
      syncUiHostCapabilities();
      resetUiState();
      runtime.commitFrame();
      queueHarnessFrame();
      runtime.flushPendingCommit();
      await waitForFrame();
    }
    async function loadApp(loadOptions) {
      setLoadingOverlay(
        "loading",
        "Winding up the tiny widget clockwork...",
        `Loading ${loadOptions.wasmPath}`
      );
      await unloadApp();
      const wasmBytes = await fetchWasmBytes(loadOptions.wasmPath);
      const module = await instantiate(wasmBytes, imports);
      const exports = module.exports;
      const keyBufferPtr = typeof exports.__fui_key_buffer === "function" ? exports.__fui_key_buffer() : 0;
      const textBufferPtr = typeof exports.__fui_text_buffer === "function" ? exports.__fui_text_buffer() : 0;
      const textBufferSize = textBufferPtr !== 0 && typeof exports.__fui_text_buffer_size === "function" ? exports.__fui_text_buffer_size() : 0;
      const session = {
        exports,
        memory: exports.memory,
        keyBufferPtr,
        textBufferPtr,
        textBufferSize,
        onStateUpdated: loadOptions.onStateUpdated,
        onDispose: loadOptions.onDispose === void 0 ? void 0 : (activeExports) => {
          loadOptions.onDispose?.(activeExports);
        }
      };
      currentSession = session;
      runtime.setAppFrameHandler(
        (timestampMs) => {
          if (currentSession !== session) {
            return;
          }
          exports.__fui_on_frame?.(timestampMs);
          if (appFlushRequested || typeof exports.__fui_on_frame === "function") {
            appFlushRequested = false;
            exports.__flushRenders?.();
          }
        },
        typeof exports.__fui_on_frame === "function"
      );
      runtime.resetLogs();
      loadOptions.run(exports);
      runtime.runAppFrameHandler(performance.now());
      notifyViewport(session);
      notifySystemTheme(session);
      notifyRouteForCurrentLocation(session);
      const context = {
        runtime,
        exports,
        waitForFrame
      };
      await loadOptions.onReady?.(context);
      runtime.clearPointerHover();
      runtime.flushPendingCommit();
      await waitForFrame();
      updateState();
      hideLoadingOverlay();
      return context;
    }
    const controller = {
      runtime,
      waitForFrame,
      loadApp,
      unloadApp,
      setSameOriginNavigationHandler(handler) {
        navigationHandler = handler;
      }
    };
    await options.onReady?.(controller);
  }).catch((error) => {
    cleanup();
    const message = error instanceof Error ? error.message : String(error);
    setLoadingOverlay(
      "error",
      "The render raccoons chewed through a cable.",
      message
    );
    options.onError?.(error);
    throw error;
  });
}

// browser/demo-harness.ts
function updateOutput(id, value) {
  const output = document.getElementById(id);
  if (output instanceof HTMLElement) {
    output.textContent = value;
  }
}
startHarness({
  wasmPath: "./demo.wasm?v=midnight-3",
  run(exports) {
    exports.__runDemoApp();
  },
  onStateUpdated(state) {
    window.__fuiAsState = state;
  },
  onReady: async (context) => {
    const app = context.exports;
    let tick = 0;
    const hueInput = document.getElementById("hue");
    const pulseButton = document.getElementById("pulse-hue");
    const themeButton = document.getElementById("toggle-theme-mode");
    const showNavLinks = new URLSearchParams(window.location.search).get("navlink-preview") === "1";
    const callbacks = window.__effindomCallbacks ?? {};
    const previousCrossSelectionChanged = callbacks.onCrossSelectionChanged;
    callbacks.onCrossSelectionChanged = (handle, text) => {
      previousCrossSelectionChanged?.(handle, text);
      window.__fuiDemoSelectionText = text;
    };
    window.__effindomCallbacks = callbacks;
    const applyHue = (value) => {
      app.__setDemoHue?.(value);
      updateOutput("hue-value", `${String(value)} deg`);
    };
    let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const updateThemeControls = () => {
      document.documentElement.dataset.demoTheme = darkMode ? "dark" : "light";
      document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
      updateOutput("theme-mode-value", darkMode ? "Dark" : "Light");
      if (themeButton instanceof HTMLButtonElement) {
        themeButton.textContent = darkMode ? "Switch to light mode" : "Switch to dark mode";
      }
    };
    const applyThemeMode = (nextDarkMode) => {
      darkMode = nextDarkMode;
      app.__setDemoDarkMode?.(darkMode);
      updateThemeControls();
    };
    applyHue(210);
    applyThemeMode(darkMode);
    app.__setDemoShowNavLinks?.(showNavLinks);
    window.__toggleDemoFoundationsScope = () => {
      app.__toggleDemoFoundationsScope?.();
    };
    window.__activateDemoFoundationsScopedAction = () => {
      app.__activateDemoFoundationsScopedAction?.();
    };
    window.__focusDemoFoundationsScopedAction = () => {
      app.__focusDemoFoundationsScopedAction?.();
    };
    await context.waitForFrame();
    await context.waitForFrame();
    await context.waitForFrame();
    if (hueInput !== null) {
      hueInput.value = "210";
      hueInput.addEventListener("input", () => {
        applyHue(Number(hueInput.value));
      });
    }
    if (pulseButton instanceof HTMLElement) {
      pulseButton.addEventListener("click", () => {
        const nextHue = (tick * 47 + 120) % 360;
        if (hueInput !== null) {
          hueInput.value = String(nextHue);
        }
        applyHue(nextHue);
      });
    }
    if (themeButton instanceof HTMLElement) {
      themeButton.addEventListener("click", () => {
        applyThemeMode(!darkMode);
      });
    }
    window.setInterval(() => {
      tick += 1;
      app.__setDemoClockTick?.(tick);
      updateOutput("tick-value", `${String(tick)} s`);
    }, 1e3);
    updateOutput("tick-value", "0 s");
    updateThemeControls();
    window.__fuiDemoSelectionText = "";
    window.__fuiAsReady = true;
    delete window.__fuiAsError;
  },
  onError(error) {
    window.__fuiAsError = error instanceof Error ? error.message : String(error);
  }
});
//# sourceMappingURL=harness.js.map

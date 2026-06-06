import * as __import0 from "fui_worker_host";
import * as __import1 from "fui_host_service";
async function instantiate(module, imports = {}) {
  const __module0 = imports.fui_worker_host;
  const __module1 = imports.fui_host_service;
  const adaptedImports = {
    env: Object.setPrototypeOf({
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
    }, Object.assign(Object.create(globalThis), imports.env || {})),
    fui_worker_host: Object.setPrototypeOf({
      fui_worker_is_cancelled() {
        // ~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_is_cancelled() => bool
        return __module0.fui_worker_is_cancelled() ? 1 : 0;
      },
      fui_worker_fail(ptr, len) {
        // ~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_fail(usize, u32) => void
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module0.fui_worker_fail(ptr, len);
      },
      fui_worker_report_progress(ptr, len) {
        // ~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_report_progress(usize, u32) => void
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module0.fui_worker_report_progress(ptr, len);
      },
      fui_worker_complete_string(ptr, len) {
        // ~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_complete_string(usize, u32) => void
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module0.fui_worker_complete_string(ptr, len);
      },
      fui_file_worker_write_chunk(ptr, len) {
        // ~lib/@effindomv2/fui-as/src/worker/ffi/fui_file_worker_write_chunk(usize, i32) => void
        ptr = ptr >>> 0;
        __module0.fui_file_worker_write_chunk(ptr, len);
      },
      fui_worker_copy_input(ptr, capacity) {
        // ~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_copy_input(usize, u32) => u32
        ptr = ptr >>> 0;
        capacity = capacity >>> 0;
        return __module0.fui_worker_copy_input(ptr, capacity);
      },
    }, __module0),
    fui_host_service: __module1,
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    __fui_on_fetch_complete(requestId, ok, status, payloadPtr, payloadLen) {
      // ~lib/@effindomv2/fui-as/src/worker/Worker/__fui_on_fetch_complete(u32, bool, i32, usize, u32) => void
      ok = ok ? 1 : 0;
      exports.__fui_on_fetch_complete(requestId, ok, status, payloadPtr, payloadLen);
    },
    __fui_worker_text_buffer() {
      // ~lib/@effindomv2/fui-as/src/worker/Worker/__fui_worker_text_buffer() => usize
      return exports.__fui_worker_text_buffer() >>> 0;
    },
    __fui_worker_text_buffer_size() {
      // ~lib/@effindomv2/fui-as/src/worker/Worker/__fui_worker_text_buffer_size() => u32
      return exports.__fui_worker_text_buffer_size() >>> 0;
    },
  }, exports);
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  return adaptedExports;
}
export const {
  memory,
  __new,
  __pin,
  __unpin,
  __collect,
  __rtti_base,
  largestPrimeCalculatorWorker,
  fileProcessorWorker,
  __fui_on_fetch_complete,
  __fui_on_fetch_error,
  __fui_worker_text_buffer,
  __fui_worker_text_buffer_size,
} = await (async url => instantiate(
  await (async () => {
    const isNodeOrBun = typeof process != "undefined" && process.versions != null && (process.versions.node != null || process.versions.bun != null);
    if (isNodeOrBun) { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
    else { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
  })(), {
    fui_worker_host: __maybeDefault(__import0),
    fui_host_service: __maybeDefault(__import1),
  }
))(new URL("advanced-workers.wasm", import.meta.url));
function __maybeDefault(module) {
  return typeof module.default === "object" && Object.keys(module).length == 1
    ? module.default
    : module;
}

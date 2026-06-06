/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * src/workers/advanced_workers/largestPrimeCalculatorWorker
 */
export declare function largestPrimeCalculatorWorker(): void;
/**
 * src/workers/advanced_workers/fileProcessorWorker
 */
export declare function fileProcessorWorker(): void;
/**
 * ~lib/@effindomv2/fui-as/src/worker/Worker/__fui_on_fetch_complete
 * @param requestId `u32`
 * @param ok `bool`
 * @param status `i32`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_fetch_complete(requestId: number, ok: boolean, status: number, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/worker/Worker/__fui_on_fetch_error
 * @param requestId `u32`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_fetch_error(requestId: number, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/worker/Worker/__fui_worker_text_buffer
 * @returns `usize`
 */
export declare function __fui_worker_text_buffer(): number;
/**
 * ~lib/@effindomv2/fui-as/src/worker/Worker/__fui_worker_text_buffer_size
 * @returns `u32`
 */
export declare function __fui_worker_text_buffer_size(): number;

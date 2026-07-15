/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * src/routes/AdvancedApp/__runApp
 */
export declare function __runApp(): void;
/**
 * src/routes/AdvancedApp/__disposeApp
 */
export declare function __disposeApp(): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/Application/__disposeApp
 */
export declare function __disposeApp(): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/Application/__fui_capture_persisted_ui_state
 */
export declare function __fui_capture_persisted_ui_state(): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/Application/__fui_restore_persisted_ui_state
 */
export declare function __fui_restore_persisted_ui_state(): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/Application/__flushRenders
 */
export declare function __flushRenders(): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/Application/__runApp
 */
export declare function __runApp(): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_external_drag_event
 * @param eventType `u32`
 * @param handle `u64`
 * @param x `f32`
 * @param y `f32`
 * @param modifiers `u32`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 * @returns `u32`
 */
export declare function __fui_on_external_drag_event(eventType: number, handle: bigint, x: number, y: number, modifiers: number, payloadPtr: number, payloadLen: number): number;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_can_show_context_menu
 * @param handle `u64`
 * @returns `bool`
 */
export declare function __fui_can_show_context_menu(handle: bigint): boolean;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_fetch_complete
 * @param requestId `u32`
 * @param ok `bool`
 * @param status `i32`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_fetch_complete(requestId: number, ok: boolean, status: number, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_fetch_error
 * @param requestId `u32`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_fetch_error(requestId: number, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_finish_result
 * @param requestId `u32`
 * @param status `u32`
 * @param writtenBytes `u64`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_file_finish_result(requestId: number, status: number, writtenBytes: bigint, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_pick_result
 * @param requestId `u32`
 * @param status `u32`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_file_pick_result(requestId: number, status: number, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_read_result
 * @param requestId `u32`
 * @param status `u32`
 * @param offsetBytes `u64`
 * @param fileSizeBytes `u64`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_file_read_result(requestId: number, status: number, offsetBytes: bigint, fileSizeBytes: bigint, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_save_result
 * @param requestId `u32`
 * @param status `u32`
 * @param writtenBytes `u64`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_file_save_result(requestId: number, status: number, writtenBytes: bigint, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_worker_process_chunk
 * @param requestId `u32`
 * @param offsetBytes `u64`
 * @param fileSizeBytes `u64`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_file_worker_process_chunk(requestId: number, offsetBytes: bigint, fileSizeBytes: bigint, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_worker_process_complete
 * @param requestId `u32`
 * @param processedBytes `u64`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_file_worker_process_complete(requestId: number, processedBytes: bigint, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_worker_process_error
 * @param requestId `u32`
 * @param status `u32`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_file_worker_process_error(requestId: number, status: number, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_worker_process_progress
 * @param requestId `u32`
 * @param processedBytes `u64`
 * @param totalBytes `u64`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_file_worker_process_progress(requestId: number, processedBytes: bigint, totalBytes: bigint, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_write_result
 * @param requestId `u32`
 * @param status `u32`
 * @param writtenBytes `u64`
 * @param totalWrittenBytes `u64`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_file_write_result(requestId: number, status: number, writtenBytes: bigint, totalWrittenBytes: bigint, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_writer_created
 * @param requestId `u32`
 * @param status `u32`
 * @param payloadPtr `usize`
 * @param payloadLen `u32`
 */
export declare function __fui_on_file_writer_created(requestId: number, status: number, payloadPtr: number, payloadLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_hide_active_context_menu
 */
export declare function __fui_hide_active_context_menu(): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_key_buffer
 * @returns `usize`
 */
export declare function __fui_key_buffer(): number;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_context_menu
 * @param handle `u64`
 * @param x `f32`
 * @param y `f32`
 */
export declare function __fui_on_context_menu(handle: bigint, x: number, y: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_cross_selection_changed
 * @param handle `u64`
 * @param textPtr `usize`
 * @param textLen `u32`
 */
export declare function __fui_on_cross_selection_changed(handle: bigint, textPtr: number, textLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_focus_changed
 * @param handle `u64`
 * @param focused `bool`
 */
export declare function __fui_on_focus_changed(handle: bigint, focused: boolean): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_frame
 * @param timestampMs `f64`
 */
export declare function __fui_on_frame(timestampMs: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_get_gesture_intent
 * @param handle `u64`
 * @returns `u32`
 */
export declare function __fui_get_gesture_intent(handle: bigint): number;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_get_long_press_minimum_duration_ms
 * @param handle `u64`
 * @returns `i32`
 */
export declare function __fui_get_long_press_minimum_duration_ms(handle: bigint): number;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_get_long_press_movement_tolerance
 * @param handle `u64`
 * @returns `f32`
 */
export declare function __fui_get_long_press_movement_tolerance(handle: bigint): number;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_gesture_event
 * @param handle `u64`
 * @param phase `u32`
 * @param kind `u32`
 * @param x `f32`
 * @param y `f32`
 * @param deltaX `f32`
 * @param deltaY `f32`
 * @param scale `f32`
 * @param pointerCount `i32`
 * @returns `bool`
 */
export declare function __fui_on_gesture_event(handle: bigint, phase: number, kind: number, x: number, y: number, deltaX: number, deltaY: number, scale: number, pointerCount: number): boolean;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_long_press_event
 * @param handle `u64`
 * @param x `f32`
 * @param y `f32`
 * @param pointerId `i32`
 * @param pointerType `u32`
 * @param modifiers `u32`
 * @param durationMs `i32`
 * @returns `bool`
 */
export declare function __fui_on_long_press_event(handle: bigint, x: number, y: number, pointerId: number, pointerType: number, modifiers: number, durationMs: number): boolean;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_key_event
 * @param eventType `u32`
 * @param keyPtr `usize`
 * @param keyLen `u32`
 * @param modifiers `u32`
 * @returns `bool`
 */
export declare function __fui_on_key_event(eventType: number, keyPtr: number, keyLen: number, modifiers: number): boolean;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_pointer_event_with_metadata
 * @param eventType `u32`
 * @param handle `u64`
 * @param x `f32`
 * @param y `f32`
 * @param modifiers `u32`
 * @param pointerId `i32`
 * @param pointerType `u32`
 * @param button `i32`
 * @param buttons `u32`
 * @param pressure `f32`
 * @param width `f32`
 * @param height `f32`
 * @param clickCount `i32`
 * @returns `bool`
 */
export declare function __fui_on_pointer_event_with_metadata(eventType: number, handle: bigint, x: number, y: number, modifiers: number, pointerId: number, pointerType: number, button: number, buttons: number, pressure: number, width: number, height: number, clickCount: number): boolean;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_route_changed
 * @param routePtr `usize`
 * @param routeLen `u32`
 */
export declare function __fui_on_route_changed(routePtr: number, routeLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_scroll
 * @param handle `u64`
 * @param offsetX `f32`
 * @param offsetY `f32`
 * @param contentWidth `f32`
 * @param contentHeight `f32`
 * @param viewportWidth `f32`
 * @param viewportHeight `f32`
 */
export declare function __fui_on_scroll(handle: bigint, offsetX: number, offsetY: number, contentWidth: number, contentHeight: number, viewportWidth: number, viewportHeight: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_selection_changed
 * @param handle `u64`
 * @param start `u32`
 * @param end `u32`
 */
export declare function __fui_on_selection_changed(handle: bigint, start: number, end: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_system_accent_color_changed
 * @param color `u32`
 */
export declare function __fui_on_system_accent_color_changed(color: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_system_dark_mode_changed
 * @param isDark `bool`
 */
export declare function __fui_on_system_dark_mode_changed(isDark: boolean): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_text_changed
 * @param handle `u64`
 * @param textPtr `usize`
 * @param textLen `u32`
 */
export declare function __fui_on_text_changed(handle: bigint, textPtr: number, textLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_text_replaced
 * @param handle `u64`
 * @param start `u32`
 * @param end `u32`
 * @param textPtr `usize`
 * @param textLen `u32`
 */
export declare function __fui_on_text_replaced(handle: bigint, start: number, end: number, textPtr: number, textLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_timer
 * @param timerId `u32`
 */
export declare function __fui_on_timer(timerId: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_wheel_event
 * @param handle `u64`
 * @param x `f32`
 * @param y `f32`
 * @param deltaX `f32`
 * @param deltaY `f32`
 * @param deltaMode `u32`
 * @param modifiers `u32`
 * @returns `bool`
 */
export declare function __fui_on_wheel_event(handle: bigint, x: number, y: number, deltaX: number, deltaY: number, deltaMode: number, modifiers: number): boolean;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_resolve_gesture_owner
 * @param handle `u64`
 * @returns `u64`
 */
export declare function __fui_resolve_gesture_owner(handle: bigint): bigint;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_resolve_long_press_owner
 * @param handle `u64`
 * @returns `u64`
 */
export declare function __fui_resolve_long_press_owner(handle: bigint): bigint;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_font_loaded
 * @param fontId `u32`
 */
export declare function __fui_on_font_loaded(fontId: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_viewport_changed
 * @param w `f32`
 * @param h `f32`
 */
export declare function __fui_on_viewport_changed(w: number, h: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_worker_complete
 * @param workerId `u32`
 * @param textPtr `usize`
 * @param textLen `u32`
 */
export declare function __fui_on_worker_complete(workerId: number, textPtr: number, textLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_worker_error
 * @param workerId `u32`
 * @param textPtr `usize`
 * @param textLen `u32`
 */
export declare function __fui_on_worker_error(workerId: number, textPtr: number, textLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_worker_progress
 * @param workerId `u32`
 * @param textPtr `usize`
 * @param textLen `u32`
 */
export declare function __fui_on_worker_progress(workerId: number, textPtr: number, textLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_text_buffer
 * @returns `usize`
 */
export declare function __fui_text_buffer(): number;
/**
 * ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_text_buffer_size
 * @returns `u32`
 */
export declare function __fui_text_buffer_size(): number;
/**
 * ~lib/@effindomv2/fui-as/src/core/DebugApi/__fui_debug_focus_changed
 * @param handle `u64`
 * @param focused `bool`
 */
export declare function __fui_debug_focus_changed(handle: bigint, focused: boolean): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/DebugApi/__fui_debug_key_event
 * @param eventType `u32`
 * @param keyPtr `usize`
 * @param keyLen `u32`
 * @param modifiers `u32`
 */
export declare function __fui_debug_key_event(eventType: number, keyPtr: number, keyLen: number, modifiers: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/DebugApi/__fui_debug_pointer_event
 * @param eventType `u32`
 * @param handle `u64`
 * @param x `f32`
 * @param y `f32`
 * @param modifiers `u32`
 */
export declare function __fui_debug_pointer_event(eventType: number, handle: bigint, x: number, y: number, modifiers?: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/DebugApi/__fui_debug_scroll
 * @param handle `u64`
 * @param offsetX `f32`
 * @param offsetY `f32`
 * @param contentWidth `f32`
 * @param contentHeight `f32`
 * @param viewportWidth `f32`
 * @param viewportHeight `f32`
 */
export declare function __fui_debug_scroll(handle: bigint, offsetX: number, offsetY: number, contentWidth: number, contentHeight: number, viewportWidth: number, viewportHeight: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/Assets/__fui_on_svg_failed
 * @param svgId `u32`
 * @param errorPtr `usize`
 * @param errorLen `u32`
 */
export declare function __fui_on_svg_failed(svgId: number, errorPtr: number, errorLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/Assets/__fui_on_svg_loaded
 * @param svgId `u32`
 * @param width `f32`
 * @param height `f32`
 */
export declare function __fui_on_svg_loaded(svgId: number, width: number, height: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/Assets/__fui_on_texture_failed
 * @param textureId `u32`
 * @param errorPtr `usize`
 * @param errorLen `u32`
 */
export declare function __fui_on_texture_failed(textureId: number, errorPtr: number, errorLen: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/core/Assets/__fui_on_texture_loaded
 * @param textureId `u32`
 * @param width `f32`
 * @param height `f32`
 */
export declare function __fui_on_texture_loaded(textureId: number, width: number, height: number): void;
/**
 * ~lib/@effindomv2/fui-as/src/drawing/DrawCallback/fui_dispatch_custom_draw
 * @param handle `u64`
 * @param canvasPtr `usize`
 */
export declare function fui_dispatch_custom_draw(handle: bigint, canvasPtr: number): void;
/**
 * src/host/generated/HostEvents/onAppClockTick
 * @param callback `~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<i32> | null`
 */
export declare function onAppClockTick(callback: __Record232<undefined> | null): void;
/**
 * src/host/generated/HostEvents/clearAppClockTick
 */
export declare function clearAppClockTick(): void;
/**
 * src/host/generated/HostEvents/__fui_host_event_appClockTick
 * @param arg0 `i32`
 */
export declare function __fui_host_event_appClockTick(arg0: number): void;
/** ~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<i32> */
declare interface __Record232<TOmittable> {
}

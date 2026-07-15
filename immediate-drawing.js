import * as __import0 from "fui_host";
import * as __import1 from "effindom_v2_ui";
import * as __import2 from "fui_fetch_host";
async function instantiate(module, imports = {}) {
  const __module0 = imports.fui_host;
  const __module1 = imports.effindom_v2_ui;
  const __module2 = imports.fui_fetch_host;
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
    fui_host: Object.setPrototypeOf({
      fui_log(categoryPtr, catLen, msgPtr, msgLen) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_log(usize, u32, usize, u32) => void
        categoryPtr = categoryPtr >>> 0;
        catLen = catLen >>> 0;
        msgPtr = msgPtr >>> 0;
        msgLen = msgLen >>> 0;
        __module0.fui_log(categoryPtr, catLen, msgPtr, msgLen);
      },
      fui_is_coarse_pointer() {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_is_coarse_pointer() => bool
        return __module0.fui_is_coarse_pointer() ? 1 : 0;
      },
      fui_set_cursor(style) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_set_cursor(u32) => void
        style = style >>> 0;
        __module0.fui_set_cursor(style);
      },
      fui_logs_enabled() {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_logs_enabled() => bool
        return __module0.fui_logs_enabled() ? 1 : 0;
      },
      fui_try_get_persisted_scroll_offset(nodeIdPtr, nodeIdLen, outX, outY) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_try_get_persisted_scroll_offset(usize, u32, usize, usize) => bool
        nodeIdPtr = nodeIdPtr >>> 0;
        nodeIdLen = nodeIdLen >>> 0;
        outX = outX >>> 0;
        outY = outY >>> 0;
        return __module0.fui_try_get_persisted_scroll_offset(nodeIdPtr, nodeIdLen, outX, outY) ? 1 : 0;
      },
      fui_canvas_create_offscreen(width, height) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_canvas_create_offscreen(u32, u32) => u32
        width = width >>> 0;
        height = height >>> 0;
        return __module0.fui_canvas_create_offscreen(width, height);
      },
      fui_canvas_draw_batch(canvasPtr, wordsPtr, wordCount) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_canvas_draw_batch(usize, usize, u32) => void
        canvasPtr = canvasPtr >>> 0;
        wordsPtr = wordsPtr >>> 0;
        wordCount = wordCount >>> 0;
        __module0.fui_canvas_draw_batch(canvasPtr, wordsPtr, wordCount);
      },
      fui_canvas_read_offscreen_pixels(offscreenId, outPtr, width, height) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_canvas_read_offscreen_pixels(u32, usize, u32, u32) => void
        offscreenId = offscreenId >>> 0;
        outPtr = outPtr >>> 0;
        width = width >>> 0;
        height = height >>> 0;
        __module0.fui_canvas_read_offscreen_pixels(offscreenId, outPtr, width, height);
      },
      fui_bitmap_commit_dirty(textureId, bytesPtr, bytesLen, fullW, fullH, subX, subY, subW, subH) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_bitmap_commit_dirty(u32, usize, u32, u32, u32, u32, u32, u32, u32) => void
        textureId = textureId >>> 0;
        bytesPtr = bytesPtr >>> 0;
        bytesLen = bytesLen >>> 0;
        fullW = fullW >>> 0;
        fullH = fullH >>> 0;
        subX = subX >>> 0;
        subY = subY >>> 0;
        subW = subW >>> 0;
        subH = subH >>> 0;
        __module0.fui_bitmap_commit_dirty(textureId, bytesPtr, bytesLen, fullW, fullH, subX, subY, subW, subH);
      },
      fui_bitmap_commit(textureId, bytesPtr, bytesLen, width, height) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_bitmap_commit(u32, usize, u32, u32, u32) => void
        textureId = textureId >>> 0;
        bytesPtr = bytesPtr >>> 0;
        bytesLen = bytesLen >>> 0;
        width = width >>> 0;
        height = height >>> 0;
        __module0.fui_bitmap_commit(textureId, bytesPtr, bytesLen, width, height);
      },
      fui_cancel_timer(timerId) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_cancel_timer(u32) => void
        timerId = timerId >>> 0;
        __module0.fui_cancel_timer(timerId);
      },
      fui_start_timer(timerId, delayMs) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_start_timer(u32, i32) => void
        timerId = timerId >>> 0;
        __module0.fui_start_timer(timerId, delayMs);
      },
      fui_file_process_worker_cancel(requestId) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_file_process_worker_cancel(u32) => void
        requestId = requestId >>> 0;
        __module0.fui_file_process_worker_cancel(requestId);
      },
      fui_worker_cancel(workerId) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_worker_cancel(u32) => void
        workerId = workerId >>> 0;
        __module0.fui_worker_cancel(workerId);
      },
      fui_set_pointer_capture(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_set_pointer_capture(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module0.fui_set_pointer_capture(handle);
      },
      fui_has_text_selection_snapshot(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_has_text_selection_snapshot(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module0.fui_has_text_selection_snapshot(handle) ? 1 : 0;
      },
      fui_copy_text(ptr, len) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_copy_text(usize, u32) => void
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module0.fui_copy_text(ptr, len);
      },
      fui_commit_text_action_focus(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_commit_text_action_focus(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module0.fui_commit_text_action_focus(handle);
      },
      fui_copy_text_selection_snapshot(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_copy_text_selection_snapshot(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module0.fui_copy_text_selection_snapshot(handle) ? 1 : 0;
      },
      fui_cut_text_selection_snapshot(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_cut_text_selection_snapshot(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module0.fui_cut_text_selection_snapshot(handle) ? 1 : 0;
      },
      fui_delete_focused_text_range(start, end) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_delete_focused_text_range(u32, u32) => bool
        start = start >>> 0;
        end = end >>> 0;
        return __module0.fui_delete_focused_text_range(start, end) ? 1 : 0;
      },
      fui_cut_focused_text_selection() {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_cut_focused_text_selection() => bool
        return __module0.fui_cut_focused_text_selection() ? 1 : 0;
      },
      fui_navigate_to(ptr, len, openInNewTab) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_navigate_to(usize, u32, bool) => void
        ptr = ptr >>> 0;
        len = len >>> 0;
        openInNewTab = openInNewTab != 0;
        __module0.fui_navigate_to(ptr, len, openInNewTab);
      },
      fui_is_dark_mode() {
        // ~lib/@effindomv2/fui-as/src/core/generated/FrameworkHostServices/__host_fui_is_dark_mode() => bool
        return __module0.fui_is_dark_mode() ? 1 : 0;
      },
      fui_set_persisted_state(nodeIdPtr, nodeIdLen, kindPtr, kindLen, version, payloadPtr, payloadLen) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_set_persisted_state(usize, u32, usize, u32, u32, usize, u32) => void
        nodeIdPtr = nodeIdPtr >>> 0;
        nodeIdLen = nodeIdLen >>> 0;
        kindPtr = kindPtr >>> 0;
        kindLen = kindLen >>> 0;
        version = version >>> 0;
        payloadPtr = payloadPtr >>> 0;
        payloadLen = payloadLen >>> 0;
        __module0.fui_set_persisted_state(nodeIdPtr, nodeIdLen, kindPtr, kindLen, version, payloadPtr, payloadLen);
      },
      fui_copy_persisted_state(nodeIdPtr, nodeIdLen, kindPtr, kindLen, outVersionPtr, payloadPtr, payloadCapacity) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_copy_persisted_state(usize, u32, usize, u32, usize, usize, u32) => i32
        nodeIdPtr = nodeIdPtr >>> 0;
        nodeIdLen = nodeIdLen >>> 0;
        kindPtr = kindPtr >>> 0;
        kindLen = kindLen >>> 0;
        outVersionPtr = outVersionPtr >>> 0;
        payloadPtr = payloadPtr >>> 0;
        payloadCapacity = payloadCapacity >>> 0;
        return __module0.fui_copy_persisted_state(nodeIdPtr, nodeIdLen, kindPtr, kindLen, outVersionPtr, payloadPtr, payloadCapacity);
      },
      fui_show_url_preview(ptr, len) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_show_url_preview(usize, u32) => void
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module0.fui_show_url_preview(ptr, len);
      },
      fui_freeze_text_selection_snapshot(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_freeze_text_selection_snapshot(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module0.fui_freeze_text_selection_snapshot(handle);
      },
      fui_can_navigate_back() {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_can_navigate_back() => bool
        return __module0.fui_can_navigate_back() ? 1 : 0;
      },
      fui_can_navigate_forward() {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_can_navigate_forward() => bool
        return __module0.fui_can_navigate_forward() ? 1 : 0;
      },
      fui_register_text_input_metadata(handle, isPassword, hintPtr, hintLen) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_register_text_input_metadata(u64, bool, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        isPassword = isPassword != 0;
        hintPtr = hintPtr >>> 0;
        hintLen = hintLen >>> 0;
        __module0.fui_register_text_input_metadata(handle, isPassword, hintPtr, hintLen);
      },
      fui_release_texture(textureId) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_release_texture(u32) => void
        textureId = textureId >>> 0;
        __module0.fui_release_texture(textureId);
      },
      fui_release_svg(svgId) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_release_svg(u32) => void
        svgId = svgId >>> 0;
        __module0.fui_release_svg(svgId);
      },
      fui_set_persisted_scroll_offset(nodeIdPtr, nodeIdLen, x, y) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_set_persisted_scroll_offset(usize, u32, f32, f32) => void
        nodeIdPtr = nodeIdPtr >>> 0;
        nodeIdLen = nodeIdLen >>> 0;
        __module0.fui_set_persisted_scroll_offset(nodeIdPtr, nodeIdLen, x, y);
      },
      fui_render_node_to_rgba(handle, width, height, outPtr, outCapacity, scale, x, y) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_render_node_to_rgba(u64, u32, u32, usize, u32, f32, f32, f32) => u32
        handle = BigInt.asUintN(64, handle);
        width = width >>> 0;
        height = height >>> 0;
        outPtr = outPtr >>> 0;
        outCapacity = outCapacity >>> 0;
        return __module0.fui_render_node_to_rgba(handle, width, height, outPtr, outCapacity, scale, x, y);
      },
      fui_canvas_destroy_offscreen(offscreenId) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_canvas_destroy_offscreen(u32) => void
        offscreenId = offscreenId >>> 0;
        __module0.fui_canvas_destroy_offscreen(offscreenId);
      },
      fui_bitmap_release(textureId) {
        // ~lib/@effindomv2/fui-as/src/core/generated/HostAbi/fui_bitmap_release(u32) => void
        textureId = textureId >>> 0;
        __module0.fui_bitmap_release(textureId);
      },
    }, __module0),
    effindom_v2_ui: Object.setPrototypeOf({
      ui_register_font_fallback(font_id, fallback_font_id) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_register_font_fallback(u32, u32) => void
        font_id = font_id >>> 0;
        fallback_font_id = fallback_font_id >>> 0;
        __module1.ui_register_font_fallback(font_id, fallback_font_id);
      },
      ui_set_interactive(handle, interactive) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_interactive(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        interactive = interactive != 0;
        __module1.ui_set_interactive(handle, interactive);
      },
      ui_set_fill_width(handle, fill) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_fill_width(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        fill = fill != 0;
        __module1.ui_set_fill_width(handle, fill);
      },
      ui_set_fill_height(handle, fill) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_fill_height(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        fill = fill != 0;
        __module1.ui_set_fill_height(handle, fill);
      },
      ui_set_width(handle, value, unit_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_width(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit_enum = unit_enum >>> 0;
        __module1.ui_set_width(handle, value, unit_enum);
      },
      ui_set_scroll_offset(handle, offset_x, offset_y) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_scroll_offset(u64, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_scroll_offset(handle, offset_x, offset_y);
      },
      ui_set_flex_direction(handle, dir_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_flex_direction(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        dir_enum = dir_enum >>> 0;
        __module1.ui_set_flex_direction(handle, dir_enum);
      },
      ui_node_remove_child(parent, child) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_node_remove_child(u64, u64) => void
        parent = BigInt.asUintN(64, parent);
        child = BigInt.asUintN(64, child);
        __module1.ui_node_remove_child(parent, child);
      },
      ui_set_focusable(handle, focusable, tab_index) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_focusable(u64, bool, i32) => void
        handle = BigInt.asUintN(64, handle);
        focusable = focusable != 0;
        __module1.ui_set_focusable(handle, focusable, tab_index);
      },
      ui_set_semantic_disabled(handle, has_disabled, is_disabled) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_semantic_disabled(u64, bool, bool) => void
        handle = BigInt.asUintN(64, handle);
        has_disabled = has_disabled != 0;
        is_disabled = is_disabled != 0;
        __module1.ui_set_semantic_disabled(handle, has_disabled, is_disabled);
      },
      ui_set_visibility(handle, visibility_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_visibility(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        visibility_enum = visibility_enum >>> 0;
        __module1.ui_set_visibility(handle, visibility_enum);
      },
      ui_node_add_child(parent, child) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_node_add_child(u64, u64) => void
        parent = BigInt.asUintN(64, parent);
        child = BigInt.asUintN(64, child);
        __module1.ui_node_add_child(parent, child);
      },
      ui_set_align_items(handle, align_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_align_items(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        align_enum = align_enum >>> 0;
        __module1.ui_set_align_items(handle, align_enum);
      },
      ui_set_clip_to_bounds(handle, clip) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_clip_to_bounds(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        clip = clip != 0;
        __module1.ui_set_clip_to_bounds(handle, clip);
      },
      ui_set_height(handle, value, unit_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_height(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit_enum = unit_enum >>> 0;
        __module1.ui_set_height(handle, value, unit_enum);
      },
      ui_set_box_style(handle, bg_color, radius_tl, radius_tr, radius_br, radius_bl, border_width, border_color, border_style_enum, border_dash_on, border_dash_off) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_box_style(u64, u32, f32, f32, f32, f32, f32, u32, u32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        bg_color = bg_color >>> 0;
        border_color = border_color >>> 0;
        border_style_enum = border_style_enum >>> 0;
        __module1.ui_set_box_style(handle, bg_color, radius_tl, radius_tr, radius_br, radius_bl, border_width, border_color, border_style_enum, border_dash_on, border_dash_off);
      },
      ui_set_bg_color(handle, color) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_bg_color(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        color = color >>> 0;
        __module1.ui_set_bg_color(handle, color);
      },
      ui_set_layer_effect(handle, opacity, blur_sigma, blend_mode_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_layer_effect(u64, f32, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        blend_mode_enum = blend_mode_enum >>> 0;
        __module1.ui_set_layer_effect(handle, opacity, blur_sigma, blend_mode_enum);
      },
      ui_set_drop_shadow(handle, color, offset_x, offset_y, blur_sigma, spread) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_drop_shadow(u64, u32, f32, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        color = color >>> 0;
        __module1.ui_set_drop_shadow(handle, color, offset_x, offset_y, blur_sigma, spread);
      },
      ui_set_background_blur(handle, blur_sigma) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_background_blur(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_background_blur(handle, blur_sigma);
      },
      ui_set_linear_gradient(handle, sx, sy, ex, ey, stop_count, offsets, colors) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_linear_gradient(u64, f32, f32, f32, f32, u32, usize, usize) => void
        handle = BigInt.asUintN(64, handle);
        stop_count = stop_count >>> 0;
        offsets = offsets >>> 0;
        colors = colors >>> 0;
        __module1.ui_set_linear_gradient(handle, sx, sy, ex, ey, stop_count, offsets, colors);
      },
      ui_set_node_id(handle, utf8_id, len) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_node_id(u64, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        utf8_id = utf8_id >>> 0;
        len = len >>> 0;
        __module1.ui_set_node_id(handle, utf8_id, len);
      },
      ui_set_scroll_enabled(handle, enabled_x, enabled_y) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_scroll_enabled(u64, bool, bool) => void
        handle = BigInt.asUintN(64, handle);
        enabled_x = enabled_x != 0;
        enabled_y = enabled_y != 0;
        __module1.ui_set_scroll_enabled(handle, enabled_x, enabled_y);
      },
      ui_set_semantic_role(handle, role_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_semantic_role(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        role_enum = role_enum >>> 0;
        __module1.ui_set_semantic_role(handle, role_enum);
      },
      ui_set_semantic_label(handle, utf8_label, len) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_semantic_label(u64, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        utf8_label = utf8_label >>> 0;
        len = len >>> 0;
        __module1.ui_set_semantic_label(handle, utf8_label, len);
      },
      ui_set_position(handle, left, top, right, bottom) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_position(u64, f32, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_position(handle, left, top, right, bottom);
      },
      ui_get_bounds(handle, out_x, out_y, out_width, out_height) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_get_bounds(u64, usize, usize, usize, usize) => bool
        handle = BigInt.asUintN(64, handle);
        out_x = out_x >>> 0;
        out_y = out_y >>> 0;
        out_width = out_width >>> 0;
        out_height = out_height >>> 0;
        return __module1.ui_get_bounds(handle, out_x, out_y, out_width, out_height) ? 1 : 0;
      },
      ui_set_text_color(handle, color) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text_color(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        color = color >>> 0;
        __module1.ui_set_text_color(handle, color);
      },
      ui_set_font(handle, font_id, size) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_font(u64, u32, f32) => void
        handle = BigInt.asUintN(64, handle);
        font_id = font_id >>> 0;
        __module1.ui_set_font(handle, font_id, size);
      },
      ui_set_selectable(handle, selectable, selection_color) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_selectable(u64, bool, u32) => void
        handle = BigInt.asUintN(64, handle);
        selectable = selectable != 0;
        selection_color = selection_color >>> 0;
        __module1.ui_set_selectable(handle, selectable, selection_color);
      },
      ui_set_padding(handle, left, top, right, bottom) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_padding(u64, f32, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_padding(handle, left, top, right, bottom);
      },
      ui_set_text_vertical_align(handle, align_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text_vertical_align(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        align_enum = align_enum >>> 0;
        __module1.ui_set_text_vertical_align(handle, align_enum);
      },
      ui_set_fill_width_percent(handle, percent) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_fill_width_percent(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_fill_width_percent(handle, percent);
      },
      ui_set_justify_content(handle, justify_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_justify_content(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        justify_enum = justify_enum >>> 0;
        __module1.ui_set_justify_content(handle, justify_enum);
      },
      ui_set_flex_wrap(handle, wrap_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_flex_wrap(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        wrap_enum = wrap_enum >>> 0;
        __module1.ui_set_flex_wrap(handle, wrap_enum);
      },
      ui_set_margin(handle, left, top, right, bottom) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_margin(u64, f32, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_margin(handle, left, top, right, bottom);
      },
      ui_get_visible_bounds(handle, out_x, out_y, out_width, out_height) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_get_visible_bounds(u64, usize, usize, usize, usize) => bool
        handle = BigInt.asUintN(64, handle);
        out_x = out_x >>> 0;
        out_y = out_y >>> 0;
        out_width = out_width >>> 0;
        out_height = out_height >>> 0;
        return __module1.ui_get_visible_bounds(handle, out_x, out_y, out_width, out_height) ? 1 : 0;
      },
      ui_create_node(type) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_create_node(u32) => u64
        type = type >>> 0;
        return __module1.ui_create_node(type) || 0n;
      },
      ui_set_semantic_checked(handle, checked_state_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_semantic_checked(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        checked_state_enum = checked_state_enum >>> 0;
        __module1.ui_set_semantic_checked(handle, checked_state_enum);
      },
      ui_set_semantic_selected(handle, has_selected, is_selected) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_semantic_selected(u64, bool, bool) => void
        handle = BigInt.asUintN(64, handle);
        has_selected = has_selected != 0;
        is_selected = is_selected != 0;
        __module1.ui_set_semantic_selected(handle, has_selected, is_selected);
      },
      ui_set_semantic_expanded(handle, has_expanded, is_expanded) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_semantic_expanded(u64, bool, bool) => void
        handle = BigInt.asUintN(64, handle);
        has_expanded = has_expanded != 0;
        is_expanded = is_expanded != 0;
        __module1.ui_set_semantic_expanded(handle, has_expanded, is_expanded);
      },
      ui_set_semantic_value_range(handle, has_value_range, value_now, value_min, value_max) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_semantic_value_range(u64, bool, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        has_value_range = has_value_range != 0;
        __module1.ui_set_semantic_value_range(handle, has_value_range, value_now, value_min, value_max);
      },
      ui_set_semantic_orientation(handle, orientation_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_semantic_orientation(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        orientation_enum = orientation_enum >>> 0;
        __module1.ui_set_semantic_orientation(handle, orientation_enum);
      },
      ui_set_is_portal(handle, is_portal) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_is_portal(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        is_portal = is_portal != 0;
        __module1.ui_set_is_portal(handle, is_portal);
      },
      ui_set_is_shared_size_scope(handle, is_scope) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_is_shared_size_scope(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        is_scope = is_scope != 0;
        __module1.ui_set_is_shared_size_scope(handle, is_scope);
      },
      ui_set_scroll_proxy_target(handle, scroll_handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_scroll_proxy_target(u64, u64) => void
        handle = BigInt.asUintN(64, handle);
        scroll_handle = BigInt.asUintN(64, scroll_handle);
        __module1.ui_set_scroll_proxy_target(handle, scroll_handle);
      },
      ui_set_preserve_selection_on_pointer_down(handle, preserve) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_preserve_selection_on_pointer_down(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        preserve = preserve != 0;
        __module1.ui_set_preserve_selection_on_pointer_down(handle, preserve);
      },
      ui_set_fill_height_percent(handle, percent) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_fill_height_percent(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_fill_height_percent(handle, percent);
      },
      ui_set_min_width(handle, value, unit_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_min_width(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit_enum = unit_enum >>> 0;
        __module1.ui_set_min_width(handle, value, unit_enum);
      },
      ui_set_max_width(handle, value, unit_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_max_width(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit_enum = unit_enum >>> 0;
        __module1.ui_set_max_width(handle, value, unit_enum);
      },
      ui_set_min_height(handle, value, unit_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_min_height(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit_enum = unit_enum >>> 0;
        __module1.ui_set_min_height(handle, value, unit_enum);
      },
      ui_set_max_height(handle, value, unit_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_max_height(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit_enum = unit_enum >>> 0;
        __module1.ui_set_max_height(handle, value, unit_enum);
      },
      ui_set_text(handle, utf8_str, len) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text(u64, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        utf8_str = utf8_str >>> 0;
        len = len >>> 0;
        __module1.ui_set_text(handle, utf8_str, len);
      },
      ui_set_text_style_runs(handle, run_count, runs_words) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text_style_runs(u64, u32, usize) => void
        handle = BigInt.asUintN(64, handle);
        run_count = run_count >>> 0;
        runs_words = runs_words >>> 0;
        __module1.ui_set_text_style_runs(handle, run_count, runs_words);
      },
      ui_set_line_height(handle, line_height) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_line_height(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_line_height(handle, line_height);
      },
      ui_set_text_align(handle, align_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text_align(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        align_enum = align_enum >>> 0;
        __module1.ui_set_text_align(handle, align_enum);
      },
      ui_set_text_limits(handle, max_chars, max_lines) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text_limits(u64, i32, i32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_text_limits(handle, max_chars, max_lines);
      },
      ui_set_text_wrapping(handle, wrap) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text_wrapping(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        wrap = wrap != 0;
        __module1.ui_set_text_wrapping(handle, wrap);
      },
      ui_set_text_overflow(handle, overflow_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text_overflow(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        overflow_enum = overflow_enum >>> 0;
        __module1.ui_set_text_overflow(handle, overflow_enum);
      },
      ui_set_text_overflow_fade(handle, horizontal, vertical) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text_overflow_fade(u64, bool, bool) => void
        handle = BigInt.asUintN(64, handle);
        horizontal = horizontal != 0;
        vertical = vertical != 0;
        __module1.ui_set_text_overflow_fade(handle, horizontal, vertical);
      },
      ui_set_text_obscured(handle, is_password) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text_obscured(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        is_password = is_password != 0;
        __module1.ui_set_text_obscured(handle, is_password);
      },
      ui_set_editable(handle, editable) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_editable(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        editable = editable != 0;
        __module1.ui_set_editable(handle, editable);
      },
      ui_set_editor_command_keys(handle, enabled) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_editor_command_keys(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        enabled = enabled != 0;
        __module1.ui_set_editor_command_keys(handle, enabled);
      },
      ui_set_editor_accepts_tab(handle, enabled) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_editor_accepts_tab(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        enabled = enabled != 0;
        __module1.ui_set_editor_accepts_tab(handle, enabled);
      },
      ui_set_caret_color(handle, color) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_caret_color(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        color = color >>> 0;
        __module1.ui_set_caret_color(handle, color);
      },
      ui_prepare_node(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_prepare_node(u64) => u32
        handle = BigInt.asUintN(64, handle);
        return __module1.ui_prepare_node(handle);
      },
      ui_get_text_metrics(handle, out_width, out_height, out_baseline, out_line_count, out_max_line_width) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_get_text_metrics(u64, usize, usize, usize, usize, usize) => bool
        handle = BigInt.asUintN(64, handle);
        out_width = out_width >>> 0;
        out_height = out_height >>> 0;
        out_baseline = out_baseline >>> 0;
        out_line_count = out_line_count >>> 0;
        out_max_line_width = out_max_line_width >>> 0;
        return __module1.ui_get_text_metrics(handle, out_width, out_height, out_baseline, out_line_count, out_max_line_width) ? 1 : 0;
      },
      ui_set_dynamic_text_charset(handle, utf8_charset, len) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_dynamic_text_charset(u64, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        utf8_charset = utf8_charset >>> 0;
        len = len >>> 0;
        __module1.ui_set_dynamic_text_charset(handle, utf8_charset, len);
      },
      ui_remove_semantic_scope(token) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_remove_semantic_scope(u32) => void
        token = token >>> 0;
        __module1.ui_remove_semantic_scope(token);
      },
      ui_push_semantic_scope(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_push_semantic_scope(u64) => u32
        handle = BigInt.asUintN(64, handle);
        return __module1.ui_push_semantic_scope(handle);
      },
      ui_delete_node(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_delete_node(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_delete_node(handle);
      },
      ui_copy_cross_selection_endpoint_rects(area_handle, out_rect_words) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_copy_cross_selection_endpoint_rects(u64, usize) => bool
        area_handle = BigInt.asUintN(64, area_handle);
        out_rect_words = out_rect_words >>> 0;
        return __module1.ui_copy_cross_selection_endpoint_rects(area_handle, out_rect_words) ? 1 : 0;
      },
      ui_get_text_range_rect_count(handle, start, end) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_get_text_range_rect_count(u64, u32, u32) => u32
        handle = BigInt.asUintN(64, handle);
        start = start >>> 0;
        end = end >>> 0;
        return __module1.ui_get_text_range_rect_count(handle, start, end);
      },
      ui_copy_text_range_rects(handle, start, end, out_rect_words, max_rect_count) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_copy_text_range_rects(u64, u32, u32, usize, u32) => u32
        handle = BigInt.asUintN(64, handle);
        start = start >>> 0;
        end = end >>> 0;
        out_rect_words = out_rect_words >>> 0;
        max_rect_count = max_rect_count >>> 0;
        return __module1.ui_copy_text_range_rects(handle, start, end, out_rect_words, max_rect_count);
      },
      ui_set_position_type(handle, pos_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_position_type(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        pos_enum = pos_enum >>> 0;
        __module1.ui_set_position_type(handle, pos_enum);
      },
      ui_begin_selection_endpoint_drag(handle, endpoint) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_begin_selection_endpoint_drag(u64, u32) => bool
        handle = BigInt.asUintN(64, handle);
        endpoint = endpoint >>> 0;
        return __module1.ui_begin_selection_endpoint_drag(handle, endpoint) ? 1 : 0;
      },
      ui_has_text_selection(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_has_text_selection(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module1.ui_has_text_selection(handle) ? 1 : 0;
      },
      ui_copy_text_selection(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_copy_text_selection(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_copy_text_selection(handle);
      },
      ui_undo_text_edit(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_undo_text_edit(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_undo_text_edit(handle);
      },
      ui_redo_text_edit(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_redo_text_edit(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_redo_text_edit(handle);
      },
      ui_cut_text_selection(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_cut_text_selection(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_cut_text_selection(handle);
      },
      ui_paste_text(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_paste_text(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_paste_text(handle);
      },
      ui_select_all_text(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_select_all_text(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_select_all_text(handle);
      },
      ui_grid_set_column_shared_size_group(handle, index, utf8_group, len) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_grid_set_column_shared_size_group(u64, u32, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        index = index >>> 0;
        utf8_group = utf8_group >>> 0;
        len = len >>> 0;
        __module1.ui_grid_set_column_shared_size_group(handle, index, utf8_group, len);
      },
      ui_set_flex_basis(handle, basis) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_flex_basis(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_flex_basis(handle, basis);
      },
      ui_set_align_self(handle, align_enum) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_align_self(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        align_enum = align_enum >>> 0;
        __module1.ui_set_align_self(handle, align_enum);
      },
      ui_set_root(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_root(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_root(handle);
      },
      ui_is_point_in_selection(logical_x, logical_y) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_is_point_in_selection(f32, f32) => bool
        return __module1.ui_is_point_in_selection(logical_x, logical_y) ? 1 : 0;
      },
      ui_can_undo_text_edit(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_can_undo_text_edit(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module1.ui_can_undo_text_edit(handle) ? 1 : 0;
      },
      ui_can_redo_text_edit(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_can_redo_text_edit(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module1.ui_can_redo_text_edit(handle) ? 1 : 0;
      },
      ui_set_scroll_content_size(handle, content_width, content_height) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_scroll_content_size(u64, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_scroll_content_size(handle, content_width, content_height);
      },
      ui_select_word_at(handle, logical_x, logical_y) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_select_word_at(u64, f32, f32) => bool
        handle = BigInt.asUintN(64, handle);
        return __module1.ui_select_word_at(handle, logical_x, logical_y) ? 1 : 0;
      },
      ui_request_semantic_announcement(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_request_semantic_announcement(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_request_semantic_announcement(handle);
      },
      ui_set_text_selection_range(handle, selection_start, selection_end) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_text_selection_range(u64, u32, u32) => void
        handle = BigInt.asUintN(64, handle);
        selection_start = selection_start >>> 0;
        selection_end = selection_end >>> 0;
        __module1.ui_set_text_selection_range(handle, selection_start, selection_end);
      },
      ui_set_custom_drawable(handle, is_custom_drawable) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_custom_drawable(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        is_custom_drawable = is_custom_drawable != 0;
        __module1.ui_set_custom_drawable(handle, is_custom_drawable);
      },
      ui_grid_set_columns(handle, count, values, types) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_grid_set_columns(u64, u32, usize, usize) => void
        handle = BigInt.asUintN(64, handle);
        count = count >>> 0;
        values = values >>> 0;
        types = types >>> 0;
        __module1.ui_grid_set_columns(handle, count, values, types);
      },
      ui_grid_set_rows(handle, count, values, types) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_grid_set_rows(u64, u32, usize, usize) => void
        handle = BigInt.asUintN(64, handle);
        count = count >>> 0;
        values = values >>> 0;
        types = types >>> 0;
        __module1.ui_grid_set_rows(handle, count, values, types);
      },
      ui_grid_set_row_shared_size_group(handle, index, utf8_group, len) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_grid_set_row_shared_size_group(u64, u32, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        index = index >>> 0;
        utf8_group = utf8_group >>> 0;
        len = len >>> 0;
        __module1.ui_grid_set_row_shared_size_group(handle, index, utf8_group, len);
      },
      ui_node_set_grid_placement(child, row, col, row_span, col_span) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_node_set_grid_placement(u64, u32, u32, u32, u32) => void
        child = BigInt.asUintN(64, child);
        row = row >>> 0;
        col = col >>> 0;
        row_span = row_span >>> 0;
        col_span = col_span >>> 0;
        __module1.ui_node_set_grid_placement(child, row, col, row_span, col_span);
      },
      ui_set_selection_area_barrier(handle, is_barrier) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_selection_area_barrier(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        is_barrier = is_barrier != 0;
        __module1.ui_set_selection_area_barrier(handle, is_barrier);
      },
      ui_set_image_nine(handle, texture_id, inset_l, inset_t, inset_r, inset_b, sampling_kind, max_aniso) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_image_nine(u64, u32, f32, f32, f32, f32, u32, u32) => void
        handle = BigInt.asUintN(64, handle);
        texture_id = texture_id >>> 0;
        sampling_kind = sampling_kind >>> 0;
        max_aniso = max_aniso >>> 0;
        __module1.ui_set_image_nine(handle, texture_id, inset_l, inset_t, inset_r, inset_b, sampling_kind, max_aniso);
      },
      ui_set_image(handle, texture_id, object_fit_enum, sampling_kind, max_aniso) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_image(u64, u32, u32, u32, u32) => void
        handle = BigInt.asUintN(64, handle);
        texture_id = texture_id >>> 0;
        object_fit_enum = object_fit_enum >>> 0;
        sampling_kind = sampling_kind >>> 0;
        max_aniso = max_aniso >>> 0;
        __module1.ui_set_image(handle, texture_id, object_fit_enum, sampling_kind, max_aniso);
      },
      ui_set_svg(handle, svg_id, tint_color, sampling_kind, max_aniso) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_svg(u64, u32, u32, u32, u32) => void
        handle = BigInt.asUintN(64, handle);
        svg_id = svg_id >>> 0;
        tint_color = tint_color >>> 0;
        sampling_kind = sampling_kind >>> 0;
        max_aniso = max_aniso >>> 0;
        __module1.ui_set_svg(handle, svg_id, tint_color, sampling_kind, max_aniso);
      },
      ui_set_selection_area(handle, is_area) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_selection_area(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        is_area = is_area != 0;
        __module1.ui_set_selection_area(handle, is_area);
      },
      ui_set_smooth_scrolling(handle, smooth_scrolling) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_smooth_scrolling(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        smooth_scrolling = smooth_scrolling != 0;
        __module1.ui_set_smooth_scrolling(handle, smooth_scrolling);
      },
      ui_set_scroll_friction(handle, friction) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_set_scroll_friction(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_scroll_friction(handle, friction);
      },
      ui_request_focus(handle) {
        // ~lib/@effindomv2/fui-as/src/core/generated/UiAbi/ui_request_focus(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_request_focus(handle);
      },
    }, __module1),
    fui_fetch_host: Object.setPrototypeOf({
      fui_fetch_cancel(requestId) {
        // ~lib/@effindomv2/fui-as/src/core/generated/FetchHostAbi/fui_fetch_cancel(u32) => void
        requestId = requestId >>> 0;
        __module2.fui_fetch_cancel(requestId);
      },
    }, __module2),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    __fui_on_external_drag_event(eventType, handle, x, y, modifiers, payloadPtr, payloadLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_external_drag_event(u32, u64, f32, f32, u32, usize, u32) => u32
      handle = handle || 0n;
      return exports.__fui_on_external_drag_event(eventType, handle, x, y, modifiers, payloadPtr, payloadLen) >>> 0;
    },
    __fui_can_show_context_menu(handle) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_can_show_context_menu(u64) => bool
      handle = handle || 0n;
      return exports.__fui_can_show_context_menu(handle) != 0;
    },
    __fui_on_fetch_complete(requestId, ok, status, payloadPtr, payloadLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_fetch_complete(u32, bool, i32, usize, u32) => void
      ok = ok ? 1 : 0;
      exports.__fui_on_fetch_complete(requestId, ok, status, payloadPtr, payloadLen);
    },
    __fui_on_file_finish_result(requestId, status, writtenBytes, payloadPtr, payloadLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_finish_result(u32, u32, u64, usize, u32) => void
      writtenBytes = writtenBytes || 0n;
      exports.__fui_on_file_finish_result(requestId, status, writtenBytes, payloadPtr, payloadLen);
    },
    __fui_on_file_read_result(requestId, status, offsetBytes, fileSizeBytes, payloadPtr, payloadLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_read_result(u32, u32, u64, u64, usize, u32) => void
      offsetBytes = offsetBytes || 0n;
      fileSizeBytes = fileSizeBytes || 0n;
      exports.__fui_on_file_read_result(requestId, status, offsetBytes, fileSizeBytes, payloadPtr, payloadLen);
    },
    __fui_on_file_save_result(requestId, status, writtenBytes, payloadPtr, payloadLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_save_result(u32, u32, u64, usize, u32) => void
      writtenBytes = writtenBytes || 0n;
      exports.__fui_on_file_save_result(requestId, status, writtenBytes, payloadPtr, payloadLen);
    },
    __fui_on_file_worker_process_chunk(requestId, offsetBytes, fileSizeBytes, payloadPtr, payloadLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_worker_process_chunk(u32, u64, u64, usize, u32) => void
      offsetBytes = offsetBytes || 0n;
      fileSizeBytes = fileSizeBytes || 0n;
      exports.__fui_on_file_worker_process_chunk(requestId, offsetBytes, fileSizeBytes, payloadPtr, payloadLen);
    },
    __fui_on_file_worker_process_complete(requestId, processedBytes, payloadPtr, payloadLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_worker_process_complete(u32, u64, usize, u32) => void
      processedBytes = processedBytes || 0n;
      exports.__fui_on_file_worker_process_complete(requestId, processedBytes, payloadPtr, payloadLen);
    },
    __fui_on_file_worker_process_progress(requestId, processedBytes, totalBytes, payloadPtr, payloadLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_worker_process_progress(u32, u64, u64, usize, u32) => void
      processedBytes = processedBytes || 0n;
      totalBytes = totalBytes || 0n;
      exports.__fui_on_file_worker_process_progress(requestId, processedBytes, totalBytes, payloadPtr, payloadLen);
    },
    __fui_on_file_write_result(requestId, status, writtenBytes, totalWrittenBytes, payloadPtr, payloadLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_file_write_result(u32, u32, u64, u64, usize, u32) => void
      writtenBytes = writtenBytes || 0n;
      totalWrittenBytes = totalWrittenBytes || 0n;
      exports.__fui_on_file_write_result(requestId, status, writtenBytes, totalWrittenBytes, payloadPtr, payloadLen);
    },
    __fui_key_buffer() {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_key_buffer() => usize
      return exports.__fui_key_buffer() >>> 0;
    },
    __fui_on_context_menu(handle, x, y) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_context_menu(u64, f32, f32) => void
      handle = handle || 0n;
      exports.__fui_on_context_menu(handle, x, y);
    },
    __fui_on_cross_selection_changed(handle, textPtr, textLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_cross_selection_changed(u64, usize, u32) => void
      handle = handle || 0n;
      exports.__fui_on_cross_selection_changed(handle, textPtr, textLen);
    },
    __fui_on_focus_changed(handle, focused) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_focus_changed(u64, bool) => void
      handle = handle || 0n;
      focused = focused ? 1 : 0;
      exports.__fui_on_focus_changed(handle, focused);
    },
    __fui_get_gesture_intent(handle) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_get_gesture_intent(u64) => u32
      handle = handle || 0n;
      return exports.__fui_get_gesture_intent(handle) >>> 0;
    },
    __fui_get_long_press_minimum_duration_ms(handle) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_get_long_press_minimum_duration_ms(u64) => i32
      handle = handle || 0n;
      return exports.__fui_get_long_press_minimum_duration_ms(handle);
    },
    __fui_get_long_press_movement_tolerance(handle) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_get_long_press_movement_tolerance(u64) => f32
      handle = handle || 0n;
      return exports.__fui_get_long_press_movement_tolerance(handle);
    },
    __fui_long_press_continues_pointer_events(handle) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_long_press_continues_pointer_events(u64) => bool
      handle = handle || 0n;
      return exports.__fui_long_press_continues_pointer_events(handle) != 0;
    },
    __fui_on_gesture_event(handle, phase, kind, x, y, deltaX, deltaY, scale, pointerCount) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_gesture_event(u64, u32, u32, f32, f32, f32, f32, f32, i32) => bool
      handle = handle || 0n;
      return exports.__fui_on_gesture_event(handle, phase, kind, x, y, deltaX, deltaY, scale, pointerCount) != 0;
    },
    __fui_on_long_press_event(handle, x, y, pointerId, pointerType, modifiers, durationMs) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_long_press_event(u64, f32, f32, i32, u32, u32, i32) => bool
      handle = handle || 0n;
      return exports.__fui_on_long_press_event(handle, x, y, pointerId, pointerType, modifiers, durationMs) != 0;
    },
    __fui_on_key_event(eventType, keyPtr, keyLen, modifiers) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_key_event(u32, usize, u32, u32) => bool
      return exports.__fui_on_key_event(eventType, keyPtr, keyLen, modifiers) != 0;
    },
    __fui_on_pointer_event_with_metadata(eventType, handle, x, y, modifiers, pointerId, pointerType, button, buttons, pressure, width, height, clickCount) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_pointer_event_with_metadata(u32, u64, f32, f32, u32, i32, u32, i32, u32, f32, f32, f32, i32) => bool
      handle = handle || 0n;
      return exports.__fui_on_pointer_event_with_metadata(eventType, handle, x, y, modifiers, pointerId, pointerType, button, buttons, pressure, width, height, clickCount) != 0;
    },
    __fui_on_scroll(handle, offsetX, offsetY, contentWidth, contentHeight, viewportWidth, viewportHeight) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_scroll(u64, f32, f32, f32, f32, f32, f32) => void
      handle = handle || 0n;
      exports.__fui_on_scroll(handle, offsetX, offsetY, contentWidth, contentHeight, viewportWidth, viewportHeight);
    },
    __fui_on_selection_changed(handle, start, end) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_selection_changed(u64, u32, u32) => void
      handle = handle || 0n;
      exports.__fui_on_selection_changed(handle, start, end);
    },
    __fui_on_system_dark_mode_changed(isDark) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_system_dark_mode_changed(bool) => void
      isDark = isDark ? 1 : 0;
      exports.__fui_on_system_dark_mode_changed(isDark);
    },
    __fui_on_text_changed(handle, textPtr, textLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_text_changed(u64, usize, u32) => void
      handle = handle || 0n;
      exports.__fui_on_text_changed(handle, textPtr, textLen);
    },
    __fui_on_text_replaced(handle, start, end, textPtr, textLen) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_text_replaced(u64, u32, u32, usize, u32) => void
      handle = handle || 0n;
      exports.__fui_on_text_replaced(handle, start, end, textPtr, textLen);
    },
    __fui_on_wheel_event(handle, x, y, deltaX, deltaY, deltaMode, modifiers) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_wheel_event(u64, f32, f32, f32, f32, u32, u32) => bool
      handle = handle || 0n;
      return exports.__fui_on_wheel_event(handle, x, y, deltaX, deltaY, deltaMode, modifiers) != 0;
    },
    __fui_resolve_gesture_owner(handle) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_resolve_gesture_owner(u64) => u64
      handle = handle || 0n;
      return BigInt.asUintN(64, exports.__fui_resolve_gesture_owner(handle));
    },
    __fui_resolve_long_press_owner(handle) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_resolve_long_press_owner(u64) => u64
      handle = handle || 0n;
      return BigInt.asUintN(64, exports.__fui_resolve_long_press_owner(handle));
    },
    __fui_text_buffer() {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_text_buffer() => usize
      return exports.__fui_text_buffer() >>> 0;
    },
    __fui_text_buffer_size() {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_text_buffer_size() => u32
      return exports.__fui_text_buffer_size() >>> 0;
    },
    __fui_debug_focus_changed(handle, focused) {
      // ~lib/@effindomv2/fui-as/src/core/DebugApi/__fui_debug_focus_changed(u64, bool) => void
      handle = handle || 0n;
      focused = focused ? 1 : 0;
      exports.__fui_debug_focus_changed(handle, focused);
    },
    __fui_debug_pointer_event(eventType, handle, x, y, modifiers) {
      // ~lib/@effindomv2/fui-as/src/core/DebugApi/__fui_debug_pointer_event(u32, u64, f32, f32, u32?) => void
      handle = handle || 0n;
      exports.__setArgumentsLength(arguments.length);
      exports.__fui_debug_pointer_event(eventType, handle, x, y, modifiers);
    },
    __fui_debug_scroll(handle, offsetX, offsetY, contentWidth, contentHeight, viewportWidth, viewportHeight) {
      // ~lib/@effindomv2/fui-as/src/core/DebugApi/__fui_debug_scroll(u64, f32, f32, f32, f32, f32, f32) => void
      handle = handle || 0n;
      exports.__fui_debug_scroll(handle, offsetX, offsetY, contentWidth, contentHeight, viewportWidth, viewportHeight);
    },
    fui_dispatch_custom_draw(handle, canvasPtr) {
      // ~lib/@effindomv2/fui-as/src/drawing/DrawCallback/fui_dispatch_custom_draw(u64, usize) => void
      handle = handle || 0n;
      exports.fui_dispatch_custom_draw(handle, canvasPtr);
    },
    onAppClockTick(callback) {
      // src/host/generated/HostEvents/onAppClockTick(~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<i32> | null) => void
      callback = __lowerRecord232(callback);
      exports.onAppClockTick(callback);
    },
  }, exports);
  function __lowerRecord232(value) {
    // ~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<i32>
    // Hint: Opt-out from lowering as a record by providing an empty constructor
    if (value == null) return 0;
    const pointer = exports.__pin(exports.__new(0, 232));
    exports.__unpin(pointer);
    return pointer;
  }
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
  __runApp,
  __disposeApp,
  __disposeApp,
  __fui_capture_persisted_ui_state,
  __fui_restore_persisted_ui_state,
  __flushRenders,
  __runApp,
  __fui_on_external_drag_event,
  __fui_can_show_context_menu,
  __fui_on_fetch_complete,
  __fui_on_fetch_error,
  __fui_on_file_finish_result,
  __fui_on_file_pick_result,
  __fui_on_file_read_result,
  __fui_on_file_save_result,
  __fui_on_file_worker_process_chunk,
  __fui_on_file_worker_process_complete,
  __fui_on_file_worker_process_error,
  __fui_on_file_worker_process_progress,
  __fui_on_file_write_result,
  __fui_on_file_writer_created,
  __fui_hide_active_context_menu,
  __fui_key_buffer,
  __fui_on_context_menu,
  __fui_on_cross_selection_changed,
  __fui_on_focus_changed,
  __fui_on_frame,
  __fui_get_gesture_intent,
  __fui_get_long_press_minimum_duration_ms,
  __fui_get_long_press_movement_tolerance,
  __fui_long_press_continues_pointer_events,
  __fui_on_gesture_event,
  __fui_on_long_press_event,
  __fui_on_key_event,
  __fui_on_pointer_event_with_metadata,
  __fui_on_route_changed,
  __fui_on_scroll,
  __fui_on_selection_changed,
  __fui_on_system_accent_color_changed,
  __fui_on_system_dark_mode_changed,
  __fui_on_text_changed,
  __fui_on_text_replaced,
  __fui_on_timer,
  __fui_on_wheel_event,
  __fui_resolve_gesture_owner,
  __fui_resolve_long_press_owner,
  __fui_on_font_loaded,
  __fui_on_viewport_changed,
  __fui_on_worker_complete,
  __fui_on_worker_error,
  __fui_on_worker_progress,
  __fui_text_buffer,
  __fui_text_buffer_size,
  __fui_debug_focus_changed,
  __fui_debug_key_event,
  __fui_debug_pointer_event,
  __fui_debug_scroll,
  __fui_on_svg_failed,
  __fui_on_svg_loaded,
  __fui_on_texture_failed,
  __fui_on_texture_loaded,
  fui_dispatch_custom_draw,
  onAppClockTick,
  clearAppClockTick,
  __fui_host_event_appClockTick,
} = await (async url => instantiate(
  await (async () => {
    const isNodeOrBun = typeof process != "undefined" && process.versions != null && (process.versions.node != null || process.versions.bun != null);
    if (isNodeOrBun) { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
    else { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
  })(), {
    fui_host: __maybeDefault(__import0),
    effindom_v2_ui: __maybeDefault(__import1),
    fui_fetch_host: __maybeDefault(__import2),
  }
))(new URL("immediate-drawing.wasm", import.meta.url));
function __maybeDefault(module) {
  return typeof module.default === "object" && Object.keys(module).length == 1
    ? module.default
    : module;
}

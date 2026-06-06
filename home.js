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
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_log(usize, u32, usize, u32) => void
        categoryPtr = categoryPtr >>> 0;
        catLen = catLen >>> 0;
        msgPtr = msgPtr >>> 0;
        msgLen = msgLen >>> 0;
        __module0.fui_log(categoryPtr, catLen, msgPtr, msgLen);
      },
      fui_logs_enabled() {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_logs_enabled() => bool
        return __module0.fui_logs_enabled() ? 1 : 0;
      },
      fui_is_coarse_pointer() {
        // ~lib/@effindomv2/fui-as/src/core/generated/FrameworkHostServices/__host_fui_is_coarse_pointer() => bool
        return __module0.fui_is_coarse_pointer() ? 1 : 0;
      },
      fui_set_cursor(style) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_set_cursor(u32) => void
        style = style >>> 0;
        __module0.fui_set_cursor(style);
      },
      fui_try_get_persisted_scroll_offset(nodeIdPtr, nodeIdLen, outX, outY) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_try_get_persisted_scroll_offset(usize, u32, usize, usize) => bool
        nodeIdPtr = nodeIdPtr >>> 0;
        nodeIdLen = nodeIdLen >>> 0;
        outX = outX >>> 0;
        outY = outY >>> 0;
        return __module0.fui_try_get_persisted_scroll_offset(nodeIdPtr, nodeIdLen, outX, outY) ? 1 : 0;
      },
      fui_cancel_timer(timerId) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_cancel_timer(u32) => void
        timerId = timerId >>> 0;
        __module0.fui_cancel_timer(timerId);
      },
      fui_start_timer(timerId, delayMs) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_start_timer(u32, i32) => void
        timerId = timerId >>> 0;
        __module0.fui_start_timer(timerId, delayMs);
      },
      fui_release_texture(textureId) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_release_texture(u32) => void
        textureId = textureId >>> 0;
        __module0.fui_release_texture(textureId);
      },
      fui_load_texture(textureId, ptr, len) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_load_texture(u32, usize, u32) => void
        textureId = textureId >>> 0;
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module0.fui_load_texture(textureId, ptr, len);
      },
      fui_release_svg(svgId) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_release_svg(u32) => void
        svgId = svgId >>> 0;
        __module0.fui_release_svg(svgId);
      },
      fui_load_svg(svgId, ptr, len) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_load_svg(u32, usize, u32) => void
        svgId = svgId >>> 0;
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module0.fui_load_svg(svgId, ptr, len);
      },
      fui_bitmap_commit(textureId, bytesPtr, bytesLen, width, height) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_bitmap_commit(u32, usize, u32, u32, u32) => void
        textureId = textureId >>> 0;
        bytesPtr = bytesPtr >>> 0;
        bytesLen = bytesLen >>> 0;
        width = width >>> 0;
        height = height >>> 0;
        __module0.fui_bitmap_commit(textureId, bytesPtr, bytesLen, width, height);
      },
      fui_file_process_worker_cancel(requestId) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_file_process_worker_cancel(u32) => void
        requestId = requestId >>> 0;
        __module0.fui_file_process_worker_cancel(requestId);
      },
      fui_worker_cancel(workerId) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_worker_cancel(u32) => void
        workerId = workerId >>> 0;
        __module0.fui_worker_cancel(workerId);
      },
      fui_is_dark_mode() {
        // ~lib/@effindomv2/fui-as/src/core/generated/FrameworkHostServices/__host_fui_is_dark_mode() => bool
        return __module0.fui_is_dark_mode() ? 1 : 0;
      },
      fui_set_persisted_state(nodeIdPtr, nodeIdLen, kindPtr, kindLen, version, payloadPtr, payloadLen) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_set_persisted_state(usize, u32, usize, u32, u32, usize, u32) => void
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
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_copy_persisted_state(usize, u32, usize, u32, usize, usize, u32) => i32
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
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_show_url_preview(usize, u32) => void
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module0.fui_show_url_preview(ptr, len);
      },
      fui_has_text_selection_snapshot(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_has_text_selection_snapshot(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module0.fui_has_text_selection_snapshot(handle) ? 1 : 0;
      },
      fui_freeze_text_selection_snapshot(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_freeze_text_selection_snapshot(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module0.fui_freeze_text_selection_snapshot(handle);
      },
      fui_can_navigate_back() {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_can_navigate_back() => bool
        return __module0.fui_can_navigate_back() ? 1 : 0;
      },
      fui_can_navigate_forward() {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_can_navigate_forward() => bool
        return __module0.fui_can_navigate_forward() ? 1 : 0;
      },
      fui_set_pointer_capture(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_set_pointer_capture(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module0.fui_set_pointer_capture(handle);
      },
      fui_set_persisted_scroll_offset(nodeIdPtr, nodeIdLen, x, y) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_set_persisted_scroll_offset(usize, u32, f32, f32) => void
        nodeIdPtr = nodeIdPtr >>> 0;
        nodeIdLen = nodeIdLen >>> 0;
        __module0.fui_set_persisted_scroll_offset(nodeIdPtr, nodeIdLen, x, y);
      },
      fui_navigate_to(ptr, len, openInNewTab) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_navigate_to(usize, u32, bool) => void
        ptr = ptr >>> 0;
        len = len >>> 0;
        openInNewTab = openInNewTab != 0;
        __module0.fui_navigate_to(ptr, len, openInNewTab);
      },
      fui_copy_text(ptr, len) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_copy_text(usize, u32) => void
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module0.fui_copy_text(ptr, len);
      },
      fui_commit_text_action_focus(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_commit_text_action_focus(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module0.fui_commit_text_action_focus(handle);
      },
      fui_copy_text_selection_snapshot(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_copy_text_selection_snapshot(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module0.fui_copy_text_selection_snapshot(handle) ? 1 : 0;
      },
      fui_cut_text_selection_snapshot(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_cut_text_selection_snapshot(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module0.fui_cut_text_selection_snapshot(handle) ? 1 : 0;
      },
      fui_delete_focused_text_range(start, end) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_delete_focused_text_range(u32, u32) => bool
        start = start >>> 0;
        end = end >>> 0;
        return __module0.fui_delete_focused_text_range(start, end) ? 1 : 0;
      },
      fui_cut_focused_text_selection() {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_cut_focused_text_selection() => bool
        return __module0.fui_cut_focused_text_selection() ? 1 : 0;
      },
      fui_bitmap_release(textureId) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/fui_bitmap_release(u32) => void
        textureId = textureId >>> 0;
        __module0.fui_bitmap_release(textureId);
      },
    }, __module0),
    effindom_v2_ui: Object.setPrototypeOf({
      ui_register_font_fallback(fontId, fallbackFontId) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_register_font_fallback(u32, u32) => void
        fontId = fontId >>> 0;
        fallbackFontId = fallbackFontId >>> 0;
        __module1.ui_register_font_fallback(fontId, fallbackFontId);
      },
      ui_set_text(handle, ptr, len) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text(u64, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module1.ui_set_text(handle, ptr, len);
      },
      ui_set_semantic_label(handle, ptr, len) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_semantic_label(u64, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module1.ui_set_semantic_label(handle, ptr, len);
      },
      ui_set_box_style(handle, bgColor, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius, borderWidth, borderColor, borderStyle, borderDashOn, borderDashOff) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_box_style(u64, u32, f32, f32, f32, f32, f32, u32, u32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        bgColor = bgColor >>> 0;
        borderColor = borderColor >>> 0;
        borderStyle = borderStyle >>> 0;
        __module1.ui_set_box_style(handle, bgColor, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius, borderWidth, borderColor, borderStyle, borderDashOn, borderDashOff);
      },
      ui_set_bg_color(handle, color) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_bg_color(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        color = color >>> 0;
        __module1.ui_set_bg_color(handle, color);
      },
      ui_set_layer_effect(handle, opacity, blurSigma, blendMode) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_layer_effect(u64, f32, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        blendMode = blendMode >>> 0;
        __module1.ui_set_layer_effect(handle, opacity, blurSigma, blendMode);
      },
      ui_set_drop_shadow(handle, color, offsetX, offsetY, blurSigma, spread) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_drop_shadow(u64, u32, f32, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        color = color >>> 0;
        __module1.ui_set_drop_shadow(handle, color, offsetX, offsetY, blurSigma, spread);
      },
      ui_set_background_blur(handle, blurSigma) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_background_blur(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_background_blur(handle, blurSigma);
      },
      ui_set_linear_gradient(handle, startX, startY, endX, endY, stopCount) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_linear_gradient(u64, f32, f32, f32, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        stopCount = stopCount >>> 0;
        __module1.ui_set_linear_gradient(handle, startX, startY, endX, endY, stopCount);
      },
      ui_push_linear_gradient_stop(handle, offset, color) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_push_linear_gradient_stop(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        color = color >>> 0;
        __module1.ui_push_linear_gradient_stop(handle, offset, color);
      },
      ui_set_padding(handle, left, top, right, bottom) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_padding(u64, f32, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_padding(handle, left, top, right, bottom);
      },
      ui_set_font(handle, fontId, size) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_font(u64, u32, f32) => void
        handle = BigInt.asUintN(64, handle);
        fontId = fontId >>> 0;
        __module1.ui_set_font(handle, fontId, size);
      },
      ui_set_text_color(handle, color) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text_color(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        color = color >>> 0;
        __module1.ui_set_text_color(handle, color);
      },
      ui_node_remove_child(parent, child) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_node_remove_child(u64, u64) => void
        parent = BigInt.asUintN(64, parent);
        child = BigInt.asUintN(64, child);
        __module1.ui_node_remove_child(parent, child);
      },
      ui_set_interactive(handle, interactive) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_interactive(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        interactive = interactive != 0;
        __module1.ui_set_interactive(handle, interactive);
      },
      ui_set_focusable(handle, focusable, tabIndex) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_focusable(u64, bool, i32) => void
        handle = BigInt.asUintN(64, handle);
        focusable = focusable != 0;
        __module1.ui_set_focusable(handle, focusable, tabIndex);
      },
      ui_set_semantic_disabled(handle, hasDisabled, disabled) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_semantic_disabled(u64, bool, bool) => void
        handle = BigInt.asUintN(64, handle);
        hasDisabled = hasDisabled != 0;
        disabled = disabled != 0;
        __module1.ui_set_semantic_disabled(handle, hasDisabled, disabled);
      },
      ui_set_visibility(handle, visibility) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_visibility(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        visibility = visibility >>> 0;
        __module1.ui_set_visibility(handle, visibility);
      },
      ui_node_add_child(parent, child) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_node_add_child(u64, u64) => void
        parent = BigInt.asUintN(64, parent);
        child = BigInt.asUintN(64, child);
        __module1.ui_node_add_child(parent, child);
      },
      ui_push_semantic_scope(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_push_semantic_scope(u64) => u32
        handle = BigInt.asUintN(64, handle);
        return __module1.ui_push_semantic_scope(handle);
      },
      ui_request_focus(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_request_focus(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_request_focus(handle);
      },
      ui_set_semantic_role(handle, role) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_semantic_role(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        role = role >>> 0;
        __module1.ui_set_semantic_role(handle, role);
      },
      ui_set_selectable(handle, selectable, selectionColor) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_selectable(u64, bool, u32) => void
        handle = BigInt.asUintN(64, handle);
        selectable = selectable != 0;
        selectionColor = selectionColor >>> 0;
        __module1.ui_set_selectable(handle, selectable, selectionColor);
      },
      ui_set_position(handle, left, top, right, bottom) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_position(u64, f32, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_position(handle, left, top, right, bottom);
      },
      ui_set_width(handle, value, unit) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_width(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit = unit >>> 0;
        __module1.ui_set_width(handle, value, unit);
      },
      ui_set_height(handle, value, unit) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_height(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit = unit >>> 0;
        __module1.ui_set_height(handle, value, unit);
      },
      ui_get_bounds(handle, outX, outY, outWidth, outHeight) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_get_bounds(u64, usize, usize, usize, usize) => bool
        handle = BigInt.asUintN(64, handle);
        outX = outX >>> 0;
        outY = outY >>> 0;
        outWidth = outWidth >>> 0;
        outHeight = outHeight >>> 0;
        return __module1.ui_get_bounds(handle, outX, outY, outWidth, outHeight) ? 1 : 0;
      },
      ui_set_flex_direction(handle, direction) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_flex_direction(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        direction = direction >>> 0;
        __module1.ui_set_flex_direction(handle, direction);
      },
      ui_set_justify_content(handle, justify) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_justify_content(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        justify = justify >>> 0;
        __module1.ui_set_justify_content(handle, justify);
      },
      ui_set_align_items(handle, align) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_align_items(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        align = align >>> 0;
        __module1.ui_set_align_items(handle, align);
      },
      ui_set_margin(handle, left, top, right, bottom) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_margin(u64, f32, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_margin(handle, left, top, right, bottom);
      },
      ui_set_clip_to_bounds(handle, clip) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_clip_to_bounds(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        clip = clip != 0;
        __module1.ui_set_clip_to_bounds(handle, clip);
      },
      ui_set_position_type(handle, positionType) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_position_type(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        positionType = positionType >>> 0;
        __module1.ui_set_position_type(handle, positionType);
      },
      ui_remove_semantic_scope(token) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_remove_semantic_scope(u32) => void
        token = token >>> 0;
        __module1.ui_remove_semantic_scope(token);
      },
      ui_set_semantic_expanded(handle, hasExpanded, expanded) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_semantic_expanded(u64, bool, bool) => void
        handle = BigInt.asUintN(64, handle);
        hasExpanded = hasExpanded != 0;
        expanded = expanded != 0;
        __module1.ui_set_semantic_expanded(handle, hasExpanded, expanded);
      },
      ui_request_semantic_announcement(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_request_semantic_announcement(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_request_semantic_announcement(handle);
      },
      ui_set_fill_width(handle, fill) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_fill_width(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        fill = fill != 0;
        __module1.ui_set_fill_width(handle, fill);
      },
      ui_set_semantic_selected(handle, hasSelected, selected) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_semantic_selected(u64, bool, bool) => void
        handle = BigInt.asUintN(64, handle);
        hasSelected = hasSelected != 0;
        selected = selected != 0;
        __module1.ui_set_semantic_selected(handle, hasSelected, selected);
      },
      ui_set_fill_height(handle, fill) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_fill_height(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        fill = fill != 0;
        __module1.ui_set_fill_height(handle, fill);
      },
      ui_set_text_limits(handle, maxChars, maxLines) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text_limits(u64, i32, i32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_text_limits(handle, maxChars, maxLines);
      },
      ui_set_text_wrapping(handle, wrap) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text_wrapping(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        wrap = wrap != 0;
        __module1.ui_set_text_wrapping(handle, wrap);
      },
      ui_set_text_overflow_fade(handle, horizontal, vertical) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text_overflow_fade(u64, bool, bool) => void
        handle = BigInt.asUintN(64, handle);
        horizontal = horizontal != 0;
        vertical = vertical != 0;
        __module1.ui_set_text_overflow_fade(handle, horizontal, vertical);
      },
      ui_set_text_vertical_align(handle, align) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text_vertical_align(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        align = align >>> 0;
        __module1.ui_set_text_vertical_align(handle, align);
      },
      ui_set_show_scrollbars(handle, showScrollbars) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_show_scrollbars(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        showScrollbars = showScrollbars != 0;
        __module1.ui_set_show_scrollbars(handle, showScrollbars);
      },
      ui_set_scroll_offset(handle, offsetX, offsetY) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_scroll_offset(u64, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_scroll_offset(handle, offsetX, offsetY);
      },
      ui_set_scroll_enabled(handle, enabledX, enabledY) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_scroll_enabled(u64, bool, bool) => void
        handle = BigInt.asUintN(64, handle);
        enabledX = enabledX != 0;
        enabledY = enabledY != 0;
        __module1.ui_set_scroll_enabled(handle, enabledX, enabledY);
      },
      ui_set_scroll_proxy_target(handle, scrollHandle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_scroll_proxy_target(u64, u64) => void
        handle = BigInt.asUintN(64, handle);
        scrollHandle = BigInt.asUintN(64, scrollHandle);
        __module1.ui_set_scroll_proxy_target(handle, scrollHandle);
      },
      ui_delete_node(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_delete_node(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_delete_node(handle);
      },
      ui_set_semantic_checked(handle, checkedState) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_semantic_checked(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        checkedState = checkedState >>> 0;
        __module1.ui_set_semantic_checked(handle, checkedState);
      },
      ui_set_semantic_value_range(handle, hasValueRange, valueNow, valueMin, valueMax) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_semantic_value_range(u64, bool, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        hasValueRange = hasValueRange != 0;
        __module1.ui_set_semantic_value_range(handle, hasValueRange, valueNow, valueMin, valueMax);
      },
      ui_set_semantic_orientation(handle, orientation) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_semantic_orientation(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        orientation = orientation >>> 0;
        __module1.ui_set_semantic_orientation(handle, orientation);
      },
      ui_set_scroll_content_size(handle, contentWidth, contentHeight) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_scroll_content_size(u64, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_scroll_content_size(handle, contentWidth, contentHeight);
      },
      ui_clear_selection(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_clear_selection(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_clear_selection(handle);
      },
      ui_retarget_selection(fromHandle, toHandle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_retarget_selection(u64, u64) => void
        fromHandle = BigInt.asUintN(64, fromHandle);
        toHandle = BigInt.asUintN(64, toHandle);
        __module1.ui_retarget_selection(fromHandle, toHandle);
      },
      ui_set_node_id(handle, ptr, len) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_node_id(u64, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module1.ui_set_node_id(handle, ptr, len);
      },
      ui_set_image_nine(handle, textureId, insetLeft, insetTop, insetRight, insetBottom) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_image_nine(u64, u32, f32, f32, f32, f32) => void
        handle = BigInt.asUintN(64, handle);
        textureId = textureId >>> 0;
        __module1.ui_set_image_nine(handle, textureId, insetLeft, insetTop, insetRight, insetBottom);
      },
      ui_set_image(handle, textureId, objectFit) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_image(u64, u32, u32) => void
        handle = BigInt.asUintN(64, handle);
        textureId = textureId >>> 0;
        objectFit = objectFit >>> 0;
        __module1.ui_set_image(handle, textureId, objectFit);
      },
      ui_set_svg(handle, svgId, tintColor) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_svg(u64, u32, u32) => void
        handle = BigInt.asUintN(64, handle);
        svgId = svgId >>> 0;
        tintColor = tintColor >>> 0;
        __module1.ui_set_svg(handle, svgId, tintColor);
      },
      ui_set_is_shared_size_scope(handle, isScope) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_is_shared_size_scope(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        isScope = isScope != 0;
        __module1.ui_set_is_shared_size_scope(handle, isScope);
      },
      ui_grid_set_column_shared_size_group(handle, index, ptr, len) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_grid_set_column_shared_size_group(u64, u32, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        index = index >>> 0;
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module1.ui_grid_set_column_shared_size_group(handle, index, ptr, len);
      },
      ui_set_text_overflow(handle, overflow) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text_overflow(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        overflow = overflow >>> 0;
        __module1.ui_set_text_overflow(handle, overflow);
      },
      ui_set_text_align(handle, align) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text_align(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        align = align >>> 0;
        __module1.ui_set_text_align(handle, align);
      },
      ui_create_node(type) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_create_node(u32) => u64
        type = type >>> 0;
        return __module1.ui_create_node(type) || 0n;
      },
      ui_set_is_portal(handle, flag) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_is_portal(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        flag = flag != 0;
        __module1.ui_set_is_portal(handle, flag);
      },
      ui_set_fill_width_percent(handle, percent) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_fill_width_percent(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_fill_width_percent(handle, percent);
      },
      ui_set_fill_height_percent(handle, percent) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_fill_height_percent(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_fill_height_percent(handle, percent);
      },
      ui_set_min_width(handle, value, unit) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_min_width(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit = unit >>> 0;
        __module1.ui_set_min_width(handle, value, unit);
      },
      ui_set_max_width(handle, value, unit) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_max_width(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit = unit >>> 0;
        __module1.ui_set_max_width(handle, value, unit);
      },
      ui_set_min_height(handle, value, unit) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_min_height(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit = unit >>> 0;
        __module1.ui_set_min_height(handle, value, unit);
      },
      ui_set_max_height(handle, value, unit) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_max_height(u64, f32, u32) => void
        handle = BigInt.asUintN(64, handle);
        unit = unit >>> 0;
        __module1.ui_set_max_height(handle, value, unit);
      },
      ui_set_flex_basis(handle, basis) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_flex_basis(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_flex_basis(handle, basis);
      },
      ui_set_align_self(handle, align) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_align_self(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        align = align >>> 0;
        __module1.ui_set_align_self(handle, align);
      },
      ui_set_root(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_root(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_root(handle);
      },
      ui_is_point_in_selection(x, y) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_is_point_in_selection(f32, f32) => bool
        return __module1.ui_is_point_in_selection(x, y) ? 1 : 0;
      },
      ui_has_text_selection(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_has_text_selection(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module1.ui_has_text_selection(handle) ? 1 : 0;
      },
      ui_can_undo_text_edit(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_can_undo_text_edit(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module1.ui_can_undo_text_edit(handle) ? 1 : 0;
      },
      ui_can_redo_text_edit(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_can_redo_text_edit(u64) => bool
        handle = BigInt.asUintN(64, handle);
        return __module1.ui_can_redo_text_edit(handle) ? 1 : 0;
      },
      ui_set_editable(handle, editable) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_editable(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        editable = editable != 0;
        __module1.ui_set_editable(handle, editable);
      },
      ui_set_caret_color(handle, color) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_caret_color(u64, u32) => void
        handle = BigInt.asUintN(64, handle);
        color = color >>> 0;
        __module1.ui_set_caret_color(handle, color);
      },
      ui_set_text_style_runs(handle, runCount, runsWordsPtr) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text_style_runs(u64, u32, usize) => void
        handle = BigInt.asUintN(64, handle);
        runCount = runCount >>> 0;
        runsWordsPtr = runsWordsPtr >>> 0;
        __module1.ui_set_text_style_runs(handle, runCount, runsWordsPtr);
      },
      ui_set_line_height(handle, lineHeight) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_line_height(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_line_height(handle, lineHeight);
      },
      ui_set_text_obscured(handle, obscured) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text_obscured(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        obscured = obscured != 0;
        __module1.ui_set_text_obscured(handle, obscured);
      },
      ui_grid_set_columns(handle, count, valuesPtr, typesPtr) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_grid_set_columns(u64, u32, usize, usize) => void
        handle = BigInt.asUintN(64, handle);
        count = count >>> 0;
        valuesPtr = valuesPtr >>> 0;
        typesPtr = typesPtr >>> 0;
        __module1.ui_grid_set_columns(handle, count, valuesPtr, typesPtr);
      },
      ui_grid_set_rows(handle, count, valuesPtr, typesPtr) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_grid_set_rows(u64, u32, usize, usize) => void
        handle = BigInt.asUintN(64, handle);
        count = count >>> 0;
        valuesPtr = valuesPtr >>> 0;
        typesPtr = typesPtr >>> 0;
        __module1.ui_grid_set_rows(handle, count, valuesPtr, typesPtr);
      },
      ui_grid_set_row_shared_size_group(handle, index, ptr, len) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_grid_set_row_shared_size_group(u64, u32, usize, u32) => void
        handle = BigInt.asUintN(64, handle);
        index = index >>> 0;
        ptr = ptr >>> 0;
        len = len >>> 0;
        __module1.ui_grid_set_row_shared_size_group(handle, index, ptr, len);
      },
      ui_node_set_grid_placement(handle, row, col, rowSpan, colSpan) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_node_set_grid_placement(u64, u32, u32, u32, u32) => void
        handle = BigInt.asUintN(64, handle);
        row = row >>> 0;
        col = col >>> 0;
        rowSpan = rowSpan >>> 0;
        colSpan = colSpan >>> 0;
        __module1.ui_node_set_grid_placement(handle, row, col, rowSpan, colSpan);
      },
      ui_set_selection_area_barrier(handle, isBarrier) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_selection_area_barrier(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        isBarrier = isBarrier != 0;
        __module1.ui_set_selection_area_barrier(handle, isBarrier);
      },
      ui_set_selection_area(handle, isArea) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_selection_area(u64, bool) => void
        handle = BigInt.asUintN(64, handle);
        isArea = isArea != 0;
        __module1.ui_set_selection_area(handle, isArea);
      },
      ui_set_scroll_friction(handle, friction) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_scroll_friction(u64, f32) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_set_scroll_friction(handle, friction);
      },
      ui_copy_text_selection(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_copy_text_selection(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_copy_text_selection(handle);
      },
      ui_undo_text_edit(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_undo_text_edit(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_undo_text_edit(handle);
      },
      ui_redo_text_edit(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_redo_text_edit(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_redo_text_edit(handle);
      },
      ui_cut_text_selection(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_cut_text_selection(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_cut_text_selection(handle);
      },
      ui_paste_text(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_paste_text(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_paste_text(handle);
      },
      ui_select_all_text(handle) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_select_all_text(u64) => void
        handle = BigInt.asUintN(64, handle);
        __module1.ui_select_all_text(handle);
      },
      ui_set_text_selection_range(handle, selectionStart, selectionEnd) {
        // ~lib/@effindomv2/fui-as/src/core/ffi/ui_set_text_selection_range(u64, u32, u32) => void
        handle = BigInt.asUintN(64, handle);
        selectionStart = selectionStart >>> 0;
        selectionEnd = selectionEnd >>> 0;
        __module1.ui_set_text_selection_range(handle, selectionStart, selectionEnd);
      },
    }, __module1),
    fui_fetch_host: Object.setPrototypeOf({
      fui_fetch_cancel(requestId) {
        // ~lib/@effindomv2/fui-as/src/core/FetchFfi/fui_fetch_cancel(u32) => void
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
    __fui_on_key_event(eventType, keyPtr, keyLen, modifiers) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_key_event(u32, usize, u32, u32) => bool
      return exports.__fui_on_key_event(eventType, keyPtr, keyLen, modifiers) != 0;
    },
    __fui_on_pointer_event(eventType, handle, x, y, modifiers) {
      // ~lib/@effindomv2/fui-as/src/core/event_exports/__fui_on_pointer_event(u32, u64, f32, f32, u32?) => void
      handle = handle || 0n;
      exports.__setArgumentsLength(arguments.length);
      exports.__fui_on_pointer_event(eventType, handle, x, y, modifiers);
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
    onAppClockTick(callback) {
      // src/host/generated/HostEvents/onAppClockTick(~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<i32> | null) => void
      callback = __lowerRecord50(callback);
      exports.onAppClockTick(callback);
    },
  }, exports);
  function __lowerRecord50(value) {
    // ~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<i32>
    // Hint: Opt-out from lowering as a record by providing an empty constructor
    if (value == null) return 0;
    const pointer = exports.__pin(exports.__new(0, 50));
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
  __fui_on_key_event,
  __fui_on_pointer_event,
  __fui_on_route_changed,
  __fui_on_scroll,
  __fui_on_selection_changed,
  __fui_on_system_dark_mode_changed,
  __fui_on_text_changed,
  __fui_on_text_replaced,
  __fui_on_timer,
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
))(new URL("home.wasm", import.meta.url));
function __maybeDefault(module) {
  return typeof module.default === "object" && Object.keys(module).length == 1
    ? module.default
    : module;
}

import {
  AlignItems,
  BorderStyle,
  Column,
  CursorStyle,
  DragDataObject,
  DragDropEffects,
  DragEventArgs,
  DropProposal,
  FlexBox,
  FlexDirection,
  JustifyContent,
  Portal,
  Row,
  ScrollBarVisibility,
  ScrollBox,
  ScrollState,
  SemanticRole,
  Theme,
  Unit,
  Visibility,
  activeTheme,
  cancelTimer,
  Disposable,
  disposeAll,
  scheduleTimer,
} from "../../fui/Fui";
import { clearCurrentSelection } from "../../fui/FuiPrimitives";
import { DemoText, DemoTextStyle } from "../shared/design-system/DemoText";
import { applyRowBackground } from "../shared/design-system/DemoRowBackground";
import { changeColorAlpha } from "../shared/ColorUtils";
import {
  REORDER_DRAG_FORMAT,
  REORDER_MARKER_HEIGHT,
  REORDER_ROW_BODY_HEIGHT,
  REORDER_VIEWPORT_HEIGHT,
  ReorderItem,
  ReorderVisibleRange,
  computeContentHeight,
  computeReorderVisibleRange,
  computeNextReorderAutoScrollOffset,
  computeReorderEdgeAutoScrollDirection,
  computeReorderEdgeInsertionIndex,
  computeReorderPointerAutoScrollDelta,
  computeReorderAutoScrollStep,
  createReorderItems,
  findItemIndex,
  moveReorderItem,
  normalizeReorderInsertionIndex,
} from "./ReorderLogic";

const AUTOSCROLL_TIMER_ID: u32 = 4101;
const AUTOSCROLL_DELAY_MS: i32 = 16;
const PREVIEW_WIDTH_PX: f32 = 272.0;
const PREVIEW_HEIGHT_PX: f32 = 116.0;
const PREVIEW_OFFSET_X_PX: f32 = 2.0;
const PREVIEW_OFFSET_Y_PX: f32 = 2.0;
const PREVIEW_MARGIN_PX: f32 = 12.0;

let activeAutoScrollController: ReorderSection | null = null;

function verticalSpacer(height: f32): FlexBox {
  return new FlexBox().fillWidth().height(height, Unit.Pixel);
}

function rowDragData(owner: ReorderRowView): DragDataObject | null {
  return owner.provideDragData();
}

function rowDragCompleted(owner: ReorderRowView, effect: DragDropEffects): void {
  owner.handleDragCompleted(effect);
}

function rowDragOver(owner: ReorderRowView, args: DragEventArgs): DropProposal {
  return owner.handleDragOver(args);
}

function rowDragLeave(owner: ReorderRowView, args: DragEventArgs): void {
  owner.handleDragLeave(args);
}

function rowDrop(owner: ReorderRowView, args: DragEventArgs): void {
  owner.handleDrop(args);
}

function reorderAutoScrollTimer(): void {
  const controller = activeAutoScrollController;
  if (controller !== null) {
    controller.handleAutoScrollTimer();
  }
}

class ReorderRowView {
  readonly marker: FlexBox = new FlexBox()
    .fillWidth()
    .height(REORDER_MARKER_HEIGHT, Unit.Pixel)
    .cornerRadius(REORDER_MARKER_HEIGHT * 0.5)
    .opacity(0.0) as FlexBox;
  readonly gripLabel: DemoText = new DemoText("\u2630", DemoTextStyle.Body)
    .selectable(false)
    .cursor(CursorStyle.Grab) as DemoText;
  readonly grip!: FlexBox;
  readonly titleText: DemoText = new DemoText("", DemoTextStyle.Body) as DemoText;
  readonly detailText: DemoText = new DemoText("", DemoTextStyle.Caption)
    .maxLines(2) as DemoText;
  readonly card!: FlexBox;
  readonly slot!: FlexBox;

  private currentItem: ReorderItem | null = null;
  private pendingDragItemId: string | null = null;

  constructor(readonly controller: ReorderSection, readonly rawIndex: i32) {
    const gripBody = new FlexBox()
      .width(36.0, Unit.Pixel)
      .height(40.0, Unit.Pixel)
      .justifyContent(JustifyContent.Center)
      .alignItems(AlignItems.Center)
      .child(this.gripLabel) as FlexBox;
    this.grip = gripBody
      .cursor(CursorStyle.Grab)
      .bindDragData<ReorderRowView>(this, rowDragData)
      .dragAllowedEffects(DragDropEffects.Move)
      .onDragCompletedWith<ReorderRowView>(this, rowDragCompleted) as FlexBox;

    const textColumn = Column(
      this.titleText,
      verticalSpacer(4.0),
      this.detailText,
    ).fillWidth();

    this.card = new FlexBox()
      .fillWidth()
      .height(REORDER_ROW_BODY_HEIGHT, Unit.Pixel)
      .padding(16.0, 14.0, 16.0, 14.0)
      .cornerRadius(18.0)
      .child(
        Row(
          this.grip,
          new FlexBox().width(8.0, Unit.Pixel).height(1.0, Unit.Pixel),
          textColumn,
        ).fillWidth(),
      ) as FlexBox;

    this.slot = new FlexBox()
      .fillWidth()
      .flexDirection(FlexDirection.Column)
      .allowDrop(true)
      .onDragEnterWith<ReorderRowView>(this, rowDragOver)
      .onDragOverWith<ReorderRowView>(this, rowDragOver)
      .onDragLeaveWith<ReorderRowView>(this, rowDragLeave)
      .onDropWith<ReorderRowView>(this, rowDrop) as FlexBox;
    this.slot.child(this.marker).child(this.card);
  }

  get itemId(): string | null {
    const item = this.currentItem;
    return item === null ? null : item.id;
  }

  bindItem(item: ReorderItem): void {
    this.currentItem = item;
    this.titleText.text(item.label);
    this.detailText.text(item.detail);
  }

  provideDragData(): DragDataObject | null {
    const item = this.currentItem;
    if (item === null) {
      return null;
    }
    this.pendingDragItemId = item.id;
    return this.controller.beginDrag(item);
  }

  handleDragCompleted(effect: DragDropEffects): void {
    const draggedItemId = this.pendingDragItemId;
    this.pendingDragItemId = null;
    if (draggedItemId !== null) {
      this.controller.completeDrag(draggedItemId, effect);
    }
  }

  handleDragOver(args: DragEventArgs): DropProposal {
    return this.controller.previewInsertion(args, this.rawIndex);
  }

  handleDragLeave(args: DragEventArgs): void {
    this.controller.handleTargetLeave(args);
  }

  handleDrop(args: DragEventArgs): void {
    this.controller.dropAtPreview(args);
  }

  applyTheme(theme: Theme, activeSourceId: string | null, rawInsertionIndex: i32): void {
    const item = this.currentItem;
    const isSource = item !== null && item.id == activeSourceId;
    const markerVisible = rawInsertionIndex == this.rawIndex;
    this.marker
      .bgColor(theme.colors.accent)
      .opacity(markerVisible ? 1.0 : 0.0);
    if (isSource) {
      this.marker.visibility(Visibility.Collapsed);
      this.card.visibility(Visibility.Collapsed);
    } else {
      this.marker.visibility(Visibility.Normal);
      this.card.visibility(Visibility.Normal);
      applyRowBackground(this.card, this.rawIndex, theme);
    }
    this.card.border(1.0, isSource ? theme.colors.accent : theme.colors.border, BorderStyle.Solid);
    this.titleText.textColor(isSource ? theme.colors.surface : theme.colors.textPrimary);
    this.detailText.textColor(isSource ? theme.colors.surface : theme.colors.textMuted);
    this.grip.cursor(isSource ? CursorStyle.Grabbing : CursorStyle.Grab);
    this.gripLabel
      .textColor(isSource ? theme.colors.surface : theme.colors.textPrimary)
      .cursor(isSource ? CursorStyle.Grabbing : CursorStyle.Grab);
  }
}

export class ReorderSection {
  rows: Array<ReorderRowView> = new Array<ReorderRowView>();
  readonly items: Array<ReorderItem> = createReorderItems();
  readonly disposables: Array<Disposable> = new Array<Disposable>();
  readonly scrollContent: FlexBox = new FlexBox()
    .fillWidth()
    .flexDirection(FlexDirection.Column);
  readonly scrollBox: ScrollBox = new ScrollBox(new ScrollState())
    .scrollEnabledX(false)
    .scrollEnabledY(true)
    .verticalScrollbarVisibility(ScrollBarVisibility.Always)
    .horizontalScrollbarVisibility(ScrollBarVisibility.Never)
    .fillWidth()
    .height(REORDER_VIEWPORT_HEIGHT, Unit.Pixel)
    .child(this.scrollContent) as ScrollBox;
  readonly orderStatusText: DemoText = new DemoText("", DemoTextStyle.Body) as DemoText;
  readonly dragStatusText: DemoText = new DemoText("", DemoTextStyle.Caption) as DemoText;
  readonly viewportStatusText: DemoText = new DemoText("", DemoTextStyle.Caption) as DemoText;
  readonly previewTitleText: DemoText = new DemoText("", DemoTextStyle.Body) as DemoText;
  readonly previewDetailText: DemoText = new DemoText("", DemoTextStyle.Caption)
    .maxLines(2) as DemoText;
  readonly previewGhost: FlexBox = new FlexBox()
    .positionAbsolute()
    .width(350.0, Unit.Pixel)
    .padding(16.0, 14.0, 16.0, 14.0)
    .cornerRadius(18.0)
    .child(
      Row(
        new DemoText("\u2630", DemoTextStyle.Body).selectable(false).width(36.0, Unit.Pixel) as DemoText,
        new FlexBox().width(8.0, Unit.Pixel).height(1.0, Unit.Pixel),
        Column(
          this.previewTitleText,
          verticalSpacer(4.0),
          this.previewDetailText,
        ).fillWidth(),
      ).fillWidth() as FlexBox,
    )
    .opacity(0.0)
    .semanticRole(SemanticRole.StaticText) as FlexBox;
  readonly previewPortal: Portal = new Portal()
    .positionAbsolute()
    .position(0.0, 0.0)
    .fillSize()
    .child(this.previewGhost) as Portal;
  readonly hintText: DemoText = new DemoText(
    "Drag a grip to reorder the list. Grip highlights the source row while dragging. Drop indicators mark the insertion point between rows.",
    DemoTextStyle.BodySecondary,
  )
    .maxLines(4) as DemoText;
  readonly endMarker: FlexBox = new FlexBox()
    .fillWidth()
    .height(REORDER_MARKER_HEIGHT, Unit.Pixel)
    .cornerRadius(REORDER_MARKER_HEIGHT * 0.5)
    .opacity(0.0) as FlexBox;
  endDropZone: FlexBox = new FlexBox()
    .fillWidth()
    .height(44.0, Unit.Pixel)
    .allowDrop(true)
    .onDragEnterWith<ReorderSection>(this, reorderEndDragOver)
    .onDragOverWith<ReorderSection>(this, reorderEndDragOver)
    .onDragLeaveWith<ReorderSection>(this, reorderEndDragLeave)
    .onDropWith<ReorderSection>(this, reorderEndDrop) as FlexBox;

  readonly statusText: DemoText = new DemoText("", DemoTextStyle.Caption) as DemoText;
  sectionBody!: FlexBox;
  sectionRoot!: FlexBox;

  private activeDragItemId: string | null = null;
  private rawInsertionIndex: i32 = -1;
  private autoScrollDeltaY: f32 = 0.0;
  private dragStatusMessage: string = "idle";
  private previewPointerX: f32 = NaN;
  private previewPointerY: f32 = NaN;
  private ghostCardWidth: f32 = 0.0;

  constructor() {
    (this.scrollBox as ScrollBox).verticalScrollBar.trackCornerRadius(8.0);
    (this.scrollBox as ScrollBox).verticalScrollBar.thumbCornerRadius(8.0);

    for (let index = 0; index < this.items.length; index += 1) {
      const row = new ReorderRowView(this, index);
      row.bindItem(unchecked(this.items[index]));
      this.rows.push(row);
      this.scrollContent.child(row.slot);
    }

    this.endDropZone.child(this.endMarker);
    this.endDropZone.child(
      new FlexBox()
        .fillWidth()
        .height(36.0, Unit.Pixel)
        .cornerRadius(14.0)
        .justifyContent(JustifyContent.Center)
        .alignItems(AlignItems.Center)
        .child(
          new DemoText("Drop at end of reorder list", DemoTextStyle.Caption),
        ),
    );
    this.scrollContent.child(this.endDropZone);
    const sb = this.scrollBox as ScrollBox;
    sb.scrollContentSize(-1.0, -1.0);

    this.sectionBody = Column(
      this.scrollBox,
      verticalSpacer(14.0),
      this.orderStatusText,
      verticalSpacer(6.0),
      this.dragStatusText,
      verticalSpacer(6.0),
      this.viewportStatusText,
      verticalSpacer(10.0),
      this.hintText,
    ).width(600.0, Unit.Pixel) as FlexBox;

    this.sectionRoot = new FlexBox()
      .fillWidth()
      .clipToBounds(false)
      .child(this.sectionBody) as FlexBox;
    this.sectionRoot.child(this.previewPortal);

    this.syncAll();
  }

  dispose(): void {
    this.stopAutoScroll();
    if (activeAutoScrollController === this) {
      activeAutoScrollController = null;
    }
    disposeAll(this.disposables);
  }

  beginDrag(item: ReorderItem): DragDataObject {
    clearCurrentSelection();
    this.activeDragItemId = item.id;
    const sourceIndex = findItemIndex(this.items, item.id);
    this.rawInsertionIndex = sourceIndex >= 0 ? sourceIndex : -1;
    this.previewPointerX = NaN;
    this.previewPointerY = NaN;
    // Capture source card width for ghost sizing
    if (sourceIndex >= 0 && sourceIndex < this.rows.length) {
      const sourceCard = unchecked(this.rows[sourceIndex]).card;
      const cardBounds = sourceCard.getBounds();
      this.ghostCardWidth = unchecked(cardBounds[2]);
    }
    this.dragStatusMessage = "dragging " + item.label;
    this.statusText.text("Dragging: " + item.label);
    this.syncAll();
    return new DragDataObject().setFormat(REORDER_DRAG_FORMAT, item.id);
  }

  completeDrag(itemId: string, effect: DragDropEffects): void {
    const item = this.findItem(itemId);
    const itemLabel = item === null ? "item" : item.label;
    this.activeDragItemId = null;
    this.rawInsertionIndex = -1;
    this.previewPointerX = NaN;
    this.previewPointerY = NaN;
    this.stopAutoScroll();
    if (effect == DragDropEffects.Move) {
      const newIndex = findItemIndex(this.items, itemId);
      this.dragStatusMessage = "moved " + itemLabel + " to slot " + (newIndex + 1).toString();
      this.statusText.text("Moved " + itemLabel + " to position " + (newIndex + 1).toString());
    } else {
      this.dragStatusMessage = "cancelled " + itemLabel;
      this.statusText.text("Drag cancelled");
    }
    this.syncAll();
  }

  previewInsertion(args: DragEventArgs, rawInsertionIndex: i32): DropProposal {
    const itemId = this.readDraggedItemId(args);
    if (itemId === null || findItemIndex(this.items, itemId) < 0) {
      this.stopAutoScroll();
      return DropProposal.none();
    }
    this.activeDragItemId = itemId;
    this.rawInsertionIndex = rawInsertionIndex;
    this.setAutoScrollDelta(this.computePointerAutoScrollDelta(args.y));
    const normalizedIndex = normalizeReorderInsertionIndex(
      findItemIndex(this.items, itemId), rawInsertionIndex, this.items.length);
    this.previewPointerX = args.x;
    this.previewPointerY = args.y;
    this.dragStatusMessage = "preview slot " + (normalizedIndex + 1).toString();
    this.statusText.text("Insert at position " + (normalizedIndex + 1).toString());
    this.syncAll();
    return new DropProposal(DragDropEffects.Move, true);
  }

  handleTargetLeave(args: DragEventArgs): void {
    if (this.activeDragItemId === null) {
      return;
    }
    this.previewPointerX = args.x;
    this.previewPointerY = args.y;
    const visibleRange = this.readVisibleRange();
    this.setAutoScrollDelta(this.computePointerAutoScrollDelta(args.y));
    if (this.autoScrollDeltaY == 0.0) {
      this.rawInsertionIndex = -1;
      this.dragStatusMessage = "dragging " + this.activeDragLabel();
    } else {
      const direction = this.autoScrollDeltaY < 0.0 ? -1 : 1;
      const insertionIndex = computeReorderEdgeInsertionIndex(direction, this.items.length, visibleRange);
      if (insertionIndex >= 0) {
        this.rawInsertionIndex = insertionIndex;
        this.dragStatusMessage = "autoscroll " + (direction < 0 ? "up" : "down");
      }
    }
    this.syncAll();
  }

  dropAtPreview(args: DragEventArgs): void {
    const draggedItemId = this.readDraggedItemId(args);
    if (draggedItemId === null || this.rawInsertionIndex < 0) {
      return;
    }
    const normalizedIndex = normalizeReorderInsertionIndex(
      findItemIndex(this.items, draggedItemId),
      this.rawInsertionIndex,
      this.items.length,
    );
    if (moveReorderItem(this.items, draggedItemId, this.rawInsertionIndex)) {
      this.rebuildScrollContent();
      this.statusText.text("Moved to position " + (normalizedIndex + 1).toString());
    }
    this.rawInsertionIndex = -1;
  }

  handleAutoScrollTimer(): void {
    if (this.activeDragItemId === null || this.autoScrollDeltaY == 0.0) {
      this.stopAutoScroll();
      return;
    }
    const viewportHeight = this.readViewportHeight();
    const nextOffset = computeNextReorderAutoScrollOffset(
      (this.scrollBox as ScrollBox).scrollState.offsetY.value,
      this.autoScrollDeltaY,
      this.items.length,
      viewportHeight,
    );
    if (nextOffset == (this.scrollBox as ScrollBox).scrollState.offsetY.value) {
      this.stopAutoScroll();
      return;
    }
    (this.scrollBox as ScrollBox).scrollOffset(0.0, nextOffset);
    const visibleRange = this.readVisibleRange();
    const direction = this.autoScrollDeltaY < 0.0 ? -1 : 1;
    this.rawInsertionIndex = computeReorderEdgeInsertionIndex(direction, this.items.length, visibleRange);
    this.dragStatusMessage = "auto-scrolling " + (direction < 0 ? "up" : "down");
    this.syncAll();
    this.armAutoScrollTimer();
  }

  syncTheme(theme: Theme): void {
    this.syncAll();
  }

  private syncAll(): void {
    const theme = activeTheme.value;
    // ScrollBox theme handled inline
    for (let index = 0; index < this.rows.length; index += 1) {
      unchecked(this.rows[index]).applyTheme(theme, this.activeDragItemId, this.rawInsertionIndex);
    }
    this.endMarker
      .bgColor(theme.colors.accent)
      .opacity(this.rawInsertionIndex == this.items.length ? 1.0 : 0.0);
    this.endDropZone
      .bgColor(changeColorAlpha(theme.colors.accent, 0x08))
      .border(1.0, theme.colors.border, BorderStyle.Solid);

    this.orderStatusText.textColor(theme.colors.textPrimary);
    this.dragStatusText.textColor(theme.colors.textMuted);
    this.viewportStatusText.textColor(theme.colors.textMuted);

    this.previewGhost
      .bgColor(theme.colors.surface)
      .border(1.0, theme.colors.accent, BorderStyle.Solid);
    this.previewTitleText.textColor(theme.colors.textPrimary);
    this.previewDetailText.textColor(theme.colors.textMuted);

    let orderStr = "";
    for (let idx = 0; idx < this.items.length; idx += 1) {
      if (idx > 0) { orderStr += ", "; }
      orderStr += unchecked(this.items[idx]).id;
    }
    this.orderStatusText.text("Order: " + orderStr);
    this.dragStatusText.text("Drag status: " + this.dragStatusMessage);
    this.syncViewportStatus();

    this.syncPreviewGhost();
  }

  private syncPreviewGhost(): void {
    const dragId = this.activeDragItemId;
    const item = dragId !== null ? this.findItem(changetype<string>(dragId)) : null;
    if (item === null || isNaN(this.previewPointerX) || isNaN(this.previewPointerY)) {
      this.previewGhost.visibility(1 /* Hidden */);
      this.previewGhost.opacity(0.0);
      return;
    }
    this.previewTitleText.text(item.label);
    this.previewDetailText.text(item.detail);
    const cardW = this.ghostCardWidth > 0.0
      ? this.ghostCardWidth
      : PREVIEW_WIDTH_PX;
    const pointerLocal = this.sectionRoot.absoluteToLocalPosition(this.previewPointerX, this.previewPointerY);
    const pointerLocalX = unchecked(pointerLocal[0]);
    const pointerLocalY = unchecked(pointerLocal[1]);
    const maxX = Math.max(PREVIEW_MARGIN_PX, cardW);
    const minY = PREVIEW_MARGIN_PX;
    const previewX = <f32>Math.max(PREVIEW_MARGIN_PX, Math.min(maxX, pointerLocalX + PREVIEW_OFFSET_X_PX));
    const previewY = <f32>Math.max(minY, pointerLocalY + PREVIEW_OFFSET_Y_PX);
    this.previewGhost.width(cardW, Unit.Pixel);
    this.previewGhost.position(previewX, previewY);
    this.previewGhost.visibility(0 /* Normal */);
    this.previewGhost.opacity(0.85);
  }

  private syncViewportStatus(): void {
    const sb = this.scrollBox as ScrollBox;
    const offsetY = sb.scrollState.offsetY.value;
    const viewH = sb.scrollState.viewportHeight.value;
    const contentH = computeContentHeight(this.items.length);
    this.viewportStatusText.text(
      "Viewport: offset=" + offsetY.toString() +
      " viewH=" + viewH.toString() +
      " content=" + contentH.toString(),
    );
  }

  private rebuildScrollContent(): void {
    this.rows = new Array<ReorderRowView>();
    // Clear by removing all children
    while (this.scrollContent.childCount > 0) {
      const child = this.scrollContent.getChildAt(0);
      if (child !== null) {
        this.scrollContent.removeChildNode(child);
      }
    }
    for (let index = 0; index < this.items.length; index += 1) {
      const row = new ReorderRowView(this, index);
      row.bindItem(unchecked(this.items[index]));
      this.rows.push(row);
      this.scrollContent.child(row.slot);
    }
    this.endDropZone = new FlexBox()
      .fillWidth()
      .height(44.0, Unit.Pixel)
      .allowDrop(true)
      .onDragEnterWith<ReorderSection>(this, reorderEndDragOver)
      .onDragOverWith<ReorderSection>(this, reorderEndDragOver)
      .onDragLeaveWith<ReorderSection>(this, reorderEndDragLeave)
      .onDropWith<ReorderSection>(this, reorderEndDrop) as FlexBox;
    this.endDropZone.child(this.endMarker);
    this.endDropZone.child(
      new FlexBox()
        .fillWidth()
        .height(36.0, Unit.Pixel)
        .cornerRadius(14.0)
        .justifyContent(JustifyContent.Center)
        .alignItems(AlignItems.Center)
        .child(
          new DemoText("Drop at end of reorder list", DemoTextStyle.Caption),
        ),
    );
    this.scrollContent.child(this.endDropZone);
    const sb = this.scrollBox as ScrollBox;
    sb.scrollContentSize(-1.0, -1.0);
  }

  private readDraggedItemId(args: DragEventArgs): string | null {
    const data = args.session.data;
    if (!data.hasFormat(REORDER_DRAG_FORMAT)) {
      return null;
    }
    return data.getFormat(REORDER_DRAG_FORMAT);
  }

  private findItem(itemId: string): ReorderItem | null {
    for (let i = 0; i < this.items.length; i += 1) {
      if (unchecked(this.items[i]).id == itemId) {
        return unchecked(this.items[i]);
      }
    }
    return null;
  }

  private activeDragLabel(): string {
    const dragId = this.activeDragItemId;
    const item = dragId !== null ? this.findItem(changetype<string>(dragId)) : null;
    return item === null ? "unknown" : item.label;
  }

  private readVisibleRange(): ReorderVisibleRange {
    const sb = this.scrollBox as ScrollBox;
    return computeReorderVisibleRange(this.items.length, sb.scrollState.offsetY.value, this.readViewportHeight());
  }

  private readViewportHeight(): f32 {
    const current = (this.scrollBox as ScrollBox).scrollState.viewportHeight.value;
    return current > 0.0 ? current : REORDER_VIEWPORT_HEIGHT;
  }

  private computePointerAutoScrollDelta(pointerY: f32): f32 {
    const bounds = (this.scrollBox as ScrollBox).viewport.getBounds();
    return computeReorderPointerAutoScrollDelta(pointerY, unchecked(bounds[1]), unchecked(bounds[3]));
  }

  private armAutoScrollTimer(): void {
    activeAutoScrollController = this;
    scheduleTimer(AUTOSCROLL_TIMER_ID, AUTOSCROLL_DELAY_MS, reorderAutoScrollTimer);
  }

  private setAutoScrollDelta(delta: f32): void {
    if (this.autoScrollDeltaY == 0.0 && delta != 0.0) {
      this.autoScrollDeltaY = delta;
      this.armAutoScrollTimer();
    } else if (this.autoScrollDeltaY != 0.0 && delta == 0.0) {
      this.autoScrollDeltaY = delta;
      this.stopAutoScroll();
    } else {
      this.autoScrollDeltaY = delta;
    }
  }

  private stopAutoScroll(): void {
    this.autoScrollDeltaY = 0.0;
    cancelTimer(AUTOSCROLL_TIMER_ID);
    if (activeAutoScrollController === this) {
      activeAutoScrollController = null;
    }
  }
}

function reorderEndDragOver(owner: ReorderSection, args: DragEventArgs): DropProposal {
  return owner.previewInsertion(args, owner.items.length);
}

function reorderEndDragLeave(owner: ReorderSection, args: DragEventArgs): void {
  owner.handleTargetLeave(args);
}

function reorderEndDrop(owner: ReorderSection, args: DragEventArgs): void {
  owner.dropAtPreview(args);
}

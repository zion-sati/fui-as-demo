import {
  BorderStyle,
  CursorStyle,
  DragDataObject,
  DragDropEffects,
  DragEventArgs,
  DropProposal,
  FlexBox,
  Theme,
  Unit,
  activeTheme,
} from "../../fui/Fui";
import { DemoText, DemoTextStyle } from "../shared/design-system/DemoText";

export class DragDropSection {
  readonly dragSourceBox: FlexBox = new FlexBox()
    .width(200.0, Unit.Pixel)
    .height(56.0, Unit.Pixel)
    .padding(14.0, 14.0, 14.0, 14.0)
    .cornerRadius(14.0)
    .cursor(CursorStyle.Grab)
    .dragAllowedEffects(DragDropEffects.Move) as FlexBox;
  readonly dropZone: FlexBox = new FlexBox()
    .fillWidth()
    .height(120.0, Unit.Pixel)
    .padding(20.0, 18.0, 20.0, 18.0)
    .cornerRadius(18.0)
    .allowDrop(true) as FlexBox;
  readonly statusText: DemoText = new DemoText("", DemoTextStyle.Caption) as DemoText;
  readonly hintText: DemoText = new DemoText(
    "Drag the source box into the drop zone. The drop zone accepts Move-type drags with a Copy proposal.",
    DemoTextStyle.BodySecondary,
  ) as DemoText;

  readonly dragSourceLabel: DemoText = new DemoText("Drag me", DemoTextStyle.Body) as DemoText;
  readonly dropZoneLabel: DemoText = new DemoText("Drop here", DemoTextStyle.Body) as DemoText;
  dragActive: bool = false;
  dropHover: bool = false;

  constructor() {
    this.dragSourceBox.child(this.dragSourceLabel);
    this.dropZone.child(this.dropZoneLabel);
  }

  attachBindings(): void {
    this.dragSourceBox
      .bindDragData(this, dragSourceDataFn)
      .onDragCompletedWith(this, dragSourceCompletedFn);

    this.dropZone
      .onDragEnterWith(this, dropZoneEnterFn)
      .onDragOverWith(this, dropZoneOverFn)
      .onDragLeaveWith(this, dropZoneLeaveFn)
      .onDropWith(this, dropZoneDropFn);
  }

  syncDragDropTheme(theme: Theme): void {
    this.dragSourceBox
      .bgColor(this.dragActive ? theme.colors.accent : theme.colors.surface)
      .border(1.0, theme.colors.border, BorderStyle.Solid);
    this.dropZone
      .bgColor(this.dropHover ? theme.colors.accentHovered : theme.colors.surface)
      .border(2.0, this.dropHover ? theme.colors.accent : theme.colors.border, BorderStyle.Dashed);
  }
}

function dragSourceDataFn(_section: DragDropSection): DragDataObject | null {
  return new DragDataObject().setText("dragged-item");
}

function dragSourceCompletedFn(section: DragDropSection, _effect: DragDropEffects): void {
  section.dragActive = false;
  section.statusText.text("Drag: completed, source is idle");
  section.syncDragDropTheme(activeTheme.value);
}

function dropZoneEnterFn(section: DragDropSection, _args: DragEventArgs): DropProposal {
  section.dropHover = true;
  section.statusText.text("Drag: hovering over drop zone");
  section.syncDragDropTheme(activeTheme.value);
  return new DropProposal(DragDropEffects.Copy, false);
}

function dropZoneOverFn(_section: DragDropSection, _args: DragEventArgs): DropProposal {
  return new DropProposal(DragDropEffects.Copy, false);
}

function dropZoneLeaveFn(section: DragDropSection, _args: DragEventArgs): void {
  section.dropHover = false;
  section.statusText.text("Drag: left drop zone");
  section.syncDragDropTheme(activeTheme.value);
}

function dropZoneDropFn(section: DragDropSection, _args: DragEventArgs): void {
  section.dropHover = false;
  section.statusText.text("Drag: dropped into zone!");
  section.syncDragDropTheme(activeTheme.value);
}

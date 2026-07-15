import {
  Border,
  BorderStyle,
  BrowserFile,
  Column,
  DragDropEffects,
  DropProposal,
  ExternalDropEventArgs,
  ExternalDropItemInfo,
  ExternalDropItemKind,
  File,
  FileErrorEventArgs,
  FileWorkerProcessProgress,
  FileWorkerProcessRequest,
  FileWorkerProcessResult,
  FlexBox,
  Theme,
  Unit,
  activeTheme,
  } from "../../fui/Fui";
import { DemoText,
  DemoTextStyle,
  DemoButton,
  DemoButtonTone,
  HorizontalSpacer,
  VerticalSpacer,
} from "../shared/design-system";
import { changeColorAlpha } from "../shared/ColorUtils";

function describeDropItems(items: ExternalDropItemInfo[]): string {
  let result = "";
  for (let i: i32 = 0; i < items.length; i += 1) {
    if (result.length > 0) {
      result += ", ";
    }
    const item = items[i];
    result += item.name + " (" + item.kind.toString() + ")";
  }
  return result;
}

export class ExternalDropSection {
  readonly dropTarget: FlexBox = new FlexBox()
    .fillWidth()
    .height(156.0, Unit.Pixel)
    .padding(18.0, 18.0, 18.0, 18.0)
    .cornerRadius(20.0)
    .allowExternalDrop(true) as FlexBox;
  readonly dropStatusText: DemoText = new DemoText("", DemoTextStyle.Caption) as DemoText;
  readonly dropItemsText: DemoText = new DemoText("", DemoTextStyle.BodySecondary) as DemoText;
  readonly dropCapabilityText: DemoText = new DemoText("", DemoTextStyle.BodySecondary) as DemoText;
  readonly dropHintText: DemoText = new DemoText(
    "Drop a file from your desktop onto the target zone, then choose Export to trigger a native save picker. The copy runs in a dedicated worker with transfer-list chunk handoff.",
    DemoTextStyle.BodySecondary,
  ) as DemoText;
  readonly dropCopyButton: DemoButton = new DemoButton("Export dropped file")
    .fillWidth()
    .height(48.0, Unit.Pixel) as DemoButton;

  private dropTitleText: DemoText = new DemoText("Drop files here", DemoTextStyle.Heading3) as DemoText;
  private dropBodyText: DemoText = new DemoText(
    "The drop target receives a first-class BrowserFile handle. Drag a file from your desktop and drop it onto this zone.",
    DemoTextStyle.BodySecondary,
  ) as DemoText;
  private droppedFile: BrowserFile | null = null;
  private dropHovering: bool = false;
  private dropIgnoreNextLeave: bool = false;
  private activeCopyRequest: FileWorkerProcessRequest | null = null;

  constructor() {
    this.dropTarget.child(
      Column(
        this.dropTitleText,
        VerticalSpacer(8.0),
        this.dropBodyText,
      ).fillWidth(),
    );
    this.syncDropCapabilities();
  }

  attachBindings(): void {
    this.dropTarget
      .onExternalDragEnterWith(this, externalDragEnterFn)
      .onExternalDragOverWith(this, externalDragOverFn)
      .onExternalDragLeaveWith(this, externalDragLeaveFn)
      .onExternalDropWith(this, externalDropFn);

    this.dropCopyButton.onClickWith(this, (section): void => {
      section.exportDroppedFile();
    });
  }

  dispose(): void {
    const req = this.activeCopyRequest;
    this.activeCopyRequest = null;
    if (req != null) {
      req.dispose();
    }
  }

  syncDropTheme(theme: Theme): void {
    this.dropTarget
      .bgColor(this.dropHovering ? changeColorAlpha(theme.colors.accent, 0x20) : changeColorAlpha(theme.colors.accent, 0x08))
      .borderConfig(new Border(
        2.0,
        this.dropHovering ? theme.colors.accent : theme.colors.border,
        this.dropHovering ? BorderStyle.Dashed : BorderStyle.Solid,
      ));
    const canExport = this.droppedFile != null && this.activeCopyRequest == null && File.capabilities().canProcessInWorkerToPickedFile;
    this.dropCopyButton.enabled(canExport);
  }

  private exportDroppedFile(): void {
    const file = this.droppedFile;
    if (file == null) {
      this.dropStatusText.text("Drop: drop a file first");
      return;
    }
    if (this.activeCopyRequest != null) {
      this.dropStatusText.text("Drop: copy already running");
      return;
    }
    const capabilities = File.capabilities();
    if (!capabilities.canProcessInWorkerToPickedFile) {
      this.dropStatusText.text("Drop: runtime does not support worker file copy (needs @effindomv2/runtime >= next)");
      return;
    }
    const name = file.name;
    const dot = name.lastIndexOf(".");
    const suggestedName = dot > 0
      ? name.substring(0, dot) + "-copy" + name.substring(dot)
      : name + "-copy";
    this.activeCopyRequest = File.processFileInWorker(file)
      .worker("../advanced-workers.wasm", "fileProcessorWorker")
      .saveToPickedFile(suggestedName)
      .onProgressWith(this, fileCopyProgressFn)
      .onCompleteWith(this, fileCopyCompleteFn)
      .onErrorWith(this, fileCopyErrorFn)
      .start();
    this.dropStatusText.text("Drop: opening save picker for " + suggestedName + "...");
  }

  private syncDropCapabilities(): void {
    const capabilities = File.capabilities();
    this.dropCapabilityText.text(
      "File API: open=" + (capabilities.canPickOpen ? "yes" : "no") +
      " - chunk-read=" + (capabilities.canReadChunks ? "yes" : "no") +
      " - save=" + (capabilities.canSave ? "yes" : "no") +
      " - native-save-picker=" + (capabilities.canUseNativeSavePicker ? "yes" : "no") +
      " - worker-copy=" + (capabilities.canProcessInWorkerToPickedFile ? "yes" : "no"),
    );
  }
}

// Module-level file copy handler functions
function fileCopyProgressFn(section: ExternalDropSection, progress: FileWorkerProcessProgress): void {
  const name = progress.outputFileName;
  section.dropStatusText.text(
    "Drop: copying " + progress.processedBytes.toString() +
    " / " + progress.totalBytes.toString() +
    " bytes to " + (name === null ? "(file)" : name) + "...",
  );
}

function fileCopyCompleteFn(section: ExternalDropSection, result: FileWorkerProcessResult): void {
  section.activeCopyRequest = null;
  const name = result.outputFileName;
  const hashStr = result.workerResult !== null ? " — hash: " + changetype<string>(result.workerResult) : "";
  section.dropStatusText.text(
    "Drop: copied " + result.processedBytes.toString() +
    " bytes to " + (name === null ? "(file)" : name) + "." + hashStr,
  );
  section.syncDropTheme(activeTheme.value);
}

function fileCopyErrorFn(section: ExternalDropSection, event: FileErrorEventArgs): void {
  section.activeCopyRequest = null;
  section.dropStatusText.text("Drop: copy failed - " + event.message);
  section.syncDropTheme(activeTheme.value);
}

// Module-level external drop handler functions
function externalDragEnterFn(section: ExternalDropSection, args: ExternalDropEventArgs): DropProposal {
  section.dropIgnoreNextLeave = false;
  if (args.items.length == 0) {
    section.dropHovering = false;
    section.dropStatusText.text("Drop: ignoring non-file drag");
    section.syncDropTheme(activeTheme.value);
    return DropProposal.none();
  }
  section.dropHovering = true;
  section.dropStatusText.text("Drop: hovering " + args.items.length.toString() + " file(s) - effect Copy");
  section.dropItemsText.text(describeDropItems(args.items));
  section.syncDropTheme(activeTheme.value);
  return new DropProposal(DragDropEffects.Copy, false);
}

function externalDragOverFn(section: ExternalDropSection, args: ExternalDropEventArgs): DropProposal {
  return externalDragEnterFn(section, args);
}

function externalDragLeaveFn(section: ExternalDropSection, _args: ExternalDropEventArgs): void {
  if (section.dropIgnoreNextLeave) {
    section.dropIgnoreNextLeave = false;
    return;
  }
  section.dropHovering = false;
  section.dropStatusText.text(section.droppedFile != null ? "Drop: ready for another drop" : "Drop: idle");
  section.syncDropTheme(activeTheme.value);
}

function externalDropFn(section: ExternalDropSection, args: ExternalDropEventArgs): void {
  section.dropHovering = false;
  section.dropIgnoreNextLeave = true;
  section.droppedFile = null;
  for (let i: i32 = 0; i < args.items.length; i += 1) {
    const file = args.items[i].file;
    if (file != null) {
      section.droppedFile = file;
      break;
    }
  }
  if (section.droppedFile != null) {
    section.dropItemsText.text("Dropped: " + describeDropItems(args.items));
    section.dropStatusText.text("Drop: received " + args.items.length.toString() + " file(s)");
  } else {
    section.dropStatusText.text("Drop: no file handle in dropped items");
  }
  section.syncDropTheme(activeTheme.value);
}

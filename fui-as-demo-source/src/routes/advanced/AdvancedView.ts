import { AlignItems, AnimationTiming, BorderStyle, BrowserFile, Column, CursorStyle, Disposable, DragDataObject, DragDropEffects, DragEventArgs, DropProposal, Easings, ExternalDropEventArgs, ExternalDropItemInfo, ExternalDropItemKind, Fetch, FetchRequest, FetchResponse, File, FileWorkerProcessProgress, FileWorkerProcessRequest, FileWorkerProcessResult, FlexBox, NodeTransitions, ProgressBar, Row, ScrollBarVisibility, ScrollBox, ScrollState, SelectionArea, TextVerticalAlign, Theme, Unit, Worker, activeTheme, bindTheme, disposeAll } from "../../fui/Fui";
import { DemoText, DemoTextStyle } from "../shared/design-system/DemoText";
import { DemoButton, DemoButtonTone } from "../shared/design-system/DemoButton";
import { DemoScrollBox } from "../shared/design-system/DemoScrollBox";
import { createNavBar } from "../shared/design-system/NavBar";
import { Panel } from "../shared/design-system/Panel";
import { changeColorAlpha } from "../shared/ColorUtils";
import {
  HEADING_TO_BODY_GAP_PX,
  HorizontalSpacer,
  PAGE_SECTION_GAP_PX,
  TITLE_TO_SUPPORTING_GAP_PX,
  VerticalSpacer,
} from "../shared/design-system/Spacers";
import { AdvancedModel } from "./AdvancedModel";
import { AnimationSection, ANIMATION_SCROLL_LOGICAL_CONTENT_HEIGHT_PX } from "./AnimationSection";
import { WorkerSection } from "./WorkerSection";
import { ExternalDropSection } from "./ExternalDropSection";
import { FetchSection } from "./FetchSection";
import { ReorderSection } from "./ReorderSection";

const ANIMATION_SCROLL_ROW_HEIGHT_PX: f32 = 80.0;
const ANIMATION_SCROLL_ROW_COUNT: i32 = 18;
const ANIMATION_SCROLL_VIEWPORT_HEIGHT_PX: f32 = 280.0;
const ACTION_ROW_BUTTON_HEIGHT_PX: f32 = 60.0;



function createStatusText(): DemoText {
  return new DemoText("", DemoTextStyle.Caption) as DemoText;
}

function createSupportingStatusText(): DemoText {
  return new DemoText("", DemoTextStyle.BodySecondary) as DemoText;
}

function parseLeadingPercent(text: string): f32 {
  let value: i32 = 0;
  let sawDigit: bool = false;
  for (let i: i32 = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    if (code >= 48 && code <= 57) {
      sawDigit = true;
      value = (value * 10) + (code - 48);
      continue;
    }
    if (sawDigit) {
      break;
    }
  }
  if (!sawDigit) {
    return 0.0;
  }
  if (value < 0) {
    return 0.0;
  }
  if (value > 100) {
    return 100.0;
  }
  return <f32>value;
}

// Animation preview card
function buildAnimationPreviewCard(
  titleText: DemoText,
  bodyText: DemoText,
  theme: Theme,
): FlexBox {
  return new FlexBox()
    .fillWidth()
    .height(144.0, Unit.Pixel)
    .padding(20.0, 18.0, 20.0, 18.0)
    .cornerRadius(20.0)
    .border(1.0, theme.colors.border, BorderStyle.Solid)
    .bgColor(theme.colors.surface)
    .child(
      Column(
        titleText,
        VerticalSpacer(8.0),
        bodyText,
      ).fillWidth(),
    )
    .transitions(
      new NodeTransitions()
        .bgColor(new AnimationTiming(1000.0, Easings.cubicOut))
        .opacity(new AnimationTiming(500.0, Easings.cubicOut)),
    ) as FlexBox;
}

// Build scroll box content rows
function makeAnimationScrollRows(): Array<FlexBox> {
  const rows = new Array<FlexBox>();
  for (let index: i32 = 0; index < ANIMATION_SCROLL_ROW_COUNT; index += 1) {
    const label = "Animation sample row " + (index + 1).toString();
    const title = new DemoText(label, DemoTextStyle.Body) as DemoText;
    const detail = new DemoText(
      index == ANIMATION_SCROLL_ROW_COUNT - 1
        ? "The final target proves retained smooth scrolling can drive to the far end of the viewport."
        : "Retained content stays pooled and composable while the viewport animates independently.",
      DemoTextStyle.BodySecondary,
    ) as DemoText;
    const rowCard = new FlexBox()
      .fillWidth()
      .height(ANIMATION_SCROLL_ROW_HEIGHT_PX, Unit.Pixel)
      .padding(16.0, 12.0, 16.0, 12.0)
      .cornerRadius(14.0)
      .child(
        Column(
          title,
          VerticalSpacer(4.0),
          detail,
        ).fillWidth(),
      ) as FlexBox;
    rows.push(rowCard);
  }
  return rows;
}

function buildAnimationScrollBox(): ScrollBox {
  const rows = makeAnimationScrollRows();
  const content = new FlexBox().fillWidth() as FlexBox;
  for (let index = 0; index < rows.length; index += 1) {
    content.child(rows[index]);
  }
  return new ScrollBox(new ScrollState())
    .scrollEnabledX(false)
    .scrollEnabledY(true)
    .verticalScrollbarVisibility(ScrollBarVisibility.Always)
    .horizontalScrollbarVisibility(ScrollBarVisibility.Never)
    .scrollContentSize(-1.0, ANIMATION_SCROLL_LOGICAL_CONTENT_HEIGHT_PX)
    .fillWidth()
    .height(ANIMATION_SCROLL_VIEWPORT_HEIGHT_PX, Unit.Pixel)
    .child(content) as ScrollBox;
}

export class AdvancedView {
  private readonly root!: SelectionArea;
  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingDisposed: bool = false;

  // -- Transitions (animation) demo --
  readonly animation: AnimationSection = new AnimationSection();

  // Worker demo
  readonly worker: WorkerSection = new WorkerSection();

  // -- Fetch demo --
  readonly fetch: FetchSection = new FetchSection();

  // -- External file drop demo --
  readonly drop: ExternalDropSection = new ExternalDropSection();

  // -- Drag-drop reorder demo --
  readonly reorder: ReorderSection = new ReorderSection();

  constructor(model: AdvancedModel) {
    const content = Column(
      createNavBar("Advanced - FUI-AS Demo", "advanced"),
      VerticalSpacer(PAGE_SECTION_GAP_PX),
      this.createMainPanel(model),
    )
      .fillSize()
      .padding(24.0, 24.0, 24.0, 24.0);

    this.root = new SelectionArea()
      .fillSize()
      .child(content) as SelectionArea;
    this.trackTheme(bindTheme(this, (view, th): void => {
      view.applyTheme(th);
    }));
    this.applyTheme(activeTheme.value);
  }

  getRoot(): SelectionArea {
    return this.root;
  }

  dispose(): void {
    this.worker.dispose();
    this.fetch.dispose();
    this.drop.dispose();
    this.disposeThemeBindings();
  }

  private cancelFileCopy(): void {
    const req = this.activeCopyRequest;
    this.activeCopyRequest = null;
    if (req != null) {
      req.dispose();
    }
  }

  private applyTheme(theme: Theme): void {
    this.root.bgColor(theme.colors.background);
    this.syncAnimationTheme(theme);
    this.drop.syncDropTheme(theme);
    this.reorder.syncTheme(theme);
  }

  private syncAnimationTheme(theme: Theme): void {
    this.animation.syncAnimationTheme(theme);
  }

  private setAnimationPreviewState(emphasized: bool, theme: Theme): void {
    this.animation.setAnimationPreviewState(emphasized, theme);
  }

  private attachAnimationBindings(): void {
    this.animation.previewCalmButton.onClickWith(this, (view): void => {
      view.setAnimationPreviewState(false, activeTheme.value);
      view.animation.previewStatusText.text("Preview: calm");
    });

    this.animation.previewEmphasisButton.onClickWith(this, (view): void => {
      view.setAnimationPreviewState(true, activeTheme.value);
      view.animation.previewStatusText.text("Preview: emphasized");
    });

    this.animation.scrollTopButton.onClickWith(this, (view): void => {
      view.animation.scrollBox.scrollToAnimated(0.0, 0.0, new AnimationTiming(300.0, Easings.cubicOut));
      view.animation.scrollStatusText.text("Scrolling to first sample...");
    });

    this.animation.scrollMiddleButton.onClickWith(this, (view): void => {
      const targetY = <f32>7.0 * ANIMATION_SCROLL_ROW_HEIGHT_PX;
      view.animation.scrollBox.scrollToAnimated(0.0, targetY, new AnimationTiming(300.0, Easings.cubicOut));
      view.animation.scrollStatusText.text("Scrolling to 7th sample...");
    });

    this.animation.scrollBottomButton.onClickWith(this, (view): void => {
      const targetY = <f32>13.0 * ANIMATION_SCROLL_ROW_HEIGHT_PX;
      view.animation.scrollBox.scrollToAnimated(0.0, targetY, new AnimationTiming(300.0, Easings.cubicOut));
      view.animation.scrollStatusText.text("Scrolling to 13th sample...");
    });

    this.animation.scrollTailButton.onClickWith(this, (view): void => {
      view.animation.scrollBox.scrollToAnimated(0.0, ANIMATION_SCROLL_LOGICAL_CONTENT_HEIGHT_PX - ANIMATION_SCROLL_VIEWPORT_HEIGHT_PX, new AnimationTiming(300.0, Easings.cubicOut));
      view.animation.scrollStatusText.text("Scrolling to logical tail...");
    });
  }





  private createMainPanel(model: AdvancedModel): Panel {
    return new Panel()
      .children([
        new DemoText(model.title, DemoTextStyle.Heading2),
        VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
        new DemoText(model.subtitle, DemoTextStyle.BodySecondary),
        VerticalSpacer(HEADING_TO_BODY_GAP_PX),
        new DemoText(model.description, DemoTextStyle.BodySecondary),
        VerticalSpacer(PAGE_SECTION_GAP_PX),
        new DemoScrollBox("AdvancedScrollBox")
          .fillSize()
          .children([
            new Panel().children([
              // -- Transitions --
              new DemoText("Transitions", DemoTextStyle.Heading3),
              VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
              this.animation.previewCard,
              VerticalSpacer(14.0),
              Row(
                this.animation.previewCalmButton,
                HorizontalSpacer(12.0),
                this.animation.previewEmphasisButton,
              )
                .fillWidth()
                .alignItems(AlignItems.Stretch),
              VerticalSpacer(14.0),
              this.animation.previewStatusText,
            ])
              .fillWidth(),
            new Panel().children([
              // -- Scroll Surfaces --
              new DemoText("Scroll Surfaces", DemoTextStyle.Heading3),
              VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
              new Panel().child(this.animation.scrollBox.width(700.0, Unit.Pixel)),
              VerticalSpacer(14.0),
              Row(
                this.animation.scrollTopButton,
                HorizontalSpacer(12.0),
                this.animation.scrollMiddleButton,
                HorizontalSpacer(12.0),
                this.animation.scrollBottomButton,
              )
                .fillWidth()
                .alignItems(AlignItems.Stretch),
              VerticalSpacer(10.0),
              Row(
                this.animation.scrollTailButton,
              ).fillWidth(),
              VerticalSpacer(10.0),
              this.animation.scrollStatusText,
              VerticalSpacer(10.0),
              this.animation.hintText,
              VerticalSpacer(PAGE_SECTION_GAP_PX),
            ]),

            // -- ProgressBar + Worker sample --
            new Panel().children([
              new DemoText("ProgressBar + Worker Sample", DemoTextStyle.Heading3),
              VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
              this.worker.progressBar,
              VerticalSpacer(12.0),
              Row(
                this.worker.startButton,
                HorizontalSpacer(12.0),
                this.worker.cancelButton,
              )
                .fillWidth()
                .alignItems(AlignItems.Stretch),
              VerticalSpacer(10.0),
              this.worker.statusText,
              VerticalSpacer(6.0),
              this.worker.detailText,
              VerticalSpacer(10.0),
              this.worker.hintText,
            ])
              .fillWidth(),
            VerticalSpacer(PAGE_SECTION_GAP_PX),

            // -- Online Fetch sample --
            new Panel().children([
              new DemoText("Online Fetch Sample", DemoTextStyle.Heading3),
              VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
              Row(
                this.fetch.getButton,
                HorizontalSpacer(12.0),
                this.fetch.postButton,
              ).fillWidth(),
              VerticalSpacer(12.0),
              this.fetch.statusText,
              VerticalSpacer(6.0),
              this.fetch.requestText,
              VerticalSpacer(6.0),
              this.fetch.resultText,
              VerticalSpacer(10.0),
              this.fetch.hintText,
            ])
              .fillWidth(),
            VerticalSpacer(PAGE_SECTION_GAP_PX),

            // -- External file drop --
            new Panel().children([
              new DemoText("External File Drop", DemoTextStyle.Heading3),
              VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
              this.drop.dropTarget,
              VerticalSpacer(14.0),
              this.drop.dropStatusText,
              VerticalSpacer(6.0),
              this.drop.dropItemsText,
              VerticalSpacer(8.0),
              this.drop.dropCopyButton,
              VerticalSpacer(8.0),
              this.drop.dropCapabilityText,
              VerticalSpacer(10.0),
              this.drop.dropHintText,
            ])
              .fillWidth(),
            VerticalSpacer(PAGE_SECTION_GAP_PX),

            // -- Drag-and-drop reorder --
            new Panel().children([
              new DemoText("Drag-and-Drop Reorder / Custom Control", DemoTextStyle.Heading3),
              VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
              this.reorder.sectionRoot,
              VerticalSpacer(12.0),
              this.reorder.statusText,
              VerticalSpacer(10.0),
              this.reorder.hintText,
            ])
              .fillWidth(),
          ]),
      ])
      .fillSize() as Panel;
  }

  private trackTheme(disposable: Disposable): void {
    this.themeBindings.push(disposable);
  }

  private disposeThemeBindings(): void {
    if (this.themeBindingDisposed) {
      return;
    }
    this.themeBindingDisposed = true;
    disposeAll(this.themeBindings);
  }
}

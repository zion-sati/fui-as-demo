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
const ANIMATION_SCROLL_VIEWPORT_HEIGHT_PX: f32 = 280.0;

export class AdvancedView {
  private readonly root!: SelectionArea;
  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingDisposed: bool = false;

  readonly animation: AnimationSection = new AnimationSection();
  readonly worker: WorkerSection = new WorkerSection();
  readonly fetch: FetchSection = new FetchSection();
  readonly drop: ExternalDropSection = new ExternalDropSection();
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

  attachAnimationBindings(): void {
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

  disposeThemeBindings(): void {
    if (this.themeBindingDisposed) {
      return;
    }
    this.themeBindingDisposed = true;
    disposeAll(this.themeBindings);
  }
}

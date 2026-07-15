import {
  AnimationTiming,
  Column,
  Easings,
  FlexBox,
  NodeTransitions,
  ScrollBarVisibility,
  ScrollBox,
  ScrollState,
  Theme,
  Unit,
  activeTheme,
  } from "../../fui/Fui";
import { DemoText,
  DemoTextStyle,
  DemoButton,
  DemoButtonTone,
  VerticalSpacer,
  applyRowBackground,
} from "../shared/design-system";

const ANIMATION_SCROLL_ROW_HEIGHT_PX: f32 = 80.0;
const ANIMATION_SCROLL_ROW_COUNT: i32 = 18;
const ANIMATION_SCROLL_VIEWPORT_HEIGHT_PX: f32 = 280.0;
const ANIMATION_SCROLL_LOGICAL_TAIL_PX: f32 = 240.0;
export const ANIMATION_SCROLL_LOGICAL_CONTENT_HEIGHT_PX: f32 =
  (<f32>ANIMATION_SCROLL_ROW_COUNT * ANIMATION_SCROLL_ROW_HEIGHT_PX) + ANIMATION_SCROLL_LOGICAL_TAIL_PX;

function buildAnimationPreviewCard(
  titleText: DemoText,
  bodyText: DemoText,
  theme: Theme,
): FlexBox {
  return new FlexBox()
    .fillWidth()
    .height(128.0, Unit.Pixel)
    .padding(18.0, 18.0, 18.0, 18.0)
    .cornerRadius(20.0)
    .border(1.0, theme.colors.border)
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

function buildAnimationScrollRows(): Array<FlexBox> {
  return makeAnimationScrollRows();
}

function buildAnimationScrollBox(rows: Array<FlexBox>): ScrollBox {
  const content = new FlexBox().fillWidth() as FlexBox;
  for (let index = 0; index < rows.length; index += 1) {
    content.child(rows[index]);
  }
  const box = new ScrollBox(new ScrollState())
    .scrollbarGutter(8.0)
    .scrollEnabledX(false)
    .scrollEnabledY(true)
    .verticalScrollbarVisibility(ScrollBarVisibility.Always)
    .horizontalScrollbarVisibility(ScrollBarVisibility.Never)
    .scrollContentSize(-1.0, ANIMATION_SCROLL_LOGICAL_CONTENT_HEIGHT_PX)
    .fillWidth()
    .height(ANIMATION_SCROLL_VIEWPORT_HEIGHT_PX, Unit.Pixel)
    .child(content) as ScrollBox;
  box.verticalScrollBar.trackCornerRadius(8.0);
  box.verticalScrollBar.thumbCornerRadius(8.0);
  return box;
}

export class AnimationSection {
  readonly previewTitleText: DemoText = new DemoText("Calm transition target", DemoTextStyle.Heading3) as DemoText;
  readonly previewBodyText: DemoText = new DemoText(
    "Opacity and background transitions stay on the same retained node while the control layer keeps behavior ownership elsewhere.",
    DemoTextStyle.BodySecondary,
  ) as DemoText;
  private readonly rowCards: Array<FlexBox> = buildAnimationScrollRows();
  readonly scrollBox: ScrollBox = buildAnimationScrollBox(this.rowCards);
  readonly previewCard: FlexBox = buildAnimationPreviewCard(this.previewTitleText, this.previewBodyText, activeTheme.value);
  readonly previewCalmButton: DemoButton = new DemoButton("Set calm preview").width(170.0, Unit.Pixel).height(60.0, Unit.Pixel) as DemoButton;
  readonly previewEmphasisButton: DemoButton = new DemoButton("Emphasize preview card", DemoButtonTone.Primary).width(190.0, Unit.Pixel).height(60.0, Unit.Pixel) as DemoButton;
  readonly scrollTopButton: DemoButton = new DemoButton("Scroll to first sample").width(180.0, Unit.Pixel).height(60.0, Unit.Pixel) as DemoButton;
  readonly scrollMiddleButton: DemoButton = new DemoButton("Scroll to 8th sample").width(190.0, Unit.Pixel).height(60.0, Unit.Pixel) as DemoButton;
  readonly scrollBottomButton: DemoButton = new DemoButton("Scroll to 14th sample", DemoButtonTone.Primary).width(180.0, Unit.Pixel).height(60.0, Unit.Pixel) as DemoButton;
  readonly scrollTailButton: DemoButton = new DemoButton("Scroll to logical tail").width(170.0, Unit.Pixel).height(60.0, Unit.Pixel) as DemoButton;
  readonly previewStatusText: DemoText = new DemoText("Preview: calm", DemoTextStyle.Body) as DemoText;
  readonly scrollStatusText: DemoText = new DemoText("ScrollBox idle", DemoTextStyle.BodySecondary) as DemoText;
  readonly hintText: DemoText = new DemoText(
    "Each card transitions independently. Use the scroll buttons to animate the viewport to different positions in the retained content, including the logical tail beyond the last card.",
    DemoTextStyle.BodySecondary,
  ) as DemoText;

  private previewEmphasized: bool = false;

  syncAnimationTheme(theme: Theme): void {
    this.previewCard
      .bgColor(this.previewEmphasized ? theme.colors.accentHovered : theme.colors.surface)
      .opacity(this.previewEmphasized ? 1.0 : 0.7)
      .border(1.0, theme.colors.border);
    for (let index = 0; index < this.rowCards.length; index += 1) {
      applyRowBackground(this.rowCards[index], index, theme);
    }
  }

  setAnimationPreviewState(emphasized: bool, theme: Theme): void {
    this.previewEmphasized = emphasized;
    this.previewTitleText.text(emphasized ? "Emphasized transition target" : "Calm transition target");
    this.previewBodyText.text(
      emphasized
        ? "The preview card now drives both opacity and background transitions together from one typed slot set."
        : "Opacity and background transitions stay on the same retained node while the control layer keeps behavior ownership elsewhere.",
    );
    this.syncAnimationTheme(theme);
  }
}

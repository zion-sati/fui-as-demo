import {
  FontFace,
  FontFamily,
  FontWeight,
  RichText,
  Theme,
  rgb,
  span } from "../../fui/Fui";
import { DemoText,
  DemoTextStyle,
} from "../shared/design-system";

export class RichTextSection {
  readonly containerText: RichText;
  readonly helperText: RichText;
  readonly hintText: DemoText;

  private readonly customEmojiFace: FontFace;
  private readonly customFamily: FontFamily;

  constructor(customEmojiFace: FontFace, customFamily: FontFamily) {
    this.customEmojiFace = customEmojiFace;
    this.customFamily = customFamily;

    this.containerText = new RichText()
      .fontFamily(customFamily)
      .fontWeight(FontWeight.Bold)
      .fontSize(20.0)
      .lineHeight(28.0)
      .maxLines(1)
      .fillWidth() as RichText;
    this.helperText = new RichText()
      .fontFamily(customFamily)
      .fontSize(18.0)
      .lineHeight(26.0)
      .maxLines(1)
      .fillWidth() as RichText;
    this.hintText = new DemoText(
      "Use helper spans to compose inline styling, and use RichText container defaults when you want the same font family, weight, size, or color across the whole object.",
      DemoTextStyle.BodySecondary,
    ) as DemoText;
  }

  syncTheme(theme: Theme): void {
    const primary = theme.colors.textPrimary;
    const accent = rgb(96, 165, 250);
    const yellow = rgb(251, 191, 36);
    const red = rgb(248, 113, 113);
    const emerald = rgb(167, 243, 208);
    const slate = rgb(30, 41, 59);
    this.containerText
      .fragmentsValue([
        span("Base family ").underline().color(primary),
        span("with ").color(primary),
        span("CUSTOM OVERRIDE")
          .fontFamily(this.customFamily)
          .fontWeight(FontWeight.Bold)
          .strikethrough(),
      ]);
    this.helperText
      .fragmentsValue([
        span("Rich ").bold().color(primary),
        span("text ").italic().color(accent),
        span("underline ").underline().color(yellow),
        span("strike ").strikethrough().color(red),
        span("emoji- ")
          .bgColor(slate)
          .color(emerald),
        span("\u{1F604}")
          .fontFamily(FontFamily.withRegularFace(this.customEmojiFace))
          .bgColor(slate)
          .color(emerald),
        span(" ")
          .bgColor(slate)
          .color(emerald),
        span("helpers").bold().italic().underline().strikethrough().color(rgb(203, 213, 225)),
      ]);
  }
}

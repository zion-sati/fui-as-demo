import { FontFamily, FontFace, FontStack, FontWeight, RichText, Unit, rgb } from "../../fui/Fui";
import { DemoText, DemoTextStyle } from "../shared/design-system/DemoText";

export class CustomFontSection {
  readonly emojiFace: FontFace;
  readonly bodyStack: FontStack;
  readonly headingStack: FontStack;
  readonly family: FontFamily;

  readonly headingText: DemoText;
  readonly bodyText: DemoText;
  readonly directStackText: DemoText;
  readonly comparisonText: DemoText;

  constructor() {
    const emojiFace = FontFace.load("/runtime/fonts/NotoColorEmoji.ttf");
    const bodyStack = FontStack.load("/runtime/fonts/DejaVuSans.ttf")
      .fallbackFace(emojiFace);
    const headingStack = FontStack.load("/runtime/fonts/DejaVuSans-Bold.ttf")
      .fallbackFace(emojiFace);
    const family = FontFamily.regularBoldStacks(bodyStack, headingStack);

    this.emojiFace = emojiFace;
    this.bodyStack = bodyStack;
    this.headingStack = headingStack;
    this.family = family;

    this.headingText = new DemoText("Custom DejaVu FontStack sample \u{1F30D}", DemoTextStyle.Heading2)
      .fontFamily(family) as DemoText;
    this.bodyText = new DemoText(
      "Load DejaVu Sans through FontStack.load(...), use DejaVu Bold for heavier text, and keep color emoji fallback without dropping to bridge-specific APIs.",
      DemoTextStyle.BodySecondary,
    )
      .fontFamily(family)
      .fontSize(16.0) as DemoText;
    this.directStackText = new DemoText("Apply a stack directly: Text.fontStack(customBodyStack, 17) \u2728", DemoTextStyle.BodySecondary)
      .fontStack(bodyStack, 17.0) as DemoText;
    this.comparisonText = new DemoText("Bold family resolution stays intact: DejaVu Bold + emoji fallback \u{1F604}", DemoTextStyle.Body)
      .fontFamily(family)
      .fontWeight(FontWeight.Bold)
      .fontSize(18.0) as DemoText;
  }
}

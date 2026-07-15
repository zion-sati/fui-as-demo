import { FlexBox, FlexWrap, JustifyContent, Row, TextVerticalAlign, Unit } from "../../../fui/Fui";
import { DemoText, DemoTextStyle } from "./DemoText";
import { NavPill } from "./NavPill";
import { advancedRoute, homeRoute, immediateDrawingRoute, textFontsRoute } from "../../../routes";

function navSpacer(): FlexBox {
  return new FlexBox().width(10.0, Unit.Pixel).height(1.0, Unit.Pixel);
}

export function createNavBar(title: string, activeSlug: string): FlexBox {
  const homePill = new NavPill(homeRoute(), "Home").active(activeSlug == "home");
  const textFontsPill = new NavPill(textFontsRoute(), "Text & Fonts").active(activeSlug == "text-fonts");
  const advancedPill = new NavPill(advancedRoute(), "Advanced").active(activeSlug == "advanced");
  const immediateDrawingPill = new NavPill(immediateDrawingRoute(), "Immediate Drawing").active(activeSlug == "immediate-drawing");
  const titleText = new DemoText(title, DemoTextStyle.Heading1)
    .verticalAlign(TextVerticalAlign.Center)
    .fillWidthPercent(50);

  return Row(
    titleText,

    Row(
      homePill,
      navSpacer(),
      textFontsPill,
      navSpacer(),
      advancedPill,
      navSpacer(),
      immediateDrawingPill,
    ).justifyContent(JustifyContent.End).fillWidthPercent(50).flexWrap(FlexWrap.Wrap),

  ).fillWidth().flexWrap(FlexWrap.Wrap);
}

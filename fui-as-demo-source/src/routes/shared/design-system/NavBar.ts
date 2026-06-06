import { FlexBox, JustifyContent, Row, TextVerticalAlign, Unit } from "../../../fui/Fui";
import { DemoText, DemoTextStyle } from "./DemoText";
import { NavPill } from "./NavPill";
import { advancedRoute, homeRoute, textFontsRoute } from "../../../routes";

function navSpacer(): FlexBox {
  return new FlexBox().width(10.0, Unit.Pixel).height(1.0, Unit.Pixel);
}

export function createNavBar(title: string, activeSlug: string): FlexBox {
  const homePill = new NavPill(homeRoute(), "Home").active(activeSlug == "home");
  const textFontsPill = new NavPill(textFontsRoute(), "Text & Fonts").active(activeSlug == "text-fonts");
  const advancedPill = new NavPill(advancedRoute(), "Advanced").active(activeSlug == "advanced");
  return Row(

    new DemoText(title, DemoTextStyle.Heading1)
      .verticalAlign(TextVerticalAlign.Center),

    Row(
      homePill,
      navSpacer(),
      textFontsPill,
      navSpacer(),
      advancedPill,
    ).justifyContent(JustifyContent.End).fillWidth()

  ).fillWidth();
}

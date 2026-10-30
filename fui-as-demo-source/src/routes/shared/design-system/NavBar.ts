import { Action, FlexBox, FlexDirection, FlexWrap, JustifyContent, Row, TextVerticalAlign, viewportWidthSignal } from "../../../fui/Fui";
import { DemoText, DemoTextStyle } from "./DemoText";
import { NavPill } from "./NavPill";
import { isCompactLayout } from "./Responsive";
import { advancedRoute, homeRoute, immediateDrawingRoute, textFontsRoute } from "../../../routes";

const PILL_GAP_PX: f32 = 10.0;

/** The page title beside the route links; in the compact layout the links wrap on their own line under the title. */
export class NavBar extends FlexBox {
  private readonly titleText: DemoText;
  private readonly links: FlexBox;
  private readonly pills: Array<NavPill>;
  private readonly viewportBinding!: Action<f32>;

  constructor(title: string, activeSlug: string) {
    super();
    this.titleText = new DemoText(title, DemoTextStyle.Heading1)
      .verticalAlign(TextVerticalAlign.Center) as DemoText;
    this.pills = [
      new NavPill(homeRoute(), "Home").active(activeSlug == "home"),
      new NavPill(textFontsRoute(), "Text & Fonts").active(activeSlug == "text-fonts"),
      new NavPill(advancedRoute(), "Advanced").active(activeSlug == "advanced"),
      new NavPill(immediateDrawingRoute(), "Immediate Drawing").active(activeSlug == "immediate-drawing"),
    ];
    this.links = Row().flexWrap(FlexWrap.Wrap) as FlexBox;
    for (let index = 0; index < this.pills.length; index += 1) {
      this.links.child(unchecked(this.pills[index]));
    }
    this.flexDirection(FlexDirection.Row)
      .children([this.titleText, this.links])
      .fillWidth()
      .flexWrap(FlexWrap.Wrap);
    this.viewportBinding = viewportWidthSignal.bind(this, (bar, _width): void => {
      bar.applyLayout();
    });
    this.applyLayout();
  }

  private applyLayout(): void {
    const compact = isCompactLayout();
    this.titleText.fillWidthPercent(compact ? 100.0 : 50.0);
    this.links
      .fillWidthPercent(compact ? 100.0 : 50.0)
      .justifyContent(compact ? JustifyContent.Start : JustifyContent.End)
      .margin(0.0, compact ? 12.0 : 0.0, 0.0, 0.0);
    // A gap after each pill, and in the compact layout below it too, so wrapped rows stay apart.
    for (let index = 0; index < this.pills.length; index += 1) {
      const last = index == this.pills.length - 1;
      unchecked(this.pills[index]).margin(0.0, 0.0, last ? 0.0 : PILL_GAP_PX, compact ? PILL_GAP_PX : 0.0);
    }
  }

  dispose(): void {
    this.viewportBinding.dispose();
    super.dispose();
  }
}

export function createNavBar(title: string, activeSlug: string): NavBar {
  return new NavBar(title, activeSlug);
}

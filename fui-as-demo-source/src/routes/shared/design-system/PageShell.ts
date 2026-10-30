import { Action, Column, FlexBox, Node, Unit, viewportWidthSignal } from "../../../fui/Fui";
import { DemoScrollBox } from "./DemoScrollBox";
import { NavBar } from "./NavBar";
import { isCompactLayout } from "./Responsive";
import { PAGE_SECTION_GAP_PX, VerticalSpacer } from "./Spacers";

const PAGE_MIN_WIDTH_PX: f32 = 800.0;
const PAGE_MIN_HEIGHT_PX: f32 = 600.0;
const PAGE_PADDING_PX: f32 = 24.0;
const COMPACT_PAGE_PADDING_PX: f32 = 12.0;

/**
 * A route's page: its title and links above the content, in a scroll box that fills the window. A wide window keeps a
 * minimum page width and scrolls sideways below it; the compact layout drops it so the page fits a phone.
 */
export class PageShell extends DemoScrollBox {
  private readonly page: FlexBox;
  private readonly pageLayoutBinding!: Action<f32>;

  private readonly compactMinHeightPx: f32;

  /** A page whose content stacks in the compact layout can ask for more height there, so the page scrolls instead. */
  constructor(
    title: string,
    activeSlug: string,
    content: Node,
    scrollBoxName: string = "mainScrollBox",
    compactMinHeightPx: f32 = PAGE_MIN_HEIGHT_PX,
  ) {
    super(scrollBoxName);
    this.compactMinHeightPx = compactMinHeightPx;
    this.page = Column(new NavBar(title, activeSlug), VerticalSpacer(PAGE_SECTION_GAP_PX), content)
      .fillSize() as FlexBox;
    this.child(this.page).fillSize();
    this.pageLayoutBinding = viewportWidthSignal.bind(this, (shell, _width): void => {
      shell.applyLayout();
    });
    this.applyLayout();
  }

  private applyLayout(): void {
    const compact = isCompactLayout();
    const padding = compact ? COMPACT_PAGE_PADDING_PX : PAGE_PADDING_PX;
    this.page
      .minWidth(compact ? 0.0 : PAGE_MIN_WIDTH_PX, Unit.Pixel)
      .minHeight(compact ? this.compactMinHeightPx : PAGE_MIN_HEIGHT_PX, Unit.Pixel)
      .padding(padding, padding, padding, padding);
  }

  dispose(): void {
    this.pageLayoutBinding.dispose();
    super.dispose();
  }
}

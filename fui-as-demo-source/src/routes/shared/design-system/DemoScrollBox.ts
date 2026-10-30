import { Action, ScrollBarVisibility, ScrollBox, viewportWidthSignal } from "../../../fui/Fui";
import { isCompactLayout } from "./Responsive";

export class DemoScrollBox extends ScrollBox {
  private viewportBinding: Action<f32> | null = null;

  constructor(name: string) {
    super();
    this.nodeId(name);
    this.scrollEnabledX(true)
      .scrollEnabledY(true)
      .horizontalScrollbarVisibility(ScrollBarVisibility.Auto)
      .verticalScrollbarVisibility(ScrollBarVisibility.Auto);
    this.horizontalScrollBar.trackCornerRadius(8.0).thumbCornerRadius(8.0);
    this.verticalScrollBar.trackCornerRadius(8.0).thumbCornerRadius(8.0);
  }

  /** In the compact layout the content fits the box's width and scrolls only vertically. */
  fitWidthWhenCompact(): this {
    if (this.viewportBinding === null) {
      this.viewportBinding = viewportWidthSignal.bind(this, (box, _width): void => {
        box.scrollEnabledX(!isCompactLayout());
      });
      this.scrollEnabledX(!isCompactLayout());
    }
    return this;
  }

  dispose(): void {
    const binding = this.viewportBinding;
    if (binding !== null) {
      this.viewportBinding = null;
      binding.dispose();
    }
    super.dispose();
  }
}

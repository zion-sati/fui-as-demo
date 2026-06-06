import { ScrollBarVisibility, ScrollBox } from "../../../fui/Fui";

export class DemoScrollBox extends ScrollBox {
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
}

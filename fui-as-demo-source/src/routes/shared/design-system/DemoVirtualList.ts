import { VirtualList } from "../../../fui/Fui";

export class DemoVirtualList extends VirtualList {
  constructor(name: string, totalItems: i32, itemHeight: f32) {
    super(totalItems, itemHeight);
    this.nodeId(name)
    this.scrollBar.trackCornerRadius(8.0).thumbCornerRadius(8.0);
  }
}

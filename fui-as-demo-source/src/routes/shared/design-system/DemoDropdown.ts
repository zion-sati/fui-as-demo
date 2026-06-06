import { Dropdown, Unit } from "../../../fui/Fui";
import { createDemoDropdownSizing } from "./ControlSizing";

export class DemoDropdown extends Dropdown {
  constructor() {
    super();
    this.sizing(createDemoDropdownSizing());
    this.width(240.0, Unit.Pixel);
    this.maxVisibleItems(5);
  }
}

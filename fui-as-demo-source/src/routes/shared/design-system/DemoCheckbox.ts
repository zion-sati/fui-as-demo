import { Checkbox } from "../../../fui/Fui";
import { createDemoCheckboxSizing } from "./ControlSizing";

export class DemoCheckbox extends Checkbox {
  constructor(label: string) {
    super(label);
    this.sizing(createDemoCheckboxSizing());
  }
}

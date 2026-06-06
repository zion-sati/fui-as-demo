import { RadioButton } from "../../../fui/Fui";
import { createDemoRadioSizing } from "./ControlSizing";

export class DemoRadioButton extends RadioButton {
  constructor(value: string, label: string = value) {
    super(value, label);
    this.sizing(createDemoRadioSizing());
  }
}

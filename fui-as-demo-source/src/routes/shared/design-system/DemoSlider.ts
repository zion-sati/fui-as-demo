import { Slider } from "../../../fui/Fui";
import { createDemoSliderSizing } from "./ControlSizing";

export class DemoSlider extends Slider {
  constructor(value: f32 = 0.0) {
    super(value);
    this.sizing(createDemoSliderSizing());
  }
}

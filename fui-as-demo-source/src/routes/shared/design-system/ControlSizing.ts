import { DropdownSizing, LabeledControlSizing, SliderSizing } from "../../../fui/Fui";

const DEMO_CONTROL_FONT_SIZE: f32 = 14.0;
const DEMO_CHECKBOX_SIZE: f32 = 18.0;
const DEMO_RADIO_SIZE: f32 = 21.0;
const DEMO_DROPDOWN_FIELD_HEIGHT: f32 = 34.0;
const DEMO_DROPDOWN_OPTION_HEIGHT: f32 = 34.0;
const DEMO_DROPDOWN_CHEVRON_BOX_SIZE: f32 = 16.0;
const DEMO_DROPDOWN_CHEVRON_ICON_SIZE: f32 = 12.0;
const DEMO_SLIDER_THUMB_SIZE: f32 = 16.0;
const DEMO_SLIDER_TRACK_THICKNESS: f32 = 4.0;

export function createDemoCheckboxSizing(): LabeledControlSizing {
  return new LabeledControlSizing()
    .indicatorSize(DEMO_CHECKBOX_SIZE)
    .labelFontSize(DEMO_CONTROL_FONT_SIZE);
}

export function createDemoRadioSizing(): LabeledControlSizing {
  return new LabeledControlSizing()
    .indicatorSize(DEMO_RADIO_SIZE)
    .labelFontSize(DEMO_CONTROL_FONT_SIZE);
}

export function createDemoDropdownSizing(): DropdownSizing {
  return new DropdownSizing()
    .fieldFontSize(DEMO_CONTROL_FONT_SIZE)
    .optionFontSize(DEMO_CONTROL_FONT_SIZE)
    .fieldHeight(DEMO_DROPDOWN_FIELD_HEIGHT)
    .optionHeight(DEMO_DROPDOWN_OPTION_HEIGHT)
    .chevronBoxSize(DEMO_DROPDOWN_CHEVRON_BOX_SIZE)
    .chevronIconSize(DEMO_DROPDOWN_CHEVRON_ICON_SIZE);
}

export function createDemoSliderSizing(): SliderSizing {
  return new SliderSizing()
    .thumbSize(DEMO_SLIDER_THUMB_SIZE)
    .trackThickness(DEMO_SLIDER_TRACK_THICKNESS);
}

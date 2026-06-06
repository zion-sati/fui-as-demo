import { Unit } from "@effindomv2/fui-as/src/Fui";
import { FlexBox } from "@effindomv2/fui-as/src/nodes";

export const PAGE_SECTION_GAP_PX: f32 = 24.0;
export const PANEL_SECTION_GAP_PX: f32 = 16.0;
export const HEADING_TO_BODY_GAP_PX: f32 = 12.0;
export const HEADING_TO_BODY_TIGHT_GAP_PX: f32 = 8.0;
export const TITLE_TO_SUPPORTING_GAP_PX: f32 = 10.0;
export const LABEL_TO_CONTROL_GAP_PX: f32 = 6.0;
export const MICRO_STACK_GAP_PX: f32 = 4.0;

export function VerticalSpacer(height: f32): FlexBox {
  return new FlexBox().height(height, Unit.Pixel);
}

export function HorizontalSpacer(width: f32): FlexBox {
  return new FlexBox().width(width, Unit.Pixel);
}

import { viewportWidthSignal } from "../../../fui/Fui";

/** A viewport narrower than this gets the compact layout: one column, no minimum page width, tighter padding. */
export const COMPACT_LAYOUT_MAX_WIDTH_PX: f32 = 860.0;

/** The widest a fixed-size sample (an image, a drawing surface, a progress bar) gets in the compact layout: it fits
 * inside nested panels on a 360-pixel phone. */
export const COMPACT_SAMPLE_WIDTH_PX: f32 = 240.0;

export function isCompactLayout(): bool {
  const width = viewportWidthSignal.value;
  return width > 0.0 && width < COMPACT_LAYOUT_MAX_WIDTH_PX;
}

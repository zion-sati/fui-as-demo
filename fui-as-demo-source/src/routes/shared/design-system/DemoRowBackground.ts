import { BorderStyle, FlexBox, Theme } from "../../../fui/Fui";
import { changeColorAlpha } from "../ColorUtils";

/**
 * Apply alternating row background colors to a FlexBox row.
 * Uses accent-based alpha blending so rows react to theme changes
 * when called inside a bindTheme callback.
 *
 * Even rows: 0x24 alpha (~14%), odd rows: 0x16 alpha (~9%).
 */
export function applyRowBackground(row: FlexBox, index: i32, theme: Theme): FlexBox {
  const alpha: u32 = (index & 1) == 0 ? 0x24 : 0x16;
  const accent = theme.colors.accent;
  return row
    .bgColor(changeColorAlpha(accent, alpha))
    .border(1.0, theme.colors.border, BorderStyle.Solid);
}

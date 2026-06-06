export function colorRed(color: u32): u32 {
  return (color >>> 24) & 0xff;
}

export function colorGreen(color: u32): u32 {
  return (color >>> 16) & 0xff;
}

export function colorBlue(color: u32): u32 {
  return (color >>> 8) & 0xff;
}

export function changeColorAlpha(color: u32, alpha: u32): u32 {
  return (color & 0xffffff00) | (alpha & 0xff);
}

export function lightenColor(color: u32, amount: f32): u32 {
  const r = <f32>colorRed(color);
  const g = <f32>colorGreen(color);
  const b = <f32>colorBlue(color);
  const a = color & 0xff;

  const newR = <u32>Math.min(255.0, r + (255.0 - r) * amount);
  const newG = <u32>Math.min(255.0, g + (255.0 - g) * amount);
  const newB = <u32>Math.min(255.0, b + (255.0 - b) * amount);

  return (newR << 24) | (newG << 16) | (newB << 8) | a;
}

export function darkenColor(color: u32, amount: f32): u32 {
  const r = <f32>colorRed(color);
  const g = <f32>colorGreen(color);
  const b = <f32>colorBlue(color);
  const a = color & 0xff;

  const newR = <u32>Math.max(0.0, r - r * amount);
  const newG = <u32>Math.max(0.0, g - g * amount);
  const newB = <u32>Math.max(0.0, b - b * amount);

  return (newR << 24) | (newG << 16) | (newB << 8) | a;
}
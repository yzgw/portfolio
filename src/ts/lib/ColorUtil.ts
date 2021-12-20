export class ColorUtil {
  public static hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
  }

  public static rgbToHsl(r: number, g: number, b:number) {
    const red = r / 255,
      green = g / 255,
      blue = b / 255;
    const max = Math.max(red, green, blue),
      min = Math.min(red, green, blue);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case red:
          h = (green - blue) / d + (green < blue ? 6 : 0);
          break;
        case green:
          h = (blue - red) / d + 2;
          break;
        case blue:
          h = (red - green) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, l };
  }
}

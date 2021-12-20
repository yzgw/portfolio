import { ColorUtil } from "./ColorUtil";

export class CustomTheme {
  constructor(
    private primaryPicker: HTMLInputElement,
    private secondaryPicker: HTMLInputElement
  ) {}

  setPrimaryColor(value: string) {
    localStorage.setItem("custom-primary-color", value);
  }

  getPrimaryColor() {
    return localStorage.getItem("custom-primary-color");
  }

  setSecondaryColor(value: string) {
    localStorage.setItem("custom-secondary-color", value);
  }

  getSecondaryColor() {
    return localStorage.getItem("custom-secondary-color");
  }

  sync() {
    const primaryColor = this.getPrimaryColor() || "#c0c039";
    const secondaryColor = this.getSecondaryColor() || "#765289";
    this.primaryPicker.value = primaryColor;
    this.secondaryPicker.value = secondaryColor;

    const primaryColorRgb = ColorUtil.hexToRgb(primaryColor);
    const primaryColorHsl = primaryColorRgb
      ? ColorUtil.rgbToHsl(primaryColorRgb.r, primaryColorRgb.g, primaryColorRgb.b)
      : null;
    if (primaryColorHsl) {
      document.documentElement.dataset.primaryType =
        primaryColorHsl.l > 0.5 ? "light" : "dark";
      document.documentElement.style.setProperty(
        "--custom-color-primary-h",
        `${Math.floor(primaryColorHsl.h * 360)}`
      );
      document.documentElement.style.setProperty(
        "--custom-color-primary-s",
        `${Math.floor(primaryColorHsl.s * 100)}%`
      );
      document.documentElement.style.setProperty(
        "--custom-color-primary-l",
        `${Math.floor(primaryColorHsl.l * 100)}%`
      );
    }

    const secondaryColorRgb = ColorUtil.hexToRgb(secondaryColor);
    const secondaryColorHsl = secondaryColorRgb
      ? ColorUtil.rgbToHsl(
        secondaryColorRgb.r,
        secondaryColorRgb.g,
        secondaryColorRgb.b
      )
      : null;
    if (secondaryColorHsl) {
      document.documentElement.style.setProperty(
        "--custom-color-secondary-hs",
        `${Math.floor(secondaryColorHsl.h * 360)}, ${Math.floor(
          secondaryColorHsl.s * 100
        )}%`
      );
      document.documentElement.style.setProperty(
        "--custom-color-secondary-l",
        `${Math.floor(secondaryColorHsl.l * 100)}%`
      );
    }
  }
}

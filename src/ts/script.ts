import "../scss/style.scss";
import * as lozad from 'lozad';

class Popup {
  constructor(private button) {
    this.init();
  }

  private init() {
    this.button.addEventListener("click", () => {
      const target = this.getTarget();
      if (target) {
        const hidden = target.getAttribute("aria-hidden") === "true";
        if (hidden) {
          this.open();
        } else {
          this.close();
        }
      }
    });
  }

  private getTarget() {
    const targetId = this.button.getAttribute("aria-controls");
    return targetId ? document.getElementById(targetId) : null;
  }

  private onOutsideClick = (event) => {
    const target = this.getTarget();
    if (event.target === this.button) {
      return;
    }
    if (target && !target.contains(event.target)) {
       this.close();
    }
  }

  open() {
    const target = this.getTarget();
    target.setAttribute("aria-hidden", "false");
    this.button.setAttribute("aria-pressed", "true");
    if (target.classList.contains("pt-modal-locator")) {
      document.body.dataset.locked = "true";
      const hideButtons = target.querySelectorAll("[data-dismiss]");
      hideButtons.forEach((button: HTMLElement) => {
        button.onclick = () => {
          this.close()
        };
      });
    }
    window.addEventListener("click", this.onOutsideClick);
  }

  close() {
    const target = this.getTarget();
    target.setAttribute("aria-hidden", "true");
    this.button.setAttribute("aria-pressed", "false");
    if (target.classList.contains("pt-modal-locator")) {
      document.body.dataset.locked = "false";
      const hideButtons = target.querySelectorAll("[data-dismiss]");
      hideButtons.forEach((button: HTMLElement) => {
        button.onclick = undefined;
      });
    }
    window.removeEventListener("click", this.onOutsideClick);
  }
}

class ThemeList {

  constructor(private list) {
    this.init();
  }

  private init() {
    const currentTheme = new ThemeUtil().getTheme();
    const listItems = Array.from(this.list.querySelectorAll("li"));

    listItems.forEach((item: HTMLElement) => {
      if (item.dataset.value === currentTheme) {
        item.setAttribute("aria-selected", "true");
      }

      item.addEventListener("click", () => {
        listItems.forEach((item: HTMLElement) => {
          item.setAttribute("aria-selected", "false");
        });
        new ThemeUtil().setTheme(item.dataset.value as Theme);
        item.setAttribute("aria-selected", "true");
      })
    });
  }
}

type Theme = "auto" | "light" | "dark" | "blue-print" | "custom";

class ThemeUtil {

  setTheme(theme: Theme) {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }

  getTheme(): Theme {
    return localStorage.getItem("theme") as Theme || "blue-print";
  }
}

class CustomTheme {

  constructor(private primaryPicker: HTMLInputElement, private secondaryPicker: HTMLInputElement) {
  }

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

    const primaryColorRgb = this.hexToRgb(primaryColor);
    const primaryColorHsl =
      primaryColorRgb ? this.rgbToHsl(primaryColorRgb.r, primaryColorRgb.g, primaryColorRgb.b) : null;
    if (primaryColorHsl) {
      document.documentElement.dataset.primaryType = primaryColorHsl.l > 0.5 ? "light" : "dark";
      document.documentElement.style.setProperty("--custom-color-primary-h", `${Math.floor(primaryColorHsl.h * 360)}`);
      document.documentElement.style.setProperty("--custom-color-primary-s", `${Math.floor(primaryColorHsl.s * 100)}%`);
      document.documentElement.style.setProperty("--custom-color-primary-l", `${Math.floor(primaryColorHsl.l * 100)}%`);
    }

    const secondaryColorRgb = this.hexToRgb(secondaryColor);
    const secondaryColorHsl =
      secondaryColorRgb ? this.rgbToHsl(secondaryColorRgb.r, secondaryColorRgb.g, secondaryColorRgb.b) : null;
    if (secondaryColorHsl) {
      document.documentElement.style.setProperty("--custom-color-secondary-hs", `${Math.floor(secondaryColorHsl.h * 360)}, ${Math.floor(secondaryColorHsl.s * 100)}%`);
      document.documentElement.style.setProperty("--custom-color-secondary-l", `${Math.floor(secondaryColorHsl.l * 100)}%`);
    }
  }

  private hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private rgbToHsl(r, g, b) {
    const red = r /255, green = g / 255, blue = b / 255;
    const max = Math.max(red, green, blue), min = Math.min(red, green, blue);
    let h, s, l = (max + min) / 2;
    if (max == min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case red: h = (green - blue) / d + (green < blue ? 6 : 0); break;
        case green: h = (blue - red) / d + 2; break;
        case blue: h = (red - green) / d + 4; break;
      }
      h /= 6;
    }
    return { h, s, l };
  }
}

window.addEventListener("DOMContentLoaded", ()=> {
  const themeUtil = new ThemeUtil();
  themeUtil.setTheme(themeUtil.getTheme());

  const themeList = document.querySelector("#theme .pt-popup-menu")
  new ThemeList(themeList);

  const primaryColorPicker = document.getElementById("primary") as HTMLInputElement|null;
  const secondaryColorPicker = document.getElementById("secondary") as HTMLInputElement|null;

  if (primaryColorPicker && secondaryColorPicker) {
    const customTheme = new CustomTheme(primaryColorPicker, secondaryColorPicker);
    customTheme.sync();
    primaryColorPicker.addEventListener("change", () => {
      customTheme.setPrimaryColor(primaryColorPicker.value);
      customTheme.sync();
    });
    secondaryColorPicker.addEventListener("change", () => {
      customTheme.setSecondaryColor(secondaryColorPicker.value);
      customTheme.sync();
    });
  }

  const button = document.querySelector("#theme-button");
  new Popup(button);
  const contactButton = document.querySelector("#contact-button");
  new Popup(contactButton);

  const el = document.querySelectorAll(".pt-header-1, .pt-header-2, .pt-header-3, .pt-paragraph, .pt-list, .pt-badge, .pt-flying-card, .pt-work-year");
  const observer = lozad(el);
  observer.observe();
});



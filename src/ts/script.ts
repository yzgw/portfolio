import "../scss/style.scss";
import * as lozad from "lozad";
import { ThemeUtil } from "./lib/ThemeUtil";
import { Popup } from "./lib/Popup";
import { CustomTheme } from "./lib/CustomTheme";
import { ThemeList } from "./lib/ThemeList";

window.addEventListener("DOMContentLoaded",
  () => {
    new ThemeUtil().sync();

    const themeList = document.querySelector<HTMLElement>("#theme .pt-popup-menu");
    if (themeList) {
      new ThemeList(themeList);
    }

    const primaryColorPicker = document.getElementById(
      "primary"
    ) as HTMLInputElement | null;
    const secondaryColorPicker = document.getElementById(
      "secondary"
    ) as HTMLInputElement | null;

    if (primaryColorPicker && secondaryColorPicker) {
      const customTheme = new CustomTheme(
        primaryColorPicker,
        secondaryColorPicker
      );
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

    const button = document.querySelector<HTMLElement>("#theme-button");
    if (button) {
      new Popup(button);
    }

    const contactButton = document.querySelector<HTMLElement>("#contact-button");
    if (contactButton) {
      new Popup(contactButton);
    }

    const observeTarget = document.querySelectorAll(
      ".pt-header-1, .pt-header-2, .pt-header-3, .pt-paragraph, .pt-list, .pt-badge, .pt-flying-card, .pt-work-year"
    );
    const observer = lozad(observeTarget);
    observer.observe();
  });

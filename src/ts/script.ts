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

  init() {
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

type Theme = "auto" | "light" | "dark" | "blue-print";

class ThemeUtil {

  setTheme(theme: Theme) {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }

  getTheme(): Theme {
    return localStorage.getItem("theme") as Theme || "blue-print";
  }
}

window.addEventListener("DOMContentLoaded", ()=> {
  const themeUtil = new ThemeUtil();
  themeUtil.setTheme(themeUtil.getTheme());

  const themeList = document.querySelector("#theme .pt-popup-menu")
  new ThemeList(themeList);

  const button = document.querySelector("#theme-button");
  new Popup(button);
  const contactButton = document.querySelector("#contact-button");
  new Popup(contactButton);

  const el = document.querySelectorAll(".pt-header-1, .pt-header-2, .pt-header-3, .pt-paragraph, .pt-list, .pt-badge, .pt-flying-card, .pt-work-year");
  const observer = lozad(el);
  observer.observe();
});



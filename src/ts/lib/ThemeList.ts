import { Theme, ThemeUtil } from "./ThemeUtil";

export class ThemeList {
  constructor(private list: HTMLElement) {
    this.init();
  }

  private init() {
    const currentTheme = new ThemeUtil().getTheme();
    const listItems = Array.from(this.list.querySelectorAll<HTMLElement>("li"));

    listItems.forEach((item) => {
      if (item.dataset.value === currentTheme) {
        item.setAttribute("aria-selected", "true");
      }
      item.addEventListener("click", () => {
        listItems.forEach((item) => {
          item.setAttribute("aria-selected", "false");
        });
        new ThemeUtil().setTheme(item.dataset.value as Theme);
        item.setAttribute("aria-selected", "true");
      });
    });
  }
}

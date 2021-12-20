export type Theme = "auto" | "light" | "dark" | "blue-print" | "custom";

export class ThemeUtil {
  sync() {
    document.documentElement.dataset.theme = this.getTheme();
  }

  setTheme(theme: Theme) {
    localStorage.setItem("theme", theme);
    this.sync();
  }

  getTheme(): Theme {
    return (localStorage.getItem("theme") as Theme) || "blue-print";
  }
}

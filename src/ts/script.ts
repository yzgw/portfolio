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
    window.addEventListener("click", this.onOutsideClick);
  }

  close() {
    const target = this.getTarget();
    target.setAttribute("aria-hidden", "true");
    this.button.setAttribute("aria-pressed", "false");
    window.removeEventListener("click", this.onOutsideClick);
  }
}

window.addEventListener("DOMContentLoaded", ()=> {
  const button = document.querySelector(".pt-fab-button");
  const popup = new Popup(button);
  const el = document.querySelectorAll(".pt-header-1, .pt-header-2, .pt-header-3, .pt-paragraph, .pt-list, .pt-label");
  const observer = lozad(el);
  observer.observe();
});

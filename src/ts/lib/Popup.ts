export class Popup {
  constructor(private button: HTMLElement) {
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

  private onOutsideClick = (event: MouseEvent) => {
    const target = this.getTarget();
    if (event.target === this.button) {
      return;
    }
    if (target && !target.contains(event.target as Node)) {
      this.close();
    }
  };

  open() {
    const target = this.getTarget();
    if (!target) {
      return;
    }
    target.setAttribute("aria-hidden", "false");
    this.button.setAttribute("aria-pressed", "true");
    if (target.classList.contains("pt-modal-locator")) {
      document.body.dataset.locked = "true";
      const hideButtons = target.querySelectorAll<HTMLElement>("[data-dismiss]");
      hideButtons.forEach((button) => {
        button.onclick = () => {
          this.close();
        };
      });
    }
    window.addEventListener("click", this.onOutsideClick);
  }

  close() {
    const target = this.getTarget();
    if (!target) {
      return;
    }
    target.setAttribute("aria-hidden", "true");
    this.button.setAttribute("aria-pressed", "false");
    if (target.classList.contains("pt-modal-locator")) {
      document.body.dataset.locked = "false";
      const hideButtons = target.querySelectorAll<HTMLElement>("[data-dismiss]");
      hideButtons.forEach((button) => {
        button.onclick = null;
      });
    }
    window.removeEventListener("click", this.onOutsideClick);
  }
}

export default class Popup {
  constructor(popupSelector) {
    this._popupEl = popupSelector;
    this._popupCloseButton = this._popupEl.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    this._popupEl.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popupEl.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });

    this._popupEl.addEventListener("click", (evt) => {
      if (evt.target === this._popupEl) {
        this.close();
      }
    });
  }
}

import Popup from "./Popup";

export default class DeleteCard extends Popup {
  constructor(popupSelector, cardEl) {
    super(popupSelector);
    this._popup = popupSelector;
    this._cardEl = cardEl;
  }

  _delete(cardEl) {
    cardEl.remove();
  }

  setEventListeners() {
    const deleteCard = this._popup.querySelector(".button__confirm-delete");
    const deleteCardClose = this._popup.querySelector(".modal__close-button");
    const deleteCardCancel = this._popup.querySelector(".button__cancel");
    this._popup.addEventListener("submit", () => {});
    deleteCardClose.addEventListener("click", () => {
      this.close();
    });
    deleteCardCancel.addEventListener("click", () => {
      this.close();
    });
    deleteCard.addEventListener("click", () => {
      this._delete(this._cardEl);
      this.close();
    });
    super.setEventListeners();
  }
}

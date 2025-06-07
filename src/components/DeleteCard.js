import Popup from "./Popup";
import Api from "../utils/Api";

export default class DeleteCard extends Popup {
  constructor(popupSelector, cardEl) {
    super(popupSelector);
    this._popup = popupSelector;
    this._cardEl = cardEl;
  }

  _delete(cardEl) {
    const api = new Api({
      baseUrl: "https://around-api.en.tripleten-services.com/v1",
      headers: {
        authorization: "1b479a53-ca53-48f0-8ad9-ce6abaf33b2b",
        "Content-Type": "application/json",
      },
    });
    this._cardId = cardEl._id;
    api.removeCard(this._cardId);
    console.log(cardEl);
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

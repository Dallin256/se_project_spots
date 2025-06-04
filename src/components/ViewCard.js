import Popup from "./Popup";

export default class ViewCard extends Popup {
  constructor(PopupSelector, cardImage, cardName) {
    super(PopupSelector);
    this._cardImage = cardImage;
    this._cardName = cardName;
  }

  generatePopup() {
    const image = this._popupEl.querySelector(".modal__picture");
    const cardTitle = this._popupEl.querySelector(".modal__picture-caption");
    image.src = this._cardImage;
    image.alt = this._cardName;
    cardTitle.textContent = this._cardName;
  }

  setEventListeners() {
    super.setEventListeners();
  }
}

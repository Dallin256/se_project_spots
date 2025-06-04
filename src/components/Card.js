import DeleteCard from "./DeleteCard";

export default class Card {
  constructor(data, templateElement) {
    this._cardTemplate = templateElement;
    this._cardName = data.name;
    this._cardLink = data.link;
  }

  getView() {
    this._cardElement = this._cardTemplate.firstElementChild.cloneNode(true);

    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__name");

    cardImage.src = this._cardLink;
    cardImage.alt = this._cardName;
    cardTitle.textContent = this._cardName;

    this._setEventListeners();

    return this._cardElement;
  }

  _handleDeleteCard() {
    const deleteCardModal = document.querySelector("#delete-card");
    const deletePopup = new DeleteCard(deleteCardModal);
    deletePopup.open();
  }

  _setEventListeners() {
    console.log("listening");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }
}

import DeleteCard from "./DeleteCard";
import ViewCard from "./viewCard";
import Favorite from "./Favorite";

export default class Card {
  constructor(data, templateElement) {
    this._cardTemplate = templateElement;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardId = data._id;
    this._cardLike = data.isLiked;
    this._all = data;
  }

  getView() {
    this._cardElement = this._cardTemplate.firstElementChild.cloneNode(true);

    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__name");

    cardImage.src = this._cardLink;
    cardImage.alt = this._cardName;
    cardTitle.textContent = this._cardName;

    this._setEventListeners(this._cardElement);
    this._handleFavoriteCard();

    return this._cardElement;
  }

  _handleDeleteCard(cardElement) {
    const deleteCardModal = document.querySelector("#delete-card");
    const deletePopup = new DeleteCard(
      deleteCardModal,
      cardElement,
      this._cardId
    );
    deletePopup.open();
    deletePopup.setEventListeners();
  }

  _handleViewCard() {
    const viewCardModal = document.querySelector("#picture__modal");
    const viewCard = new ViewCard(
      viewCardModal,
      this._cardLink,
      this._cardName
    );
    viewCard.generatePopup();
    viewCard.setEventListeners();
    viewCard.open();
  }

  _handleFavoriteCard() {
    const favorite = new Favorite(
      this._favoriteBtn,
      this._cardLike,
      this._cardId
    );
    favorite.toggleFavorite();
  }

  _setEventListeners(cardElement) {
    this._deleteBtn = cardElement.querySelector(".card__delete-button");
    this._favoriteBtn = cardElement.querySelector(".card__heart");
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteCard(cardElement);
    });
    cardElement.addEventListener("click", (evt) => {
      if (evt.target !== this._favoriteBtn && evt.target !== this._deleteBtn) {
        this._handleViewCard();
      }
    });

    cardElement.addEventListener("click", (evt) => {
      if (evt.target == this._favoriteBtn) {
        this._handleFavoriteCard();
      }
    });
  }
}

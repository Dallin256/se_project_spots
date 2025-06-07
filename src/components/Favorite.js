import Api from "../utils/Api";

export default class Favorite {
  constructor(favoriteBtn, isLiked, cardId) {
    this._favoriteBtn = favoriteBtn;
    this._isLiked = isLiked;
    this._id = cardId;
  }

  toggleFavorite() {
    const api = new Api({
      baseUrl: "https://around-api.en.tripleten-services.com/v1",
      headers: {
        authorization: "1b479a53-ca53-48f0-8ad9-ce6abaf33b2b",
        "Content-Type": "application/json",
      },
    });

    if (
      this._favoriteBtn.classList.contains("card__heart_filled") ||
      this._isLiked == "false"
    ) {
      this._favoriteBtn.classList.remove("card__heart_filled");
      this._isLiked = "false";
      api.dislikeCard(this._id);
    } else if (
      !this._favoriteBtn.classList.contains("card__heart_filled") ||
      this._isLiked == "true"
    ) {
      this._favoriteBtn.classList.add("card__heart_filled");
      this._isLiked = "true";
      api.likeCard(this._id);
    }
  }

  checkfavorite() {}
}

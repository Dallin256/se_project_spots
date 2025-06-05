export default class Favorite {
  constructor(favoriteBtn) {
    this._favoriteBtn = favoriteBtn;
  }

  toggleFavorite() {
    if (this._favoriteBtn.classList.contains("card__heart_filled")) {
      this._favoriteBtn.classList.remove("card__heart_filled");
    } else if (!this._favoriteBtn.classList.contains("card__heart_filled")) {
      this._favoriteBtn.classList.add("card__heart_filled");
    }
  }
}

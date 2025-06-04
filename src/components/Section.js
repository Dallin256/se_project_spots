export default class Section {
  constructor({ items, renderer, containerEl }) {
    this._items = items;
    this._renderer = renderer;
    this._containerEl = containerEl;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerEl.prepend(element);
  }
}

import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(cardName, cardLink) {
    this.popup.querySelector(`${this._selector}__image`).src = cardLink;
    this.popup.querySelector(`${this._selector}__image`).alt = cardName;
    this.popup.querySelector(`${this._selector}__caption`).textContent = cardName;
    super.open()
  }
}

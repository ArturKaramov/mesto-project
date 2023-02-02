import Popup from "./Popup";

export default class PopupForDelete extends Popup {
  constructor(selector, {deleteCallback}) {
    super(selector);
    this._deleteCallback = deleteCallback;
    this._deleteFunction = this._deleteFunction.bind(this);
    this._confirmButton = this._popup.querySelector('.popup__button');
  }

  _deleteFunction() {
    this._deleteCallback(this._card, this._cardId);
  }

  open(card, cardId) {
    super.open()
    this._card = card;
    this._cardId = cardId;
    this._confirmButton.addEventListener('click', this._deleteFunction);
  }

  close() {
    super.close()
    this._confirmButton.removeEventListener('click', this._deleteFunction);
  }
}

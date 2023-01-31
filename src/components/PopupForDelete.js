import Popup from "./Popup";

export default class PopupForDelete extends Popup {
  constructor(selector, {deleteCallback}) {
    super(selector);
    this._deleteCallback = deleteCallback;
    this._deleteFunction = this._deleteFunction.bind(this);
    this._confirmButton = this._popup.querySelector('.popup__button');
  }

  _deleteFunction() {
    this._deleteCallback(this._card);
  }

  open(card) {
    super.open()
    this._card = card;
    this._confirmButton.addEventListener('click', this._deleteFunction);
  }

  close() {
    super.close()
    this._confirmButton.removeEventListener('click', this._deleteFunction);
  }
}

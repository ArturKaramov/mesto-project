import Popup from "./Popup";

export default class PopupForDelete extends Popup {
  constructor(selector, {deleteCallback}) {
    super(selector);
    this._deleteCallback = deleteCallback;
    this._deleteFunction = this._deleteFunction.bind(this);
    this._confirmButton = this._popup.querySelector('.popup__button');
  }

  open(evt) {
    super.open()
    this._cardToDelete = this._cardToDelete = evt.target.closest('.element');
    this.setEventListeners()
  }

  _deleteFunction() {
    this._deleteCallback(this._cardToDelete);
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', this._deleteFunction);
  }

  removeEventListeners() {
    this._confirmButton.removeEventListener('click',  this._deleteFunction);
  }
}

import { Popup } from "./Popup";

export class PopupForDelete extends Popup {
  constructor(selector, {deleteCallback}) {
    super(selector);
    this._deleteCallback = deleteCallback;
  }

  setEventListeners(evt) {
    super.setEventListeners();
    this._cardToDelete = evt.target.closest('.element');
    this._popup.querySelector('.popup__button').addEventListener('click', () => { this._deleteCallback(this._cardToDelete) } );
  }
}

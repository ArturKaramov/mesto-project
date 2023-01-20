import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor(selector, {submitCallback}) {
    super(selector);
    this._submitCallback = submitCallback;
  }

  setEventListeners(evt) {
    super.setEventListeners();
    this._cardToDelete = evt.target.closest('.element');
    this.popup.querySelector('.popup__button').addEventListener('click', () => { this._submitCallback(this._cardToDelete)} );
  }
};

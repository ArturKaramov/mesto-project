import Popup from "./Popup";

export default class PopupForDelete extends Popup {
  constructor(selector, {deleteCallback}) {
    super(selector);
    this._deleteCallback = deleteCallback;
    this._deleteFunction = this._deleteFunction.bind(this);
    this._confirmButton = this._popup.querySelector('.popup__button');
    this._confirmButtonText = this._confirmButton.textContent;
  }

  _deleteFunction() {
    this._deleteCallback(this._card);
  }

  renderLoading(isLoading, loadingText='Удаление...') {
    if (isLoading) {
      this._confirmButton.textContent = loadingText;
    } else {
      this._confirmButton.textContent = this._confirmButtonText;
    }
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

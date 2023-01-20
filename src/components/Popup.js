export default class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this._selector = selector;
  }

  open() {
    this.popup.classList.add('popup_opened');
  }

  close() {
    this.popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {this.close()};
  }

  _handleOverlayClose(evt) {
    if(evt.target === evt.currentTarget) {this.close()};
  }

  setEventListeners() {
    this.popup.querySelector('.popup__close').addEventListener('click', () => this.close());
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this.popup.addEventListener('click', (evt) => this._handleOverlayClose(evt));
  }

  popupIsLoading(isLoading) {

  }
}

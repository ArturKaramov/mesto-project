import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, {submitCallback}) {
    super(selector);
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    const data = {};
    Array.from(this.popup.querySelectorAll('.popup__item')).forEach(input => {
      data[input.name] = input.value;
    });
    return data
  }

  setEventListeners() {
    super.setEventListeners()
    this.popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues())
    })
  }

  _clear() {
    this.popup.querySelector('.popup__form').reset()
  }

  close() {
    super.close()
    this._clear()
  }

  popupIsLoading(isLoading) {
    const button = this.popup.querySelector('.popup__button');
    if (isLoading) {button.textContent = button.getAttribute('data-load')}
    else {button.textContent = button.getAttribute('data-init')}
  }
}

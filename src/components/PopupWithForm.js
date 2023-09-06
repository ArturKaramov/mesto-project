import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitButton = this._popup.querySelector('.popup__button');
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
    this._form = this._popup.querySelector('.popup__form');
  }

  renderLoading(isLoading, loadingText='Создание...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues())
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}

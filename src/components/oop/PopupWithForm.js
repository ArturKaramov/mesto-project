//  M E S T O   -   O O P

// Создайте класс PopupWithForm, который наследуется от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только
// добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, {formSubmit}) {
    super(selector);
    this.formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
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
      this.formSubmit(this._getInputValues())
    })
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}

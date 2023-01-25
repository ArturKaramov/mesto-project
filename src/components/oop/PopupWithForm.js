//  M E S T O   -   O O P

// Создайте класс PopupWithForm, который наследуется от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только
// добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, formSubmit) {
    super(selector);

    this.formSubmit = formSubmit;
  }

  _getInputValues() {
    this.forms = document.querySelectorAll('.popup__form');

    this.forms.forEach((form) => {
      form.reset();
    });
  }

  setEventListeners() {
    super.setEventListeners();

  //   this.form.addEventListener('submit', () => {
  //     this.formSubmit(this.close());
  // });
  }

  close() {
    super.close();
    this._getInputValues();
  }
}

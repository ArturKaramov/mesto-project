//  M E S T O   -   O O P

// Создайте класс PopupWithForm, который наследуется от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только
// добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector) {
    super(selector);

    // this.formSubmit = formSubmit;

  }

  _getInputValues() {
    const forms = document.querySelectorAll('.popup__form');

    forms.forEach((form) => {
      form.reset();
    });
  }

  // setEventListeners() {
  //   super.setEventListeners();

  // }

  close(selector) {
    super.close(selector);
    this._getInputValues();
  }
}

export const popupForm = new PopupWithForm();

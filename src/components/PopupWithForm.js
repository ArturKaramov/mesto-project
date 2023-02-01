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
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;

    // Ревью 1 - Можно лучше:
    this._submitButton = this._popup.querySelector('.popup__button');
    this._submitButtonText = this._submitButton.textContent // фиксируем начальный текст кнопки 1 раз в конструкторе

    this._inputList = Array.from(this._popup.querySelectorAll('.popup__item')); // перенесено в конструктор после Ревью 2
    this._form = this._popup.querySelector('.popup__form'); // перенесено в конструктор после Ревью 3
  }

  // Ревью 1 - Можно лучше:
  // Лучше сделать метод renderLoading в классе PopupWithForm. Там найти 1 раз кнопку сабмита в конструкторе и менять ей текст.
  // И теперь не нужно даже думать, как возвращать начальный текст кнопке. Все будет работать для любого текста
  renderLoading(isLoading, loadingText='Сохранение...') { // указываем 2 параметра (2й с текстом по умолчанию, чтобы не указывать лишний раз его)
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
      this.handleSubmit(this._getInputValues())
    })
  }

  close() {
    super.close();
    this._form.reset(); // исправлено после ревью 3
  }
}

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
  constructor(popupSelector, {handleSubmit}) {  // constructor({ popupSelector, handleSubmit })
    super(popupSelector);
    this.handleSubmit = handleSubmit;

    // Можно лучше:

    // this._submitBtnText = this._submitBtn.textContent // фиксируем начальный текст кнопки 1 раз в конструкторе
  }

  // Можно лучше:
  // Лучше сделать метод renderLoading в классе PopupWithForm. Там найти 1 раз кнопку сабмита в конструкторе и менять ей текст.

  // renderLoading(isLoading, loadingText='Сохранение...') { // указываем 2 параметра (2й с текстом по умолчанию, чтобы не указывать лишний раз его)
  //   if (isLoading) {
  //     this._submitBtn.textContent = loadingText;
  //   } else {
  //     this._submitBtn.textContent = this._submitBtnText;
  //   }
  // }

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
      this.handleSubmit(this._getInputValues())
    })

    // Можно лучше:
    // Если будет интересно, можно сделать так, чтобы внутрь обработчика сабмита уходила цепочка промиса (then, finally),
    // чтобы можно было универсально закрывать попапы в then, и возвращать текст кнопки сабмита в finally:

    // this._form.addEventListener('submit', () => {
    //   // перед запросом сохраняем изначальный текст кнопки
    //   const initialText = this._submitButton.textContent;
    //   // меняем его, чтобы показать пользователю ожидание
    //   this._submitButton.textContent = 'Сохранение...';
    //   this._submitForm(this._getInputValues())
    //     .then(() => this.close()) // закрывается попап в `then`
    //     .finally(() => {
    //       this._submitButton.textContent = initialText;
    //     }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
    // });
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}

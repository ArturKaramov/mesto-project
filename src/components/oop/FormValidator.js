//  M E S T O   -   O O P

// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля,
// изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создавайте экземпляр класса FormValidator.



export default class FormValidator {
  constructor({ formSelector, inputSelector, submitButtonSelector, inputErrorClass }, {formElement}) {

    this.formSelector = formSelector;
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inputErrorClass = inputErrorClass;

    this.formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this.inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {return !input.validity.valid})
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", "")
    }
    else {
      buttonElement.removeAttribute("disabled", "")}
  }

  _togglePopupButtonState() {
    const inputList = Array.from(this.formElement.querySelectorAll('.popup__item'));
    const buttonElement = this.formElement.querySelector('.popup__button');
    this._toggleButtonState(inputList, buttonElement);
  }

  _setEventListeners() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners()
  }
}

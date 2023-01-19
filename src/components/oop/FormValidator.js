//  M E S T O   -   O O P

// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля,
// изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создавайте экземпляр класса FormValidator.


class FormValidator {
  constructor(selector, formElement) {
    this.selector = selector; // пока не знаю что с ними делать
    this.formElement = formElement; // пока не знаю что с ними делать
  }

  _showInputError(formElement, inputElement, errorMessage, obj) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.remove(obj.errorClass); // добавлено Александром
  }

  _hideInputError(formElement, inputElement, obj) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(obj.errorClass); // добавлено Александром
  }

  _checkInputValidity(formElement, inputElement, obj) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
      this._hideInputError(formElement, inputElement, obj);
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

  _togglePopupButtonState(popup) {
    const inputList = Array.from(popup.querySelectorAll('.popup__item'));
    const buttonElement = popup.querySelector('.popup__button');
    this._toggleButtonState(inputList, buttonElement);
  }

  _setEventListeners(formElement, obj) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, obj);
        this._toggleButtonState(inputList, buttonElement, obj);
      });
    });
  }

  enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => { // добавлено Александром
        evt.preventDefault();
      });
      this._setEventListeners(formElement, obj)
    });
  }
}

export const validator = new FormValidator();

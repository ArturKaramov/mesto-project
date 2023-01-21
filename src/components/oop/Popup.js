//  M E S T O   -   O O P

// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
// Модальное окно также закрывается при клике на затемнённую область вокруг формы.

export class Popup {
  constructor(selector) {
    this.selector = selector;

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open(selector) {
    selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(selector) {
    selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.openedPopup = document.querySelector('.popup_opened');
      this.close(this.openedPopup);
    }
  }

  popupIsLoading(isLoading, popup) {
    const button = popup.querySelector('.popup__button');

    if (isLoading) {
      button.textContent = button.getAttribute('data-load')
    } else {
      button.textContent = button.getAttribute('data-init')
    }
  }

  // setEventListeners() { // не получается где то использовать
  //   document.querySelector('.popup__close').addEventListener('click', (evt) => {
  //     popup.close(evt);
  //   });
  //    document.addEventListener('mousedown', this.close)
  // }
}

export const popup = new Popup();

//  M E S T O   -   O O P

// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
// Модальное окно также закрывается при клике на затемнённую область вокруг формы.

export default class Popup {
  constructor(selector) {
    this.selector = selector;
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  popupIsLoading(isLoading) {
    if (isLoading) {
      this._popup.querySelector('.popup__button').textContent = this._popup.querySelector('.popup__button').getAttribute('data-load')
    } else {
      this._popup.querySelector('.popup__button').textContent = this._popup.querySelector('.popup__button').getAttribute('data-init')
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
  }
}

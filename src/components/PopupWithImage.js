//  M E S T O   -   O O P

// Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.popupImgPhoto = document.querySelector('.popup-image__image');
    this.popupCaption = document.querySelector('.popup-image__caption');
  }

  open(name, link) {
    super.open();
    this.popupImgPhoto.src = link;
    this.popupImgPhoto.alt = name;
    this.popupCaption.textContent = name;
  }
}

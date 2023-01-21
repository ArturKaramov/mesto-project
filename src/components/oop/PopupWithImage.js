//  M E S T O   -   O O P

// Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.

import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    // this.popupImgPhoto = this.element.querySelector('.popup-image__image');
    // this.popupCaption = this.element.querySelector('.popup-image__caption');

    this.popupImgPhoto = document.querySelector('.popup-image__image');
    this.popupCaption = document.querySelector('.popup-image__caption');
  }
  open(data) {
    super.open();
    this.popupImgPhoto.src = data.link;
    this.popupImgPhoto.alt = data.name;
    this.popupCaption.textContent = data.name;

    // this.popupImgPhoto.src = cardData.link;
    // this.popupImgPhoto.alt = cardData.name;
    // this.popupCaption.textContent = cardData.name;
  }
}

export const popupImage = new PopupWithImage('.popup-image');

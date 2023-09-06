import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImgPhoto = document.querySelector('.popup-image__image');
    this._popupImgName = document.querySelector('.popup-image__name');
    this._popupImgOwner = document.querySelector('.popup-image__owner')
  }

  open(name, link, owner) {
    this._popupImgPhoto.src = link;
    this._popupImgPhoto.alt = name;
    this._popupImgName.textContent = name;
    this._popupImgOwner.textContent = owner;
    super.open();
  }
}

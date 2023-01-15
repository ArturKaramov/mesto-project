import { openPopup } from "./modal.js";

import {templateElement, cardsContainer, popupImg, popupDelete, popupImgPhoto, popupCaption} from "./variables.js"

export default class Card {
  constructor({name, link, likes, owner, _id}, {deleteCallback, likeCallback}, selector, userId) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.id = owner._id;
    this.cardId = _id;
    this._deleteCallback = deleteCallback;
    this._likeCallback = likeCallback;
    this.selector = selector;
    this.userId = userId;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this.selector)
      .content
      .querySelector('.element')
      .cloneNode(true)
    return cardElement
  }

  _createCard() {
    this._element = this._getElement();
    this._element.dataset.id = this.cardId;
    this._element.querySelector('.element__photo').src = this.link;
    this._element.querySelector('.element__photo').alt = this.name;
    this._element.querySelector('.element__name').textContent = this.name;
    this._element.querySelector('.element__likes-number').textContent = this.likes.length;
    if (this.likes.some((like) => {return like._id === this.userId})) {
      this._element.querySelector('.element__like').classList.add('element__like_active')
    };
    this._setEventListeners();
    if (this.id !== this.userId) {this._element.querySelector('.element__delete').remove()}
    return this._element
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => {this._deleteCallback(evt)});
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {this._likeCallback(evt)});
  }

  getCard() {
    return this._createCard()
  }
};


let cardToDelete = null;

const openDeletePopup = (evt) => {
  cardToDelete = evt.target.closest('.element');
  openPopup(popupDelete);
};

const removeCard = (card) => {card.remove()}

const changeLikeCondition = (card, likesNum) => {
  const cardLikesNum = card.querySelector('.element__likes-number');
  const cardLikeButton = card.querySelector('.element__like');
  cardLikesNum.textContent = likesNum;
  cardLikeButton.classList.toggle('element__like_active');
};

function viewCard(cardData) {
  popupImgPhoto.src = cardData.link;
  popupImgPhoto.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupImg);
};

export {templateElement, cardsContainer, popupImg, popupImgPhoto, popupCaption, changeLikeCondition, viewCard, cardToDelete, removeCard, openDeletePopup}

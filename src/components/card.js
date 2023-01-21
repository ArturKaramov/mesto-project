import { openPopup } from "./modal.js";

import { toggleLike } from "./api.js";

import {templateElement, cardsContainer, popupImg, popupDelete, popupImgPhoto, popupCaption} from "./variables.js"

//  M E S T O   -   O O P

import { popupImage } from "../components/oop/PopupWithImage.js";


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

// function viewCard(cardData) {
//   popupImgPhoto.src = cardData.link;
//   popupImgPhoto.alt = cardData.name;
//   popupCaption.textContent = cardData.name;
//   openPopup(popupImg);
// };

function viewCard(cardData) {
  popupImgPhoto.src = cardData.link;
  popupImgPhoto.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  // openPopup(popupImg);
  popupImage.open(popupImg);
};


function createCard(cardData, id, likeCallback) {
  const card = templateElement.querySelector('.element').cloneNode(true);
  const cardPhoto = card.querySelector('.element__photo');
  const cardTrash = card.querySelector('.element__delete');
  const cardLike = card.querySelector('.element__like');
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;
  card.querySelector('.element__name').textContent = cardData.name;
  card.querySelector('.element__likes-number').textContent = cardData.likes.length;
  if (cardData.likes.some(function (like) {
    return like._id === id;
  })) {cardLike.classList.add('element__like_active')};
  cardLike.addEventListener('click', likeCallback);
  if (cardData.owner._id !== id) {(cardTrash.remove())}
  card.dataset.id = cardData._id;
  cardTrash.addEventListener('click', openDeletePopup);

  cardPhoto.addEventListener('click', function() {
    // viewCard(cardData); // старый код
    // popupImage.open('.popup-image');
    popupImage.setEventListeners();
  });

  return card;
};

const renderCard = (cardData, id, likeCallback) => {cardsContainer.prepend(createCard(cardData, id, likeCallback))};

// export {templateElement, cardsContainer, popupImg, popupImgPhoto, popupCaption, changeLikeCondition, viewCard, createCard, renderCard, cardToDelete, removeCard}

export {templateElement, cardsContainer, popupImg, popupImgPhoto, popupCaption, changeLikeCondition, createCard, renderCard, cardToDelete, removeCard}

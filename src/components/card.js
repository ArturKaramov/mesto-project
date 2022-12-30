import { openPopup } from "./modal.js";

import { toggleLike } from "./api.js";

import {templateElement, cardsContainer, popupImg, popupDelete, popupImgPhoto, popupCaption} from "./variables.js"

let cardToDelete = null;

const openDeletePopup = (evt) => {
  cardToDelete = evt.target.closest('.element');
  openPopup(popupDelete);
};

const handleLikeButton = (evt) => {
  const card = evt.target.closest('.element');
  const cardId = card.getAttribute('data-id');
  const cardLikes = card.querySelector('.element__likes-number');
  let method;
  evt.target.classList.contains('element__like_active') ? method = 'DELETE' : method = 'PUT';
  toggleLike(cardId, method)
      .then((card) => {
        cardLikes.textContent = card.likes.length
        evt.target.classList.toggle('element__like_active')
      });
};

function viewCard(cardData) {
  popupImgPhoto.src = cardData.link;
  popupImgPhoto.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupImg);
};

function createCard(cardData, id) {
  const card = templateElement.querySelector('.element').cloneNode(true);
  const cardPhoto = card.querySelector('.element__photo');
  const cardTrash = card.querySelector('.element__delete');
  const cardLike = card.querySelector('.element__like');
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;
  card.querySelector('.element__name').textContent = cardData.name;
  if (cardData.likes) {
    card.querySelector('.element__likes-number').textContent = cardData.likes.length;
    if (cardData.likes.some(function (like) {
      return like._id === id;
    })) {cardLike.classList.add('element__like_active')}
  };
  cardLike.addEventListener('click', handleLikeButton);
  if (cardData.owner._id !== id) {(cardTrash.remove())}
  card.dataset.id = cardData._id;
  cardTrash.addEventListener('click', openDeletePopup);
  cardPhoto.addEventListener('click', function() {
    viewCard(cardData);
  });
  return card;
};

const renderCard = (cardData, id) => {cardsContainer.prepend(createCard(cardData, id))};

export {templateElement, cardsContainer, popupImg, popupImgPhoto, popupCaption, handleLikeButton, viewCard, createCard, renderCard, cardToDelete}

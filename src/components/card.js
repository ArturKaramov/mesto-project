import { closePopup, openPopup } from "./modal.js";

import { deleteCard, toggleLike } from "./api.js";

const templateElement = document.querySelector('.element__template').content;
const cardsContainer = document.querySelector('.elements__list');
const popupImg = document.querySelector('.popup-image');
const popupDelete = document.querySelector('.popup-delete');
const buttonDelete = popupDelete.querySelector('.popup__button')
const popupImgPhoto = popupImg.querySelector('.popup-image__image');
const popupCaption = popupImg.querySelector('.popup-image__caption');

const handleDeleteButton = (evt) => {
  const cardToDelete = evt.target.closest('.element');
  console.log(cardToDelete.getAttribute('data-id'))
  openPopup(popupDelete);
  buttonDelete.addEventListener('click', function() {
    cardToDelete.remove();
    deleteCard(cardToDelete.getAttribute('data-id'))
    closePopup(popupDelete);
  })
};

const handleLikeButton = (evt) => {
  const card = evt.target.closest('.element');
  const cardId = card.getAttribute('data-id');
  const cardLikes = card.querySelector('.element__likes-number');
  if (evt.target.classList.contains('element__like_active')) {
    toggleLike(cardId, 'DELETE', cardLikes)
  }
  else {
    toggleLike(cardId, 'PUT', cardLikes)
  }
  evt.target.classList.toggle('element__like_active');
};

function viewCard(cardData) {
  popupImgPhoto.src = cardData.link;
  popupImgPhoto.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupImg);
};

function createCard(cardData) {
  const card = templateElement.querySelector('.element').cloneNode(true);
  const cardPhoto = card.querySelector('.element__photo');
  const cardTrash = card.querySelector('.element__delete');
  const cardLike = card.querySelector('.element__like');
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;
  card.querySelector('.element__name').textContent = cardData.name;
  const profileName = document.querySelector('.profile__name');
  if (cardData.likes) {
    card.querySelector('.element__likes-number').textContent = cardData.likes.length;
    if (cardData.likes.some(function (like) {
      return like['_id'] === profileName.getAttribute('data-id')
    })) {cardLike.classList.add('element__like_active')}
  };
  cardLike.addEventListener('click', handleLikeButton);
  cardTrash.addEventListener('click', handleDeleteButton);
  if (cardData.owner && cardData.owner['_id'] !== profileName.getAttribute('data-id')) {(cardTrash.remove())}
  if (cardData['_id']) {card.setAttribute('data-id', cardData['_id'])};
  cardPhoto.addEventListener('click', function() {
    viewCard(cardData);
  });
  return card;
};

const renderCard = (cardData) => {cardsContainer.prepend(createCard(cardData))};

export {templateElement, cardsContainer, popupImg, popupImgPhoto, popupCaption, handleDeleteButton, handleLikeButton, viewCard, createCard, renderCard}

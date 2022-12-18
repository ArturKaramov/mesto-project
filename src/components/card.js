import { openPopup } from "./modal.js";

const initialCards = [
  {
    name: 'Зеленоградск',
    link: 'https://images.unsplash.com/photo-1612170089049-37dfa35e94a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
  },
  {
    name: 'Башкортостан',
    link: 'https://images.unsplash.com/photo-1630390665522-c597a6b8a2cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1597258071486-bc1754c01349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80'
  },
  {
    name: 'Калининград',
    link: 'https://images.unsplash.com/photo-1548270095-a5b17516d66a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Камчатский край',
    link: 'https://images.unsplash.com/photo-1634743188459-b24e037361a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1612899028149-ddc7969d27cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];

const templateElement = document.querySelector('.element__template').content;
const cardsContainer = document.querySelector('.elements__list');
const popupImg = document.querySelector('.popup-image');
const popupImgPhoto = popupImg.querySelector('.popup-image__image');
const popupCaption = popupImg.querySelector('.popup-image__caption');

const handleDeleteButton = (evt) => {evt.target.closest('.element').remove()};
const handleLikeButton = (evt) => {evt.target.classList.toggle('element__like_active')};

function viewCard(cardData) {
  popupImgPhoto.src = cardData.link;
  popupImgPhoto.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupImg);
};

function createCard(cardData) {
  const card = templateElement.querySelector('.element').cloneNode(true);
  const cardPhoto = card.querySelector('.element__photo');
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;
  card.querySelector('.element__name').textContent = cardData.name;
  card.querySelector('.element__like').addEventListener('click', handleLikeButton);
  card.querySelector('.element__delete').addEventListener('click', handleDeleteButton);
  cardPhoto.addEventListener('click', function() {
    viewCard(cardData);
  });
  return card;
};

const renderCard = (cardData) => {cardsContainer.prepend(createCard(cardData))};

export {initialCards, templateElement, cardsContainer, popupImg, popupImgPhoto, popupCaption, handleDeleteButton, handleLikeButton, viewCard, createCard, renderCard}

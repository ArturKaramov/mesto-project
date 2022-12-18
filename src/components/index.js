import '../styles/index.css';

import {initialCards, renderCard} from './card.js';

import {popupList, openPopup, closePopup, togglePopupButtonState} from './modal.js'

import {enableValidation} from './validate.js';

const popupCloseList = Array.from(document.querySelectorAll('.popup__close'));
const popupProfile = document.querySelector('.popup-profile');
const popupElement = document.querySelector('.popup-element');
const profileEdit = document.querySelector('.profile__edit-button');
const elementAdd = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.profile-edit');
const inputName = formProfile.querySelector('.profile-edit__name');
const inputAbout = formProfile.querySelector('.profile-edit__about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formCard = document.querySelector('.card-add');
const cardName = formCard.querySelector('.card-add__name');
const cardLink = formCard.querySelector('.card-add__link');

function addCardHandle(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  renderCard(cardData);
  closePopup(popupElement);
  formCard.reset();
};

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
};

initialCards.forEach(function(cardData) {
  renderCard(cardData);
});

formProfile.addEventListener('submit', submitProfileForm);

formCard.addEventListener('submit', addCardHandle);

profileEdit.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupProfile);
  togglePopupButtonState(popupProfile);
});

elementAdd.addEventListener('click', function () {
  openPopup(popupElement);
  togglePopupButtonState(popupElement);
});

popupList.forEach(function(popup) {
  popup.addEventListener('mousedown', function(evt) {
    if (evt.target === evt.currentTarget) {closePopup(popup)}
  });
});

popupCloseList.forEach((closeButton) => {
  closeButton.addEventListener('click', (evt) => {closePopup(evt.target.closest('.popup'))})
})

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__item_type_error'
});


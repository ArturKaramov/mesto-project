import '../styles/index.css';

import {renderCard} from './card.js';

import {popupList, openPopup, closePopup, togglePopupButtonState, popupIsLoading} from './modal.js'

import {enableValidation} from './validate.js';

import {getUserData, getInitialCards, setProfileData, postNewCard, updateAvatar} from './api';

const popupCloseList = Array.from(document.querySelectorAll('.popup__close'));
const popupProfile = document.querySelector('.popup-profile');
const popupElement = document.querySelector('.popup-element');
const popupAvatar = document.querySelector('.popup-avatar');
const formAvatar = popupAvatar.querySelector('.popup__form');
const profileEdit = document.querySelector('.profile__edit-button');
const elementAdd = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.profile-edit');
const inputName = formProfile.querySelector('.profile-edit__name');
const inputAbout = formProfile.querySelector('.profile-edit__about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const avatarButton = document.querySelector('.profile__avatar-button');
const profileAvatar = document.querySelector('.profile__avatar');
const formCard = document.querySelector('.card-add');
const cardName = formCard.querySelector('.card-add__name');
const cardLink = formCard.querySelector('.card-add__link');

function addCardHandle(evt) {
  evt.preventDefault();
  popupIsLoading(true, popupElement);
  const cardData = {};
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  postNewCard(cardData, renderCard)
    .finally(() => {
      closePopup(popupElement)
      popupIsLoading(false, popupElement)
    })
  formCard.reset();
};

function submitProfileForm(evt) {
  evt.preventDefault();
  popupIsLoading(true, popupProfile);
  const user = {}
  user.name = inputName.value;
  user.about = inputAbout.value;
  setProfileData(user, {name: profileName, about: profileAbout})
    .finally(() => {
      popupIsLoading(false, popupProfile);
      closePopup(popupProfile)
    });
};

function submitAvatarForm(evt) {
  evt.preventDefault();
  popupIsLoading(true, popupAvatar);
  const newAvatar = popupAvatar.querySelector('.popup__item').value;
  updateAvatar(newAvatar, profileAvatar)
    .finally(() => {
      closePopup(popupAvatar)
      popupIsLoading(false, popupAvatar)
    });
};

formProfile.addEventListener('submit', submitProfileForm);

formCard.addEventListener('submit', addCardHandle);

formAvatar.addEventListener('submit', submitAvatarForm);

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

avatarButton.addEventListener('click', function() {
  openPopup(popupAvatar);
  togglePopupButtonState(popupAvatar);
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
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__item_type_error'
});

getUserData({
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar
});

getInitialCards(renderCard);

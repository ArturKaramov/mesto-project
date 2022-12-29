import '../styles/index.css';

import {renderCard} from './card.js';

import {openPopup, closePopup, popupIsLoading} from './modal.js'

import {enableValidation, togglePopupButtonState} from './validate.js';

import {getInitialData, setProfileData, postNewCard, updateAvatar} from './api';

import { pageIsLoading } from "./utils.js";

import {popupCloseList, popupProfile, popupElement, popupAvatar, formAvatar, profileEdit, elementAdd, formProfile, inputName, inputAbout, profileName, profileAbout, avatarButton, profileAvatar, formCard, cardName, cardLink, popupList} from "./variables.js"

function addCardHandle(evt) {
  evt.preventDefault();
  popupIsLoading(true, popupElement);
  const cardData = {};
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  postNewCard(cardData)
    .then((card) => {
      renderCard(card, userId)
      closePopup(popupElement)
    })
    .catch((err) => {console.error(err)})
    .finally(() => {popupIsLoading(false, popupElement)})
  formCard.reset();
};

function submitProfileForm(evt) {
  evt.preventDefault();
  popupIsLoading(true, popupProfile);
  const user = {}
  user.name = inputName.value;
  user.about = inputAbout.value;
  setProfileData(user)
    .then((data) => {
      profileName.textContent = data.name
      profileAbout.textContent = data.about
      closePopup(popupProfile)
    })
    .finally(() => {
      popupIsLoading(false, popupProfile);
    });
};

function submitAvatarForm(evt) {
  evt.preventDefault();
  popupIsLoading(true, popupAvatar);
  const newAvatar = popupAvatar.querySelector('.popup__item').value;
  updateAvatar(newAvatar)
    .then((data) => {
      profileAvatar.src = data.avatar
      closePopup(popupAvatar)
    })
    .finally(() => {popupIsLoading(false, popupAvatar)});
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

let userId;

getInitialData()
  .then(([data, cards]) => {
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
    profileAvatar.src = data.avatar;
    userId = data._id;
    cards.reverse()
    cards.forEach((card) => {
      renderCard(card, userId)
    })
  })
  .finally(() => pageIsLoading(false));


import '../styles/index.css';

import { openPopup, closePopup, closePopupWithEsc } from './utils';

import {initialCards, renderCard} from './card.js';

import {popupList, popupCloseList, popupProfile, popupElement, profileEdit, elementAdd, formProfile, inputName, inputAbout, profileName, profileAbout, formCard, togglePopupButtonState, addCardHandle, submitProfileForm} from './modal.js'

import {enableValidation} from './validate.js';

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

document.addEventListener('keydown', closePopupWithEsc);

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
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
});


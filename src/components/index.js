import '../styles/index.css';

import Card, { cardToDelete, removeCard, changeLikeCondition, openDeletePopup } from './card.js';

import {openPopup, closePopup, popupIsLoading} from './modal.js'

import FormValidator from './validate.js';

import Api, {informResIsNotOk} from './api';

import { pageIsLoading } from "./utils.js";

import {popupCloseList, popupProfile, popupElement, popupAvatar, formAvatar, profileEdit, elementAdd, formProfile, inputName, inputAbout, profileName, profileAbout, avatarButton, profileAvatar, formCard, cardName, cardLink, popupList, buttonDelete, popupDelete, cardsContainer, token, cohortId, validationSettings } from "./variables.js"

function toggleLikeButton(evt) {
  const card = evt.target.closest('.element');
  const cardId = card.getAttribute('data-id');
  let method = null;
  evt.target.classList.contains('element__like_active') ? method = 'DELETE' : method = 'PUT';
  api.toggleLike(cardId, method)
    .then((data) => {changeLikeCondition(card, data.likes.length)})
    .catch((err) => {informResIsNotOk(err)})
};

function addCardHandle(evt) {
  evt.preventDefault();
  popupIsLoading(true, popupElement);
  const cardData = {};
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  api.postNewCard(cardData)
    .then((card) => {
      const cardElement = new Card(card, {deleteCallback: (evt) => {openDeletePopup(evt)}, likeCallback: (evt) => {toggleLikeButton(evt)}}, '.element__template', userId);
      cardsContainer.prepend(cardElement.getCard());
      closePopup(popupElement)
    })
    .catch((err) => {informResIsNotOk(err)})
    .finally(() => {popupIsLoading(false, popupElement)})
};

function submitProfileForm(evt) {
  evt.preventDefault();
  popupIsLoading(true, popupProfile);
  const user = {}
  user.name = inputName.value;
  user.about = inputAbout.value;
  api.setProfileData(user)
    .then((data) => {
      profileName.textContent = data.name
      profileAbout.textContent = data.about
      closePopup(popupProfile)
    })
    .catch((err) => {informResIsNotOk(err)})
    .finally(() => {popupIsLoading(false, popupProfile)});
};

function submitAvatarForm(evt) {
  evt.preventDefault();
  popupIsLoading(true, popupAvatar);
  const newAvatar = popupAvatar.querySelector('.popup__item').value;
  api.updateAvatar(newAvatar)
    .then((data) => {
      profileAvatar.src = data.avatar
      closePopup(popupAvatar)
    })
    .catch((err) => {informResIsNotOk(err)})
    .finally(() => {popupIsLoading(false, popupAvatar)});
};

formProfile.addEventListener('submit', submitProfileForm);

formCard.addEventListener('submit', addCardHandle);

formAvatar.addEventListener('submit', submitAvatarForm);

buttonDelete.addEventListener('click', function() {
  api.deleteCard(cardToDelete.dataset.id)
    .then(() => {
      removeCard(cardToDelete)
      closePopup(popupDelete)
    })
    .catch((err) => {informResIsNotOk(err)})
});

profileEdit.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupProfile);
  const form = new FormValidator(validationSettings, {form: popupProfile.querySelector('.popup__form')})
  form.togglePopupButtonState(popupProfile);
});

elementAdd.addEventListener('click', function () {
  formCard.reset();
  openPopup(popupElement);
  const form = new FormValidator(validationSettings, {form: popupElement.querySelector('.popup__form')})
  form.togglePopupButtonState(popupElement);
});

avatarButton.addEventListener('click', function() {
  openPopup(popupAvatar);
  const form = new FormValidator(validationSettings, {form: popupAvatar.querySelector('.popup__form')})
  form.togglePopupButtonState(popupAvatar);
});

popupList.forEach(function(popup) {
  popup.addEventListener('mousedown', function(evt) {
    if (evt.target === evt.currentTarget) {closePopup(popup)}
  });
});

popupCloseList.forEach((closeButton) => {
  closeButton.addEventListener('click', (evt) => {closePopup(evt.target.closest('.popup'))})
})

for (let i = 0; i < document.forms.length; i++) {
  const form =  new FormValidator(validationSettings, {form: document.forms[i]});
  form.enableValidation();
}

let userId;

const api = new Api({
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

api.getInitialData()
  .then(([data, cards]) => {
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
    profileAvatar.src = data.avatar;
    userId = data._id;
    cards.reverse()
    cards.forEach((card) => {
      const cardElement = new Card(card, {deleteCallback: (evt) => {openDeletePopup(evt)}, likeCallback: (evt) => {toggleLikeButton(evt)}}, '.element__template', userId);
      cardsContainer.prepend(cardElement.getCard());
    })
  })
  .catch((err) => {informResIsNotOk(err)})
  .finally(() => pageIsLoading(false));


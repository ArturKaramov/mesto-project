import '../styles/index.css';

import Card, { changeLikeCondition } from './card.js';

import FormValidator from './FormValidator';

import Api, { informResIsNotOk } from './Api';

import Section from './Section';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';
import PopupDelete from './PopupDelete';

import UserInfo from './UserInfo';

import { pageIsLoading } from "./utils.js";

import { profileEdit, elementAdd, inputName, inputAbout, avatarButton, profileAvatar, cardsContainer, token, cohortId, validationSettings } from "./variables.js";

function toggleLikeButton(evt) {
  const card = evt.target.closest('.element');
  const cardId = card.getAttribute('data-id');
  let method = null;
  evt.target.classList.contains('element__like_active') ? method = 'DELETE' : method = 'PUT';
  api.toggleLike(cardId, method)
    .then((data) => { changeLikeCondition(card, data.likes.length) })
    .catch((err) => { informResIsNotOk(err) })
};

function addCardHandle(cardData) {
  popupElement.popupIsLoading(true);
  api.postNewCard(cardData)
    .then((card) => {
      console.log(card)
      console.log(userId)
      const cardElement = new Card(card,
        {
          deleteCallback: (evt) => { popupDelete.open(); popupDelete.setEventListeners(evt) },
          likeCallback: (evt) => { toggleLikeButton(evt) },
          handleCardClick: (cardName, cardLink) => { popupImg.open(cardName, cardLink); popupImg.setEventListeners() }
        }, '.element__template', userId);
      cardsSection.addItem(cardElement.getCard())
    popupElement.close()}
    )
    .catch((err) => { informResIsNotOk(err) })
    .finally(() => { popupElement.popupIsLoading(false) })

};

function submitProfileForm(profile) {
  popupProfile.popupIsLoading(true);
  api.setProfileData(profile)
    .then((data) => {
      console.log(data)
      userInfo.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => { informResIsNotOk(err) })
    .finally(() => { popupProfile.popupIsLoading(false) });
};

function submitAvatarForm({link}) {
  popupAvatar.popupIsLoading(true);
  api.updateAvatar(link)
    .then((data) => {
      profileAvatar.src = data.avatar;
      popupAvatar.close();
    })
    .catch((err) => { informResIsNotOk(err) })
    .finally(() => { popupAvatar.popupIsLoading(false) });
};

const deleteElement = (card) => {
  api.deleteCard(card.dataset.id)
    .then(() => {
      card.remove()
      popupDelete.close()
    })
    .catch((err) => { informResIsNotOk(err) })
};

const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'});

const popupProfile = new PopupWithForm('.popup-profile', {submitCallback: submitProfileForm});
const popupElement = new PopupWithForm('.popup-element', {submitCallback: addCardHandle});
const popupAvatar = new PopupWithForm('.popup-avatar', {submitCallback: submitAvatarForm});
const popupDelete = new PopupDelete('.popup-delete', {submitCallback: deleteElement});
const popupImg = new PopupWithImage('.popup-image');

const formProfileVal = new FormValidator(validationSettings, {form: popupProfile.popup.querySelector('.popup__form')});
const formElementVal = new FormValidator(validationSettings, {form: popupElement.popup.querySelector('.popup__form')});
const formAvatarVal = new FormValidator(validationSettings, {form: popupAvatar.popup.querySelector('.popup__form')});

formProfileVal.enableValidation(validationSettings);
formElementVal.enableValidation(validationSettings);
formAvatarVal.enableValidation(validationSettings);

profileEdit.addEventListener('click', function () {
  inputName.value = userInfo.getUserInfo().name;
  inputAbout.value = userInfo.getUserInfo().about;
  popupProfile.open();
  popupProfile.setEventListeners();
  formProfileVal.togglePopupButtonState();
});

elementAdd.addEventListener('click', function () {
  popupElement.open();
  popupElement.setEventListeners();
  formElementVal.togglePopupButtonState();
});

avatarButton.addEventListener('click', function () {
  popupAvatar.open();
  popupAvatar.setEventListeners();
  formAvatarVal.togglePopupButtonState();
});

let userId;

const api = new Api({
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

let cardsSection;

api.getInitialData()
  .then(([data, cards]) => {
    userInfo.setUserInfo(data);
    profileAvatar.src = data.avatar;
    userId = data._id;
    cards.reverse();
    cardsSection = new Section({
      items: cards,
      renderer: (item) => {
        const cardElement = new Card(item,
        {
          deleteCallback: (evt) => { popupDelete.open(); popupDelete.setEventListeners(evt) },
          likeCallback: (evt) => { toggleLikeButton(evt) },
          handleCardClick: (cardName, cardLink) => { popupImg.open(cardName, cardLink); popupImg.setEventListeners() }
        }, '.element__template', userId);
        cardsContainer.prepend(cardElement.getCard());
      }}, '.elements__list');
    cardsSection.renderItems()
  })
  .catch((err) => { informResIsNotOk(err) })
  .finally(() => pageIsLoading(false));


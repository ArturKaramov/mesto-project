import '../styles/index.css';

import { pageIsLoading } from "./utils.js";

import {popupCloseList, popupProfile, popupElement, popupAvatar, formAvatar, profileEdit, elementAdd, formProfile, inputName, inputAbout, profileName, profileAbout, avatarButton, profileAvatar, formCard, cardName, cardLink, popupList, cardsContainer } from "./variables.js"



//  M E S T O   -   O O P

import { api } from './oop/Api.js';
import FormValidator from './oop/FormValidator.js';
import { popup } from './oop/Popup.js';
import PopupWithForm from './oop/PopupWithForm';
import PopupWithImage from './oop/PopupWithImage';
import { PopupForDelete } from './oop/PopupForDelete';
import Card, {changeLikeCondition} from './oop/Card';
import Section from './oop/Section';
import UserInfo from './oop/UserInfo';

const validator = new FormValidator(); // добавлено Александром, создаем экземпляр класса FormValidator

const popupFormProfile = new PopupWithForm('.popup-profile', {formSubmit: submitProfileForm}); // добавлено Александром, создаем экземпляр попапа "Редактировать профиль" из класса PopupWithForm

const popupFormPlace = new PopupWithForm('.popup-element', {formSubmit: addCardHandle}); // добавлено Александром, создаем экземпляр попапа "Новое место" из класса PopupWithForm

const popupFormAvatar = new PopupWithForm('.popup-avatar', {formSubmit: submitAvatarForm}); // добавлено Александром, создаем экземпляр попапа "Обновить аватар" из класса PopupWithForm

const popupImage = new PopupWithImage('.popup-image'); // добавлено Александром, создаем экземпляр попапа "Картинка" из класса PopupWithImage

const popupDelete = new PopupForDelete('.popup-delete', {deleteCallback: deleteElement}); //изменено Артуром, создание попапа удаления

const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'}); //изменено Артуром, создание экземпляра класса UserSection

function toggleLikeButton(evt) {
  const card = evt.target.closest('.element');
  const cardId = card.getAttribute('data-id');
  let method = null;
  evt.target.classList.contains('element__like_active') ? method = 'DELETE' : method = 'PUT';
  api.toggleLike(cardId, method) // изменено Александром, перед вызовом функции добавлено api.
    .then((data) => {changeLikeCondition(card, data.likes.length)})
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
};

function addCardHandle(cardData) {
  popupFormPlace.popupIsLoading(true); // изменено Александром, перед вызовом функции добавлено popup.
  api.postNewCard(cardData) // изменено Александром, перед вызовом функции добавлено api.
    .then((card) => { //изменено Артуром, добавление карточки с помощью классов
      const cardElement = new Card(card,
        {
          deleteCallback: (evt) => { popupDelete.open();  popupDelete.setEventListeners(evt)},
          likeCallback: (evt) => { toggleLikeButton(evt) },
          handleCardClick: (cardName, cardLink) => {
            console.log(cardName, cardLink)
            popupImage.open(cardName, cardLink); // добавлено Александром - открытие попапа с картинкой
            popupImage.setEventListeners();
          }
        }, '.element__template', userId);
      cardsSection.addItem(cardElement.getCard())
      popupFormPlace.close(); // изменено Александром, закрывает попап и обнуляет инпуты
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
    .finally(() => {popupFormPlace.popupIsLoading(false)}) // изменено Александром, перед вызовом функции добавлено popup.
};

function submitProfileForm(profile) {
  popupFormProfile.popupIsLoading(true); // изменено Александром, перед вызовом функции добавлено popup.
  api.setProfileData(profile) // изменено Александром, перед вызовом функции добавлено api.
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormProfile.close(); // изменено Александром, закрывает попап и обнуляет инпуты
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
    .finally(() => {popupFormProfile.popupIsLoading(false)}); // изменено Александром, перед вызовом функции добавлено popup.
};

function submitAvatarForm({link}) {
  popupFormAvatar.popupIsLoading(true); // изменено Александром, перед вызовом функции добавлено popup.
  api.updateAvatar(link) // изменено Александром, перед вызовом функции добавлено api.
    .then((data) => {
      profileAvatar.src = data.avatar;
      popupFormAvatar.close(); // изменено Александром, закрывает попап и обнуляет инпуты
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
    .finally(() => {popupFormAvatar.popupIsLoading(false)}); // изменено Александром, перед вызовом функции добавлено popup.
};

function deleteElement(card) { //изменено Артуром, добавил для колбэка удаления
  api.deleteCard(card.dataset.id) // изменено Александром, перед вызовом функции добавлено api.
    .then(() => {
      card.remove()
      popupDelete.close(); // изменено Артуром, перед вызовом функции добавлено popupDelete.close.
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
};

profileEdit.addEventListener('click', function () {
  inputName.value = userInfo.getUserInfo().name;
  inputAbout.value = userInfo.getUserInfo().about;
  popupFormProfile.open(); // изменено Александром, используем объект от класса PopupWithForm
  popupFormProfile.setEventListeners();
  validator._togglePopupButtonState(); // изменено Александром, перед вызовом функции добавлено validator.
});

elementAdd.addEventListener('click', function () {
  popupFormPlace.open(); // изменено Александром, используем объект от класса PopupWithForm
  popupFormPlace.setEventListeners();
  validator._togglePopupButtonState(); // изменено Александром, перед вызовом функции добавлено validator.
});

avatarButton.addEventListener('click', function() {
  popupFormAvatar.open(); // изменено Александром, используем объект от класса PopupWithForm
  popupFormAvatar.setEventListeners();
  validator._togglePopupButtonState(); // изменено Александром, перед вызовом функции добавлено validator.
});

validator.enableValidation({ // изменено Александром, перед вызовом функции добавлено validator.
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__item_type_error'
});

let userId;
let cardsSection; //изменено Артуром, секция карточек, инициализировано в глобальной области

api.getInitialData() // изменено Александром, перед вызовом функции добавлено api.
  .then(([data, cards]) => {

    cards.forEach((card) => { // добавлено Александром - смотрим в консоли данные карточек
      console.log(card);
    })

    userInfo.setUserInfo(data); //изменено Артуром, получение от сервера и добавление на страницу данных name и about
    profileAvatar.src = data.avatar;
    userId = data._id;
    cards.reverse();
    cardsSection = new Section({
      items: cards,
      renderer: (item) => {
        const cardElement = new Card(item,
        {
          deleteCallback: (evt) => { popupDelete.open();  popupDelete.setEventListeners(evt)},
          likeCallback: (evt) => { toggleLikeButton(evt) },
          handleCardClick: (cardName, cardLink) => {
            popupImage.open(cardName, cardLink); // добавлено Александром - открытие попапа с картинкой
            popupImage.setEventListeners();
          }
        }, '.element__template', userId);
        cardsContainer.prepend(cardElement.getCard());
      }}, '.elements__list');
    cardsSection.renderItems() //изменено Артуром, добавление начальных карточек через классы
  })
  .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
  .finally(() => pageIsLoading(false));


//  M E S T O   -   A P I

// import {informResIsNotOk, getInitialData, setProfileData, postNewCard, updateAvatar, deleteCard, toggleLike} from './api';
// import {enableValidation, togglePopupButtonState} from './validate.js';
// import {openPopup, closePopup, popupIsLoading} from './modal.js'
// import { renderCard, cardToDelete, removeCard, changeLikeCondition } from './card.js';


// function toggleLikeButton(evt) {
//   const card = evt.target.closest('.element');
//   const cardId = card.getAttribute('data-id');
//   let method = null;
//   evt.target.classList.contains('element__like_active') ? method = 'DELETE' : method = 'PUT';
//   toggleLike(cardId, method)
//     .then((data) => {changeLikeCondition(card, data.likes.length)})
//     .catch((err) => {informResIsNotOk(err)})
// };

// function addCardHandle(evt) {
//   evt.preventDefault();
//   popupIsLoading(true, popupElement);
//   const cardData = {};
//   cardData.name = cardName.value;
//   cardData.link = cardLink.value;
//   postNewCard(cardData)
//     .then((card) => {
//       renderCard(card, userId, toggleLikeButton)
//       closePopup(popupElement)
//     })
//     .catch((err) => {informResIsNotOk(err)})
//     .finally(() => {popupIsLoading(false, popupElement)})
// };

// function submitProfileForm(evt) {
//   evt.preventDefault();
//   popupIsLoading(true, popupProfile);
//   const user = {}
//   user.name = inputName.value;
//   user.about = inputAbout.value;
//   setProfileData(user)
//     .then((data) => {
//       profileName.textContent = data.name
//       profileAbout.textContent = data.about
//       closePopup(popupProfile)
//     })
//     .catch((err) => {informResIsNotOk(err)})
//     .finally(() => {popupIsLoading(false, popupProfile)});
// };

// function submitAvatarForm(evt) {
//   evt.preventDefault();
//   popupIsLoading(true, popupAvatar);
//   const newAvatar = popupAvatar.querySelector('.popup__item').value;
//   updateAvatar(newAvatar)
//     .then((data) => {
//       profileAvatar.src = data.avatar
//       closePopup(popupAvatar)
//     })
//     .catch((err) => {informResIsNotOk(err)})
//     .finally(() => {popupIsLoading(false, popupAvatar)});
// };

// formProfile.addEventListener('submit', submitProfileForm);

// formCard.addEventListener('submit', addCardHandle);

// formAvatar.addEventListener('submit', submitAvatarForm);

// buttonDelete.addEventListener('click', function() {
//   deleteCard(cardToDelete.dataset.id)
//     .then(() => {
//       removeCard(cardToDelete)
//       closePopup(popupDelete)
//     })
//     .catch((err) => {informResIsNotOk(err)})
// });

// profileEdit.addEventListener('click', function () {
//   inputName.value = profileName.textContent;
//   inputAbout.value = profileAbout.textContent;
//   openPopup(popupProfile);
//   togglePopupButtonState(popupProfile);
// });

// elementAdd.addEventListener('click', function () {
//   formCard.reset();
//   openPopup(popupElement);
//   togglePopupButtonState(popupElement);
// });

// avatarButton.addEventListener('click', function() {
//   openPopup(popupAvatar);
//   togglePopupButtonState(popupAvatar);
// });

// popupList.forEach(function(popup) {
//   popup.addEventListener('mousedown', function(evt) {
//     if (evt.target === evt.currentTarget) {closePopup(popup)}
//   });
// });

// popupCloseList.forEach((closeButton) => {
//   closeButton.addEventListener('click', (evt) => {closePopup(evt.target.closest('.popup'))})
// })

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__item',
//   submitButtonSelector: '.popup__button',
//   inputErrorClass: 'popup__item_type_error'
// });

// let userId;

// getInitialData()
//   .then(([data, cards]) => {
//     profileName.textContent = data.name;
//     profileAbout.textContent = data.about;
//     profileAvatar.src = data.avatar;
//     userId = data._id;
//     cards.reverse()
//     cards.forEach((card) => {
//       renderCard(card, userId, toggleLikeButton)
//     })
//   })
//   .catch((err) => {informResIsNotOk(err)})
//   .finally(() => pageIsLoading(false));


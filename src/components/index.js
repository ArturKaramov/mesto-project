import '../styles/index.css';

import { pageIsLoading } from "./utils.js";

import {profileEdit, elementAdd, inputName, inputAbout, avatarButton, cardsContainer, validationSettings } from "./variables.js"

//  M E S T O   -   O O P

import { api } from './oop/Api';
import FormValidator from './oop/FormValidator';
import PopupWithForm from './oop/PopupWithForm';
import PopupWithImage from './oop/PopupWithImage';
import PopupForDelete from './oop/PopupForDelete';
import Card from './oop/Card';
import Section from './oop/Section';
import UserInfo from './oop/UserInfo';

const profileFormValidation = new FormValidator(validationSettings, {formElement: document.querySelector(".popup__form[name=profile-data]")});
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(validationSettings, {formElement: document.querySelector(".popup__form[name=element-data]")});
cardFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validationSettings, {formElement: document.querySelector(".popup__form[name=avatar-link]")});
avatarFormValidation.enableValidation();


const popupFormProfile = new PopupWithForm('.popup-profile', {handleSubmit: submitProfileForm}); // добавлено Александром, создаем экземпляр попапа "Редактировать профиль" из класса PopupWithForm

const popupFormPlace = new PopupWithForm('.popup-element', {handleSubmit: addCardHandle}); // добавлено Александром, создаем экземпляр попапа "Новое место" из класса PopupWithForm
popupFormPlace.setEventListeners();

const popupFormAvatar = new PopupWithForm('.popup-avatar', {handleSubmit: submitAvatarForm}); // добавлено Александром, создаем экземпляр попапа "Обновить аватар" из класса PopupWithForm

const popupImage = new PopupWithImage('.popup-image'); // добавлено Александром, создаем экземпляр попапа "Картинка" из класса PopupWithImage

const popupDelete = new PopupForDelete('.popup-delete', {deleteCallback: deleteElement}); //изменено Артуром, создание попапа удаления

const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar'}); //изменено Артуром, создание экземпляра класса UserSection

function toggleLikeButton(evt) {
  const card = evt.target.closest('.element');
  const cardId = card.getAttribute('data-id');
  let method = null;
  evt.target.classList.contains('element__like_active') ? method = 'DELETE' : method = 'PUT';
  api.toggleLike(cardId, method) // изменено Александром, перед вызовом функции добавлено api.
    .then((data) => {changeLikeCondition(card, data.likes.length)})
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
};

const changeLikeCondition = (card, likesNum) => {
  const cardLikesNum = card.querySelector('.element__likes-number');
  const cardLikeButton = card.querySelector('.element__like');
  cardLikesNum.textContent = likesNum;
  cardLikeButton.classList.toggle('element__like_active');
};

function addCardHandle(cardData) {
  popupFormPlace.renderLoading(true); // изменено Александром, после ревью 1
  api.postNewCard(cardData) // изменено Александром, перед вызовом функции добавлено api.
    .then((card) => { //изменено Артуром, добавление карточки с помощью классов
      const cardElement = new Card(card,
        {
          deleteCallback: (evt) => { popupDelete.open(evt) },
          likeCallback: (evt) => { toggleLikeButton(evt) },
          handleCardClick: (cardName, cardLink) => {
            console.log(cardName, cardLink)
            popupImage.open(cardName, cardLink); // добавлено Александром - открытие попапа с картинкой
            popupImage.setEventListeners();
          }
        }, '.element__template', {userId: userInfo.getUserInfo().id});
      cardsSection.addItem(cardElement.getCard())
      popupFormPlace.close(); // изменено Александром, закрывает попап и обнуляет инпуты
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
    .finally(() => {popupFormPlace.renderLoading(false)}) // изменено Александром, после ревью 1
};

function submitProfileForm(profile) {
  popupFormProfile.renderLoading(true); // изменено Александром, после ревью 1
  api.setProfileData(profile) // изменено Александром, перед вызовом функции добавлено api.
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormProfile.close(); // изменено Александром, закрывает попап и обнуляет инпуты
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
    .finally(() => {popupFormProfile.renderLoading(false)}); // изменено Александром, после ревью 1
};

function submitAvatarForm({link}) {
  popupFormAvatar.renderLoading(true); // изменено Александром, после ревью 1
  api.updateAvatar(link) // изменено Александром, перед вызовом функции добавлено api.
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormAvatar.close(); // изменено Александром, закрывает попап и обнуляет инпуты
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
    .finally(() => {popupFormAvatar.renderLoading(false)}); // изменено Александром, после ревью 1
};

function deleteElement(card) { //изменено Артуром, добавил для колбэка удаления
  api.deleteCard(card.dataset.id) // изменено Александром, перед вызовом функции добавлено api.
    .then(() => {
      card.remove();
      popupDelete.close(); // изменено Артуром, перед вызовом функции добавлено popupDelete.close.
      popupDelete.removeEventListeners();
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
};

profileEdit.addEventListener('click', function () {
  inputName.value = userInfo.getUserInfo().name;
  inputAbout.value = userInfo.getUserInfo().about;
  popupFormProfile.open(); // изменено Александром, используем объект от класса PopupWithForm
  popupFormProfile.setEventListeners();
  profileFormValidation._togglePopupButtonState(); // изменено Александром, перед вызовом функции добавлено formValidation.
});

elementAdd.addEventListener('click', function () {
  popupFormPlace.open(); // изменено Александром, используем объект от класса PopupWithForm
  cardFormValidation._togglePopupButtonState(); // изменено Александром, перед вызовом функции добавлено formValidation.
});

avatarButton.addEventListener('click', function() {
  popupFormAvatar.open(); // изменено Александром, используем объект от класса PopupWithForm
  popupFormAvatar.setEventListeners();
  avatarFormValidation._togglePopupButtonState(); // изменено Александром, перед вызовом функции добавлено formValidation.
});

let cardsSection; //изменено Артуром, секция карточек, инициализировано в глобальной области

api.getInitialData() // изменено Александром, перед вызовом функции добавлено api.
  .then(([data, cards]) => {
    cards.forEach((card) => { // добавлено Александром - смотрим в консоли данные карточек
    })
    userInfo.setUserInfo(data); //изменено Артуром, получение от сервера и добавление на страницу данных name и about
    cards.reverse();
    cardsSection = new Section({
      items: cards,
      renderer: (item) => {
        const cardElement = new Card(
          item,
        {
          deleteCallback: (evt) => { popupDelete.open(evt) },
          likeCallback: (evt) => { toggleLikeButton(evt) },
          handleCardClick: (cardName, cardLink) => {
            popupImage.open(cardName, cardLink); // добавлено Александром - открытие попапа с картинкой
            popupImage.setEventListeners();
          }
        },
        '.element__template',
        {userId: userInfo.getUserInfo().id});

        cardsContainer.prepend(cardElement.getCard());
      }}, '.elements__list');
    cardsSection.renderItems() //изменено Артуром, добавление начальных карточек через классы
  })
  .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
  .finally(() => pageIsLoading(false));

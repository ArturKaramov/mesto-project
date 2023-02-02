import './index.css';

import { pageIsLoading } from "../utils/utils";

// после ревью 4 добавлены константы formAvatar, formProfile, formElement
import {profileEdit, elementAdd, inputName, inputAbout, avatarButton, validationSettings} from "../utils/variables";

import { api } from '../components/Api';
import FormValidator from '../components/FormValidator';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import PopupForDelete from '../components/PopupForDelete';
import Card from '../components/Card';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';

const profileFormValidation = new FormValidator(validationSettings, {formElement: document.querySelector(".popup__form[name=profile-data]")});
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(validationSettings, {formElement: document.querySelector(".popup__form[name=element-data]")});
cardFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validationSettings, {formElement: document.querySelector(".popup__form[name=avatar-link]")});
avatarFormValidation.enableValidation();

const popupFormProfile = new PopupWithForm('.popup-profile', {handleSubmit: submitProfileForm}); // добавлено Александром, создаем экземпляр попапа "Редактировать профиль" из класса PopupWithForm
popupFormProfile.setEventListeners(); // изменено Александром после ревью 2

const popupFormPlace = new PopupWithForm('.popup-element', {handleSubmit: addCardHandle}); // добавлено Александром, создаем экземпляр попапа "Новое место" из класса PopupWithForm
popupFormPlace.setEventListeners();

const popupFormAvatar = new PopupWithForm('.popup-avatar', {handleSubmit: submitAvatarForm}); // добавлено Александром, создаем экземпляр попапа "Обновить аватар" из класса PopupWithForm
popupFormAvatar.setEventListeners();

const popupImage = new PopupWithImage('.popup-image'); // добавлено Александром, создаем экземпляр попапа "Картинка" из класса PopupWithImage
popupImage.setEventListeners();

const popupDelete = new PopupForDelete('.popup-delete', {deleteCallback: deleteElement});
popupDelete.setEventListeners();

const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar'});

const cardsSection = new Section({renderer: (item) => {cardsSection.appendItem(createCardElement(item))}}, '.elements__list')

function toggleLikeButton(card, cardId, method) {
  api.toggleLike(cardId, method)
    .then((data) => { card.changeLikeCondition(data) })
    .catch((err) => { api.informResIsNotOk(err) })
};

function addCardHandle(cardData) {
  popupFormPlace.renderLoading(true); // изменено Александром, после ревью 1
  api.postNewCard(cardData) // изменено Александром, перед вызовом функции добавлено api.
    .then((card) => {
      cardsSection.addItem(createCardElement(card));
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

function deleteElement(card, cardId) {
  api.deleteCard(cardId) // изменено Александром, перед вызовом функции добавлено api.
    .then(() => {
      card.removeCard();
      popupDelete.close();
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
};

const createCardElement = (item) => {
  const cardElement = new Card(
    item,
  {
    deleteCallback: (card, cardId) => { popupDelete.open(card, cardId) },
    likeCallback: (card, cardId, method) => { toggleLikeButton(card, cardId, method) },
    handleCardClick: (cardName, cardLink) => { popupImage.open(cardName, cardLink) }
  },
  '.element__template',
  {userId: userInfo.getUserId()});
  return cardElement.getCard()
}

profileEdit.addEventListener('click', function () {
  const user = userInfo.getUserInfo()
  inputName.value = user.name;
  inputAbout.value = user.about;
  popupFormProfile.open(); // изменено Александром, используем объект от класса PopupWithForm
  profileFormValidation.togglePopupButtonState(); // изменено Александром после ревью 4
});

elementAdd.addEventListener('click', function () {
  popupFormPlace.open(); // изменено Александром, используем объект от класса PopupWithForm
  cardFormValidation.togglePopupButtonState(); // изменено Александром после ревью 4
});

avatarButton.addEventListener('click', function() {
  popupFormAvatar.open(); // изменено Александром, используем объект от класса PopupWithForm
  avatarFormValidation.togglePopupButtonState(); // изменено Александром после ревью 4
});

api.getInitialData()
  .then(([data, cards]) => {
    userInfo.setUserInfo(data);
    cardsSection.renderItems(cards);
  })
  .catch((err) => {api.informResIsNotOk(err)})
  .finally(() => pageIsLoading(false));

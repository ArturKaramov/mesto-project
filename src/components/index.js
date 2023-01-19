import '../styles/index.css';

import { renderCard, cardToDelete, removeCard, changeLikeCondition } from './card.js';

import { pageIsLoading } from "./utils.js";

import {popupCloseList, popupProfile, popupElement, popupAvatar, formAvatar, profileEdit, elementAdd, formProfile, inputName, inputAbout, profileName, profileAbout, avatarButton, profileAvatar, formCard, cardName, cardLink, popupList, buttonDelete, popupDelete } from "./variables.js"



//  M E S T O   -   O O P

import { api } from '../components/oop/Api.js';
import { validator } from '../components/oop/FormValidator.js';
import { popup } from '../components/oop/Popup.js';


function toggleLikeButton(evt) {
  const card = evt.target.closest('.element');
  const cardId = card.getAttribute('data-id');
  let method = null;
  evt.target.classList.contains('element__like_active') ? method = 'DELETE' : method = 'PUT';
  api.toggleLike(cardId, method) // изменено Александром, перед вызовом функции добавлено api.
    .then((data) => {changeLikeCondition(card, data.likes.length)})
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
};

function addCardHandle(evt) {
  evt.preventDefault();
  popup.popupIsLoading(true, popupElement); // изменено Александром, перед вызовом функции добавлено popup.
  const cardData = {};
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  api.postNewCard(cardData) // изменено Александром, перед вызовом функции добавлено api.
    .then((card) => {
      renderCard(card, userId, toggleLikeButton)
      // closePopup(popupElement) // старый код закрытия
      popup.close(popupElement); // изменено Александром, перед вызовом функции добавлено popup.close.
      console.log(card); // добавлено Александром
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
    .finally(() => {popup.popupIsLoading(false, popupElement)}) // изменено Александром, перед вызовом функции добавлено popup.
};

function submitProfileForm(evt) {
  evt.preventDefault();
  popup.popupIsLoading(true, popupProfile); // изменено Александром, перед вызовом функции добавлено popup.
  const user = {}
  user.name = inputName.value;
  user.about = inputAbout.value;
  api.setProfileData(user) // изменено Александром, перед вызовом функции добавлено api.
    .then((data) => {
      profileName.textContent = data.name
      profileAbout.textContent = data.about
      // closePopup(popupProfile) // старый код закрытия
      popup.close(popupProfile); // изменено Александром, перед вызовом функции добавлено popup.close.
      console.log(data); // добавлено Александром
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
    .finally(() => {popup.popupIsLoading(false, popupProfile)}); // изменено Александром, перед вызовом функции добавлено popup.
};

function submitAvatarForm(evt) {
  evt.preventDefault();
  popup.popupIsLoading(true, popupAvatar); // изменено Александром, перед вызовом функции добавлено popup.
  const newAvatar = popupAvatar.querySelector('.popup__item').value;
  api.updateAvatar(newAvatar) // изменено Александром, перед вызовом функции добавлено api.
    .then((data) => {
      profileAvatar.src = data.avatar
      // closePopup(popupAvatar) // старый код закрытия
      popup.close(popupAvatar); // изменено Александром, перед вызовом функции добавлено popup.close.
      console.log(data); // добавлено Александром
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
    .finally(() => {popup.popupIsLoading(false, popupAvatar)}); // изменено Александром, перед вызовом функции добавлено popup.
};

formProfile.addEventListener('submit', submitProfileForm);

formCard.addEventListener('submit', addCardHandle);

formAvatar.addEventListener('submit', submitAvatarForm);

buttonDelete.addEventListener('click', function() {
  api.deleteCard(cardToDelete.dataset.id) // изменено Александром, перед вызовом функции добавлено api.
    .then(() => {
      removeCard(cardToDelete)
      // closePopup(popupDelete) // старый код закрытия
      popup.close(popupDelete); // изменено Александром, перед вызовом функции добавлено popup.close.
    })
    .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
});

profileEdit.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  // openPopup(popupProfile); // старый код открытия
  popup.open(popupProfile); // изменено Александром, перед вызовом функции добавлено popup.open.
  validator._togglePopupButtonState(popupProfile); // изменено Александром, перед вызовом функции добавлено validator.
});

elementAdd.addEventListener('click', function () {
  formCard.reset();
  // openPopup(popupElement); // старый код открытия
  popup.open(popupElement); // изменено Александром, перед вызовом функции добавлено popup.open.
  validator._togglePopupButtonState(popupElement); // изменено Александром, перед вызовом функции добавлено validator.
});

avatarButton.addEventListener('click', function() {
  // openPopup(popupAvatar); // старый код открытия
  popup.open(popupAvatar); // изменено Александром, перед вызовом функции добавлено popup.open.
  validator._togglePopupButtonState(popupAvatar); // изменено Александром, перед вызовом функции добавлено validator.
});

popupList.forEach(function(item) {
  item.addEventListener('mousedown', function(evt) {
    if (evt.target === evt.currentTarget) {
      // closePopup(popup); // старый код
      popup.close(item); // изменено Александром, перед вызовом функции добавлено popup.close.
    }
  });
});

popupCloseList.forEach((closeButton) => {
  closeButton.addEventListener('click', (evt) => {
    // closePopup(evt.target.closest('.popup')) // старый код
    popup.close(evt.target.closest('.popup')) // изменено Александром, перед вызовом функции добавлено popup.close.
  })
})

validator.enableValidation({ // изменено Александром, перед вызовом функции добавлено validator.
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__item_type_error'
});

let userId;

api.getInitialData() // изменено Александром, перед вызовом функции добавлено api.
  .then(([data, cards]) => {
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
    profileAvatar.src = data.avatar;
    userId = data._id;
    cards.reverse()
    cards.forEach((card) => {
      renderCard(card, userId, toggleLikeButton)
      console.log(card);
    })
  })
  .catch((err) => {api.informResIsNotOk(err)}) // изменено Александром, перед вызовом функции добавлено api.
  .finally(() => pageIsLoading(false));


//  M E S T O   -   A P I

// import {informResIsNotOk, getInitialData, setProfileData, postNewCard, updateAvatar, deleteCard, toggleLike} from './api';
// import {enableValidation, togglePopupButtonState} from './validate.js';
// import {openPopup, closePopup, popupIsLoading} from './modal.js'


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


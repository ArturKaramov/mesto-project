export const popupCloseList = Array.from(document.querySelectorAll('.popup__close'));
export const popupProfile = document.querySelector('.popup-profile');
export const popupElement = document.querySelector('.popup-element');
export const popupAvatar = document.querySelector('.popup-avatar');
export const formAvatar = popupAvatar.querySelector('.popup__form');
export const profileEdit = document.querySelector('.profile__edit-button');
export const elementAdd = document.querySelector('.profile__add-button');
export const formProfile = document.querySelector('.profile-edit');
export const inputName = formProfile.querySelector('.profile-edit__name');
export const inputAbout = formProfile.querySelector('.profile-edit__about');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const avatarButton = document.querySelector('.profile__avatar-button');
export const profileAvatar = document.querySelector('.profile__avatar');
export const formCard = document.querySelector('.card-add');
export const cardName = formCard.querySelector('.card-add__name');
export const cardLink = formCard.querySelector('.card-add__link');
export const popupList = Array.from(document.querySelectorAll('.popup'));
export const templateElement = document.querySelector('.element__template').content;
export const cardsContainer = document.querySelector('.elements__list');
export const popupImg = document.querySelector('.popup-image');
export const popupDelete = document.querySelector('.popup-delete');
export const popupImgPhoto = popupImg.querySelector('.popup-image__image');
export const popupCaption = popupImg.querySelector('.popup-image__caption');
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__item_type_error'
};


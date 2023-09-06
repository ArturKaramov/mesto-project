export const profileEdit = document.querySelector('.profile__edit-button');
export const elementAdd = document.querySelector('.profile__add-button');
export const formProfile = document.querySelector('.profile-edit');
export const inputName = formProfile.querySelector('.profile-edit__name');
export const inputAbout = formProfile.querySelector('.profile-edit__about');
export const avatarButton = document.querySelector('.profile__avatar-button');
export const pageLoading = document.querySelector('.page_loading');
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__item_type_error'
};
export const cohortId = 'plus-cohort-18';
export const token = '0d7ca977-0c10-4a5e-b941-b2da84cee22f';
export const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};



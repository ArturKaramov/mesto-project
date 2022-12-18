import { toggleButtonState } from "./validate";

const popupList = Array.from(document.querySelectorAll('.popup'));

const closePopupWithEsc = (evt) => {if (evt.key === 'Escape') {popupList.forEach((popup) => {closePopup(popup)})}};

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupWithEsc)};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupWithEsc)};

function togglePopupButtonState(popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__item'));
  const buttonElement = popup.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);
};

export {popupList, openPopup, closePopup, togglePopupButtonState}

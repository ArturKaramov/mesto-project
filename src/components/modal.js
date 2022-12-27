import { toggleButtonState } from "./validate";

const popupList = Array.from(document.querySelectorAll('.popup'));

const closePopupWithEsc = (evt) => {if (evt.key === 'Escape') {
  const popupOpened = document.querySelector('.popup_opened');
  closePopup(popupOpened);
}};

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupWithEsc)};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupWithEsc)};

function togglePopupButtonState(popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__item'));
  const buttonElement = popup.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
};

const popupIsLoading = (isLoading, popup) => {
  const button = popup.querySelector('.popup__button');
  if (isLoading) {button.textContent = button.getAttribute('data-load')}
  else {button.textContent = button.getAttribute('data-init')}
}

export {popupList, openPopup, closePopup, togglePopupButtonState, popupIsLoading}

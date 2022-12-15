import { toggleButtonState } from "./validate";
import { closePopup } from "./utils";
import { renderCard } from "./card";

const popupList = Array.from(document.querySelectorAll('.popup'));
const popupCloseList = Array.from(document.querySelectorAll('.popup__close'));
const popupProfile = document.querySelector('.popup-profile');
const popupElement = document.querySelector('.popup-element');
const profileEdit = document.querySelector('.profile__edit-button');
const elementAdd = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.profile-edit');
const inputName = formProfile.querySelector('.profile-edit__name');
const inputAbout = formProfile.querySelector('.profile-edit__about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formCard = document.querySelector('.card-add');
const cardName = formCard.querySelector('.card-add__name');
const cardLink = formCard.querySelector('.card-add__link');


function togglePopupButtonState(popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__item'));
  const buttonElement = popup.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'popup__save_inactive'});
};

function addCardHandle(evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  renderCard(cardData);
  closePopup(popupElement);
  formCard.reset();
};

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
};

export {popupList, popupCloseList, popupProfile, popupElement, profileEdit, elementAdd, formProfile, inputName, inputAbout, profileName, profileAbout, formCard, cardName, cardLink, togglePopupButtonState, addCardHandle, submitProfileForm}

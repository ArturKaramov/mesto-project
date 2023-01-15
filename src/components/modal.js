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

const popupIsLoading = (isLoading, popup) => {
  const button = popup.querySelector('.popup__button');
  if (isLoading) {button.textContent = button.getAttribute('data-load')}
  else {button.textContent = button.getAttribute('data-init')}
}

export {openPopup, closePopup, popupIsLoading}

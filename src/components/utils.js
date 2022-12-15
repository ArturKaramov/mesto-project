const openPopup = (popup) => {popup.classList.add('popup_opened')};
const closePopup = (popup) => {popup.classList.remove('popup_opened')};
const closePopupWithEsc = (evt) => {if (evt.key === 'Escape') {popupList.forEach((popup) => {closePopup(popup)})}};

export {openPopup, closePopup, closePopupWithEsc}





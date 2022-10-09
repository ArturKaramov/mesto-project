const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Башкортостан',
    link: 'https://images.unsplash.com/photo-1630390665522-c597a6b8a2cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1597258071486-bc1754c01349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupProfile = document.querySelector('.popup-profile');
const popupProfileClose = popupProfile.querySelector('.popup__close');
const popupElement = document.querySelector('.popup-element');
const popupElementClose = popupElement.querySelector('.popup__close');
const popupImg = document.querySelector('.popup-image');
const popupImgClose = popupImg.querySelector('.popup__close');
const profileEdit = document.querySelector('.profile__edit-button');
const elementAdd = document.querySelector('.profile__add-button');
const popupImgPhoto = popupImg.querySelector('.popup-image__image');
const popupCaption = popupImg.querySelector('.popup-image__caption');
const templateElement = document.querySelector('.element__template').content;
const cardsList = document.querySelector('.elements__list');
const formProfile = document.querySelector('.profile-edit');
const nameInput = formProfile.querySelector('.profile-edit__name');
const jobInput = formProfile.querySelector('.profile-edit__about');
const formCard = document.querySelector('.card-add');
const cardName = formCard.querySelector('.card-add__name');
const cardLink = formCard.querySelector('.card-add__link');

//функции
const openAndClosePopup = (popup) => {popup.classList.toggle('popup_opened');};
const handleDeleteButton = (evt) => {evt.target.closest('.element').remove()};
const handleLikeButton = (evt) => {evt.target.classList.toggle('element__like_active')};

function viewCard(cardData) {
  popupImgPhoto.src = cardData.link;
  popupImgPhoto.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openAndClosePopup(popupImg);
};

function submitProfileForm(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__about').textContent = jobInput.value;
  openAndClosePopup(popupProfile);
};

function createCard(cardData) {
  const card = templateElement.querySelector('.element').cloneNode(true);
  const cardPhoto = card.querySelector('.element__photo');
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;
  card.querySelector('.element__name').textContent = cardData.name;
  card.querySelector('.element__like').addEventListener('click', handleLikeButton);
  card.querySelector('.element__delete').addEventListener('click', handleDeleteButton);
  cardPhoto.addEventListener('click', function() {
    viewCard(cardData);
  });
  return card;
};

const renderCard = (cardData) => {cardsList.prepend(createCard(cardData));};

function addCardHandle(evt) {
  evt.preventDefault();
  let cardData = {};
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  renderCard(cardData);
  openAndClosePopup(popupElement);
  cardName.value = '';
  cardLink.value = '';
};

initialCards.forEach(function(cardData) {
  renderCard(cardData);
});

profileEdit.addEventListener('click', function () {
  openAndClosePopup(popupProfile);
});
elementAdd.addEventListener('click', function () {
  openAndClosePopup(popupElement);
});
popupProfileClose.addEventListener('click', function() {
  openAndClosePopup(popupProfile);
});
popupElementClose.addEventListener('click', function() {
  openAndClosePopup(popupElement);
});
popupImgClose.addEventListener('click', function() {
  openAndClosePopup(popupImg);
});

formProfile.addEventListener('submit', submitProfileForm);

formCard.addEventListener('submit', addCardHandle);

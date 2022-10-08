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

//добавление карточек
const templateElement = document.querySelector('.element__template').content;
const elements = document.querySelector('.elements__list');
initialCards.forEach(function(item) {
  const card = templateElement.querySelector('.element').cloneNode(true);
  card.querySelector('.element__name').textContent = item.name;
  card.querySelector('.element__photo').src = item.link;
  card.querySelector('.element__photo').alt = item.name;
  elements.prepend(card);
});

//закрытие и открытие попапов
function popupOpen(popup) {
  popup.classList.add('popup_opened');
};

function popupClose(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
};

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

profileEdit.addEventListener('click', function () {
  popupOpen(popupProfile);
});

elementAdd.addEventListener('click', function () {
  popupOpen(popupElement);
});

function imgPopup(evt) {
  popupImgPhoto.src = evt.target.src;
  popupImgPhoto.alt = evt.target.nextElementSibling.nextElementSibling.firstElementChild.textContent;
  popupCaption.textContent = evt.target.nextElementSibling.nextElementSibling.firstElementChild.textContent;
  popupOpen(popupImg);
};

popupProfileClose.addEventListener('click', popupClose);
popupElementClose.addEventListener('click', popupClose);
popupImgClose.addEventListener('click', popupClose);

//форма профиля
const formElement = document.querySelector('.profile-edit');
const nameInput = formElement.querySelector('.profile-edit__name');
const jobInput = formElement.querySelector('.profile-edit__about');

function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__about').textContent = jobInput.value;
  popupClose(evt);
}
formElement.addEventListener('submit', formSubmitHandler);


//добавление карточек пользователем
const formCards = document.querySelector('.card-add');
const cardName = formCards.querySelector('.card-add__name');
const cardLink = formCards.querySelector('.card-add__link');

function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = templateElement.querySelector('.element').cloneNode(true);
  card.querySelector('.element__name').textContent = cardName.value;
  card.querySelector('.element__photo').src = cardLink.value;
  card.querySelector('.element__photo').alt = cardName.value;
  card.querySelector('.element__like').addEventListener('click', likeFunction); //лайк
  card.querySelector('.element__delete').addEventListener('click', deleteFunction); //удаление
  card.querySelector('.element__photo').addEventListener('click', imgPopup); //попап просмотр
  elements.prepend(card);
  popupClose(evt);
}

formCards.addEventListener('submit', cardFormSubmitHandler);

//функционал лайков, удаления и открытия попапа картинок
function likeFunction(evt) {
  evt.target.classList.toggle('element__like_active')
};

function deleteFunction(evt) {
  evt.target.closest('.element').remove();
};

let likes = document.querySelectorAll('.element__like');
likes.forEach(function(like) {
  like.addEventListener('click', likeFunction);
});

let trashes = document.querySelectorAll('.element__delete');
trashes.forEach(function(trash) {
  trash.addEventListener('click', deleteFunction);
});

let images = document.querySelectorAll('.element__photo');
images.forEach(function(image) {
  image.addEventListener('click', imgPopup)
});





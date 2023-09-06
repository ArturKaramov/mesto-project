import "./index.css";

import { pageIsLoading } from "../utils/utils";

import {
  profileEdit,
  elementAdd,
  inputName,
  inputAbout,
  avatarButton,
  validationSettings,
  config,
} from "../utils/variables";

import Api from "../components/Api";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import PopupForDelete from "../components/PopupForDelete";
import Card from "../components/Card";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

const api = new Api(config);

const profileFormValidation = new FormValidator(validationSettings, {
  formElement: document.querySelector(".popup__form[name=profile-data]"),
});
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(validationSettings, {
  formElement: document.querySelector(".popup__form[name=element-data]"),
});
cardFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validationSettings, {
  formElement: document.querySelector(".popup__form[name=avatar-link]"),
});
avatarFormValidation.enableValidation();

const popupFormProfile = new PopupWithForm(".popup-profile", {
  handleSubmit: submitProfileForm,
});
popupFormProfile.setEventListeners();

const popupFormPlace = new PopupWithForm(".popup-element", {
  handleSubmit: addCardHandle,
});
popupFormPlace.setEventListeners();

const popupFormAvatar = new PopupWithForm(".popup-avatar", {
  handleSubmit: submitAvatarForm,
});
popupFormAvatar.setEventListeners();

const popupImage = new PopupWithImage(".popup-image");
popupImage.setEventListeners();

const popupDelete = new PopupForDelete(".popup-delete", {
  deleteCallback: deleteElement,
});
popupDelete.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

const cardsSection = new Section(
  {
    renderer: (item) => {
      cardsSection.appendItem(createCardElement(item));
    },
  },
  ".elements__list"
);

function toggleLikeButton(card, method) {
  api
    .toggleLike(card.getCardId(), method)
    .then((data) => card.changeLikeCondition(data))
    .catch((err) => api.informResIsNotOk(err));
}

function addCardHandle(cardData) {
  popupFormPlace.renderLoading(true);
  api
    .postNewCard(cardData)
    .then((card) => {
      cardsSection.addItem(createCardElement(card));
      popupFormPlace.close();
    })
    .catch((err) => {
      api.informResIsNotOk(err);
    })
    .finally(() => {
      popupFormPlace.renderLoading(false);
    });
}

function submitProfileForm(profile) {
  popupFormProfile.renderLoading(true, "Сохранение...");
  api
    .setProfileData(profile)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormProfile.close();
    })
    .catch((err) => {
      api.informResIsNotOk(err);
    })
    .finally(() => {
      popupFormProfile.renderLoading(false, "Сохранение...");
    });
}

function submitAvatarForm({ link }) {
  popupFormAvatar.renderLoading(true);
  api
    .updateAvatar(link)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormAvatar.close();
    })
    .catch((err) => api.informResIsNotOk(err))
    .finally(() => popupFormAvatar.renderLoading(false));
}

function deleteElement(card) {
  popupDelete.renderLoading(true);
  api
    .deleteCard(card.getCardId())
    .then(() => {
      card.removeCard();
      popupDelete.close();
    })
    .catch((err) => api.informResIsNotOk(err))
    .finally(() => popupDelete.renderLoading(false));
}

const createCardElement = (item) => {
  const cardElement = new Card(
    item,
    {
      deleteCallback: (card) => {
        popupDelete.open(card);
      },
      likeCallback: (card, method) => {
        toggleLikeButton(card, method);
      },
      handleCardClick: (cardName, cardLink, owner) => {
        popupImage.open(cardName, cardLink, owner);
      },
    },
    ".element__template",
    { userId: userInfo.getUserId() }
  );
  return cardElement.getCard();
};

profileEdit.addEventListener("click", function () {
  const user = userInfo.getUserInfo();
  inputName.value = user.name;
  inputAbout.value = user.about;
  popupFormProfile.open();
  profileFormValidation.togglePopupButtonState();
});

elementAdd.addEventListener("click", function () {
  popupFormPlace.open();
  cardFormValidation.togglePopupButtonState();
});

avatarButton.addEventListener("click", function () {
  popupFormAvatar.open();
  avatarFormValidation.togglePopupButtonState();
});

api
  .getInitialData()
  .then(([data, cards]) => {
    userInfo.setUserInfo(data);
    console.log(cards);
    cardsSection.renderItems(cards);
  })
  .catch((err) => api.informResIsNotOk(err))
  .finally(() => pageIsLoading(false));

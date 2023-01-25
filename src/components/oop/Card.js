//  M E S T O   -   O O P

// Поработайте с функциональностью работы карточек и валидации форм.
// Всю валидацию форм вы до этого писали в отдельном файле, а работу карточек — в другом.
// Теперь преобразуйте функции, которые существовали ранее, в единое целое — классы Card и FormValidator.
// В этом пункте задания поговорим про класс Card.
// Организуйте в классе Card код, который создаёт карточку с текстом и ссылкой на изображение:

// - принимает в конструктор её данные и селектор её template-элемента;
// - содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// - содержит приватные методы для каждого обработчика;
// - содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card. Когда дойдёте до реализации классов Popup,
// свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick.
// При клике на карточку эта функция должна открывать попап с картинкой.

export default class Card {
  constructor({name, link, likes, owner, _id}, {deleteCallback, likeCallback, handleCardClick}, selector, userId) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._isLiked = likes.some((like) => {return like._id === userId});
    this._isMine = owner._id === userId;
    this._cardId = _id;
    this._deleteCallback = deleteCallback;
    this._likeCallback = likeCallback;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true)
    return cardElement
  }

  _createCard() {
    this._element = this._getElement();
    this._element.dataset.id = this._cardId;
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._setLikeCondition(this._isLiked, this._likes.length)
    this._setEventListeners();
    if (!this._isMine) {this._element.querySelector('.element__delete').remove()}
    return this._element
  }

  _setLikeCondition() {
    if (this._isLiked) {this._element.querySelector('.element__like').classList.add('element__like_active')};
    this._element.querySelector('.element__likes-number').textContent = this._likes.length;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => {this._deleteCallback(evt)});
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {this._likeCallback(evt)});
    this._element.querySelector('.element__photo').addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
  }

  getCard() {
    return this._createCard()
  }
};

const changeLikeCondition = (card, likesNum) => {
  const cardLikesNum = card.querySelector('.element__likes-number');
  const cardLikeButton = card.querySelector('.element__like');
  cardLikesNum.textContent = likesNum;
  cardLikeButton.classList.toggle('element__like_active');
};

export { changeLikeCondition }

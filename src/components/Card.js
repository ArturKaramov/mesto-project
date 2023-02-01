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
  constructor({name, link, likes, owner, _id}, {deleteCallback, likeCallback, handleCardClick}, selector, {userId}) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._isLiked = likes.some((like) => {return like._id === userId});
    this._isMine = owner._id === userId;
    this.cardId = _id;
    this._deleteCallback = deleteCallback;
    this._likeCallback = likeCallback;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
    this._activeClass = 'element__like_active';
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
    this._photo = this._element.querySelector('.element__photo');
    this._elementName = this._element.querySelector('.element__name');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._likeButton = this._element.querySelector('.element__like');
    this._likesNum = this._element.querySelector('.element__likes-number')
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._elementName.textContent = this._name;
    this._setLikeCondition()
    this._setEventListeners();
    if (!this._isMine) {this._deleteButton.remove()}
    return this._element
  }

  _setLikeCondition() {
    if (this._isLiked) {this._likeButton.classList.add(this._activeClass)}
    else {this._likeButton.classList.remove(this._activeClass)}
    this._likesNum.textContent = this._likes.length;
  }

  _toggleLike() {
    let method = null;
    this._isLiked ? method = 'DELETE' : method = 'PUT';
    this._likeCallback(this, this.cardId, method)
  }

  changeLikeCondition(data) {
    this._likes = data.likes;
    this._isLiked = !this._isLiked;
    this._setLikeCondition()
  }

  removeCard() {
    this._element.remove()
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => { this._deleteCallback(this) });
    this._photo.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
    this._likeButton.addEventListener('click', () => {this._toggleLike()});
  }

  getCard() {
    return this._createCard()
  }
};


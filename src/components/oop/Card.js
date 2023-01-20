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
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.id = owner._id;
    this.cardId = _id;
    this._deleteCallback = deleteCallback;
    this._likeCallback = likeCallback;
    this._handleCardClick = handleCardClick;
    this.selector = selector;
    this.userId = userId;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this.selector)
      .content
      .querySelector('.element')
      .cloneNode(true)
    return cardElement
  }

  _createCard() {
    this._element = this._getElement();
    this._element.dataset.id = this.cardId;
    this._element.querySelector('.element__photo').src = this.link;
    this._element.querySelector('.element__photo').alt = this.name;
    this._element.querySelector('.element__name').textContent = this.name;
    this._element.querySelector('.element__likes-number').textContent = this.likes.length;
    if (this.likes.some((like) => {return like._id === this.userId})) {
      this._element.querySelector('.element__like').classList.add('element__like_active')
    };
    this._setEventListeners();
    if (this.id !== this.userId) {this._element.querySelector('.element__delete').remove()}
    return this._element
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => {this._deleteCallback(evt)});
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {this._likeCallback(evt)});
    this._element.querySelector('.element__photo').addEventListener('click', () => {this._handleCardClick(this.name, this.link)});
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

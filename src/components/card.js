export default class Card {
  constructor({name, link, likes, owner, _id}, {deleteCallback, likeCallback, handleCardClick}, selector, userId) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._isLiked = likes.some((like) => {return like === userId});

    this.id = owner._id;
    this.cardId = _id;
    this._deleteCallback = deleteCallback;
    this._likeCallback = likeCallback;
    this._handleCardClick = handleCardClick;
    this.selector = selector;
    this.userId = userId;

  }

  _getElement() {
    console.log(this._isLiked)
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
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__likes-number').textContent = this._likes.length;
    if (this._isLiked) {this._element.querySelector('.element__like').classList.add('element__like_active')};
    this._setEventListeners();
    if (this.id !== this.userId) {this._element.querySelector('.element__delete').remove()}
    return this._element
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

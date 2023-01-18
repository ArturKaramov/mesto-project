//  M E S T O   -   O O P

// Организуйте в файле класс Api, в конструкторе которого будет содержаться URL и заголовки для запросов,
// а методы класса будут обозначать работу с разными эндпоинтами:
// Обратите внимание, что многие другие классы (PopupWithForm, Card, UserInfo) будут взаимодействовать
// с методами класса Api. Для решения этой задачи очень хорошо подойдёт материал, который вы изучите в
// последней теме по ООП. Внедряйте методы класса Api в другие классы через передачу колбэк-функций.

const cohortId = 'plus-cohort-18';
const token = '0d7ca977-0c10-4a5e-b941-b2da84cee22f';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor(options) {
    this._options = options;
  }

  isResponseOk(response) {
    if (response.ok) {return response.json()}
    else {return Promise.reject(`Ошибка: ${response.status}`)}
  }

  informResIsNotOk(err) {
    console.error(err)
    alert(err)
  }

  getInitialData() {
    return Promise.all([
      fetch(`${this._options.baseUrl}/users/me`, {
        headers: config.headers
      }),
      fetch(`${this._options.baseUrl}/cards`, {
        headers: config.headers
      })
    ])
      .then(arr => Promise.all(arr.map(res => this.isResponseOk(res))))
  }

  setProfileData(user) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then(res => this.isResponseOk(res))
  }

  postNewCard(card) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(res => this.isResponseOk(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => this.isResponseOk(res))
  }

  toggleLike(cardId, methodType) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: methodType,
      headers: config.headers
    })
    .then(res => this.isResponseOk(res))
  }

  updateAvatar(url) {
    return fetch (`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: url
      })
    })
      .then(res => this.isResponseOk(res))
  }
}

export const api = new Api(config);

export default class Api {
  constructor(config) {
    this._config = config;
  }

  isResponseOk(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  }

  informResIsNotOk(err) {
    console.error(err);
  }

  getInitialData() {
    return Promise.all([
      fetch(`${this._config.baseUrl}/users/me`, {
        headers: this._config.headers,
      }),
      fetch(`${this._config.baseUrl}/cards`, {
        headers: this._config.headers,
      }),
    ]).then((arr) => Promise.all(arr.map((res) => this.isResponseOk(res))));
  }

  setProfileData(user) {
    return fetch(`${this._config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._config.headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then((res) => this.isResponseOk(res));
  }

  postNewCard(card) {
    return fetch(`${this._config.baseUrl}/cards`, {
      method: "POST",
      headers: this._config.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => this.isResponseOk(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._config.headers,
    }).then((res) => this.isResponseOk(res));
  }

  toggleLike(cardId, methodType) {
    return fetch(`${this._config.baseUrl}/cards/likes/${cardId}`, {
      method: methodType,
      headers: this._config.headers,
    }).then((res) => this.isResponseOk(res));
  }

  updateAvatar(url) {
    return fetch(`${this._config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._config.headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => this.isResponseOk(res));
  }
}

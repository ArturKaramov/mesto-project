export default class Api {
  constructor({baseUrl, headers}) {
    this.url = baseUrl;
    this.headers = headers;
  };

  getInitialData() {
    return Promise.all([
      fetch(`${this.url}/users/me`, {
        headers: this.headers
      }),
      fetch(`${this.url}/cards`, {
        headers: this.headers
      })
    ])
      .then(arr => Promise.all(arr.map(res => isResponseOk(res))))
  }

  setProfileData(user) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then(res => isResponseOk(res))
  };

  postNewCard(card) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(res => isResponseOk(res))
  };

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => isResponseOk(res))
  };

  toggleLike(cardId, methodType) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: methodType,
      headers: this.headers
    })
    .then(res => isResponseOk(res))
  };

  updateAvatar (url) {
    return fetch (`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: url
      })
    })
      .then(res => isResponseOk(res))
  };

};

const isResponseOk = (response) => {
  if (response.ok) {return response.json()}
  else {return Promise.reject(`Ошибка: ${response.status}`)}
};

export const informResIsNotOk = (err) => {
  console.error(err)
  //alert(err)
};



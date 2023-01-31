const cohortId = 'plus-cohort-18';
const token = '0d7ca977-0c10-4a5e-b941-b2da84cee22f';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};

const isResponseOk = (response) => {
  if (response.ok) {return response.json()}
  else {return Promise.reject(`Ошибка: ${response.status}`)}
};

const informResIsNotOk = (err) => {
  console.error(err)
  alert(err)
};

const getInitialData = () => {
  return Promise.all([
    fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    }),
    fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
  ])
    .then(arr => Promise.all(arr.map(res => isResponseOk(res))))
};

const setProfileData = (user) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about
    })
  })
    .then(res => isResponseOk(res))
};

const postNewCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(res => isResponseOk(res))
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => isResponseOk(res))
}

const toggleLike = (cardId, methodType) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: methodType,
    headers: config.headers
  })
  .then(res => isResponseOk(res))
};

const updateAvatar = (url) => {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
    .then(res => isResponseOk(res))
};

export {informResIsNotOk, getInitialData, setProfileData, postNewCard, deleteCard, toggleLike, updateAvatar}



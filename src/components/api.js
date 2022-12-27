const cohortId = 'plus-cohort-18';
const token = '0d7ca977-0c10-4a5e-b941-b2da84cee22f';
const pageLoading = document.querySelector('.page_loading');

const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};

const pageIsLoading = (isLoading) => {
  if (isLoading) {
    pageLoading.style.visibility = 'visible'
    pageLoading.style.opacity = '1'
  }
  else {
    pageLoading.style.visibility = 'hidden'
    pageLoading.style.opacity = '0'
  };
};

const getUserData = (user) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      };
    })
    .then((data) => {
      user.name.textContent = data.name;
      user.about.textContent = data.about;
      user.avatar.src = data.avatar;
      user.name.setAttribute('data-id', data._id);
    })
    .catch((err) => {console.error(err)})
    .finally(() => pageIsLoading(false))
}

const getInitialCards = (callback) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else {return Promise.reject(`Ошибка: ${res.status}`)};
    })
    .then((cards) => {
      cards.reverse()
      cards.forEach((card) => {
        callback(card)
      })
    })
    .catch((err) => console.error(err))
    .finally(() => pageIsLoading(false))
};

const setProfileData = (user, profile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about
    })
  })
    .then(res => {
      if (res.ok) {return res.json()}
      else {return Promise.reject(`Ошибка: ${res.status}`)}
    })
    .then((data) => {
      profile.name.textContent = data.name
      profile.about.textContent = data.about
    })
};

const postNewCard = (card, callback) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
    .then((card) => {callback(card)})
    .catch((err) => {console.error(err)})
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

const toggleLike = (cardId, methodType, cardLikes) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: methodType,
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .then((card) => {
    cardLikes.textContent = card.likes.length
  })
  .catch((err) => console.error(err))
};

const updateAvatar = (url, photo) => {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else {return Promise.reject(`Ошибка: ${res.status}`)};
    })
    .then((data) => {photo.src = data.avatar})
    .catch((err) => console.error(err))
};

export {getUserData, getInitialCards, setProfileData, postNewCard, deleteCard, toggleLike, updateAvatar}



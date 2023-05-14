/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _checkResponseStatus(response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(`Error ${response.status} ${response.statusText}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponseStatus)
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponseStatus)
  }

  setUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '5bb107a9-f422-45ee-881f-805595ff73a7',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.title,
        about: data.description,
      }),
    }).then(this._checkResponseStatus)
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponseStatus)
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponseStatus)
  }

  likeCard(identifier) {
    return fetch(`${this._baseUrl}/cards/${identifier}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponseStatus)
  }

  unlikeCard(identifier) {
    return fetch(`${this._baseUrl}/cards/${identifier}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponseStatus)
  }

  removeCard(identifier) {
    return fetch(`${this._baseUrl}/cards/${identifier}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponseStatus)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '5bb107a9-f422-45ee-881f-805595ff73a7',
    'Content-Type': 'application/json',
  },
})

export default api

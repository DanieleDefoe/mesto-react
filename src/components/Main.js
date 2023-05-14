import { useState, useEffect } from 'react'

import api from '../utils/Api'

import Card from './Card'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [userId, setUserId] = useState('')

  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()]).then(
      ([{ name, about, avatar, _id }, cardsData]) => {
        setUserName(name)
        setUserDescription(about)
        setUserAvatar(avatar)
        setUserId(_id)
        setCards(cardsData)
      },
    )
  }, [])

  const cardElements = cards.map((cardData) => (
    <Card
      {...cardData}
      key={cardData._id}
      userId={userId}
      onCardClick={onCardClick}
    />
  ))

  return (
    <main className="main">
      <section className="profile" aria-label="данные профиля">
        <div className="profile__main">
          <div className="profile__image-wrapper">
            <img
              src={userAvatar}
              alt="Аватар"
              className="profile__avatar"
              loading="lazy"
            />
            <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
          </div>
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          aria-label="добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="карточки с местами">
        {cardElements}
      </section>
    </main>
  )
}

export default Main

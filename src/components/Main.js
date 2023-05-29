import { useContext } from 'react'

import { CurrentUserContext } from '../contexts/CurrentUserContext'

import Card from './Card'

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const userData = useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile" aria-label="данные профиля">
        <div className="profile__main">
          <div className="profile__image-wrapper">
            <img
              src={userData?.avatar}
              alt="Аватар"
              className="profile__avatar"
              loading="lazy"
            />
            <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
          </div>
          <h1 className="profile__name">{userData?.name}</h1>
          <button
            className="profile__edit"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{userData?.about}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          aria-label="добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="карточки с местами">
        {cards.map(({ name, link, likes, _id, owner }) => (
          <Card
            name={name}
            link={link}
            likes={likes}
            key={_id}
            _id={_id}
            owner={owner}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main

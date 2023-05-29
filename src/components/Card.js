import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useContext } from 'react'

function Card({
  name,
  link,
  _id,
  likes,
  onCardClick,
  owner,
  onCardLike,
  onCardDelete,
  setCards,
}) {
  const currentUser = useContext(CurrentUserContext)

  const isOwn = owner._id === currentUser._id

  const isLiked = likes.some((el) => el._id === currentUser._id)

  const cardLikeButtonClassName = `card__button ${
    isLiked ? 'card__button_active' : ''
  }`

  function handleClick() {
    onCardClick({ link, name })
  }

  function handleLikeClick() {
    onCardLike({ _id, likes }, setCards)
  }

  function handleDeleteClick() {
    onCardDelete({ _id })
  }

  return (
    <article className="card">
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="card__remove"
          onClick={handleDeleteClick}
          aria-label="Удалить карточку"
        ></button>
      )}
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-count">{likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card

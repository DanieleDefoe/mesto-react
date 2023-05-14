function Card({ name, link, likes, onCardClick }) {
  function handleClick() {
    onCardClick({ link, name })
  }

  return (
    <article className="card">
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={handleClick}
      />
      <button className="card__remove" aria-label="Удалить карточку"></button>
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            className="card__button"
            aria-label="лайк"
          ></button>
          <p className="card__like-count">{likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card

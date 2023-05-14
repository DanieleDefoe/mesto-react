function Card({ name, link, likes, owner, userId, onCardClick }) {
  function handleClick() {
    onCardClick(link)
  }

  return (
    <article className="card">
      <img
        src={link}
        alt="Карточка"
        className="card__image"
        onClick={handleClick}
      />
      <button
        className={`card__remove ${
          owner._id !== userId && 'card__remove_hidden'
        }`}
        aria-label="Удалить карточку"
      ></button>
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            className={`card__button ${
              likes.indexOf((user) => user._id === userId) !== -1 &&
              'card__button_active'
            }`}
            aria-label="лайк"
          ></button>
          <p className="card__like-count">{likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card

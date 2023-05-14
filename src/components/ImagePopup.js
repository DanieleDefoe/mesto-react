function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup image-popup ${card !== null && 'popup_opened'}`}>
      <article className="popup__image-container">
        <img src={card?.link} alt={card?.name} className="popup__image" />
        <p className="popup__image-title">{card?.name}</p>
        <button
          className="popup__exit popup__exit_place_image-container"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
      </article>
    </section>
  )
}

export default ImagePopup

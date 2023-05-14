function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup image-popup ${card !== '' && 'popup_opened'}`}>
      <article className="popup__image-container">
        <img src={card} alt="Попап картинка" className="popup__image" />
        <p className="popup__image-title"></p>
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

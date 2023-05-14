function PopupWithForm({ title, name, children, type, isOpen, onClose }) {
  return (
    <section className={`popup ${type} ${isOpen ? 'popup_opened' : ''}`}>
      <form
        className="popup__container"
        id={`popup__${name}`}
        name={name}
        noValidate
      >
        <button
          className="popup__exit"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button type="submit" className="popup__submit">
          Сохранить
        </button>
      </form>
    </section>
  )
}

export default PopupWithForm

import { useEffect } from 'react'

function PopupWithForm({
  title,
  name,
  children,
  type,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  isValid,
}) {
  useEffect(() => {
    function closeOnEscape(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  return (
    <section className={`popup ${type} ${isOpen ? 'popup_opened' : ''}`}>
      <form
        className="popup__container"
        id={`popup__${name}`}
        name={name}
        onSubmit={onSubmit}
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
        <button
          type="submit"
          disabled={isValid === false}
          className={`popup__submit ${
            isValid === false ? 'popup__submit_disabled' : ''
          }`}
        >
          {buttonText}
        </button>
      </form>
    </section>
  )
}

export default PopupWithForm

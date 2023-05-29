import PopupWithForm from './PopupWithForm'

import { useState, useRef } from 'react'

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = useRef()
  const linkRef = useRef()
  const [buttonText, setButtonText] = useState('Создать')

  async function handleSubmit(e) {
    e.preventDefault()
    setButtonText('Создание...')
    const name = nameRef.current.value
    const link = linkRef.current.value
    await onAddPlace(name, link)
    nameRef.current.value = ''
    linkRef.current.value = ''
    setButtonText('Создать')
  }

  return (
    <PopupWithForm
      onClose={onClose}
      title="Новое место"
      name="add-form"
      type="card-popup"
      isOpen={isOpen}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__inputs">
        <div className="popup__input-container">
          <input
            type="text"
            className="popup__input"
            name="place-title"
            id="place-title"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            ref={nameRef}
          />
          <span className="popup__input-error popup__input-place-title-error"></span>
        </div>
        <div className="popup__input-container">
          <input
            type="url"
            className="popup__input"
            name="place-photo"
            id="place-photo"
            placeholder="Ссылка на картинку"
            required
            ref={linkRef}
          />
          <span className="popup__input-error popup__input-place-photo-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  )
}

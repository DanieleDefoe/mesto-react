import PopupWithForm from './PopupWithForm'

import { useState } from 'react'

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('')
  const [isNameValid, setIsNameValid] = useState(false)
  const [nameError, setNameError] = useState('')
  const [link, setLink] = useState('')
  const [isLinkValid, setIsLinkValid] = useState(false)
  const [linkError, setLinkError] = useState('')
  const [buttonText, setButtonText] = useState('Создать')

  function handleNameChange(e) {
    setName(e.target.value)
    setIsNameValid(e.target.checkValidity())
    setNameError(e.target.validationMessage)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
    setIsLinkValid(e.target.checkValidity())
    setLinkError(e.target.validationMessage)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setButtonText('Создание...')
    try {
      await onAddPlace(name, link)
    } finally {
      setButtonText('Создать')
    }
    setName('')
    setLink('')
    setIsNameValid(false)
    setIsLinkValid(false)
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
      isValid={isNameValid && isLinkValid}
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
            value={name}
            onChange={handleNameChange}
          />
          {nameError && (
            <span className="popup__input-error popup__input-place-title-error">
              {nameError}
            </span>
          )}
        </div>
        <div className="popup__input-container">
          <input
            type="url"
            className="popup__input"
            name="place-photo"
            id="place-photo"
            placeholder="Ссылка на картинку"
            required
            value={link}
            onChange={handleLinkChange}
          />
          {linkError && (
            <span className="popup__input-error popup__input-place-photo-error">
              {linkError}
            </span>
          )}
        </div>
      </fieldset>
    </PopupWithForm>
  )
}

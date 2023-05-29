import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useState, useEffect, useContext } from 'react'

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('')
  const [isNameValid, setIsNameValid] = useState(true)
  const [nameError, setNameError] = useState('')
  const [description, setDescription] = useState('')
  const [isDescriptionValid, setIsDescriptionValid] = useState(true)
  const [descriptionError, setDescriptionError] = useState('')
  const [buttonText, setButtonText] = useState('Сохранить')
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])

  function handleNameChange(e) {
    setName(e.target.value)
    setNameError(e.target.validationMessage)
    setIsNameValid(e.target.checkValidity())
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
    setDescriptionError(e.target.validationMessage)
    setIsDescriptionValid(e.target.checkValidity())
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setButtonText('Сохранение...')
    try {
      await onUpdateUser({ title: name, description })
    } finally {
      setButtonText('Сохранить')
    }
  }

  return (
    <PopupWithForm
      onClose={onClose}
      title="Редактировать профиль"
      name="edit-form"
      type="profile-popup"
      isOpen={isOpen}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isValid={isNameValid && isDescriptionValid}
    >
      <fieldset className="popup__inputs">
        <div className="popup__input-container">
          <input
            type="text"
            className="popup__input"
            name="title"
            id="title"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            value={name || ''}
            onChange={handleNameChange}
          />
          {nameError && (
            <span className="popup__input-error popup__input-title-error">
              {nameError}
            </span>
          )}
        </div>
        <div className="popup__input-container">
          <input
            type="text"
            className="popup__input"
            name="description"
            id="description"
            placeholder="Статус"
            required
            minLength="2"
            maxLength="200"
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          {descriptionError && (
            <span className="popup__input-error popup__input-description-error">
              {descriptionError}
            </span>
          )}
        </div>
      </fieldset>
    </PopupWithForm>
  )
}

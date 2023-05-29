import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useState, useEffect, useContext } from 'react'

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [buttonText, setButtonText] = useState('Сохранить')
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setButtonText('Сохранение...')
    onUpdateUser({ title: name, description }).then(() =>
      setButtonText('Сохранить'),
    )
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
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__input-error popup__input-title-error"></span>
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
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="popup__input-error popup__input-description-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  )
}

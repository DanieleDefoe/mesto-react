import PopupWithForm from './PopupWithForm'

import { useRef, useState } from 'react'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef()
  const [buttonText, setButtonText] = useState('Обновить')
  const [avatar, setAvatar] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isValid, setIsValid] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setButtonText('Обновление...')
    try {
      await onUpdateAvatar({ avatar: avatarRef.current.value })
    } finally {
      setButtonText('Обновить')
      setAvatar('')
      setIsValid(false)
    }
  }

  function handleChange(e) {
    setAvatar(e.target.value)
    setErrorMessage(e.target.validationMessage)
    setIsValid(e.target.checkValidity())
  }

  return (
    <PopupWithForm
      onClose={onClose}
      title="Обновить аватар"
      name="avatar-edit-form"
      type="avatar-popup"
      isOpen={isOpen}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__input-container">
        <input
          ref={avatarRef}
          type="url"
          className="popup__input popup__input_place_avatar"
          name="profile-avatar"
          id="profile-avatar"
          placeholder="Ссылка на картинку"
          value={avatar}
          onChange={handleChange}
          required
        />
        {errorMessage && (
          <span className="popup__input-error popup__input-profile-avatar-error">
            {errorMessage}
          </span>
        )}
      </div>
    </PopupWithForm>
  )
}

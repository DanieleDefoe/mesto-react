import PopupWithForm from './PopupWithForm'

import { useRef, useState } from 'react'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef()
  const [buttonText, setButtonText] = useState('Обновить')
  const [avatar, setAvatar] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setButtonText('Обновление...')
    await onUpdateAvatar({ avatar: avatarRef.current.value })
    setButtonText('Обновить')
    setAvatar('')
  }

  function handleChange(e) {
    setAvatar(e.target.value)
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
        <span className="popup__input-error popup__input-profile-avatar-error"></span>
      </div>
    </PopupWithForm>
  )
}

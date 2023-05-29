import PopupWithForm from './PopupWithForm'

import { useState } from 'react'

export default function RemoveCardPopup({
  isOpen,
  onClose,
  onRemoveCard,
  cardToRemove,
}) {
  const [buttonText, setButtonText] = useState('Да')

  async function handleSubmit(e) {
    e.preventDefault()
    setButtonText('Удаление...')
    try {
      await onRemoveCard(cardToRemove)
    } finally {
      setButtonText('Да')
    }
  }

  return (
    <PopupWithForm
      onClose={onClose}
      title="Вы уверены?"
      name="remove-form"
      type="delete-popup"
      buttonText={buttonText}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  )
}

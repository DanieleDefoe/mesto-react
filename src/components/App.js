import Header from './Header'
import Main from './Main'
import Footer from './Footer'

import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

import { useState } from 'react'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState(null)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)

    setSelectedCard(null)
  }

  return (
    <>
      <div className="wrapper">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <PopupWithForm
        onClose={closeAllPopups}
        title="Редактировать профиль"
        name="edit-form"
        type="profile-popup"
        isOpen={isEditProfilePopupOpen}
        buttonText="Сохранить"
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
            />
            <span className="popup__input-error popup__input-description-error"></span>
          </div>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        onClose={closeAllPopups}
        title="Новое место"
        name="add-form"
        type="card-popup"
        isOpen={isAddPlacePopupOpen}
        buttonText="Создать"
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
            />
            <span className="popup__input-error popup__input-place-photo-error"></span>
          </div>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        onClose={closeAllPopups}
        title="Обновить аватар"
        name="avatar-edit-form"
        type="avatar-popup"
        isOpen={isEditAvatarPopupOpen}
        buttonText="Обновить"
      >
        <div className="popup__input-container">
          <input
            type="url"
            className="popup__input popup__input_place_avatar"
            name="profile-avatar"
            id="profile-avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error popup__input-profile-avatar-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm
        onClose={closeAllPopups}
        title="Вы уверены?"
        name="remove-form"
        type="delete-popup"
        buttonText="Да"
      ></PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  )
}

export default App
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import RemoveCardPopup from './RemoveCardPopup'

import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

import { useState, useEffect } from 'react'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState(null)

  const [currentUser, setCurrentUser] = useState({})

  const [cards, setCards] = useState([])

  const [cardToRemove, setCardToRemove] = useState({})

  useEffect(() => {
    async function getUserInfo() {
      try {
        const data = await api.getUserData()
        setCurrentUser(data)
      } catch (error) {
        console.log(error.message)
      }
    }

    getUserInfo()

    async function getCards() {
      try {
        const data = await api.getInitialCards()
        setCards(data)
      } catch (error) {
        console.log(error.message)
      }
    }

    getCards()
  }, [])

  function confirmDeletion(card) {
    setCardToRemove(card)
    setIsRemoveCardPopupOpen(true)
  }

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

  async function handleCardLike(card) {
    const isLiked = card.likes.some((el) => el._id === currentUser._id)

    try {
      let newCard
      if (isLiked) {
        newCard = await api.unlikeCard(card._id)
      } else {
        newCard = await api.likeCard(card._id)
      }
      setCards((prevCards) =>
        prevCards.map((el) => (el._id === card._id ? newCard : el)),
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.removeCard(card._id)
      setCards((prevCards) => prevCards.filter((el) => el._id !== card._id))
      closeAllPopups()
    } catch (error) {
      console.log(error.message)
    }
  }

  async function handleUpdateUser(data) {
    try {
      const updatedUser = await api.setUserData(data)
      setCurrentUser(updatedUser)
      closeAllPopups()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdateAvatar({ avatar }) {
    try {
      const userWithNewAvatar = await api.setUserAvatar(avatar)
      setCurrentUser(userWithNewAvatar)
      closeAllPopups()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleAddPlace(name, link) {
    try {
      const newCard = await api.addNewCard(name, link)
      setCards((prevCards) => [newCard, ...prevCards])
      closeAllPopups()
    } catch (error) {
      console.log(error.message)
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsRemoveCardPopupOpen(false)

    setSelectedCard(null)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={confirmDeletion}
          cards={cards}
        />
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <RemoveCardPopup
        isOpen={isRemoveCardPopupOpen}
        onClose={closeAllPopups}
        onRemoveCard={handleCardDelete}
        cardToRemove={cardToRemove}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  )
}

export default App

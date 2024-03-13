import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import i18next from '../../services/i18next'
import { languages } from './../../utils/languages'
import languageList from '../../services/languageList.json'

import { useTranslation } from 'react-i18next'

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--primary-color)',
    border: 'none'
  },
};


export default function Home() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [currLanguage, setCurrLanguage] = useState(i18next.language)
  const { t } = useTranslation()
  

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function changeLanguage(l) {
    i18next
      .changeLanguage(l)
      .then(() => {
        setCurrLanguage(i18next.language)
      })
    // closeModal()
  }

  const languageElements = languages.map((l, i) => (
    <Language 
      key={i}
      l={l}
      changeLanguage={() => changeLanguage(l)}
      currLanguage={currLanguage}
    />
  ))

  return (
    <main>
        <ul className='menu-options'>
            <li className='title'>
              <Link to="/categories">{t('play')}</Link>
            </li>
            <li>
              <button onClick={openModal}>{t('languages')}</button>
            </li>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              style={customStyles}
            >
              <div className='languages'>
                {languageElements}
              </div>
            </Modal>
            {/* <li>
              <Link to="/how-to-play">How to Play</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li> */}
        </ul>
    </main>
  )
}

function Language(props) {
  const { l, currLanguage, changeLanguage } = props

  return (
    <button 
      className={`language-container ${currLanguage === l ? 'current' : ''}`}
      onClick={changeLanguage}
    >
      <span className='language'>{languageList[l].nativeName}</span>
      <span>&nbsp;</span>
      <span>({l})</span>
    </button>
  )
}
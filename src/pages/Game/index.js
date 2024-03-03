import React, { useState, useEffect } from 'react'
import useCategory from '../../hooks/useCategory'
import { useSearchParams } from 'react-router-dom'
// import random from '../../utils/random'

export default function Game() {
    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const random = searchParams.get('id')
    const { data, loading } = useCategory(category)

    // const chosenOne = 'duda amor da minha vida'
    const chosenOne = data ? data[random % data.length].toLowerCase() : ''
    // console.log(data)

    const word = Array.from(chosenOne)
    const words = chosenOne.split(' ')
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    console.log(data, loading)

    const [guesses, setGuesses] = useState([])
    
    const wordsElements = words.map((word, i) => {
        const lettersElement = [...word].map((letter, i) => (
            <Guess
                key={i}
                revealed={checkRevealed(letter)}
                letter={letter}
            // letter={letter}
            />
        ))

        return (
            <Word
                key={i}
            >
                {lettersElement}
            </Word>
        )
    })

    const lettersElement = letters.map((letter, i) => (
        <Letter
            key={i}
            letter={letter}
            activated={!guesses.find(guess => guess.letter === letter && guess.status !== 'non-checked')}
            handleKey={() => handleKey({ key: letter })}
        />
    ))

    function checkRevealed(key) {
        return guesses.find(guess => guess.letter === key)
    }

    function handleGuess(key) {
        const hasInWord = !!word.find(l => l.letter === key)

        setGuesses(prev => (
            [...prev,
                {
                    letter: key,
                    guessed: !!hasInWord,
                }
            ]
        ))
    }

    function handleKey(e) {
        const key = e.key
        const keys = guesses.map(g => g.letter)
        if (keys.includes(key)) {
            return
        }

        handleGuess(key)
    }

    function handleKeyDown(e) { }

    useEffect(() => {
        window.addEventListener('keyup', handleKey)
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keyup', handleKey)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <main className='game'>
            <section className='guesses'>
                {wordsElements}
            </section>
            <section className='letters'>
                {lettersElement}
            </section>
        </main>
    )
}

function Guess(props) {
    const { letter, revealed } = props

    return (
        <div className={`cell guess ${!revealed ? 'unrevealed' : ''}`}>
            {revealed && letter}
        </div>
    )
}

function Letter(props) {
    const { letter, activated, handleKey } = props

    return (
        <div className={`cell letter ${!activated ? 'deactivated' : ''}`} onClick={() => {
            if (!activated) return
            handleKey()
        }}>
            <span className='letter-text'>{letter}</span>
        </div>
    )
}

function Word({ children }) {
    return (
        <div className='word'>
            {children}
        </div>
    )
}
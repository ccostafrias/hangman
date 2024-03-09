import React, { useState, useEffect } from 'react'
import useCategory from '../../hooks/useCategory'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import random from '../../utils/random'

import { RefreshOutline, Home } from 'react-ionicons'

export default function Game() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [randomCategory, setRandomCategory] = useState(random(9999))
    const category = searchParams.get('category')
    const { data, loading, error } = useCategory(category)

    // const chosenOne = 'duda amor da minha vida'
    const chosenOne = data ? data[randomCategory % data.length].toLowerCase() : ''
    const word = [...chosenOne]
    const words = chosenOne.split(' ')
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    const [guesses, setGuesses] = useState([])
    const [state, setState] = useState('in-game')
    
    const wordsElements = words.map((word, i) => {
        const lettersElement = [...word].map((letter, i) => (
            <Guess
                key={i}
                revealed={checkRevealed(letter)}
                won={state !== 'in-game'}
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

    const lettersElements = letters.map((letter, i) => (
        <Letter
            key={i}
            letter={letter}
            activated={!guesses.find(guess => guess.letter === letter && guess.status !== 'non-checked')}
            handleKey={() => handleKey({ key: letter })}
        />
    ))

    const personElements = guesses.filter(guess => !guess.guessed).map((guess, i) => (
        <BodyPart
            key={i}
        />
    ))

    function resetGame() {
        setGuesses([])
        setState('in-game')
        setRandomCategory(random(9999))
    }

    function checkRevealed(key) {
        return guesses.find(guess => guess.letter === key)
    }

    function handleGuess(key) {
        const hasInWord = word.includes(key)

        setGuesses(prev => (
            [...prev,
                {
                    letter: key,
                    guessed: hasInWord,
                }
            ]
        ))
    }

    function handleKey(e) {
        if (state !== 'in-game') return

        const key = e.key
        if (!letters.includes(key)) return

        const keys = guesses.map(g => g.letter)
        if (keys.includes(key)) return

        handleGuess(key)
    }

    function handleKeyDown(e) { }

    useEffect(() => {
        if (chosenOne) {
            const wrongs = guesses.filter(guess => !guess.guessed).length
            const rights = word.reduce((prev, curr) => {
                if (!!checkRevealed(curr)) return prev + 1
                else return prev
            }, 0)
    
            if (wrongs >=6 ) {
                setState('loose')
            } else if (rights >= word.filter(l => letters.includes(l)).length) {
                setState('win')
            }
        }

        window.addEventListener('keyup', handleKey)
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keyup', handleKey)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [guesses, state, data])

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <main className='game-container'>
            <section className='hangman-container'>
                <div className="hangman">
                    <div className='base'></div>
                    <div className="support-1"></div>
                    <div className="support-2"></div>
                    <div className="support-3"></div>
                    <div className="support-4"></div>
                    <div className='person'>
                        {personElements}
                    </div>
                </div>
            </section>
            <section className='game-upper'>
                <section className='title-container'>
                    <h2 className='title'>{category}</h2>
                </section>
                <section className='guesses'>
                    {wordsElements}
                </section>
                {/* <button onClick={() => setState('win')}>GANHAR</button> */}
            </section>
            <section className='game-down'>
                {state === 'in-game' ? (
                    <div className=' letters'>
                        {lettersElements}
                    </div>
                ) : (
                    <BottomGame state={state} resetGame={resetGame}/>
                )}
            </section>
        </main>
    )
}

function BottomGame(props) {
    const navigate = useNavigate()
    const { state, resetGame } = props
    const topElement = state === 'win' ? <h2 className='win-title'>Well Done!</h2> : <h2 className='title'>Game Over</h2>
    return (
        <>
            {topElement}
            <div className='game-nav'>
                <div className='game-nav--icon box'>
                    <Link to="/">
                        <Home
                            color={'#ffffff'}
                            height="2rem"
                            width="2rem"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    </Link>
                </div>
                <div className='game-nav--icon box'>
                    <RefreshOutline
                        color={'#00000'}
                        height="2rem"
                        width="2rem"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        onClick={() => resetGame()}
                    />
                </div>
            </div>
        </>
    )
}

function Guess(props) {
    const { letter, revealed, won } = props

    return (
        <div className={`cell guess ${(!won && !revealed) ? 'unrevealed' : ''}`}>
            {(won || revealed) && letter}
        </div>
    )
}

function Letter(props) {
    const { letter, activated, handleKey } = props

    return (
        <div className={`cell letter box ${!activated ? 'deactivated' : ''}`} onClick={() => {
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

function BodyPart() {
    return (
        <div></div>
    )
}
import { useCallback, useContext, useEffect, useState } from "react"
import './styles.css'
import '../../styles/game.css'
import { GameKeyboard } from "../GameKeyboard"
import { HangmanMenu } from "../HangmanMenu"
import { HangmanContext } from "../../contexts/HangmanContext"
import { actions } from "../../contexts/HangmanContext/actions"

export const Hangman = () => {
    const { hangmanState, hangmanDispatch } = useContext(HangmanContext)
    const games = hangmanState.games

    const [currentGame, setCurrentGame] = useState('')
    const [currentHash, setCurrentHash] = useState('')
    const [currentTheme, setCurrentTheme] = useState('')
    const [attempts, setAttempts] = useState(5)

    const resetGame = useCallback((msg) => {
        alert(msg)

        hangmanDispatch({type: actions.RESET, currentTheme, currentGame})

        setCurrentGame('')
        setCurrentHash('')
        setCurrentTheme('')

        setAttempts(5)
    }, [currentGame, currentTheme, hangmanDispatch])

    useEffect(() => {
        if (attempts === 0) {
            resetGame(`Game over... =( The answer was: ${currentGame.answer}`)
        }
    }, [attempts, resetGame, currentGame])


    useEffect(() => {
        if (!currentGame || !currentHash) {
            return 
        }

        if (currentHash === currentGame.answer.toUpperCase()) {
            resetGame(`Congratulations! You've won the game! The answer was: ${currentGame.answer}`)
        }
    }, [currentGame, currentHash, resetGame])

    const generateHash = (game) => {
        let hash = ''

        for (let letter of game.answer) {
            if (letter.charCodeAt(0) === 32) {
                hash += letter
            }
            else {
                hash += '_'
            }
        }

        setCurrentHash(hash)
    }

    const handleClick = (e) => {
        const gameValue = e.currentTarget.textContent
        const game = games.filter(game => {
            return game.theme === gameValue
        })[0]
        const randomIndex = Math.floor(Math.random() * game.data.length)
        generateHash(game.data[randomIndex])
        setCurrentGame(game.data[randomIndex])
        setCurrentTheme(gameValue)
    }

    const handleKeyboard = (e) => {
        const button = e.currentTarget
        const letter = button.textContent

        let hash = currentHash.split("")
        
        for (let letterIndex in currentGame.answer) {
            if (letter === currentGame.answer[letterIndex].toUpperCase()) {
                hash[letterIndex] = letter
            }
        }

        button.disabled = true
        button.style.cursor = 'not-allowed'

        hash = hash.join("")

        if (hash === currentHash) {
            button.style.color = "red"
            button.style.border = '1px solid red'
            setAttempts(attempts - 1)
        }

        else {
            button.style.color = 'green'
            button.style.border = '1px solid green'
            setCurrentHash(hash)
        }
    }

    return (
        <div className="game-container">
            <h3>Hangman Game</h3>
            
            {!currentHash ? (
                <HangmanMenu games={games} handleClick={handleClick} />
            ) : (
                <div className="hangman-game">
                    <h4>Theme: {currentTheme}</h4>
                    <h4>Tip: {currentGame.tip}</h4>
                    <h4>Attempts: {attempts}</h4>

                    <p className="hash">{currentHash}</p>

                    <GameKeyboard handleKeyboard={handleKeyboard} />
                </div>
            )}
        </div>
    )
}
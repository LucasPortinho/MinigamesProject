import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../contexts/GameContext'
import { actions } from '../../contexts/GameContext/actions'
import { EnterBackspaceButton } from '../EnterBackspaceButton'
import { GameKeyboard } from '../GameKeyboard'
import { WordsFlex } from '../WordsFlex'
import './styles.css'

export const Word = () => {
    const word = 'CARRO'
    const indexes = useRef([0, 1, 2, 3, 4]) 
    const currentRow = useRef(null)
    const [currentRowIndex, setCurrentRowIndex] = useState(0)
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
    const { dispatchState } = useContext(Context)

    useEffect(() => {
        currentRow.current = document.getElementById(`parent-${currentRowIndex}`)
    }, [currentRowIndex, currentLetterIndex])

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;
            
            if (key === "ArrowRight") {
                if (currentLetterIndex >= 4) return
                setCurrentLetterIndex(currentLetterIndex + 1)
            }

            if (key === "ArrowLeft") {
                if (currentLetterIndex <= 0) return
                setCurrentLetterIndex(currentLetterIndex - 1)
            }
        
        }
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress); 
        };
    }, [currentLetterIndex])

    const endGame = (msg) => {
        alert(msg)

        dispatchState({type: actions.FINISH, payload: "Word"})
        dispatchState({type: actions.QUIT})

        setCurrentLetterIndex(0)
        setCurrentRowIndex(0)
    }

    const handleKeyboard = (e) => {
        const button = e.target
        const letter = button.textContent
        const letterChildren = currentRow.current.children  

        letterChildren[currentLetterIndex].textContent = letter

        if (currentLetterIndex === letterChildren.length - 1) return

        setCurrentLetterIndex(currentLetterIndex + 1)
    }

    const handleEnter = (e) => {
        let currentWord = ''

        const letterChildren = currentRow.current.children

        for (let letterChild of letterChildren) {
            currentWord += letterChild.textContent
        }

        if (currentWord.length !== 5) return

        const wordArray = word.toUpperCase().split("")
        const currentWordArray = currentWord.split("")

        currentWordArray.map((letter, index) => {
            const keyboardButtons = document.querySelector('.game-keyboard').children

            if (letter === wordArray[index]) {
                const button = Array.from(keyboardButtons).find(button => button.textContent === letter)

                button.style.background = '#3aa394'

                letterChildren[index].style.background = '#3aa394'
            }

            else if (wordArray.includes(letter)) {
                const button = Array.from(keyboardButtons).find(button => button.textContent === letter)

                button.style.background = '#D3AD69'

                letterChildren[index].style.background = '#D3AD69'
            }

            else {
                const button = Array.from(keyboardButtons).find(button => button.textContent === letter)

                button.style.background = '#C97C7C'

                letterChildren[index].style.background = '#C97C7C'
            }

            return letter
        })        

        if (currentWord === word.toUpperCase()) {
            endGame("Congratulations! You've finished the game!")
            return
        }

        if (currentRowIndex === 4) {
            endGame('Game over =(')
            return
        }

        setCurrentRowIndex(currentRowIndex + 1)
        setCurrentLetterIndex(0)
    }

    const handleBackspace = (e) => {
        const letterChildren = currentRow.current.children

        letterChildren[currentLetterIndex].textContent = ""

        if (currentLetterIndex <= 0) return
        
        setCurrentLetterIndex(currentLetterIndex - 1)
    }

    const handleClick = (e) => {
        const letterSpacing = e.target
        const parentId = Number(letterSpacing.parentElement.dataset.id)
        const id = Number(letterSpacing.id)

        if (parentId !== currentRowIndex) return
        
        setCurrentLetterIndex(id)
    }

    return (
        <div className="game-container">
            <h3>Word game</h3>

            <div className="words-flex">
                {indexes.current.map(index => {
                    return <WordsFlex key={index} index={index} handleClick={handleClick} markedIndexes={{ currentLetterIndex, currentRowIndex }}/>
                })}
                <GameKeyboard handleKeyboard={handleKeyboard}/>
                <EnterBackspaceButton handleEnter={handleEnter} handleBackspace={handleBackspace} />
            </div>
        </div>
    )
}
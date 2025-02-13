import './styles.css'
import '../../styles/game.css'
import { useRef, useState, useEffect, useContext, useCallback } from 'react'
import { initialCards } from './data'
import { Context } from '../../contexts/GameContext'
import { actions } from '../../contexts/GameContext/actions'
import { MemoryCard } from '../MemoryCard'

export const Memory = () => {
    const [cards, setCards] = useState([])
    const [currentCards, setCurrentCards] = useState([])
    const revealCounter = useRef(0)
    const { dispatchState } = useContext(Context)

    const resetGame = useCallback((msg) => {
        alert(msg)

        dispatchState({type: actions.QUIT})
        dispatchState({type: actions.FINISH, payload: "Memory"})

        setCards([])
        setCurrentCards([])
    }, [dispatchState])

    useEffect(() => {
        setCards(shuffleArray(initialCards));
      }, []);

    useEffect(() => {
        if (revealCounter.current === 2) {
            if (currentCards[currentCards.length - 1].content === currentCards[currentCards.length - 2].content) {
                currentCards[currentCards.length - 1].isCorrect = true
                currentCards[currentCards.length - 2].isCorrect = true    
            }

            const unrevealCards = cards.map(card => {
                if (!card.isCorrect) {
                    card.revealed = false
                }

                return card
            })

            setTimeout(() => setCards(unrevealCards), 350)

            revealCounter.current = 0
        }
    })

    useEffect(() => {
        if (cards.length === 0) {
            return
        }

        const cardsCopy = cards.filter(card => {
            if (!card.isCorrect) {
                return true
            }
            return false
        })

        if (cardsCopy.length === 0) {
            resetGame("Congratulations! You've finished the memory game")
        }
    }, [cards, resetGame])
    
    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    }

    const revealCard = async(index) => {
        if (cards[index].isCorrect || cards[index].revealed) return

        const updatedCards = cards.map((card, i) => {
            if (i === index) {
                const current = [...currentCards, card]
                card.revealed = true
                setCurrentCards(current)
            }
            return card
        })

        revealCounter.current += 1
        setCards(updatedCards);
    };

    return (
        <div className="game-container">
            <h3>Memory game</h3>

            <div className='memory-grid'>
                <MemoryCard cards={cards} revealCard={revealCard}/>
            </div>
        </div>
    )
}

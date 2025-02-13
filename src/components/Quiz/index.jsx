import './styles.css'
import '../../styles/game.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { QuizContext } from '../../contexts/QuizContext'
import { QuizMenu } from '../QuizMenu'
import { NextButton } from '../NextButton'
import { AlternativeButton } from '../QuizAlternativeButton'
import { PreviousButton } from '../PreviousButton'
import { actions } from '../../contexts/QuizContext/actions'

export const Quiz = () => {
    const { quizState, quizDispatch } = useContext(QuizContext)
    const questions = useRef(null)
    const [id, setId] = useState(0)
    const correctCounter = useRef(0)
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        if (!selected) return

        if (id >= questions.current.data.length - 1) {
            document.querySelector('.next-button').style.display = 'none'
        }

        else if (id <= 0) {
            document.querySelector('.previous-button').style.display = 'none'
        }

        else {
            document.querySelector('.previous-button').style.display = ''
            document.querySelector('.next-button').style.display = ''
        }

    }, [selected, id])

    useEffect(() => {
        if (!questions.current) return

        const container = document.querySelector('.quiz-game')

        if (!container) return

        const currentQuestions = Array.from(container.children)
        const isSolved = questions.current.data[id].solved

        currentQuestions.map(el => {
            questions.current.data[id].options.map(obj => {
                if (isSolved) {
                    if (obj.alternative === el.textContent && obj.correct) {
                        el.style.background = "rgba(0, 128, 0, 0.35)"
                    }
                    else if (obj.alternative === el.textContent && !obj.correct) {
                        el.style.background = "rgba(255, 0, 0, 0.35)"
                    }
                    
                    el.disabled = true
                }

                if (!isSolved) {
                    el.style.background = 'none'
                    el.disabled = false
                    el.style.transform = ''
                }
                return obj

            })
            return el
        })
        
    }, [id])

    const endGame = (msg) => {
        alert(msg)
        // Finish game
    }

    const handleClick = (e, option) => {
        const children = Array.from(e.target.parentElement.children)
        children.map(el => {
            questions.current.data[id].options.map(obj => {
                if (obj.alternative === el.textContent && obj.correct) {
                    el.style.background = "rgba(0, 128, 0, 0.35)"
                }
                else if (obj.alternative === el.textContent && !obj.correct) {
                    el.style.background = "rgba(255, 0, 0, 0.35)"
                }

                return obj
            })
            
            el.disabled = true
            return el
        })

        e.target.style.transform = 'scale(1.05)'

        questions.current.data[id].solved = true

        if (option.correct) {
            correctCounter.current += 1
        }

        setTimeout(() => {
            handleNext()
        }, 300);
    }

    const handleNext = () => {
        if (id >= questions.current.data.length - 1) {
            endGame(`You finished the quiz and answered ${correctCounter.current} questions correctly!`)
            quizDispatch({type: actions.FINISH_CURRENT, payload: questions.current.theme})
            setSelected(false)
            setId(0)
            correctCounter.current = 0
            return
        }

        setId(i => i + 1)

    }

    const handlePrevious = () => {
        if (id <= 0) return

        setId(i => i - 1)

    }

    const setQuestions = (question) => {
        questions.current = question
        setSelected(true)
    }

    return (
        <div className="game-container">
            {!selected ? (
                <QuizMenu key='quiz-menu' questions={quizState.questions} setQuestions={setQuestions} />
            ) : (
                <>
                    <div className="quiz">
                        <h3>Theme: {questions.current.theme}</h3>
                        
                        <div className='quiz-game'>
                            <h4>Question: {questions.current.data[id].question}</h4>

                            {questions.current.data[id].options.map(option => {
                                return <AlternativeButton key={option.id} handleClick={handleClick} option={option} />
                            })}
                        </div>

                    </div>
                    <NextButton handleNext={handleNext}/>
                    <PreviousButton handlePrevious={handlePrevious} />
                </>
            )}

        </div>
    )
}

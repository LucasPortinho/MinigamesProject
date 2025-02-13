import './styles.css'
import P from 'prop-types'
import { useCallback, useContext, useEffect } from 'react'
import { Context } from '../../contexts/GameContext'
import { actions } from '../../contexts/GameContext/actions'

export const QuizMenu = ({ questions, setQuestions }) => {
    const { dispatchState } = useContext(Context)

    const checkFinished = useCallback(() => {
        const questionsArray = questions.filter(question => question.data.length > 0)

        if (questionsArray.length === 0) {
            dispatchState({type: actions.FINISH, payload: "Quiz"})
            dispatchState({type: actions.QUIT})
            return 
        }

        return
    }, [questions, dispatchState])

    useEffect(() => {
        checkFinished()
    }, [checkFinished])

    return (
        <div className='questions-button-container'>
            {questions.map(question => {
                const disabled = question.data.length > 0 ? false : true

                return <button key={question.theme} disabled={disabled} className="questions-button" onClick={() => setQuestions(question)}>{question.theme}</button>
            })}
        </div>
    )
}

QuizMenu.propTypes = {
    questions: P.array.isRequired,
    setQuestions: P.func.isRequired,
}

import { createContext, useReducer } from "react";
import { data } from "./data";
import { reducer } from "./reducer";
import P from 'prop-types'

export const QuizContext = createContext()

export const QContext = ({children}) => {
    const [quizState, quizDispatch] = useReducer(reducer, data)

    return <QuizContext.Provider value={{ quizState, quizDispatch }}>{children}</QuizContext.Provider>
}

QContext.propTypes = {
    children: P.node.isRequired,
}

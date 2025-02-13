import { createContext, useReducer } from "react";
import { data } from "./data";
import { reducer } from "./reducer";
import P from 'prop-types'

export const HangmanContext = createContext()

export const HangContext = ({children}) => {
    const [hangmanState, hangmanDispatch] = useReducer(reducer, data)

    return <HangmanContext.Provider value={{ hangmanState, hangmanDispatch }}>{children}</HangmanContext.Provider>
}

HangContext.propTypes = {
    children: P.node.isRequired,
}

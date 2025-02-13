import { createContext, useReducer } from "react";
import { gameData } from "./data";
import { reducer } from "./reducer";
import P from 'prop-types'

export const Context = createContext();

export const HomeContext = ({ children }) => {
    const [state, dispatchState] = useReducer(reducer, gameData)

    return <Context.Provider value={{ state, dispatchState }}>{children}</Context.Provider>
}

HomeContext.propTypes = {
    children: P.node.isRequired,
}

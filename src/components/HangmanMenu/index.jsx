import './styles.css'
import P from 'prop-types'
import { useCallback, useContext, useEffect } from 'react'
import { Context } from '../../contexts/GameContext'
import { actions } from '../../contexts/GameContext/actions'

export const HangmanMenu = ({ games, handleClick }) => {
    const { dispatchState } = useContext(Context)

    const checkFinished = useCallback(() => {
        const gamesArray = games.filter(game => game.data.length > 0)
        if (gamesArray.length === 0) {
            dispatchState({type: actions.FINISH, payload: "Hangman"})
            dispatchState({type: actions.QUIT})
            return 
        }

        return
    }, [games, dispatchState])

    useEffect(() => {
        checkFinished()
    }, [checkFinished])
    
    return (
        <div className="hangman-button-container">
            {games.map(game => {
                const disabled = game.data.length > 0 ? false : true

                return <button className="hangman-button" onClick={handleClick} key={game.theme} disabled={disabled}>{game.theme}</button>
            })}
        </div>
    )
}

HangmanMenu.propTypes = {
    games: P.array.isRequired,
    handleClick: P.func.isRequired,
}

import './styles.css'
import React, { useContext } from 'react'
import { Context } from '../../contexts/GameContext'
import { actions } from '../../contexts/GameContext/actions'

export const GameMenu = () => {
    const { state, dispatchState }  = useContext(Context)

    const handleClick = (e) => {
        const game = state.games.filter(game => game.name === e.currentTarget.title)[0].game
        dispatchState({type: actions.SELECTED, payload: game})
    }

    return (
        <div className='game-menu'>
            {state && (
                state.games.map(game => {
                    const finished = game.finished ? 'finished' : ''
                    return <button key={game.name} className={`game-button ${finished}`} onClick={handleClick} disabled={finished} title={game.name}>
                        {React.cloneElement(game.icon, {fill: finished ? "yellow" : "currentColor"})}
                    </button>
                })
            )}
        </div>
    )
}

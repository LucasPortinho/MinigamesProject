import { useContext } from 'react'
import { Context } from '../../contexts/GameContext'
import './styles.css'
import { AiOutlineLeft } from 'react-icons/ai'
import { actions } from '../../contexts/GameContext/actions'

export const QuitButton = () => {
    const { dispatchState } = useContext(Context)

    return <button className="quit-button" onClick={() => dispatchState({type: actions.QUIT})}> <AiOutlineLeft /> </button>
}

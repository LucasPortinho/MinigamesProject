import { useContext } from "react"
import { Context } from "../../contexts/GameContext"
import { GameMenu } from '../../components/GameMenu';
import './styles.css'
import { QuitButton } from "../QuitButton";

export const Container = () => {
    const { state } = useContext(Context)

    return (
    <div className="container">
      <QuitButton />

        {!state.gameSelected ? (
          <GameMenu />
        ): (
          state.gameSelected
        )}
        
      </div>
    )
}
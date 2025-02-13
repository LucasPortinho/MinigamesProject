import './styles.css'
import P from 'prop-types'
import { useEffect, useRef } from 'react';

export const GameKeyboard = ({ handleKeyboard }) => {

    const letters = useRef("ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/[A-Z]/g))

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toUpperCase();
            const button = document.querySelector(`button[data-key="${key}"]`);

            if (button) {
                button.click();
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress); 
        };
    }, []);

    return (
        <div className="game-keyboard">
            {letters.current.map(letter => {
                return <button key={letter} className="keyboard-button" data-key={letter} onClick={handleKeyboard}>{letter}</button>
            })}
        </div>
    )
}

GameKeyboard.propTypes = {
    handleKeyboard: P.func.isRequired,
}

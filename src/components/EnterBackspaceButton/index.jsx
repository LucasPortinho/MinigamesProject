import './styles.css'
import P from 'prop-types'
import { useEffect } from 'react';
import { AiOutlineLeft } from 'react-icons/ai'

export const EnterBackspaceButton = ({handleEnter, handleBackspace}) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;
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
        <div className='buttons-flex'>
            <button className='enter' data-key={'Enter'} onClick={handleEnter}>Enter</button>
            <button className='backspace' data-key={'Backspace'} onClick={handleBackspace}> <AiOutlineLeft /> </button>
        </div>
    )
}

EnterBackspaceButton.propTypes = {
    handleEnter: P.func.isRequired,
    handleBackspace: P.func.isRequired,
}

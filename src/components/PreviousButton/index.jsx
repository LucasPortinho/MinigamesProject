import './styles.css'
import P from 'prop-types'
import { AiOutlineLeft } from 'react-icons/ai'

export const PreviousButton = ({ handlePrevious }) => {
    return <button className='previous-button' onClick={handlePrevious}> <AiOutlineLeft /> </button>
}

PreviousButton.propTypes = {
    handlePrevious: P.func.isRequired,
}

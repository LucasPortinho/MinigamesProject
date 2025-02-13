import './styles.css'
import P from 'prop-types'
import { AiOutlineRight } from 'react-icons/ai'

export const NextButton = ({ handleNext }) => {
    return <button className='next-button' onClick={handleNext}> <AiOutlineRight /> </button>
}

NextButton.propTypes = {
    handleNext: P.func.isRequired,
}

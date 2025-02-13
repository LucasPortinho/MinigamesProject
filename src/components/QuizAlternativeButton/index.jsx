import './styles.css'
import P from 'prop-types'

export const AlternativeButton = ({option, handleClick}) => {
    return <button className='alternative-button' onClick={(e) => handleClick(e, option)}>{option.alternative}</button>
}

AlternativeButton.propTypes = {
    handleClick: P.func.isRequired,
    option: P.shape({
        id: P.number.isRequired,
        alternative: P.string.isRequired,
        correct: P.bool.isRequired,
    }).isRequired
}

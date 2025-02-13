import './styles.css'
import P from 'prop-types'

export const LetterSpacing = ({index, handleClick, letter, isRow}) => {
    const isMarked = ((letter === index) && (isRow)) ? 'marked' : ''

    return <div id={index} className={`letter-spacing ${isMarked}`} onClick={handleClick}></div>
}

LetterSpacing.propTypes = {
    handleClick: P.func.isRequired,
    index: P.number.isRequired,
    letter: P.number.isRequired,
    isRow: P.bool.isRequired,
}

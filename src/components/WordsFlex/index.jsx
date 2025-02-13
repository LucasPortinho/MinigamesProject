import { useRef } from 'react'
import { LetterSpacing } from '../LetterSpacing'
import './styles.css'
import P from 'prop-types'

export const WordsFlex = ({index, handleClick, markedIndexes: { currentLetterIndex, currentRowIndex }}) => {
    const indexes = useRef([0, 1, 2, 3, 4])
    
    return (
        <div className='letters-row' id={`parent-${index}`} data-id={index}>
            {indexes.current.map(i => {
                return <LetterSpacing index={i} key={i} handleClick={handleClick} letter={currentLetterIndex} isRow={currentRowIndex === index}/>
            })}
        </div>
    )
}

WordsFlex.propTypes = {
    index: P.number.isRequired,
    markedIndexes: P.shape({
        currentLetterIndex: P.number.isRequired,
        currentRowIndex: P.number.isRequired,
    }).isRequired,
    handleClick: P.func.isRequired,
}

import './styles.css'
import P from 'prop-types'

export const SearchLetter = ({ handleClick, rowIndex, colIndex, letter }) => {
    return (
        <div key={`${rowIndex}-${colIndex}`} id={`${rowIndex}-${colIndex}`} onClick={(e) => handleClick(e, rowIndex, colIndex)} className='search-letter'>
                {letter}
        </div>
    )
}

SearchLetter.propTypes = {
    handleClick: P.func.isRequired,
    rowIndex: P.number.isRequired,
    colIndex: P.number.isRequired,
    letter: P.string.isRequired,
}

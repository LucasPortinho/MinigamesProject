import './styles.css'
import P from 'prop-types'
import { SearchLetter } from '../SearchLetter'

export const SearchGrid = ({ grid, handleClick }) => {
    return (
        <div className='search-grid'>
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <SearchLetter key={`${rowIndex}-${colIndex}`} handleClick={handleClick} letter={letter} rowIndex={rowIndex} colIndex={colIndex} />
            ))
          )}
        </div>
    )
}

SearchGrid.propTypes = {
    grid: P.array.isRequired,
    handleClick: P.func.isRequired,
}

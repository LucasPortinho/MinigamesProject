import './styles.css'
import P from 'prop-types'

export const MemoryCard = ({ cards, revealCard }) => {
    return (
        cards.map((card, index) => (
        <div key={index} className="memory-card" onClick={() => revealCard(index)} style={{ background: card.revealed ? 'none' : 'white' }}>
            {card.revealed && (
                <div className={`back-card ${card.isCorrect ? 'correct' : ''}`}>{card.content}</div>
            )}
        </div>
        ))
    )
}

MemoryCard.propTypes = {
    cards: P.array.isRequired,
    revealCard: P.func.isRequired,
}

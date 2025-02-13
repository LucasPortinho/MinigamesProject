import { actions } from "./actions";

export const reducer = (state, action) => {
    switch(action.type) {
        case actions.SELECTED:
            return {...state, gameSelected: action.payload}
        
        case actions.QUIT:
            return {...state, gameSelected: ''}

        case actions.FINISH:
            const name = action.payload
            const finishedArray = state.games.map(game => {
                if (game.name === name) {
                    game.finished = true
                }

                return game
            })
            return {...state, games: finishedArray}

        default:
            return
    }
}
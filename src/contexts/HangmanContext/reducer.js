import { actions } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.RESET:
            const { currentTheme, currentGame } = action

            const games = state.games.map(game => {
                if (game.theme === currentTheme) {
                    game.data = game.data.filter(obj => obj.answer !== currentGame.answer)
                }
                return game
            }) 
            return { games }
        default: 
            return {...state}
    }       
}
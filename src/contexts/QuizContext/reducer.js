import { actions } from "./actions"

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.FINISH_CURRENT:
            const newState = state.questions.map(question => {
                if (question.theme === action.payload) {
                    question.data = []
                }
                return question
            })
            
            return { questions: newState }

        default: 
            return {...state}
    }       
}
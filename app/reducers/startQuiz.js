import { LOAD_QUIZ_FORM, SET_TOTAL_QUESTION } from '../actions/quiz';

export default function startQuiz (state = {}, action) {
  switch (action.type) {
    case LOAD_QUIZ_FORM:
      return {
        data: action.data
      }
    case SET_TOTAL_QUESTION:
      let data = {
        ...state.data,
        totalQuestions: action.strNum
      }
      return {
        ...state,
        data
      }
    default:
      return state
  }
}

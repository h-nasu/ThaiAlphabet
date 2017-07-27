import { LOAD_QUIZ_FORM } from '../actions/quiz';

export default function startQuiz (state = {}, action) {
  switch (action.type) {
    case LOAD_QUIZ_FORM:
      return {
        data: action.data
      }
    default:
      return state
  }
}

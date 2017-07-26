
export const GET_QUESTION = 'GET_QUESTION';
export const ADD_FINISHED_QUESTION = 'ADD_FINISHED_QUESTION';
export const ADD_SCORE = 'ADD_SCORE';

export function getQuestion() {
  return {
    type: GET_QUESTION
  };
}

export function addFinishedQuestions(question) {
  return {
    type: ADD_FINISHED_QUESTION,
    question: question
  }
}

export function addScore() {
  return {
    type: ADD_SCORE
  }
}

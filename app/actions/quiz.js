
export const GET_QUESTION = 'GET_QUESTION';
export const ADD_FINISHED_QUESTION = 'ADD_FINISHED_QUESTION';
export const ADD_SCORE = 'ADD_SCORE';
export const LOAD_QUIZ_FORM = 'LOAD_QUIZ_FORM';

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

export const loadQuizForm = data => ({ type: LOAD_QUIZ_FORM, data });

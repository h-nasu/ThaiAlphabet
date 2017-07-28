
export const GET_QUESTION = 'GET_QUESTION';
export const ADD_FINISHED_QUESTION = 'ADD_FINISHED_QUESTION';
export const ADD_SCORE = 'ADD_SCORE';
export const LOAD_QUIZ_FORM = 'LOAD_QUIZ_FORM';
export const LOAD_NEW_QUIZ = 'LOAD_NEW_QUIZ';
export const SET_TOTAL_QUESTION = 'SET_TOTAL_QUESTION';

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
export const setTotalQuestion = strNum => ({ type: SET_TOTAL_QUESTION, strNum });

export const loadNewQuiz = () => ({ type: LOAD_NEW_QUIZ });

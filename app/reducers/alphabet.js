import thaiAlphabets from '../resources/thaiAlphabets';
import {
  GET_QUESTION,
  ADD_FINISHED_QUESTION,
  ADD_SCORE,
  LOAD_NEW_QUIZ
} from '../actions/quiz';

const initialState = {
  alphabets: thaiAlphabets,
  selections: [],
  question: {},
  questionIndex: null,
  finishedQuestions: [],
  score: 0
};

function getRandomAlphabet(alphabets, finishedQuestions) {
  let selection = null;
  let randArr = [];
  while (selection == null) {
    let rand = Math.floor((Math.random() * alphabets.length));
    if (randArr.indexOf(rand) == true) {
      console.log(rand);
      continue;
    }
    selection = alphabets[rand];
    let searchResult = null;
    for (var i in finishedQuestions) {
      if ( typeof finishedQuestions[i] != 'undefined'
      && finishedQuestions[i].symbol == selection.symbol ) {
        searchResult = finishedQuestions[i].symbol;
        break;
      }
    }
    if (searchResult != null) {
      selection = null;
      randArr.push(rand);
    }
  }
  return selection;
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTION:
      let selections = [];
      let question = getRandomAlphabet(state.alphabets, state.finishedQuestions);

      let answerIndex = Math.floor(Math.random() * 4);
      for (var i=0;i<4;i++) {
        if (answerIndex == i) {
          selections.push(question);
        } else {
          selections.push(getRandomAlphabet(state.alphabets, selections));
        }
      }
      return {
        ...state,
        selections: selections,
        question: question,
        questionIndex: answerIndex
      };
    case ADD_FINISHED_QUESTION:
      let bufArr = state.finishedQuestions;
      bufArr.push(action.question);
      return {
        ...state,
        finishedQuestions: bufArr
      };
    case ADD_SCORE:
      let buf = state.score + 1;
      return {
        ...state,
        score: buf
      };
    case LOAD_NEW_QUIZ:
      return {
        ...state,
        finishedQuestions: [],
        score: 0
      }
    default:
      return state;

  }

}

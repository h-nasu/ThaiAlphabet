import thaiAlphabets from '../resources/thaiAlphabets';
import { GET_QUESTION } from '../actions/quiz';

const initialState = {
  alphabets: thaiAlphabets,
  selections: [],
  question: {},
  questionIndex: null
};

export default function(state= initialState, action) {
/*
  if (action.type === SET_INDEX) {
    return {
      ...state,
      selectedIndex: action.payload
    };
  }
  */
  if (action.type === GET_QUESTION) {
    let selections = [];
    for (x=0;x<4;x++) {
      selections.push(state.alphabets[x]);
    }
    return {
      ...state,
      selections: selections,
      question: selections[0],
      questionIndex: 0
    };
  }
  return state;
}

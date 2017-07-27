import { combineReducers } from "redux";
import {reducer as form} from "redux-form";
import alphabet from "./alphabet";
import startQuiz from './startQuiz';

export default combineReducers({
  form,
  alphabet,
  startQuiz
});

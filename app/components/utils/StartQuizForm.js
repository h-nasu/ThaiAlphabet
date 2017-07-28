import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import MyInput from './MyInput';
import { Text, Button, Item } from "native-base";

import { connect } from 'react-redux';
import startQuiz from '../../reducers/startQuiz';
import { loadQuizForm, setTotalQuestion } from '../../actions/quiz';

class StartQuizForm extends React.Component {

  componentDidMount() {
    const { loadQuizForm, totalQuestions, totalAlphabets } = this.props;
    loadQuizForm({
      totalQuestions: totalQuestions,
      totalAlphabets: totalAlphabets
    });
  }

  render() {
    return (
      <View>

        <Text>Number of Questions</Text>
        <Field
          name={'totalQuestions'}
          component={MyInput}
          onFocusAction={(e) => this.props.setTotalQuestion('')}
          selectKeyboardType="numeric"
        />

        <Button onPress={this.props.handleSubmit} disabled={!this.props.valid} >
          <Text>Start Quiz</Text>
        </Button>

      </View>
    );
  }

}

const validate = values => {
  const errors = {};

  errors.totalQuestions = !values.totalQuestions
    ? 'Required'
    : isNaN(Number(values.totalQuestions))
    ? 'Must be a Numer'
    : values.totalQuestions > values.totalAlphabets
    ? 'Must be smaller than ' + values.totalAlphabets
    : undefined;

  return errors;
}

StartQuizForm = reduxForm({
  form: 'startQuiz',
  enableReinitialize: true,
  validate
})(StartQuizForm);


StartQuizForm = connect(
  state => ({
    initialValues: state.startQuiz.data
  }),
  dispatch => ({
    loadQuizForm: (data) => dispatch(loadQuizForm(data)),
    setTotalQuestion: (strNum) => dispatch(setTotalQuestion(strNum))
  })
)(StartQuizForm)

export default StartQuizForm;

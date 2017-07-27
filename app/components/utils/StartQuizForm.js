import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import MyInput from './MyInput';
import { Text, Button, Item } from "native-base";

import { connect } from 'react-redux';
import startQuiz from '../../reducers/startQuiz';
import { loadQuizForm } from '../../actions/quiz';

class StartQuizForm extends React.Component {
/*
  constructor() {
    super();
    this.state = {
      submitting: false,
    };
  }
*/
  componentDidMount() {
    const { loadQuizForm, totalQuestions, totalAlphabets } = this.props;
    loadQuizForm({
      totalQuestions: totalQuestions,
      totalAlphabets: totalAlphabets
    });
  }
/*
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitting !== this.state.submitting) {
      this.setState({submitting: nextProps.submitting})
    }
  }
*/
  _submitState() {
    return this.props.submitting;
  }

  render() {
    return (
      <View>

        <Field
          name={'totalQuestions'}
          component={MyInput}
        />

        <Button onPress={this.props.handleSubmit} disabled={this.props.submitting} >
          <Text>Start Quiz</Text>
        </Button>
      </View>
    );
  }

}

const validate = values => {
  const errors = {};
  /*
  errors.email = !values.email
    ? 'Email field is required'
    : !emailRegex.test(values.email)
    ? 'Email format is invalid'
    : undefined;
  */
  errors.totalQuestions = !values.totalQuestions
    ? 'Required'
    : undefined;

  return errors;
}

StartQuizForm = reduxForm({
  form: 'startQuiz',
  validate
})(StartQuizForm);


StartQuizForm = connect(
  state => ({
    initialValues: state.startQuiz.data
  }),
  dispatch => ({
    loadQuizForm: (data) => dispatch(loadQuizForm(data))
  })
)(StartQuizForm)

export default StartQuizForm;

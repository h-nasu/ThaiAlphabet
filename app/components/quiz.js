import React, { Component } from "react";
import { Dimensions, View, Alert } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Button,
  Header,
  Left,
  Title,
  Right,
  Icon,
  Body,
  Item,
  Input
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  getQuestion,
  addFinishedQuestions,
  addScore,
  loadNewQuiz
} from "../actions/quiz";
import Modal from 'react-native-modal';
import StartQuizForm from './utils/StartQuizForm';

class Quiz extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.initQuiz = {
      selections: [],
      answers: [],
      selected: null,
      canCheck: true,
      checked: null,
      resetModalVisible: false,
      // will change
      totalQuestionsText: '10',
      totalQuestions:10,
      questionNumber: 1
    };
    this.state = this.initQuiz;
  }

  componentDidMount() {
    this.props.getQuestion();
  }

  selectAnswer(index = null) {
    let buf = [];
    for (var i=0;i<this.props.selections.length;i++) {
      buf[i] = (i===index) ? 'yellow' : 'transparent' ;
    }
    this.setState({selections: buf, selected: index, canCheck: false});
  }

  highLightAnswer(index) {
    let buf = [];
    for (i=0;i<this.props.selections.length;i++) {
      buf[i] = (i===index) ? 'red' : 'black' ;
    }
    this.setState({answers: buf});
  }

  getAnswer() {
    if (this.state.selected == this.props.questionIndex) {
      this.props.addScore();
      this.setState({
        checked: (<Text style={{ ...styles.definition, ...{color: 'blue', margin: 5} }} >Correct!</Text>)
      });
    } else {
      this.setState({checked: (<Text style={{ ...styles.definition, ...{color: 'red', margin: 5} }} >Wrong</Text>)});
    }
    this.highLightAnswer(this.props.questionIndex);
    this.props.addFinishedQuestions(this.props.question);

  }

  nextQuestion(questionNumber, initArr = []) {
    if (initArr.length == 0) {
      this.initQuiz.totalQuestions = this.state.totalQuestions;
      this.initQuiz.totalQuestionsText = this.state.totalQuestionsText;
    }
    this.initQuiz.questionNumber = questionNumber;
    this.setState({...this.initQuiz, ...initArr});
    this.props.getQuestion();
  }

  _showAnswer(index, alphabet) {
    if (this.state.checked != null) {
      return (<Text style={{...styles.definition,...{color: this.state.answers[index]}}}>{alphabet.readingThai}{'\n'}</Text>);
    } else {
      return null;
    }
  }

  _makeSelection(index, alphabet) {
    return ( <Col key={index}
      style={ {...styles.answer, ...{backgroundColor: this.state.selections[index]} } }
      onPress={ () => this.selectAnswer(index) }
    >
    <Text style={{color: this.state.answers[index]}} >
      {this._showAnswer(index, alphabet)}
      <Text style={{...styles.definition,...{color: this.state.answers[index]}}}>{alphabet.readingEng}{'\n'}</Text>
      <Text style={{...styles.definition,...{color: this.state.answers[index]}}}>{alphabet.meaning}{'\n'}</Text>
      Initial: <Text  style={{...styles.definition,...{color: this.state.answers[index]}}}>{alphabet.initial}{'\n'}</Text>
      Final: <Text  style={{...styles.definition,...{color: this.state.answers[index]}}}>{alphabet.final}</Text>
    </Text>
    </Col> );
  }

  _answerArea() {
    let selections = [];
    let selectionBuf = [];
    for (i=0;i<this.props.selections.length;i++) {
      let odd = i % 2;
      selectionBuf.push(this._makeSelection(i, this.props.selections[i]));
      if (odd > 0) {
        selections.push(<Row key={i} style={styles.answerRow} >{selectionBuf}</Row>);
        selectionBuf = [];
      }
    };
    return selections;
  }

  _answerButton() {
    if (this.state.checked == null) {
      return (
        <Button disabled={this.state.canCheck} onPress={ () => this.getAnswer() } style={{marginTop: 10}} >
          <Text>Answer</Text>
        </Button>
      );
    } else if (this.state.questionNumber >= this.state.totalQuestions) {
      return (
        <Button disabled={this.state.canCheck} onPress={ () => this.setState({resetModalVisible: true}) } style={{marginTop: 10}} >
          <Text>New Quiz</Text>
        </Button>
      );
    } else {
      return (
        <Button onPress={ () => this.nextQuestion(this.state.questionNumber + 1) } style={{marginTop: 10}} >
          <Text>Next Question</Text>
        </Button>
      );
    }
  }

  _onNumberChange(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
        if ( numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }
    return newText;
  }

  onStartNewQuize(values) {
    //Alert.alert('Submitted!', JSON.stringify(values));
    this.props.loadNewQuiz();
    this.nextQuestion(1, {
      totalQuestionsText: values.totalQuestions,
      totalQuestions: parseInt(values.totalQuestions),
    });

  }



  render() {
    return (
      <Container>

        <Header>
          <Left>
            <Button transparent onPress={() => {
                this.props.loadNewQuiz();
                this.props.navigation.goBack()
            }}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Quiz</Title>
          </Body>

          <Right>
            <Button light onPress={() => this.setState({resetModalVisible: true})} >
              <Text>
                Reset
              </Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Grid style={{alignItems: 'center'}} >

            <Row>
              <Text style={styles.symbol}>{this.props.question.symbol}</Text>

            </Row>
            <Row>
              {this.state.checked}
            </Row>
            <Row style={{marginBottom: 10}}>
              <Col style={styles.infoArea}>
                <Text style={styles.score}>Question: {this.state.questionNumber}/{this.state.totalQuestions}</Text>
                <Text style={styles.score}>Total Score: {this.props.score}</Text>
              </Col>
              <Col style={styles.infoArea}>
                {this._answerButton()}
              </Col>

            </Row>

            {this._answerArea()}

          </Grid>
        </Content>

        <Modal
          isVisible={this.state.resetModalVisible}
          style={{alignItems: 'center'}}
        >
          <View style={styles.modalContent} >
            <StartQuizForm
              totalQuestions={this.state.totalQuestionsText}
              totalAlphabets={this.props.alphabets.length}
              onSubmit={this.onStartNewQuize.bind(this)}
            />
          </View>
        </Modal>

      </Container>


    );
  }
}

function bindAction(dispatch) {
  return {
    getQuestion: () => dispatch(getQuestion()),
    addFinishedQuestions: (question) => dispatch(addFinishedQuestions(question)),
    addScore: () => dispatch(addScore()),
    loadNewQuiz: () => dispatch(loadNewQuiz()),
  };
}
const mapStateToProps = state => ({
  alphabets: state.alphabet.alphabets,
  selections: state.alphabet.selections,
  question: state.alphabet.question,
  questionIndex: state.alphabet.questionIndex,
  score: state.alphabet.score,
});

const AlphabetSwagger = connect(mapStateToProps, bindAction)(Quiz);

export default AlphabetSwagger;

const styles = {
  symbol: {
    fontSize: 100,
    fontWeight: 'bold',
    marginRight: 20,
    marginTop: -10,
  },
  definition: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  answer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    //width: Dimensions.get('window').width / 2,
    width: 320 / 2,
  },
  answerRow: {
    //width: Dimensions.get('window').width,
    width: 320
  },
  score: {
    fontSize: 20
  },
  infoArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
};

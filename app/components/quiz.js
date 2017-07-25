import React, { Component } from "react";
import { Dimensions, Text } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  //Text,
  List,
  ListItem,
  Button
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { getQuestion } from "../actions/quiz";


class Quiz extends React.Component {
  static navigationOptions = {
    title: 'Quiz'
  };

  constructor() {
    super();
    this.state = {
      selections: [],
      answers: [],
      selected: null,
      canCheck: true,
      checked: null,
      score: 0,
    }
  }

  componentDidMount() {
    this.props.getQuestion({});
    //this.selectAnswer();
  }

  selectAnswer(index = null) {
    let buf = [];
    for (i=0;i<this.props.selections.length;i++) {
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
      let newScore = this.state.score + 1;
      this.setState({
        checked: (<Text style={{ ...styles.definition, ...{color: 'blue', margin: 5} }} >Correct!</Text>),
        score: newScore
      });
    } else {
      this.setState({checked: (<Text style={{ ...styles.definition, ...{color: 'red', margin: 5} }} >Wrong</Text>)});
    }
    this.highLightAnswer(this.props.questionIndex);

  }

  _showAnswer(alphabet) {
    if (this.state.checked != null) {
      return (<Text  style={styles.definition}>{alphabet.readingThai}{'\n'}</Text>);
    } else {
      return null;
    }
  }

  makeSelection(index, alphabet) {
    return ( <Col key={index}
      style={ {...styles.answer, ...{backgroundColor: this.state.selections[index]} } }
      onPress={ () => this.selectAnswer(index) }
    >
      <Text style={{color: this.state.answers[index]}} >
        {this._showAnswer(alphabet)}
        <Text style={styles.definition}>{alphabet.readingEng}{'\n'}</Text>
        <Text style={styles.definition}>{alphabet.meaning}{'\n'}</Text>
        Initial: <Text  style={styles.definition}>{alphabet.initial}{'\n'}</Text>
        Final: <Text  style={styles.definition}>{alphabet.final}</Text>
      </Text>
    </Col> );
  }

  render() {
    let selections = [];
    let selectionBuf = [];
    for (i=0;i<this.props.selections.length;i++) {
      let odd = i % 2;
      selectionBuf.push(this.makeSelection(i, this.props.selections[i]));
      if (odd > 0) {
        selections.push(<Row key={i} style={styles.answerRow} >{selectionBuf}</Row>);
        selectionBuf = [];
      }
    };
    return (
      <Container>
        <Content>
          <Grid style={{alignItems: 'center'}} >

            <Row>
              <Text style={styles.symbol}>{this.props.question.symbol}</Text>
            </Row>
            <Row>
              <Text style={styles.score}>Score: {this.state.score}</Text>
            </Row>

            {selections}
            <Row>{this.state.checked}</Row>
            <Row>
              <Button disabled={this.state.canCheck} onPress={ () => this.getAnswer() } style={{marginTop: 10}} >
                <Text>Answer</Text>
              </Button>
            </Row>

          </Grid>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    getQuestion: used => dispatch(getQuestion(used)),
  };
}
const mapStateToProps = state => ({
  alphabets: state.alphabet.alphabets,
  selections: state.alphabet.selections,
  question: state.alphabet.question,
  questionIndex: state.alphabet.questionIndex,
});

const AlphabetSwagger = connect(mapStateToProps, bindAction)(Quiz);

export default AlphabetSwagger;

const styles = {
  symbol: {
    fontSize: 100,
    fontWeight: 'bold',
    marginRight: 20,
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
  }
};
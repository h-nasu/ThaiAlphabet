import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  List,
  ListItem
} from "native-base";


class Alphabet extends React.Component {
  static navigationOptions = {
    title: 'Alphabets'
  };

  render() {
    return (
      <Container>
        <Content>
          <List dataArray={this.props.alphabets}
            renderRow={(alphabet) =>
              <ListItem>
                <Text style={styles.symbol}>
                  {alphabet.symbol}
                </Text>
                <Text>
                  <Text  style={styles.definition}>{alphabet.readingThai}{'\n'}</Text>
                  Reading: <Text  style={styles.definition}>{alphabet.readingEng}{'\n'}</Text>
                  Meaning: <Text  style={styles.definition}>{alphabet.meaning}{'\n'}</Text>
                  Initial: <Text  style={styles.definition}>{alphabet.initial}{'\n'}</Text>
                  Final: <Text  style={styles.definition}>{alphabet.final}</Text>
                </Text>
              </ListItem>
          }>
          </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {};
}
const mapStateToProps = state => ({
  alphabets: state.alphabet.alphabets
});

const AlphabetSwagger = connect(mapStateToProps, bindAction)(Alphabet);

export default AlphabetSwagger;

const styles = {
  symbol: {
    fontSize: 100,
    fontWeight: 'bold',
    marginRight: 20
  },
  definition: {
    fontSize: 20,
    fontWeight: 'bold',
  }
};

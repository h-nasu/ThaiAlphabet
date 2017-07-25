import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Text, Header, Body, Title } from 'native-base';

export default class Top extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Top</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem onPress={() => this.props.navigation.navigate('Alphabet')} >
              <Text>Thai Alphabets</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate('Quiz')} >
              <Text>Quiz</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

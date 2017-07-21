import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './app/reducers';
//import Top from './app/components/top';
import MainStackRouter from './app/Routers/MainStackRouter';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      store: createStore(reducer)
    }
  }
  render() {
    return (
      <Provider store={this.state.store}>
        <MainStackRouter />
      </Provider>
    );
  }
}

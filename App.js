import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './app/reducers';
//import Top from './app/components/top';
import MainStackRouter from './app/Routers/MainStackRouter';

import Expo from "expo";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      store: createStore(reducer),
      isReady: false,
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={this.state.store}>
        <MainStackRouter />
      </Provider>
    );
  }
}

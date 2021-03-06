import React, { Component } from "react";
import Top from "../components/top";
import Alphabet from "../components/alphabet";
import Quiz from "../components/quiz";
import { StackNavigator } from "react-navigation";
import { Platform, StatusBar } from 'react-native';

export default (StackNav = StackNavigator(
  {
    Top: { screen: Top },
    Alphabet: { screen: Alphabet },
    Quiz: { screen: Quiz }
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  }
));

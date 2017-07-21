import React, { Component } from "react";
import Top from "../components/top";
import Alphabet from "../components/alphabet";
import { StackNavigator } from "react-navigation";

export default (StackNav = StackNavigator({
  Top: { screen: Top },
  Alphabet: { screen: Alphabet }
}));

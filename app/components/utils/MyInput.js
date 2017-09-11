import React from 'react';
import { View } from 'react-native';
import { Item, Icon, Input, Text } from "native-base";

/**
 * to be wrapped with redux-form Field component
 */
export default class MyInput extends React.Component {

  render() {
    return (
      <View style={{marginBottom: 10}}>
        <Item
          success={this.props.meta.valid}
          error={this.props.meta.invalid}
        >
          <Input
            {...this.props.inputProps}
            onChangeText={this.props.input.onChange}
            onBlur={this.props.input.onBlur}
            onFocus={this.props.onFocusAction}
            value={this.props.input.value}
            keyboardType={this.props.selectKeyboardType}
          />
          <Icon name={this.props.meta.valid ? 'checkmark-circle' : 'close-circle' }  />

        </Item>
        <Text style={{color:'red'}}>{this.props.meta.invalid ? this.props.meta.error : '' }</Text>
      </View>

    );
  }

}

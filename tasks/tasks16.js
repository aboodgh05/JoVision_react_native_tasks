import React, { Component } from 'react';
import {  StyleSheet, View, Text, Button } from 'react-native';

class Task16 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: true
    };
}
componentHideAndShow = () => {
    this.setState(previousState => ({ content: !previousState.content }))
  }
render() {
    return (
        <View style={styles.container}>
            {this.state.content ? <Text style={styles.text}>Abdullah</Text> : null}
            <Button title="Toggle Content" onPress={this.componentHideAndShow} />
        </View>
      );
    }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },

});
export default Task16;
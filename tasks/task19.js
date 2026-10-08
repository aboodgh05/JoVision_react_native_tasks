import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class MyClassPage extends Component {
  render() {
    return (
      <View>
        <Text>My Class Page</Text>
      </View>
    );
  }
}

class Task19 extends Component {
  state = {
    show: false,
  };

  render() {
    return (
      <View>
        <Button
          title="Show"
          onPress={() => this.setState({show: true})}
        />

        {this.state.show && <MyClassPage />}
      </View>
    );
  }
}

export default Task19;
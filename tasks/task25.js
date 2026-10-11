import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// Child class component: only a Text component. It owns its text state and
// exposes a public setText method that the parent calls through a ref.
class MyClassPage extends Component {
  state = {
    text: '',
  };

  // Public method the parent can call via ref.current.setText(...)
  setText = (text) => this.setState({ text });

  componentDidMount() {
    console.log('MyClassPage loaded');
  }

  componentWillUnmount() {
    console.log('MyClassPage unloaded');
  }

  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.pageText}>
          {this.state.text || 'Type in the parent input to update this text'}
        </Text>
        <Button title="Hide" onPress={this.props.onHide} />
      </View>
    );
  }
}

export default class App extends Component {
  state = {
    isVisible: false,
  };

  // For class components, ref.current is the component instance itself
  pageRef = React.createRef();

  showPage = () => this.setState({ isVisible: true });
  hidePage = () => this.setState({ isVisible: false });

  // Parent calls the child's method directly; no text state is passed as a prop
  handleChangeText = (value) => {
    this.pageRef.current?.setText(value);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          onChangeText={this.handleChangeText}
        />

        <Button title="Show" onPress={this.showPage} />

        {this.state.isVisible && (
          <MyClassPage ref={this.pageRef} onHide={this.hidePage} />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  page: {
    marginTop: 24,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#e8f0fe',
    alignItems: 'center',
  },
  pageText: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
});
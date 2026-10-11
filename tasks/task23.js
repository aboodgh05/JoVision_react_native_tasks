import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// Child class component: receives a function (onTextChange) from the parent via props
class MyClassPage extends Component {
  componentDidMount() {
    console.log('MyClassPage loaded');
  }

  componentWillUnmount() {
    console.log('MyClassPage unloaded');
  }

  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.pageText}>Hello from Task23 </Text>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          // Every change is passed up to the parent through the prop function
          onChangeText={this.props.onTextChange}
        />
        <Button title="Hide !" onPress={this.props.onHide} />
      </View>
    );
  }
}

export default class App extends Component {
  state = {
    isVisible: false,
    text: '',
  };

  showPage = () => this.setState({ isVisible: true });
  hidePage = () => this.setState({ isVisible: false });
  handleTextChange = (text) => this.setState({ text });

  render() {
    const { isVisible, text } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {/* Parent text, updated by the child's TextInput */}
        <Text style={styles.parentText}>
          {text || 'Type in another component to update this text'}
        </Text>

        <Button title="Show" onPress={this.showPage} />

        {isVisible && (
          <MyClassPage
            onHide={this.hidePage}
            onTextChange={this.handleTextChange}
          />
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
  parentText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  page: {
    marginTop: 24,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#e8f0fe',
    alignItems: 'stretch',
  },
  pageText: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
});
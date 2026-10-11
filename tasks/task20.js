import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

// Custom class component with lifecycle logging
class MyClassPage extends Component {
  componentDidMount() {
    // Runs once, right after the component becomes visible (mounted)
    console.log('MyClassPage loaded');
  }

  componentWillUnmount() {
    // Runs right before the component is removed (hidden/unmounted)
    console.log('MyClassPage unloaded');
  }

  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.pageText}>Hello from MyClassPage!</Text>
        <Button title="Hide" onPress={this.props.onHide} />
      </View>
    );
  }
}

export default class App extends Component {
  state = {
    isVisible: false,
  };

  showPage = () => this.setState({ isVisible: true });
  hidePage = () => this.setState({ isVisible: false });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button title="Show" onPress={this.showPage} />
        {/* Mounted only when isVisible is true; removing it triggers unmount */}
        {this.state.isVisible && <MyClassPage onHide={this.hidePage} />}
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
  },
});
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// Child component: receives a function (onTextChange) from the parent via props
const MyFunctionPage = ({ onHide, onTextChange }) => {
  useEffect(() => {
    console.log('MyFunctionPage loaded');
    return () => {
      console.log('MyFunctionPage unloaded');
    };
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.pageText}>Hello from MyFunctionPage!</Text>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        // Every change is passed up to the parent through the prop function
        onChangeText={onTextChange}
      />
      <Button title="Hide" onPress={onHide} />
    </View>
  );
};

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Parent text, updated by the child's TextInput */}
      <Text style={styles.parentText}>
        {text || 'Type in the child to update this text'}
      </Text>

      <Button title="Show" onPress={() => setIsVisible(true)} />

      {isVisible && (
        <MyFunctionPage
          onHide={() => setIsVisible(false)}
          onTextChange={setText}
        />
      )}
    </SafeAreaView>
  );
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
import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// Child: only a Text component. It owns its text state and exposes
// a setText method to the parent through the forwarded ref.
const MyFunctionPage = forwardRef(({ onHide }, ref) => {
  const [text, setText] = useState('');

  // Decide what the parent can access through ref.current
  useImperativeHandle(ref, () => ({
    setText,
  }));

  useEffect(() => {
    console.log('MyFunctionPage loaded');
    return () => {
      console.log('MyFunctionPage unloaded');
    };
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.pageText}>
        {text || 'Type in the parent input to update this text'}
      </Text>
      <Button title="Hide" onPress={onHide} />
    </View>
  );
});

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const pageRef = useRef(null);

  // Parent calls the child's method directly; no text state is passed as a prop
  const handleChangeText = (value) => {
    pageRef.current?.setText(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        onChangeText={handleChangeText}
      />

      <Button title="Show" onPress={() => setIsVisible(true)} />

      {isVisible && (
        <MyFunctionPage ref={pageRef} onHide={() => setIsVisible(false)} />
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
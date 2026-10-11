import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

// Custom functional component with lifecycle logging via useEffect
const MyFunctionPage = ({ onHide }) => {
  useEffect(() => {
    // Runs once, right after the component becomes visible (mounted)
    console.log('MyFunctionPage loaded');

    // The cleanup function runs when the component is removed (unmounted)
    return () => {
      console.log('MyFunctionPage unloaded');
    };
  }, []); // empty dependency array = run on mount/unmount only

  return (
    <View style={styles.page}>
      <Text style={styles.pageText}>Hello from MyFunctionPage!</Text>
      <Button title="Hiide" onPress={onHide} />
    </View>
  );
};

export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Show" onPress={() => setIsVisible(true)} />
      {/* Mounted only when isVisible is true; removing it triggers the cleanup */}
      {isVisible && <MyFunctionPage onHide={() => setIsVisible(false)} />}
    </SafeAreaView>
  );
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
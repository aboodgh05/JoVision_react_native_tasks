import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Task17() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      {isVisible && <Text style={styles.name}>Abdullah</Text>}

      <Button
        title={isVisible ? 'Hide' : 'Show'}
        onPress={() => setIsVisible(!isVisible)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
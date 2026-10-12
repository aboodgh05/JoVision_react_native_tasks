import React, { useState } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';

const IMAGES = {
  1: require('./Resource/image1.png'),
  2: require('./Resource/image2.png'),
  3: require('./Resource/image3.png'),
};

export default function Task27() {
  const [selected, setSelected] = useState(1);

  const pick = (n) => {
    console.log('picked image', n);
    setSelected(n);
  };

  const chooseImage = () => {
    console.log('button pressed, showing alert');
    Alert.alert(
      'Choose an image',
      'Pick the number of the image to display',
      [
        { text: '1', onPress: () => pick(1) },
        { text: '2', onPress: () => pick(2) },
        { text: '3', onPress: () => pick(3) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selected image: {selected}</Text>
      <Image source={IMAGES[selected]} style={styles.image} resizeMode="contain" />

      <View style={styles.button}>
        <Button title="Choose image (Alert)" onPress={chooseImage} />
      </View>

      {/* Test buttons: if these work but the Alert does not, the problem is the Alert only */}
      <View style={styles.row}>
        <Button title="1" onPress={() => pick(1)} />
        <Button title="2" onPress={() => pick(2)} />
        <Button title="3" onPress={() => pick(3)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  label: { fontSize: 18, marginBottom: 12 },
  image: { width: 300, height: 300, borderRadius: 8 },
  button: { marginTop: 24 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 16,
  },
});
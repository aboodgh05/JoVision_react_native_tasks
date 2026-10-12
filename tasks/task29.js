import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  Alert,
  Modal,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

// This file lives in tasks/, so the images must be in tasks/Resource/
const IMAGES = [
  require('./Resource/photo1.png'),
  require('./Resource/photo2.png'),
  require('./Resource/photo3.png'),
  require('./Resource/photo4.png'),
  require('./Resource/photo5.png'),
  require('./Resource/photo6.png'),
  require('./Resource/photo7.png'),
  require('./Resource/photo8.png'),
  require('./Resource/photo9.png'),
  require('./Resource/photo10.png'),
];

const IMAGE_SIZE = 180;
const ITEM_MARGIN = 6;
const ITEM_LENGTH = IMAGE_SIZE + ITEM_MARGIN * 2; // width of one list item

export default function Task29() {
  const listRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const onImagePress = (index) => {
    Alert.alert('Image', `You have selected image : ${index + 1}`);
  };

  const openModal = () => {
    setInputValue('');
    setError('');
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const submitIndex = () => {
    const number = parseInt(inputValue, 10);

    // Images are numbered 1..N on screen, so accept 1..N
    if (isNaN(number) || number < 1 || number > IMAGES.length) {
      setError(`Please enter a number between 1 and ${IMAGES.length}`);
      return;
    }

    closeModal();
    listRef.current?.scrollToIndex({
      index: number - 1,
      animated: true,
      viewPosition: 0.5, // center the image on screen
    });
  };

  const renderItem = ({ item, index }) => (
    <Pressable
      onPress={() => onImagePress(index)}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      <Image source={item} style={styles.image} resizeMode="cover" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap an image</Text>

      <FlatList
        ref={listRef}
        data={IMAGES}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        // Fixed item size lets scrollToIndex jump to any item reliably
        getItemLayout={(_, index) => ({
          length: ITEM_LENGTH,
          offset: ITEM_LENGTH * index,
          index,
        })}
      />

      <View style={styles.button}>
        <Button title="Go to image" onPress={openModal} />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal} // Android back button
      >
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>
              Enter image number (1-{IMAGES.length})
            </Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={(text) => {
                setInputValue(text);
                setError('');
              }}
              keyboardType="number-pad"
              placeholder="e.g. 7"
              autoFocus
              onSubmitEditing={submitIndex}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.dialogButtons}>
              <Button title="Cancel" onPress={closeModal} color="#888" />
              <Button title="Go" onPress={submitIndex} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  item: {
    marginHorizontal: ITEM_MARGIN,
  },
  itemPressed: {
    opacity: 0.6,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 10,
  },
  button: {
    marginTop: 24,
    alignSelf: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  error: {
    color: '#c00',
    marginTop: 8,
  },
  dialogButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
});
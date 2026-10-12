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
// Each item gets a stable id so removing one doesn't confuse the list.
const INITIAL_IMAGES = [
  { id: '1', source: require('./Resource/photo1.png') },
  { id: '2', source: require('./Resource/photo2.png') },
  { id: '3', source: require('./Resource/photo3.png') },
  { id: '4', source: require('./Resource/photo4.png') },
  { id: '5', source: require('./Resource/photo5.png') },
  { id: '6', source: require('./Resource/photo6.png') },
  { id: '7', source: require('./Resource/photo7.png') },
  { id: '8', source: require('./Resource/photo8.png') },
  { id: '9', source: require('./Resource/photo9.png') },
  { id: '10', source: require('./Resource/photo10.png') },
];

const IMAGE_SIZE = 180;
const ITEM_MARGIN = 6;
const ITEM_LENGTH = IMAGE_SIZE + ITEM_MARGIN * 2;

export default function Task30() {
  const listRef = useRef(null);
  const [images, setImages] = useState(INITIAL_IMAGES);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Nothing pressed yet');

  // Task 28: show the position of the pressed image in the current list
  const onImagePress = (index) => {
    console.log('image pressed', index + 1);
    setStatus(`You have selected image : ${index + 1}`);
    Alert.alert('Image', `You have selected image : ${index + 1}`);
  };

  // Task 30: remove the image directly by its id (no Alert needed)
  const onRemovePress = (id) => {
    console.log('remove pressed', id);
    setImages((current) => current.filter((img) => img.id !== id));
    setStatus(`Removed image id ${id}`);
  };

  // Task 29: modal to jump to an index
  const openModal = () => {
    setInputValue('');
    setError('');
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const submitIndex = () => {
    const number = parseInt(inputValue, 10);

    if (isNaN(number) || number < 1 || number > images.length) {
      setError(`Please enter a number between 1 and ${images.length}`);
      return;
    }

    closeModal();
    listRef.current?.scrollToIndex({
      index: number - 1,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Pressable
        onPress={() => onImagePress(index)}
        style={({ pressed }) => pressed && styles.itemPressed}
      >
        <Image source={item.source} style={styles.image} resizeMode="cover" />
      </Pressable>

      {/* Small remove icon in the top-right corner of the image */}
      <Pressable
        onPress={() => onRemovePress(item.id)}
        style={styles.removeIcon}
        hitSlop={8}
      >
        <Text style={styles.removeIconText}>✕</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task 30 - tap aas image</Text>
      <Text style={styles.status}>{status}</Text>

      <FlatList
        ref={listRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: ITEM_LENGTH,
          offset: ITEM_LENGTH * index,
          index,
        })}
        ListEmptyComponent={
          <Text style={styles.empty}>No images left</Text>
        }
      />

      <View style={styles.buttons}>
        <Button
          title="Go to image"
          onPress={openModal}
          disabled={images.length === 0}
        />
        <Button
          title="Restore all"
          onPress={() => setImages(INITIAL_IMAGES)}
          color="#888"
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>
              Enter image number (1-{images.length})
            </Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={(text) => {
                setInputValue(text);
                setError('');
              }}
              keyboardType="number-pad"
              placeholder="e.g. 3"
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
  status: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color: '#333',
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
  removeIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIconText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    width: 300,
    marginLeft: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 24,
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
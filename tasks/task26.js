import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const IP_URL = 'https://api.ipify.org/';

// fetch() returns a Promise; await pauses only this async function,
// not the JS thread, so the rest of the app keeps running.
const fetchIp = async () => {
  const response = await fetch(IP_URL);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.text(); // ipify returns the IP as plain text
};

export default function App() {
  const [ipText, setIpText] = useState('Press a button to get your IP');
  const [isBlocking, setIsBlocking] = useState(false);

  // Non-blocking: the UI stays fully interactive while the request runs
  const getIpNonBlocking = async () => {
    setIpText('Loading...');
    try {
      const ip = await fetchIp();
      setIpText(`Your IP: ${ip}`);
    } catch (error) {
      setIpText(`Error: ${error.message}`);
    }
  };

  // Blocking: a full-screen modal overlay swallows all touches until done
  const getIpBlocking = async () => {
    setIsBlocking(false);
    try {
      const ip = await fetchIp();
      setIpText(`Your IP: ${ip}`);
    } catch (error) {
      setIpText(`Error: ${error.message}`);
    } finally {
      setIsBlocking(false); // always unblock, even on failure
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.ipText}>{ipText}</Text>

      <View style={styles.button}>
        <Button title="Get IP (non-blocking)" onPress={getIpNonBlocking} />
      </View>
      <View style={styles.button}>
        <Button title="Get IP (blocking)" onPress={getIpBlocking} />
      </View>

      <Modal
        visible={isBlocking}
        transparent
        animationType="fade"
        onRequestClose={() => {}} // ignore Android back button while blocked
      >
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.overlayText}>Fetching IP...</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  ipText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    marginBottom: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 16,
  },
});
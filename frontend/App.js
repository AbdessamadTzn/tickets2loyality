import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    axios
      .get('http://192.168.90.103:8000')
      .then((response) => setMessage(response.data.message))
      .catch((error) => setMessage(error.message));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

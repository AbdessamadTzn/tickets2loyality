import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [text, setText] = useState('');

  const pickImageAndScan = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: false,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const fileType = uri.substring(uri.lastIndexOf('.') + 1);

      const formData = new FormData();
      formData.append('file', {
        uri,
        name: `ticket.${fileType}`,
        type: `image/${fileType}`,
      });

      axios
        .post('http://192.168.90.103:8000/ocr', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          setText(response.data.text);
        })
        .catch((error) => {
          setText('Erreur : ' + error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Scanner Ticket" onPress={pickImageAndScan} />
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, marginTop: 50 },
  scroll: { marginTop: 20 },
  text: { fontSize: 16 },
});

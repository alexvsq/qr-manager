import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

//este componente no se esta usando, en espera a resolver el problema de de scannear imagenes subidas por el usuario

const App: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // Usa "images" en plural
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        scanQRCode(uri);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
    }
  };

  const scanQRCode = async (uri: string) => {
    try {
      const result = await Camera.scanFromURLAsync(uri);
      if (result.length > 0) {
        setQrCode(result[0].data); // Toma los datos del primer QR detectado
      } else {
        setQrCode('No se detectaron códigos QR.');
      }
    } catch (error) {
      console.error('Error al escanear QR:', error);
      setQrCode('Error al escanear la imagen.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar imagen" onPress={pickImage} />
      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Text style={styles.qrText}>
            {qrCode ? `QR Detectado: ${qrCode}` : 'Analizando imagen...'}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  qrText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;

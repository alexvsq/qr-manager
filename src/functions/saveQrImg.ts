import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Alert, Platform } from "react-native";

export const saveImageQr = async (qrRef: any) => {
  if (qrRef.current) {
    try {
      const qrBase64 = await new Promise((resolve, reject) => {
        qrRef.current.toDataURL((data: string) => {
          if (data) {
            resolve(data);
          } else {
            reject(new Error("Failed to generate QR code data URL"));
          }
        });
      });

      const filename = `qr_${Date.now()}.png`;
      const fileUri = FileSystem.cacheDirectory + filename;

      // Guardar la imagen en formato PNG en la caché del sistema
      await FileSystem.writeAsStringAsync(fileUri, qrBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
          const directoryUri = permissions.directoryUri;
          const fileUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              directoryUri,
              filename,
              "image/png"
            );

          await FileSystem.writeAsStringAsync(fileUri, qrBase64, {
            encoding: FileSystem.EncodingType.Base64,
          });

          Alert.alert(
            "Success",
            `QR Code saved as ${filename} in the selected directory`
          );
        } else {
          Alert.alert(
            "Permission Denied",
            "Unable to save the QR Code without storage access permission"
          );
        }
      } else if (Platform.OS === "ios") {
        // Compartir el archivo guardado
        try {
          await Sharing.shareAsync(fileUri, {
            mimeType: "image/png",
            dialogTitle: "Share QR Code",
          });
        } catch (error) {
          console.error("Error sharing QR Code:", error);
          Alert.alert("Error", "Failed to share QR Code");
        }
      }
    } catch (error) {
      console.error("Error saving or sharing QR Code:", error);
      Alert.alert("Error", `Failed to save or share QR Code image: ${error}`);
    }
  } else {
    Alert.alert("Error", "QR code component is not ready");
  }
};

export const shareQRImage = async (qrRef: any) => {
  if (qrRef.current) {
    try {
      // Convertir el código QR a Base64
      const qrBase64 = await new Promise((resolve, reject) => {
        qrRef.current.toDataURL((data: string) => {
          if (data) {
            resolve(data);
          } else {
            reject(new Error("Failed to generate QR code data URL"));
          }
        });
      });

      // Crear el archivo en la caché
      const filename = `qr_${Date.now()}.png`;
      const fileUri = FileSystem.cacheDirectory + filename;

      // Guardar la imagen en formato PNG en la caché del sistema
      await FileSystem.writeAsStringAsync(fileUri, qrBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Compartir el archivo guardado
      await Sharing.shareAsync(fileUri, {
        mimeType: "image/png",
        dialogTitle: "Share QR Code",
      });
    } catch (error) {
      console.error("Error sharing QR Code:", error);
      Alert.alert("Error", "Failed to share QR Code");
    }
  } else {
    Alert.alert("Error", "QR code component is not ready");
  }
};

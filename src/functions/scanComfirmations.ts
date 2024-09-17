import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";

export const vibrationConfirmation = async () => {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    console.error("vibrationComfirmation", error);
  }
};

export const playSoundConfirmation = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("@assets/sounds/beep.mp3")
    );

    await sound.playAsync();

    // Espera 0.5 segundos y luego detiene el sonido
    setTimeout(async () => {
      await sound.stopAsync();
      await sound.unloadAsync();
    }, 500);
  } catch (error) {
    console.error("playSoundConfirmation", error);
  }
};

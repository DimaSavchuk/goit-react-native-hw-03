import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFonts } from "expo-font";

import BACK_GROUND from "./assets/images/photoBG.png";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={BACK_GROUND} style={styles.backGroundImg}>
          {/* <LoginScreen /> */}
          <RegistrationScreen />
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backGroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});

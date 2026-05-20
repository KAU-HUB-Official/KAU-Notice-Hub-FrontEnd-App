import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "SplashScreen">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Homescreen");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={require("../../assets/images/kau_logo_white_transparent.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>NOTICE HUB</Text>
      </View>

      <View style={styles.bottomFrame}>
        <Image
          source={require("../../assets/images/image.png")}
          style={styles.bottomImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002870",
    justifyContent: "center",
    alignItems: "center",
  },
  logoBox: {
    width: 172,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 172,
    height: 86,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#FFFFFF",
  },
  bottomFrame: {
    position: "absolute",
    width: 256,
    height: 169,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomImage: {
    width: 256,
    height: 169,
  },
});
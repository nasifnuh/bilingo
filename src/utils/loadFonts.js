import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    "BalooChettan-R": require("../../assets/fonts/BalooChettan2-Regular.ttf"), // 400
    "BalooChettan-M": require("../../assets/fonts/BalooChettan2-Medium.ttf"), // 500
    "BalooChettan-SB": require("../../assets/fonts/BalooChettan2-SemiBold.ttf"), // 600
    "BalooChettan-B": require("../../assets/fonts/BalooChettan2-Bold.ttf"), // 700
    "BalooChettan-EB": require("../../assets/fonts/BalooChettan2-ExtraBold.ttf"), // 800
  });
};

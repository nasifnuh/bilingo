import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    "BalooChettanR": require("../../assets/fonts/BalooChettan2-Regular.ttf"), // 400
    "BalooChettanM": require("../../assets/fonts/BalooChettan2-Medium.ttf"), // 500
    "BalooChettanSB": require("../../assets/fonts/BalooChettan2-SemiBold.ttf"), // 600
    "BalooChettanB": require("../../assets/fonts/BalooChettan2-Bold.ttf"), // 700
    "BalooChettanEB": require("../../assets/fonts/BalooChettan2-ExtraBold.ttf"), // 800
  });
};

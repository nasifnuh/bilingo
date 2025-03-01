import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { get, ref } from "firebase/database";
import { database, auth } from "@services/firebaseConfig";
import colors from "@constants/colors";

const screenWidth = Dimensions.get("window").width;

const Stats = () => {
  const [xpData, setXpData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const language = "english"; // Replace with dynamic language selection
          const snapshot = await get(ref(database, `/users/${userId}/xp/${language}`));
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.keys(data).map(date => ({
              date: date.replace(/"/g, ""),
              xp: data[date]
            }));
            setXpData(formattedData);
            console.log("Data fetched successfully:", formattedData);
          } else {
            console.log("No data available");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: xpData.map(item => item.xp),
    datasets: [
      {
        data: xpData.map(item => item.xp),
        strokeWidth: 3,
        color: (opacity = 1) => colors.pastelPurple,
      },
    ],
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Stats Screen</Text>
        {xpData.length > 0 ? (
          <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: colors.royalPurple,
              backgroundGradientFrom: colors.royalPurple,
              backgroundGradientTo: colors.royalPurple,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              // propsForDots: {
              //   r: "6",
              //   strokeWidth: "1",
              //   fill: colors.skyBlue,
              //   stroke: colors.skyBlue,
              // },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            fromZero
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
          />
        ) : (
          <Text>Loading data...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default Stats;
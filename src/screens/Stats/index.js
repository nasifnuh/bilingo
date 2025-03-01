import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { get, ref } from "firebase/database";
import { database, auth } from "@services/firebaseConfig";
import colors from "@constants/colors";
import { Picker } from "@react-native-picker/picker";

const screenWidth = Dimensions.get("window").width;

const Stats = () => {
  const [xpData, setXpData] = useState([]);
  const [period, setPeriod] = useState("Monthly");

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

  const getFilteredData = () => {
    const now = new Date();
    let filteredData = [];

    if (period === "Weekly") {
      const lastWeek = new Date(now.setDate(now.getDate() - 7));
      filteredData = xpData.filter(item => new Date(item.date) >= lastWeek);
    } else {
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
      filteredData = xpData.filter(item => new Date(item.date) >= lastMonth);
    }

    return filteredData;
  };

  const getMonthName = (date) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[date.getMonth()];
  };

  const filteredData = getFilteredData();
  const selectedMonth = period === "Monthly" && filteredData.length > 0
    ? getMonthName(new Date(filteredData[0].date))
    : "";

  const chartData = {
    labels: period === "Weekly"
      ? ["Mn", "Tu", "Wn", "Th", "Fr", "St", "Su"]
      : filteredData.map((item, index) => (index % 3 === 0 ? new Date(item.date).getDate().toString().padStart(2, '0') : "")), // Display every 3rd day of the month
    datasets: [
      {
        data: filteredData.map(item => item.xp),
        strokeWidth: 2,
        color: (opacity = 1) => colors.royalPurple, // Line color
      },
    ],
  };

  const contributionData = xpData.map(item => ({
    date: item.date,
    count: item.xp,
  }));

  const getColor = (count) => {
    const maxCount = Math.max(...contributionData.map(item => item.count));
    const intensity = count / maxCount;
    const baseColor = colors.royalPurple.replace('#', '');
    const r = parseInt(baseColor.substring(0, 2), 16);
    const g = parseInt(baseColor.substring(2, 4), 16);
    const b = parseInt(baseColor.substring(4, 6), 16);
    const newR = Math.floor(r * intensity);
    const newG = Math.floor(g * intensity);
    const newB = Math.floor(b * intensity);
    return `rgba(${newR}, ${newG}, ${newB}, 1)`;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Stats Screen</Text>
        <Picker
          selectedValue={period}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setPeriod(itemValue)}
        >
          <Picker.Item label="Monthly" value="Monthly" />
          <Picker.Item label="Weekly" value="Weekly" />
        </Picker>
        {selectedMonth && <Text style={styles.monthText}>{selectedMonth}</Text>}
        {filteredData.length > 0 ? (
          <>
            <LineChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: colors.pastelPurple,
                backgroundGradientFrom: colors.pastelPurple,
                backgroundGradientTo: colors.pastelPurple,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => colors.royalPurple, // Axis text color
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: colors.royalPurple,
                },
                formatXLabel: (label) => label, // Format date labels
                formatYLabel: (label) => `${label} XP`, // Format Y-axis labels
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
                alignSelf: 'center', // Center the chart
              }}
              fromZero
              withInnerLines={false}
              withOuterLines={false}
            />
            <ContributionGraph
              values={contributionData}
              endDate={new Date()}
              numDays={105}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: colors.pastelPurple,
                backgroundGradientFrom: colors.pastelPurple,
                backgroundGradientTo: colors.pastelPurple,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => colors.royalPurple, // Axis text color
                style: {
                  borderRadius: 16,
                },
                getColor: (count) => getColor(count),
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
                alignSelf: 'center', // Center the chart
              }}
            />
          </>
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
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default Stats;
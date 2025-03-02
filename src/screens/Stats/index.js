import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Layout from "@/layout";
import { get, ref } from "firebase/database";
import BackButton from "@components/BackButton";
import { database, auth } from "@services/firebaseConfig";
import colors from "@constants/colors";
import { Picker } from "@react-native-picker/picker";
import LanguageIcon from "@components/LanguageIcon"; // Import LanguageIcon component

const screenWidth = Dimensions.get("window").width;

const Stats = () => {
  const [xpData, setXpData] = useState([]);
  const [period, setPeriod] = useState("Weekly");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [todaysXp, setTodaysXp] = useState(0);
  const [totalXp, setTotalXp] = useState(0);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const snapshot = await get(ref(database, `/users/${userId}/xp`));
          const data = snapshot.val();
          if (data) {
            const availableLanguages = Object.keys(data);
            setLanguages(availableLanguages);
            setSelectedLanguage(availableLanguages[0]);
          } else {
            setLanguages([]);
          }
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const snapshot = await get(
            ref(database, `/users/${userId}/xp/${selectedLanguage}`)
          );
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.keys(data).map((date) => ({
              date: date.replace(/\"/g, ""),
              xp: data[date],
            }));
            setXpData(formattedData);

            // Calculate today's XP and total XP
            const today = new Date().toISOString().split("T")[0];
            const todaysXp =
              formattedData.find((item) => item.date === today)?.xp || 0;
            const totalXp = formattedData.reduce(
              (acc, item) => acc + item.xp,
              0
            );
            setTodaysXp(todaysXp);
            setTotalXp(totalXp);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedLanguage]);

  const getFilteredData = () => {
    const now = new Date();
    let filteredData = [];

    if (period === "Weekly") {
      const lastWeek = new Date();
      lastWeek.setDate(now.getDate() - 7);
      filteredData = xpData.filter((item) => new Date(item.date) >= lastWeek);
    } else {
      const lastMonth = new Date();
      lastMonth.setMonth(now.getMonth() - 1);
      filteredData = xpData.filter((item) => new Date(item.date) >= lastMonth);
    }

    return filteredData;
  };

  const filteredData = getFilteredData();

  const chartData = {
    labels:
      period === "Weekly"
        ? ["Mn", "Tu", "Wn", "Th", "Fr", "St", "Su"]
        : filteredData.map((item, index) =>
            index % 6 === 0
              ? new Date(item.date).getDate().toString().padStart(2, "0")
              : ""
          ), // Display every 3rd day of the month
    datasets: [
      {
        data: filteredData.map((item) => item.xp),
        strokeWidth: 2,
        color: (opacity = 1) => colors.royalPurple, // Line color
      },
    ],
  };

  const contributionData = xpData.map((item) => ({
    date: item.date,
    count: item.xp,
  }));


  return (
    <Layout
      headerComponent={
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerLabel}>Stats Screen</Text>
        </View>
      }
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
              >
                {languages.map((language) => (
                  <Picker.Item
                    key={language}
                    label={language.charAt(0).toUpperCase() + language.slice(1)}
                    value={language}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={period}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue) => setPeriod(itemValue)}
              >
                <Picker.Item label="Monthly" value="Monthly" />
                <Picker.Item label="Weekly" value="Weekly" />
              </Picker>
            </View>
          </View>

          <View style={styles.overviewContainer}>
            <View style={styles.overviewHeader}>
              <Text style={styles.overviewTitle}>Overview</Text>
              <LanguageIcon icon={selectedLanguage} />
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Today's XP</Text>
              <Text style={styles.overviewValue}>{todaysXp}</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Total XP</Text>
              <Text style={styles.overviewValue}>{totalXp}</Text>
            </View>
          </View>

          {filteredData.length > 0 ? (
            <>
              <View style={styles.overviewContainer}>
                <LineChart
                  data={chartData}
                  width={screenWidth - 40}
                  height={220}
                  chartConfig={{
                    backgroundColor: colors.pastelPurple,
                    backgroundGradientFrom: colors.pastelPurple,
                    backgroundGradientTo: colors.pastelPurple,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(120, 50, 179, ${opacity})`,
                    labelColor: (opacity = 1) => colors.royalPurple,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "4",
                      strokeWidth: "2",
                      stroke: colors.royalPurple,
                    },
                    formatXLabel: (label) => label,
                    formatYLabel: (label) => `${label} XP`,
                    propsForLabels: {
                      fontFamily: "BalooChettan-B",
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    alignSelf: "center",
                  }}
                  fromZero
                  withInnerLines={false}
                  withOuterLines={false}
                />
            </View>
            <View style={styles.overviewContainer}>
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
                  color: (opacity = 1) => `rgba(120, 50, 179, ${opacity})`,
                  labelColor: (opacity = 1) => colors.royalPurple,
                  style: {
                    borderRadius: 16,
                  },
                  // getColor: (count) => getColor(count),
                  propsForLabels: {
                    fontFamily: "BalooChettan-B",
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  alignSelf: "center",
                }}
              />
            </View>
              
            </>
          ) : (
            <Text style={styles.loadingText}>Loading data...</Text>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    height: 36,
  },
  headerLabel: {
    flex: 1,
    textAlign: "center",
    fontFamily: "BalooChettan-B",
    fontSize: 18,
    color: colors.black,
  },
  pickerContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    gap: 10,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.royalPurple,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  picker: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    color: "#000",
    fontFamily: "BalooChettan-B",
  },
  pickerItem: {
    fontFamily: "BalooChettan-B",
    fontSize: 16,
    height: 40,
  },
  overviewContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: colors.pastelPurple,
    borderRadius: 16,
    marginBottom: 10,
  },
  overviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    fontFamily: "BalooChettan-B",
  },
  overviewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  overviewLabel: {
    fontSize: 16,
    color: colors.royalPurple,
    fontFamily: "BalooChettan-B",
  },
  overviewValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.royalPurple,
    fontFamily: "BalooChettan-B",
  },
  loadingText: {
    fontFamily: "BalooChettan-B",
    fontSize: 16,
    color: colors.black,
  },
});

export default Stats;
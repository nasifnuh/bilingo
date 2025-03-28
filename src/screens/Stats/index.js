import React, { useEffect, useState } from "react";
import { View, Dimensions, Image, Modal, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LineChart, ContributionGraph } from "react-native-chart-kit";

import { get, ref } from "firebase/database";
import { database, auth } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import LanguageIcon from "@components/LanguageIcon";
import BackButton from "@components/BackButton";

import colors from "@constants/colors";
import MascotEmpty from "@assets/images/mascot_stare.png";
import { styles } from "./styles";

const screenWidth = Dimensions.get("window").width;

const Stats = () => {
  const [xpData, setXpData] = useState([]);
  const [period, setPeriod] = useState("Weekly");
  const [tempSelectedPeriod, setTempSelectedPeriod] = useState(period);
  const [languages, setLanguages] = useState([]);
  const [tempSelectedLanguage, setTempSelectedLanguage] =
    useState(selectedLanguage);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [todaysXp, setTodaysXp] = useState(0);
  const [totalXp, setTotalXp] = useState(0);

  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showPeriodPicker, setShowPeriodPicker] = useState(false);

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
          ),
    datasets: [
      {
        data: filteredData.map((item) => item.xp),
        strokeWidth: 2,
        color: (opacity = 1) => colors.royalPurple,
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
      {languages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={MascotEmpty} style={styles.image} />
          <Text style={styles.emptyText}>
            Please complete a lesson to show stats
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => setShowLanguagePicker(true)}
              >
                <Text style={styles.selectedPickerItem}>
                  {selectedLanguage.charAt(0).toUpperCase() +
                    selectedLanguage.slice(1)}
                </Text>
              </TouchableOpacity>
              <Modal visible={showLanguagePicker} transparent>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Picker
                      selectedValue={tempSelectedLanguage}
                      onValueChange={(itemValue) =>
                        setTempSelectedLanguage(itemValue)
                      }
                      itemStyle={styles.pickerItem}
                      mode="dropdown"
                    >
                      {languages.map((language) => (
                        <Picker.Item
                          key={language}
                          label={
                            language.charAt(0).toUpperCase() + language.slice(1)
                          }
                          value={language}
                        />
                      ))}
                    </Picker>
                    <TouchableOpacity
                      onPress={() => {
                        setShowLanguagePicker(false);
                        setSelectedLanguage(tempSelectedLanguage);
                      }}
                    >
                      <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.pickerWrapper}>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => setShowPeriodPicker(true)}
              >
                <Text style={styles.selectedPickerItem}>{period}</Text>
              </TouchableOpacity>
              <Modal visible={showPeriodPicker} transparent>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Picker
                      selectedValue={tempSelectedPeriod}
                      onValueChange={(itemValue) =>
                        setTempSelectedPeriod(itemValue)
                      }
                      itemStyle={styles.pickerItem}
                    >
                      <Picker.Item label="Weekly" value="Weekly" />
                      <Picker.Item label="Monthly" value="Monthly" />
                    </Picker>
                    <TouchableOpacity
                      onPress={() => {
                        setShowPeriodPicker(false);
                        setPeriod(tempSelectedPeriod);
                      }}
                    >
                      <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
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
                <View style={styles.overviewHeader}>
                  <Text style={styles.overviewTitle}>{period} XP</Text>
                </View>
                <LineChart
                  data={chartData}
                  width={screenWidth - 50}
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
                <View style={styles.overviewHeader}>
                  <Text style={styles.overviewTitle}>Overall XP</Text>
                </View>
                <ContributionGraph
                  values={contributionData}
                  endDate={new Date()}
                  numDays={105}
                  width={screenWidth - 50}
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
      )}
    </Layout>
  );
};

export default Stats;

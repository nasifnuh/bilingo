import React, { useState, useEffect } from "react";
import { View, Alert, Switch, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { FormattedMessage, useIntl } from "react-intl";

import { ref, get, update } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import BackButton from "@/components/BackButton";
import Button from "@/components/ui/Button";

import Colors from "@/constants/colors";
import { styles } from "./styles";
import { useTheme } from "@/context/ThemeContext"; 

const Notification = () => {
  const { formatMessage } = useIntl();
  const { theme } = useTheme(); 
  const themeStyles = styles(theme); 

  const [editing, setEditing] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState("08:00");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setNotificationsEnabled(data.notificationsEnabled || false);
            setNotificationTime(data.notificationTime || "08:00");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const scheduleNotification = async (time) => {
    const [hours, minutes] = time.split(":").map(Number);

    const now = new Date();

    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: formatMessage({ id: "reminder" }),
        body: formatMessage({ id: "reminderMessage" }),
        sound: true,
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });
  };

  const handleNotification = async () => {
    const user = auth.currentUser;

    try {
      if (!user)
        throw new Error(formatMessage({ id: "noAuthenticatedUserMessage" }));

      const updates = {};

      updates["/notificationsEnabled"] = notificationsEnabled;
      updates["/notificationTime"] = notificationTime;

      if (Object.keys(updates).length > 0) {
        await update(ref(database, `users/${user.uid}`), updates);
      }

      if (notificationsEnabled) {
        await scheduleNotification(notificationTime);
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
    } catch (error) {
      Alert.alert(formatMessage({ id: "error" }), error.message);
    } finally {
      setEditing(false);
    }
  };

  return (
    <Layout
      headerComponent={
        <View style={themeStyles.header}>
          <BackButton />
          <Text style={themeStyles.headerLabel}>
            <FormattedMessage id="notification" />
          </Text>
        </View>
      }
    >
      <View style={themeStyles.container}>
        <View style={themeStyles.form}>
          <View style={themeStyles.notificationSection}>
            <Text style={themeStyles.notificationLabel}>
              <FormattedMessage id="enableNotification" />
            </Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              disabled={!editing}
            />
          </View>

          {notificationsEnabled && (
            <View style={themeStyles.timePickerSection}>
              <Text style={themeStyles.timePickerLabel}>
                <FormattedMessage id="notificationTime" />
              </Text>
              <TouchableOpacity
                onPress={() => setShowPicker(!showPicker)}
                disabled={!editing}
              >
                <Text
                  style={[
                    themeStyles.timePickerValue,
                    !editing && { color: Colors.grayish },
                  ]}
                >
                  {notificationTime}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {editing && showPicker && (
            <DateTimePicker
              value={
                new Date(
                  new Date().setHours(
                    ...notificationTime.split(":").map(Number)
                  )
                )
              }
              mode="time"
              display="spinner"
              onChange={(event, selectedTime) => {
                if (selectedTime) {
                  const hours = String(selectedTime.getHours()).padStart(
                    2,
                    "0"
                  );
                  const minutes = String(selectedTime.getMinutes()).padStart(
                    2,
                    "0"
                  );
                  setNotificationTime(`${hours}:${minutes}`);
                }
              }}
            />
          )}

          <Button
            variant={editing ? "contained" : "outlined"}
            label={
              editing ? (
                <FormattedMessage id="save" />
              ) : (
                <FormattedMessage id="edit" />
              )
            }
            onPress={() => (editing ? handleNotification() : setEditing(true))}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Notification;

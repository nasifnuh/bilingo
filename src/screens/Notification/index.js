import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Layout from "@/layout";
import BackButton from "@/components/BackButton";
import Button from "@components/Button";

import Colors from "@/constants/colors";
import { styles } from "./styles";

const Notification = () => {
  const [editing, setEditing] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState("08:00");

  return (
    <Layout
      headerComponent={
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerLabel}>Notification</Text>
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.notificationSection}>
            <Text style={styles.notificationLabel}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              disabled={!editing}
            />
          </View>

          {notificationsEnabled && (
            <View style={styles.timePickerSection}>
              <Text style={styles.timePickerLabel}>Notification Time</Text>
              <TouchableOpacity
                onPress={() => setShowPicker(!showPicker)}
                disabled={!editing}
              >
                <Text
                  style={[
                    styles.timePickerValue,
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
            label={editing ? "Save" : "Edit"}
            onPress={() =>
              editing ? () => console.log("Handle this") : setEditing(true)
            }
            customBoxStyle={styles.editButton}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Notification;

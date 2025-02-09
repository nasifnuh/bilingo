import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { ref, get, update, remove } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Layout from "@/layout";
import Button from "@components/Button";
import TextInput from "@components/TextInput";

import Colors from "@constants/colors";
import { styles } from "./styles";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "only letters and spaces")
    .required("required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "invalid email"
    )
    .required("required"),
  password: Yup.string().min(6, "min 6 characters"),
});

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData({
              name: data.name || "",
              email: data.email || "",
              password: "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteProfile = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "No authenticated user found");
      return;
    }

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your profile? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await remove(ref(database, `users/${user.uid}`));
              await deleteUser(user);
              await signOut(auth);

              Alert.alert("Profile Deleted", "Your profile has been deleted.");
            } catch (error) {
              if (error.code === "auth/requires-recent-login") {
                Alert.alert(
                  "Re-authentication Required",
                  "Please log in again to delete your profile."
                );
              } else {
                Alert.alert("Error", error.message);
              }
              console.error("Delete error: ", error);
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Layout headerComponent={<Text style={styles.headerLabel}>Profile</Text>}>
      <View style={styles.container}>
        <Formik
          enableReinitialize
          initialValues={userData}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const user = auth.currentUser;

            try {
              if (!user) throw new Error("No authenticated user found");

              const { name, email, password } = values;
              const updates = {};

              if (name !== user.displayName) {
                await updateProfile(user, { displayName: name });
                updates["/name"] = name;
              }

              if (email !== user.email) {
                await updateEmail(user, email);
                updates["/email"] = email;
              }

              if (password) {
                await updatePassword(user, password);
              }

              if (Object.keys(updates).length > 0) {
                await update(ref(database, `users/${user.uid}`), updates);
              }

              resetForm({ values: { ...values, password: "" } });

              Alert.alert("Success", "Profile updated successfully!");
              setEditing(false);
            } catch (error) {
              Alert.alert("Error", error.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={styles.form}>
              <TextInput
                label="Name"
                onChangeText={handleChange("name")}
                value={values.name}
                placeholder="Enter your name"
                error={errors.name}
                touched={touched.name}
                disabled={!editing || isSubmitting}
              />
              <TextInput
                label="Email"
                onChangeText={handleChange("email")}
                value={values.email}
                disabled={true}
              />
              <TextInput
                label="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
                error={errors.password}
                touched={touched.password}
                disabled={!editing || isSubmitting}
              />

              <View>
                <Button
                  variant={editing ? "contained" : "outlined"}
                  label={editing ? "Save Changes" : "Edit Profile"}
                  onPress={() => (editing ? handleSubmit() : setEditing(true))}
                  loading={isSubmitting}
                  customBoxStyle={styles.editButton}
                />
                <Button
                  label="Delete Profile"
                  variant="outlined"
                  onPress={handleDeleteProfile}
                  customBoxStyle={{ borderColor: Colors.crimsonRed }}
                  customLabelStyle={{ color: Colors.crimsonRed }}
                />
              </View>
            </View>
          )}
        </Formik>
        <Button
          label="Logout"
          onPress={handleLogout}
          customBoxStyle={styles.logoutButton}
        />
      </View>
    </Layout>
  );
};

export default Profile;

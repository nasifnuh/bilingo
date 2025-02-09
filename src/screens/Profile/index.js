import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Layout from "@/layout";
import Button from "@components/Button";
import TextInput from "@components/TextInput";

import { styles } from "./styles";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6),
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
                error={errors.name && touched.name}
                disabled={!editing || isSubmitting}
              />
              <TextInput
                label="Email"
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder="Enter your email"
                keyboardType="email-address"
                error={errors.email && touched.email}
                disabled={!editing || isSubmitting}
              />
              <TextInput
                label="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
                error={errors.password && touched.password}
                disabled={!editing || isSubmitting}
              />

              <View>
                <Button
                  label={editing ? "Save Changes" : "Edit Profile"}
                  onPress={() => (editing ? handleSubmit() : setEditing(true))}
                  loading={isSubmitting}
                  style={styles.editButton}
                />
                <Button
                  label="Delete Profile"
                  variant="outlined"
                  onPress={() => console.log("Handle Delete")}
                />
              </View>
            </View>
          )}
        </Formik>
        <Button
          label="Logout"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </View>
    </Layout>
  );
};

export default Profile;

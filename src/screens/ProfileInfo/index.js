import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormattedMessage, useIntl } from "react-intl";

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
import Text from "@/components/ui/Text";
import BackButton from "@/components/BackButton";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { useTheme } from "@/context/ThemeContext"; // Import theme context

import Colors from "@constants/colors";
import { styles } from "./styles";

const ProfileInfo = () => {
  const { formatMessage } = useIntl();
  const { theme } = useTheme(); // Get the current theme
  const themeStyles = styles(theme); // Apply theme styles dynamically

  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, formatMessage({ id: "validationName" }))
      .required(formatMessage({ id: "required" })),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        formatMessage({ id: "validationEmail" })
      )
      .required(formatMessage({ id: "required" })),
    password: Yup.string().min(
      6,
      formatMessage({ id: "validationPasswordLength" })
    ),
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
      Alert.alert(
        formatMessage({ id: "error" }),
        formatMessage({ id: "noAuthenticatedUserMessage" })
      );
      return;
    }

    Alert.alert(
      formatMessage({ id: "confirmDeletion" }),
      formatMessage({ id: "confirmDeletionMessage" }),
      [
        { text: formatMessage({ id: "cancel" }), style: "cancel" },
        {
          text: formatMessage({ id: "delete" }),
          style: "destructive",
          onPress: async () => {
            try {
              await remove(ref(database, `users/${user.uid}`));
              await deleteUser(user);
              await signOut(auth);

              Alert.alert(
                formatMessage({ id: "profileDeleted" }),
                formatMessage({ id: "profileDeletedMessage" })
              );
            } catch (error) {
              if (error.code === "auth/requires-recent-login") {
                Alert.alert(
                  formatMessage({ id: "reAuthRequired" }),
                  formatMessage({ id: "reAuthRequiredMessage" })
                );
              } else {
                Alert.alert(formatMessage({ id: "error" }), error.message);
              }
              console.error("Delete error: ", error);
            }
          },
        },
      ]
    );
  };

  return (
    <Layout
      headerComponent={
        <View style={themeStyles.header}>
          <BackButton />
          <Text style={themeStyles.headerLabel}>
            <FormattedMessage id="profile" />
          </Text>
        </View>
      }
    >
      <View style={themeStyles.container}>
        <Formik
          enableReinitialize
          initialValues={userData}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const user = auth.currentUser;

            try {
              if (!user)
                throw new Error(
                  formatMessage({ id: "noAuthenticatedUserMessage" })
                );

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

              Alert.alert(
                formatMessage({ id: "success" }),
                formatMessage({ id: "profileUpdateSuccessMessage" })
              );
              setEditing(false);
            } catch (error) {
              Alert.alert(formatMessage({ id: "error" }), error.message);
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
            <View style={themeStyles.form}>
              <TextInput
                label={<FormattedMessage id="name" />}
                onChangeText={handleChange("name")}
                value={values.name}
                placeholder={formatMessage({ id: "namePlaceholder" })}
                error={errors.name}
                touched={touched.name}
                disabled={!editing || isSubmitting}
                customBoxStyle={themeStyles.inputBox}
              />
              <TextInput
                label={<FormattedMessage id="email" />}
                onChangeText={handleChange("email")}
                value={values.email}
                disabled={true}
                customBoxStyle={themeStyles.inputBox}
              />
              <TextInput
                label={<FormattedMessage id="password" />}
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
                error={errors.password}
                touched={touched.password}
                disabled={!editing || isSubmitting}
                customBoxStyle={themeStyles.inputBox}
              />

              <View>
                <Button
                  variant={editing ? "contained" : "outlined"}
                  label={
                    editing ? (
                      <FormattedMessage id="saveChanges" />
                    ) : (
                      <FormattedMessage id="editProfile" />
                    )
                  }
                  onPress={() => (editing ? handleSubmit() : setEditing(true))}
                  loading={isSubmitting}
                  customBoxStyle={themeStyles.editButton}
                />
                <Button
                  label={<FormattedMessage id="deleteProfile" />}
                  variant="outlined"
                  onPress={handleDeleteProfile}
                  customBoxStyle={themeStyles.deleteButton}
                  customLabelStyle={{ color: Colors.crimsonRed }}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default ProfileInfo;

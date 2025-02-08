import React, { useState } from "react";
import { View, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "@/layout";
import Button from "@components/Button";
import TextInput from "@components/TextInput";

import { styles } from "./styles";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Profile = () => {
  const [editing, setEditing] = useState(false);

  return (
    <Layout headerComponent={<Text style={styles.headerLabel}>Profile</Text>}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {}}
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
                placeholder="Enter your password"
                secureTextEntry={true}
                error={errors.password && touched.password}
                disabled={!editing || isSubmitting}
              />

              <View>
                <Button
                  label={editing ? "Update Profile" : "Edit Profile"}
                  onPress={() => (editing ? handleSubmit() : setEditing(true))}
                  loading={isSubmitting}
                  style={styles.editButton}
                />
                <Button
                  label="Delete account"
                  variant="outlined"
                  onPress={() => console.log("Handle Delete")}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default Profile;

import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Layout from "@/layout";
import BackButton from "@components/BackButton";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

import MascotImage from "@assets/images/mascot_love.png";
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
  password: Yup.string().min(6, "min 6 characters").required("required"),
});

const Signup = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <BackButton />
        <Image source={MascotImage} style={styles.image} />
        <Text style={styles.title}>Create a Profile</Text>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              const credentials = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );
              const userId = credentials.user.uid;

              await set(ref(database, `users/${userId}`), {
                name: values.name,
                email: values.email,
                joinedDate: new Date().toISOString().split("T")[0],
                language: null,
              });

              Alert.alert(
                "Signup Successful",
                "Your profile has been created!"
              );
            } catch (error) {
              let message = "An error occurred. Please try again.";

              if (error.code === "auth/email-already-in-use") {
                message =
                  "This email is already in use. Please use a different email.";
              } else if (error.code === "auth/weak-password") {
                message = "Password is too weak. Use at least 6 characters.";
              } else if (error.code === "auth/invalid-email") {
                message = "Invalid email format";
              }

              Alert.alert("Signup Failed", message);
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
              />
              <TextInput
                label="Email"
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder="Enter your email"
                keyboardType="email-address"
                error={errors.email}
                touched={touched.email}
              />
              <TextInput
                label="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="Enter your password"
                secureTextEntry={true}
                error={errors.password}
                touched={touched.password}
              />

              <Button
                label="Signup"
                onPress={handleSubmit}
                loading={isSubmitting}
                customBoxStyle={styles.signupButton}
              />
            </View>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default Signup;

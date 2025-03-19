import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@services/firebaseConfig";

import Layout from "@/layout";
import BackButton from "@components/BackButton";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

import MascotImage from "@assets/images/mascot_excited.png";

import { styles } from "./styles";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "invalid email"
    )
    .required("required"),
  password: Yup.string().required("required"),
});

const Login = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <BackButton style={styles.backButton} />
        <Image source={MascotImage} style={styles.image} />
        <Text style={styles.title}>Welcome Back!</Text>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
              await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );
            } catch (error) {
              let message = "An error occurred. Please try again.";

              if (error.code === "auth/invalid-credential") {
                message = "Invalid credentials.";
              }

              Alert.alert("Login Failed", message);
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
                label="Login"
                onPress={handleSubmit}
                loading={isSubmitting}
                customBoxStyle={styles.loginButton}
              />
            </View>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default Login;

import React from "react";
import { View, Text, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "@/layout";
import BackButton from "@components/BackButton";
import Button from "@components/Button";
import TextInput from "@components/TextInput";

import MascotImage from "@assets/images/mascot_excited.png";

import { styles } from "./styles";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
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
                label="Email"
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder="Enter your email"
                keyboardType="email-address"
                error={errors.email && touched.email}
                disabled={isSubmitting}
              />
              <TextInput
                label="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="Enter your password"
                secureTextEntry={true}
                error={errors.password && touched.password}
                disabled={isSubmitting}
              />

              <Button
                label="Login"
                onPress={handleSubmit}
                loading={isSubmitting}
                style={styles.loginButton}
              />
            </View>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default Login;

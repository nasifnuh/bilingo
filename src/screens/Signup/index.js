import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "@/layout";
import BackButton from "@components/BackButton";
import Button from "@components/Button";
import TextInput from "@components/TextInput";

import MascotImage from "@assets/images/mascot_love.png";
import { styles } from "./styles";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Signup = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <View style={styles.container}>
        <BackButton />
        <Image source={MascotImage} style={styles.image} />
        <Text style={styles.title}>Create an Account</Text>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true);
            } catch (error) {
              alert(error);
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
                disabled={isSubmitting}
              />
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
                label="Signup"
                onPress={handleSubmit}
                loading={isSubmitting}
                style={styles.signupButton}
              />
            </View>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default Signup;

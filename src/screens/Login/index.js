import React from "react";
import { View, Image, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormattedMessage, useIntl } from "react-intl";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import BackButton from "@components/BackButton";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

import MascotImage from "@assets/images/mascot_excited.png";

import { styles } from "./styles";

const Login = () => {
  const { formatMessage } = useIntl();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        formatMessage({ id: "validationEmail" })
      )
      .required(formatMessage({ id: "required" })),
    password: Yup.string().required(formatMessage({ id: "required" })),
  });

  return (
    <Layout>
      <View style={styles.container}>
        <BackButton style={styles.backButton} />
        <Image source={MascotImage} style={styles.image} />
        <Text style={styles.title}>
          <FormattedMessage id="welcomeBack" />
        </Text>

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
              let message = formatMessage({ id: "errorOccurred" });

              if (error.code === "auth/invalid-credential") {
                message = formatMessage({
                  id: "firebaseValidationInvalidCred",
                });
              }

              Alert.alert(formatMessage({ id: "loginFailed" }), message);
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
                label={<FormattedMessage id="email" />}
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder={formatMessage({ id: "emailPlaceholder" })}
                keyboardType="email-address"
                error={errors.email}
                touched={touched.email}
              />
              <TextInput
                label={<FormattedMessage id="password" />}
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder={formatMessage({ id: "passwordPlaceholder" })}
                secureTextEntry={true}
                error={errors.password}
                touched={touched.password}
              />

              <Button
                label={<FormattedMessage id="login" />}
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

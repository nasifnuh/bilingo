import React from "react";
import { View, Image, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormattedMessage, useIntl } from "react-intl";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import BackButton from "@components/BackButton";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

import MascotImage from "@assets/images/mascot_love.png";
import { styles } from "./styles";

const Signup = () => {
  const { formatMessage } = useIntl();

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
    password: Yup.string()
      .min(6, formatMessage({ id: "validationPasswordLength" }))
      .required(formatMessage({ id: "required" })),
  });
  return (
    <Layout>
      <View style={styles.container}>
        <BackButton />
        <Image source={MascotImage} style={styles.image} />
        <Text style={styles.title}>
          <FormattedMessage id="createProfile" />
        </Text>

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
                achievement: {
                  streak_50: false,
                  streak_100: false,
                  xp_50: false,
                  xp_100: false,
                },
              });

              Alert.alert(
                formatMessage({ id: "signupSuccess" }),
                formatMessage({ id: "signupSuccessMessage" })
              );
            } catch (error) {
              let message = formatMessage({ id: "errorOccurred" });

              if (error.code === "auth/email-already-in-use") {
                message = formatMessage({
                  id: "firebaseValidationEmailExists",
                });
              } else if (error.code === "auth/weak-password") {
                message = formatMessage({ id: "firebaseValidationPassword" });
              } else if (error.code === "auth/invalid-email") {
                message = formatMessage({ id: "firebaseValidationEmail" });
              }

              Alert.alert(formatMessage({ id: "signupFailed" }), message);
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
                label={<FormattedMessage id="name" />}
                onChangeText={handleChange("name")}
                value={values.name}
                placeholder={formatMessage({ id: "namePlaceholder" })}
                error={errors.name}
                touched={touched.name}
              />
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
                label={<FormattedMessage id="signup" />}
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

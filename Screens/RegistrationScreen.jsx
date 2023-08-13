import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  login: "",
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  login: yup.string().required("Login є обов'язковим полем"),
  email: yup
    .string()
    .email("Введіть правильний email")
    .required("Email є обов'язковим полем"),
  password: yup
    .string()
    .min(6, "Password повинен містити принаймні 6 символів")
    .required("Password є обов'язковим полем"),
});

const RegistrationScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const togglePasswordVisible = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (values) => {
    console.log(`
    Login: ${values.login}
    Email: ${values.email}
    Password: ${values.password}
    `);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View
          style={{
            ...styles.formWrapper,
            paddingBottom: isKeyboardShown ? 10 : 78,
            height: isKeyboardShown ? 360 : "auto",
          }}
        >
          <View style={styles.userPhoto}>
            <TouchableOpacity style={styles.addPhoto}>
              <Text style={styles.addPhotoButton}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Реєстрація</Text>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <SafeAreaView>
                <TextInput
                  style={styles.input}
                  placeholder="Логін"
                  value={values.login}
                  onChangeText={handleChange("login")}
                  onFocus={() => {
                    setIsKeyboardShown(true);
                  }}
                  onBlur={() => {
                    setIsKeyboardShown(false);
                  }}
                />
                {touched.login && errors.login && (
                  <Text style={styles.errorText}>{errors.login}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Адреса електронної пошти"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onFocus={() => {
                    setIsKeyboardShown(true);
                  }}
                  onBlur={() => {
                    setIsKeyboardShown(false);
                  }}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onFocus={() => {
                      setIsKeyboardShown(true);
                    }}
                    onBlur={() => {
                      setIsKeyboardShown(false);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.showPassword}
                    onPress={togglePasswordVisible}
                  >
                    <Text style={[styles.text, styles.showBtn]}>
                      {showPassword ? "Приховати" : "Показати"}
                    </Text>
                  </TouchableOpacity>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={[styles.text, styles.buttonText]}>Увійти</Text>
                </TouchableOpacity>
                <View style={styles.signInContainer}>
                  <Text style={[styles.text, styles.signInText]}>
                    Немає акаунту?{" "}
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={[
                        styles.text,
                        styles.signInText,
                        styles.signInLink,
                      ]}
                    >
                      Зареєструватися
                    </Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formWrapper: {
    paddingTop: 92,
    paddingBottom: 78,
    paddingRight: 16,
    paddingLeft: 16,

    backgroundColor: "#ffffff",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Bold",
    lineHeight: 35.16,
    color: "#212121",

    textAlign: "center",

    marginBottom: 33,
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
  input: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontSize: 16,

    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    marginBottom: 16,
  },
  showPassword: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showBtn: {
    color: "#1B4371",
  },
  button: {
    marginTop: 27,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
  },

  signInContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  signInText: {
    color: "#1B4371",
    textAlign: "center",
  },

  signInLink: {
    textDecorationLine: "underline",
  },

  userPhoto: {
    width: 120,
    height: 120,

    position: "absolute",
    top: -60,
    left: "50%",

    backgroundColor: "#F6F6F6",

    borderRadius: 16,

    transform: [{ translateX: -50 }],
  },

  addPhoto: {
    position: "absolute",
    top: 81,
    right: -12.5,

    justifyContent: "center",
    alignItems: "center",

    width: 25,
    height: 25,

    borderColor: "#FF6C00",
    borderRadius: 12.5,
    borderWidth: 1,
  },
  addPhotoButton: { color: "#FF6C00" },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
});

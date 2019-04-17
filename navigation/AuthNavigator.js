import React, { Component } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import AppNavigator from "./AppNavigator";

// Create the Auth stack with options
export default createAppContainer(
  createStackNavigator(
    {
      Login: { screen: LoginScreen },
      Signup: { screen: SignupScreen },
      ForgotPassword: { screen: ForgotPasswordScreen },
      App: { screen: AppNavigator }
    },
    {
      defaultNavigationOptions: {
        header: null
      },
      initialRouteName: "Login"
    }
  )
);

import React, { Component } from "react";
import { ImageBackground } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import AppNavigator from "./AppNavigator";

const AuthNavigatorStack = createAppContainer(
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
      cardStyle: {
        backgroundColor: "transparent"
      },
      transitionConfig: () => ({
        containerStyle: {
          backgroundColor: "transparent"
        }
      })
    }
  )
);

export default class AuthNavigator extends Component {
  render() {
    return (
      <>
        <AuthNavigatorStack style={{ backgroundColor: "transparent" }} />

        <ImageBackground
          source={require("../assets/auth_background.jpg")}
          imageStyle={{ resizeMode: "cover" }}
          style={{ width: "100%", height: "100%", flex: 1 }}
        />
      </>
    );
  }
}

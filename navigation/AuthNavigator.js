import { createAppContainer, createStackNavigator } from "react-navigation";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import AppNavigator from "./AppNavigator";

// Create the Auth stack with options
export default createAppContainer(
  createStackNavigator(
    {
      ForgotPassword: { screen: ForgotPasswordScreen },
      Login: { screen: LoginScreen },
      Signup: { screen: SignupScreen },
      App: { screen: AppNavigator }
    },
    {
      defaultNavigationOptions: {
        header: null
      },
      initialRouteName: "ForgotPassword",
      initialRouteParams: { init: true }
    }
  )
);

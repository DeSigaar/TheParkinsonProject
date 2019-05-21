import { createAppContainer, createStackNavigator } from "react-navigation";
import { ForgotPasswordScreen, LoginScreen, SignupScreen } from "../screens/auth";
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

import { createStackNavigator, createAppContainer } from "react-navigation";
import TestScreen from "../screens/TestScreen";
import SecondScreen from "../screens/SecondScreen";

export default createAppContainer(
  createStackNavigator({
    Test: { screen: TestScreen },
    Second: { screen: SecondScreen }
  })
);

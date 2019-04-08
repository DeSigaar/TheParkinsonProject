import { createStackNavigator, createAppContainer } from "react-navigation";
import FirstScreen from "../screens/FirstScreen";
import SecondScreen from "../screens/SecondScreen";

export default createAppContainer(
  createStackNavigator({
    First: { screen: FirstScreen },
    Second: { screen: SecondScreen }
  })
);

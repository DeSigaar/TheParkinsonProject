import { createAppContainer, createStackNavigator } from "react-navigation";
import FirstScreen from "../screens/FirstScreen";
import SecondScreen from "../screens/SecondScreen";

// Create the App stack with options
export default createAppContainer(
  createStackNavigator(
    {
      First: { screen: FirstScreen },
      Second: { screen: SecondScreen }
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  )
);

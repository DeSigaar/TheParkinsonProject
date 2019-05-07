import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import SecondScreen from "../screens/SecondScreen";
import ExerciseHomeScreen from "../screens/ExerciseHomeScreen";

// Create the App stack with options
export default createAppContainer(
  createStackNavigator(
    {
      First: { screen: HomeScreen },
      Second: { screen: SecondScreen },
      ExerciseHomeScreen: { screen: ExerciseHomeScreen }
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  )
);

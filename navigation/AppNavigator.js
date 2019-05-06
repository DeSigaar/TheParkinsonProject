import { createAppContainer, createStackNavigator } from "react-navigation";
import FirstScreen from "../screens/FirstScreen";
import SecondScreen from "../screens/SecondScreen";
import ExerciseHomeScreen from "../screens/exersizes/ExerciseHomeScreen";
import ExersizeAddScreen from "../screens/exersizes/ExersizeAddScreen";

// Create the App stack with options
export default createAppContainer(
  createStackNavigator(
    {
      First: { screen: ExersizeAddScreen },
      Second: { screen: SecondScreen },
      ExerciseHomeScreen: { screen: ExerciseHomeScreen },
      ExersizeAddScreen: { screen: ExersizeAddScreen }
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  )
);

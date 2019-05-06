import { createAppContainer, createStackNavigator } from "react-navigation";
import FirstScreen from "../screens/FirstScreen";
import SecondScreen from "../screens/SecondScreen";
import ExerciseHomeScreen from "../screens/ExerciseHomeScreen";
import MedicinesHomeScreen from "../screens/Medicines/MedicinesHomeScreen";
import MedicinesAddScreen from "../screens/Medicines/MedicinesAddScreen";

// Create the App stack with options
export default createAppContainer(
  createStackNavigator(
    {
      First: { screen: FirstScreen },
      Second: { screen: SecondScreen },
      ExerciseHomeScreen: { screen: ExerciseHomeScreen },
      MedicinesHomeScreen: { screen: MedicinesHomeScreen },
      MedicinesAddScreen: { screen: MedicinesAddScreen }
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  )
);

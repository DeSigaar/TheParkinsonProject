import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../store/actions/authActions";
import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import ExerciseHomeScreen from "../screens/ExerciseHomeScreen";
import MedicinesHomeScreen from "../screens/Medicines/MedicinesHomeScreen";
import MedicinesAddScreen from "../screens/Medicines/MedicinesAddScreen";
import MomentsScreen from "../screens/MomentsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MedicationHomeScreen from "../screens/MedicationHomeScreen";
import SchemaScreen from "../screens/SchemaScreen";

// Create the App stack with options
const Navigation = createAppContainer(
  createStackNavigator(
    {
      ExerciseHomeScreen: { screen: ExerciseHomeScreen },
      Moments: { screen: MomentsScreen },
      Schema: { screen: SchemaScreen },
      Home: { screen: HomeScreen },
      Exercises: { screen: ExerciseHomeScreen },
      Moments: { screen: MomentsScreen },
      MedicinesHomeScreen: { screen: MedicinesHomeScreen },
      MedicinesAddScreen: { screen: MedicinesAddScreen },
      Profile: { screen: ProfileScreen },
      Medication: { screen: MedicationHomeScreen }
    },
    {
      defaultNavigationOptions: {
        header: null
      },
      initialRouteName: "Home" // Change this if you want to directly go to a screen you are developing
    }
  )
);

class AppNavigator extends Component {
  static propTypes = {
    user: PropTypes.object,
    setCurrentUser: PropTypes.func
  };

  componentDidUpdate = () => {
    const { user, setCurrentUser } = this.props;
    setCurrentUser(user);
  };

  render() {
    return <Navigation />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    setCurrentUser: user => {
      dispatch(setCurrentUser(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigator);

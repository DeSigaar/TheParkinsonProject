import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { Svg } from "expo";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { MenuItem } from "../components/home";
import { HomeScreen, ProfileScreen, SchemaScreen, MomentsScreen } from "../screens/";
import { HomeScreen as MedicinesScreen, AddScreen as MedicinesAddScreen } from "../screens/Medicines";
import { HomeScreen as ExercisesScreen } from "../screens/Exercises";
import Colors from "../constants/Colors";
import Gradients from "../constants/Gradients";

// Create the App stack with options
const Navigation = createAppContainer(
  createStackNavigator(
    {
      Home: { screen: HomeScreen },
      Profile: { screen: ProfileScreen },
      Schema: { screen: SchemaScreen },
      Moments: { screen: MomentsScreen },
      Exercises: { screen: ExercisesScreen },
      Medicines: { screen: MedicinesScreen },
      MedicinesAdd: { screen: MedicinesAddScreen }
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

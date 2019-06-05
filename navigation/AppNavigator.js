import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Dimensions } from "react-native";
import { Svg } from "expo";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Skeleton } from "../components/common";
import { HomeScreen, ProfileScreen, SchemaScreen, MomentsScreen } from "../screens/";
import {
  HomeScreen as MedicinesScreen,
  AddScreen as MedicinesAddScreen,
  EditScreen as MedicinesEditScreen
} from "../screens/medicines";
import {
  HomeScreen as ExercisesScreen,
  AddScreen as ExercisesAddScreen,
  EditScreen as ExercisesEditScreen
} from "../screens/exercises";

// Create the App stack with options
const Navigation = createAppContainer(
  createStackNavigator(
    {
      Home: { screen: HomeScreen },
      Profile: { screen: ProfileScreen },
      Schema: { screen: SchemaScreen },
      Moments: { screen: MomentsScreen },
      Medicines: { screen: MedicinesScreen },
      MedicinesAdd: { screen: MedicinesAddScreen },
      MedicinesEdit: { screen: MedicinesEditScreen },
      Exercises: { screen: ExercisesScreen },
      ExercisesAdd: { screen: ExercisesAddScreen },
      ExercisesEdit: { screen: ExercisesEditScreen }
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
    user: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  render() {
    const { user } = this.props;
    const { loaded } = this.state;
    const { width, height } = Dimensions.get("window");

    // Give Firebase a second or 3.5 to get everything ready
    if (!loaded)
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 3500);
    // Check if Firebase is ready, than just go for it
    if (user.uid && !loaded)
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 500);

    return loaded ? (
      <Navigation />
    ) : (
      // Still loading so show skeleton screen
      <Skeleton width={width} height={height} x2={width + 200}>
        <Svg.Rect x="17" y="60" width={width / 1.75} height="36" ry="13" rx="13" />
        <Svg.Circle cx={width - 33} cy="78" r="18" />
        <Svg.Rect x="17" y="135" width={width - 34} height="130" ry="13" rx="13" />
        <Svg.Rect x="17" y="276" width={(width - 34) / 2 - 7} height="133" ry="13" rx="13" />
        <Svg.Rect x={(width - 34) / 2 + 24} y="276" width={(width - 34) / 2 - 7} height="133" ry="13" rx="13" />
        <Svg.Rect x="17" y="423" width={(width - 34) / 2 - 7} height="133" ry="13" rx="13" />
        <Svg.Rect x={(width - 34) / 2 + 24} y="423" width={(width - 34) / 2 - 7} height="133" ry="13" rx="13" />
        <Svg.Rect x="17" y="570" width={(width - 34) / 2 - 7} height="133" ry="13" rx="13" />
        <Svg.Rect x={(width - 34) / 2 + 24} y="570" width={(width - 34) / 2 - 7} height="133" ry="13" rx="13" />
      </Skeleton>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user: state.firebase.profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigator);

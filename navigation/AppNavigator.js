import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "../store/actions/authActions";
import { createAppContainer, createStackNavigator } from "react-navigation";
import FirstScreen from "../screens/FirstScreen";
import SecondScreen from "../screens/SecondScreen";
import ExerciseHomeScreen from "../screens/ExerciseHomeScreen";
import TestScreen from "../screens/MomentsScreen";

// Create the App stack with options
const Navigation = createAppContainer(
  createStackNavigator(
    {
      First: { screen: FirstScreen },
      Second: { screen: SecondScreen },
      ExerciseHomeScreen: { screen: ExerciseHomeScreen },
      Moments: { screen: MomentsScreen }
    },
    {
      defaultNavigationOptions: {
        header: null
      },
      initialRouteName: "First" // Change this if you want to directly go to a screen you are developing
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

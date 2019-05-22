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
      // Still loading so show skeleton screen with routes to different parts of the app
      <ScrollView>
        <View style={styles.intro}>
          <SvgAnimatedLinearGradient
            height={35.8}
            width={200}
            x1="0"
            y1="0"
            x2="400"
            y2="400"
            primaryColor={Colors.skeletonPrimary}
            secondaryColor={Colors.skeletonSecondary}
          >
            <Svg.Rect x="0" y="0" width="200" height="35.8" ry="10" rx="10" />
          </SvgAnimatedLinearGradient>
        </View>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.6}>
          <SvgAnimatedLinearGradient
            height={36}
            width={36}
            x1="0"
            y1="0"
            x2="400"
            y2="400"
            primaryColor={Colors.skeletonPrimary}
            secondaryColor={Colors.skeletonSecondary}
          >
            <Svg.Circle cx="18" cy="18" r="18" />
          </SvgAnimatedLinearGradient>
        </TouchableOpacity>
        <View style={styles.menuItemContainer}>
          <View style={styles.loadingUpcoming}>
            <SvgAnimatedLinearGradient
              height={129.9}
              width={380}
              x1="0"
              y1="0"
              x2="400"
              y2="400"
              primaryColor={Colors.skeletonPrimary}
              secondaryColor={Colors.skeletonSecondary}
            >
              <Svg.Rect x="0" y="0" height="129.9" width="100%" ry="10" rx="10" />
            </SvgAnimatedLinearGradient>
          </View>
          <MenuItem
            title="Medicijnen"
            img={require("../assets/images/icon/home/medicatie.png")}
            gradientColor={Gradients.blue}
          />
          <MenuItem
            title="Oefeningen"
            img={require("../assets/images/icon/home/oefeningen.png")}
            gradientColor={Gradients.green}
          />
          <MenuItem
            title="Activiteiten"
            img={require("../assets/images/icon/home/activiteiten.png")}
            gradientColor={Gradients.orange}
          />
          <MenuItem
            title="Community"
            img={require("../assets/images/icon/home/community.png")}
            gradientColor={Gradients.pink}
          />
          <MenuItem
            title="Tips & Tricks"
            img={require("../assets/images/icon/home/tipsTricks.png")}
            gradientColor={Gradients.purple}
          />
          <MenuItem
            title="Schema"
            img={require("../assets/images/icon/home/schema.png")}
            gradientColor={Gradients.yellow}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  intro: {
    marginTop: 60,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20
  },
  profileContainer: {
    position: "absolute",
    top: 59.5,
    right: 15,
    width: 36,
    height: 36
  },
  photoURL: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
  loadingUpcoming: {
    margin: 7,
    width: "100%",
    height: 129.9
  },
  menuItemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});

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

import React, { Component } from "react";
import { StyleSheet, Text, ScrollView, View, Alert, Button } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";
import { MenuItem } from "../components/home";
import { Upcoming } from "../components/home";
import Gradients from "../constants/Gradients";
import Colors from "../constants/Colors";

class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    logOut: PropTypes.func,
    authError: PropTypes.string
  };

  render() {
    const { navigation, logOut, authError } = this.props;
    if (authError) Alert.alert(authError);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.intro}>Goedemorgen {user.displayName}</Text>
        <View style={styles.menuItemContainer}>
          <Upcoming
            img={require("../assets/images/icon/medication.png")}
            gradientColor={Gradients.blue}
            onPress={() => navigation.navigate("ExerciseHomeScreen")}
          />
          <MenuItem
            title="Medicijnen"
            img={require("../assets/images/icon/medication.png")}
            gradientColor={Gradients.blue}
          />
          <MenuItem
            title="Oefeningen"
            img={require("../assets/images/icon/exercises.png")}
            gradientColor={Gradients.green}
            onPress={() => navigation.navigate("ExerciseHomeScreen")}
          />
          <MenuItem
            title="Activiteiten"
            img={require("../assets/images/icon/activities.png")}
            gradientColor={Gradients.orange}
          />
          <MenuItem
            title="Community"
            img={require("../assets/images/icon/community.png")}
            gradientColor={Gradients.pink}
          />
          <MenuItem
            title="Tips & Tricks"
            img={require("../assets/images/icon/tips_tricks.png")}
            gradientColor={Gradients.purple}
          />
          <MenuItem title="Schema" img={require("../assets/images/icon/schema.png")} gradientColor={Gradients.yellow} />
        </View>

        {/* <Button title="2e scherm test" onPress={() => navigation.navigate("Second", { variable: 2 })} /> */}
        {/* <Button title="Uitloggen" onPress={logOut} /> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  intro: {
    fontSize: 28,
    color: Colors.greyTextColor,
    marginTop: 60,
    marginLeft: 5,
    marginBottom: 30,
    fontFamily: "product-sans-bold"
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginLeft: 20,
    marginRight: 20
  },
  menuItemContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    logOut: () => {
      dispatch(logOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

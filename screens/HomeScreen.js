import React, { Component } from "react";
import { StyleSheet, Text, ScrollView, View, Alert, Button } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut, setExpoPushToken } from "../store/actions/authActions";
import { MenuItem } from "../components/home";
import { Upcoming } from "../components/home";
import Gradients from "../constants/Gradients";
import Colors from "../constants/Colors";
import { Permissions, Notifications } from "expo";

class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    logOut: PropTypes.func,
    setExpoPushToken: PropTypes.func,
    authError: PropTypes.string,
    user: PropTypes.object
  };

  componentDidUpdate() {
    const { user } = this.props;
    if (!user.isEmpty) {
      // User is present
      if (!user.expoPushToken) {
        // Token is not present and should be set
        this.registerForPushNotifications();
      }
    }

    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  defineGreeting = () => {
    const hours = new Date().getHours();
    switch (true) {
      case hours >= 18:
        return "Goedenavond";
      case hours >= 12:
        return "Goedemiddag";
      case hours >= 6:
        return "Goedemorgen";
      default:
        return "Goededag";
    }
  };

  getFirstName = () => {
    const { displayName } = this.props.user;
    if (displayName) {
      return displayName.split(" ")[0];
    } else {
      return "";
    }
  };

  registerForPushNotifications = async () => {
    //Check for excisting permissions
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;

    //If no excisting permission, ask for permission
    if (status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    //If no permission, exit the function
    if (finalStatus !== "granted") {
      return;
    }

    //Get push notification token
    let token = await Notifications.getExpoPushTokenAsync();

    //add token to firebase
    let uid = this.props.user.uid;

    if (uid && token) {
      this.props.setExpoPushToken(uid, token);
    }
  };

  render() {
    const { navigation, logOut, authError, user } = this.props;
    if (authError) Alert.alert(authError);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.intro}>
          {/* {this.defineGreeting()} {user.displayName} */}
          {/* {this.defineGreeting()} {this.getFirstName(user.displayName)} */}
          {this.defineGreeting()} {this.getFirstName()}
        </Text>
        <View style={styles.menuItemContainer}>
          <Upcoming
            img={require("../assets/images/icon/medicatie.png")}
            gradientColor={Gradients.blue}
            onPress={() => navigation.navigate("ExerciseHomeScreen")}
          />
          <MenuItem
            title="Medicijnen"
            img={require("../assets/images/icon/medicatie.png")}
            gradientColor={Gradients.blue}
          />
          <MenuItem
            title="Oefeningen"
            img={require("../assets/images/icon/oefeningen.png")}
            gradientColor={Gradients.green}
            onPress={() => navigation.navigate("ExerciseHomeScreen")}
          />
          <MenuItem
            title="Activiteiten"
            img={require("../assets/images/icon/activiteiten.png")}
            gradientColor={Gradients.orange}
          />
          <MenuItem
            title="Community"
            img={require("../assets/images/icon/community.png")}
            gradientColor={Gradients.pink}
          />
          <MenuItem
            title="Tips & Tricks"
            img={require("../assets/images/icon/tipsTricks.png")}
            gradientColor={Gradients.purple}
          />
          <MenuItem
            title="Schema"
            img={require("../assets/images/icon/schema.png")}
            gradientColor={Gradients.yellow}
            onPress={() => navigation.navigate("Schema")}
          />
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
    authError: state.auth.authError,
    user: state.firebase.profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    logOut: () => {
      dispatch(logOut());
    },
    setExpoPushToken: (uid, token) => {
      dispatch(setExpoPushToken(uid, token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

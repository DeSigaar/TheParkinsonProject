import React, { Component } from "react";
import { StyleSheet, View, Alert, Button, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut, setExpoPushToken } from "../store/actions/authActions";
import { MenuItem } from "../components";
import Gradients from "../constants/Gradients";
import { Permissions, Notifications } from "expo";
import { sendPushNotification } from "../store/actions/notifiActions";

class FirstScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    logOut: PropTypes.func,
    setExpoPushToken: PropTypes.func,
    user: PropTypes.object,
    authError: PropTypes.string
  };

  state = {
    notification: {}
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
      <View style={styles.container}>
        <View style={styles.menuItemContainer}>
          <MenuItem title="Medicijnen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.blue} />
          <MenuItem
            title="Oefeningen"
            img="http://logodust.com/img/free/logo28.png"
            gradientColor={Gradients.green}
            onPress={() => navigation.navigate("ExerciseHomeScreen")}
          />
          <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} />
          <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} />
          <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} />
          {/* <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} /> */}
        </View>
        <Button title="2e scherm test" onPress={() => navigation.navigate("Second", { variable: 2 })} />
        <Button title="Uitloggen" onPress={logOut} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    // flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user: state.firebase.profile,
    authError: state.auth.authError
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
)(FirstScreen);

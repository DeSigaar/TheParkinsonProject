import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Button } from "react-native";
import * as firebase from "firebase";
import { Permissions, Notifications } from "expo";

export default class NotificationTest extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "Notifications"
  };

  componentDidMount() {
    this.registerForPushNotifications();
  }

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
    console.log(token);
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <View style={styles.container}>
        <Text>Notification test page</Text>
        <Button title="Notification" />
        <Button title="Go back" onPress={() => navigate("First")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 24
  }
});

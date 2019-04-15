import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import PropTypes from "prop-types";
import * as firebase from "firebase";

import { FirstComponent } from "../components";
import CoolButton from "../components/common/Button";

export default class FirstScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "First"
  };

  handlePressSignout() {
    // Log out the user
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          // Signout was successful
        },
        error => {
          // Returned an error and is displaying it to the user
          Alert.alert(error.message);
        }
      );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>The Parkinson Project</Text>
        <CoolButton onPress={() => this.handlePressSignout()}>Uitloggen</CoolButton>

        <FirstComponent />
        <Button title="Go to second screen" onPress={() => navigate("Second", { variable: 2 })} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import PropTypes from "prop-types";
import * as firebase from "firebase";

import Button from "../components/common/Button";

export default class FirstScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "First"
  };

  constructor(props) {
    super(props);

    this.state = {
      uid: "No user UID ;'("
    };
  }

  componentWillMount() {
    // TODO
    // Fix this with REDUX?

    // Gets uid for now, should be within REDUX later
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setState({ uid: user.uid });
      }
    });
  }

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
        <Text>UID: {this.state.uid}</Text>

        <Button onPress={() => navigate("Second", { variable: 2 })}>Go to second screen</Button>

        <Button onPress={() => this.handlePressSignout()}>Uitloggen</Button>
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

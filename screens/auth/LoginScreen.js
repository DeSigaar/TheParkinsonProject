import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, Platform, View, StyleSheet, Text, Alert, ImageBackground } from "react-native";
import * as firebase from "firebase";
import { Google } from "expo";

import ApiKeys from "../../constants/ApiKeys";

import { Input, Button, Upper } from "../../components/auth";

export default class LoginScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  handlePressLogin = () => {
    // Log in the user
    this.setState({ loading: true });

    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {
          // Login was successful
          this.setState({ loading: false });
        },
        error => {
          // Returned an error and is displaying it to the user
          this.setState({ loading: false });
          Alert.alert(error.message);
        }
      );
  };

  handlePressGoogleLogin = async () => {
    // Start logging in with Google
    // TODO / BUG / FEATURE
    // Google login only works within the Expo client app - standalone apps won't work
    Google.logInAsync({
      clientId: Platform.OS === "ios" ? ApiKeys.GoogleLogin.iOS.clientId : ApiKeys.GoogleLogin.android.clientId
    })
      .then(loginResult => {
        var credential = firebase.auth.GoogleAuthProvider.credential(loginResult.idToken);
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .catch(function(error) {
            // Something went wrong
            console.log("Something went wrong! " + error);
          });
      })
      .catch(error => {
        console.log("Something went wrong! " + error);
      });
  };

  handlePressAnonLogin = () => {
    // Logging user in without any creds
    firebase
      .auth()
      .signInAnonymously()
      .then(
        () => {
          // callback
        },
        error => {
          var errorCode = error.code;
          var errorMessage = error.Message;
          console.log(errorCode + " " + errorMessage);
        }
      );
  };

  renderCurrentState() {
    const { navigation } = this.props;
    const { loading, email, password } = this.state;
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.form}>
          <Upper top="Welkom bij" top2="The Parkinson Project" bottom="Log hier in met je account" />

          <Input
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Wachtwoord"
            onChangeText={password => this.setState({ password })}
            value={password}
            secureTextEntry
          />
          <Button
            onPress={this.handlePressLogin}
            style={{ backgroundColor: "#454545", color: "#FFFFFF" }}
            type="dark"
            title="Log in"
          />

          <Button onPress={this.handlePressGoogleLogin} type="light" title="Log in met Google" />

          <Button onPress={this.handlePressAnonLogin} type="light" title="Ga verder zonder account" />

          <Button onPress={() => navigation.navigate("Signup")} type="light" title="Registreren" />
          <Button onPress={() => navigation.navigate("ForgotPassword")} type="light" title="Wachtwoord vergeten" />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/auth/background.jpg")}
          imageStyle={styles.backgroundImage}
          style={styles.background}
        >
          <View style={styles.inner}>{this.renderCurrentState()}</View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: null,
    height: null,
    flex: 1
  },
  backgroundImage: {
    resizeMode: "cover"
  },
  inner: {
    flex: 1,
    padding: 32,
    paddingTop: 64,
    paddingBottom: 64
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  upper: {},
  upperTop: {},
  upperBottom: {},
  h1: {
    fontFamily: "product-sans-bold",
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center"
  },
  h2: {
    fontFamily: "product-sans",
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  }
});

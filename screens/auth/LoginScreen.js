import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, Platform, View, StyleSheet, Text, Alert } from "react-native";
import * as firebase from "firebase";
import { Google } from "expo";

import ApiKeys from "../../constants/ApiKeys";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

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

  handlePressLogin() {
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
  }

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

  handlePressAnonLogin() {
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
  }

  handlePressSignup() {
    // Navigate to SignupScreen
    this.props.navigation.navigate("Signup");
  }

  handlePressForgotPassword() {
    // Navigate to ForgotPasswordScreen
    this.props.navigation.navigate("ForgotPassword");
  }

  renderCurrentState() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.form}>
          <Text>Inloggen</Text>
          <Input
            label="Email"
            placeholder="Vul je email in..."
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            label="Wachtwoord"
            placeholder="Vul je wachtwoord in..."
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry
          />
          <Button onPress={() => this.handlePressLogin()}>Inloggen</Button>

          <Button onPress={() => this.handlePressGoogleLogin()}>Log in met Google</Button>

          <Button onPress={() => this.handlePressAnonLogin()}>Log in zonder iets</Button>

          <Text>---</Text>
          <Button onPress={() => this.handlePressSignup()}>Account aanmaken</Button>
          <Button onPress={() => this.handlePressForgotPassword()}>Wachtwoord vergeten?</Button>
        </View>
      );
    }
  }

  render() {
    return <View style={styles.container}>{this.renderCurrentState()}</View>;
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
  form: {
    flex: 1
  }
});

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet, Text, Alert } from "react-native";
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
    console.log(ApiKeys.GoogleLogin.clientId);

    Google.logInAsync({
      clientId: ApiKeys.GoogleLogin.clientId
    })
      .then(
        loginResult => {
          console.log("Successful");
          console.log(loginResult);
        },
        error => {
          console.log("Something went wrong... " + error);
        }
      )
      .catch(e => {
        console.log("idk anymore");
        console.log(e);
      });
  };

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
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  form: {
    flex: 1
  }
});

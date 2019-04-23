import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet, Text, Alert, ImageBackground } from "react-native";
import * as firebase from "firebase";

import { Input, Button, Upper, Chevron } from "../../components/auth";

export default class SignupScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      loading: false
    };
  }

  handlePressSignup() {
    // Signup user
    this.setState({ loading: true });
    const { email, password, passwordConfirm } = this.state;

    if (password !== passwordConfirm) {
      Alert.alert("Wachtwoorden zijn niet hetzelfde!");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          // Signup was successful
          this.setState({ loading: false });
        },
        error => {
          // Returned an error and is displaying it to the user
          this.setState({ loading: false });
          Alert.alert(error.message);
        }
      );
  }

  handlePressLogin = () => {
    // Navigate to LoginScreen
    this.props.navigation.navigate("Login");
  };

  renderCurrentState = () => {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.form}>
          <Upper top="Nieuw hier?" bottom="Maak hier je account aan" />
          <Input
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Wachtwoord"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry
          />
          <Input
            placeholder="Bevestig wachtwoord"
            onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
            value={this.state.passwordConfirm}
            secureTextEntry
          />
          <Button onPress={() => this.handlePressSignup()} type="dark" title="Registreer" />

          {/* TODO: Registreer met Google dmv zelfde login func */}

          <Chevron onPress={this.handlePressLogin} title="Inloggen" direction="left" />
        </View>
      );
    }
  };

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
  }
});

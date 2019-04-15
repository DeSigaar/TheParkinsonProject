import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet, Text, Alert } from "react-native";
import * as firebase from "firebase";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default class ForgotPasswordScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      loading: false
    };
  }

  handlePressForgotPassword() {
    // Send password reset to email
    this.setState({ loading: true });
    const { email } = this.state;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(
        () => {
          // Send password reset email was successful
          Alert.alert("Wachtwoord opnieuw instellen email is verstuurd!");
        },
        error => {
          // Returned an error and is displaying it to the user
          this.setState({ loading: false });
          Alert.alert(error.message);
        }
      );
  }

  handlePressLogin() {
    // Navigate to LoginScreen
    this.props.navigation.navigate("Login");
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
          <Text>Wachtwoord vergeten</Text>
          <Input
            label="Email"
            placeholder="Vul je email in..."
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button onPress={() => this.handlePressForgotPassword()}>Stuur mij een nieuw wachtwoord</Button>

          <Text>---</Text>
          <Button onPress={() => this.handlePressLogin()}>Ik weet mijn wachtwoord weer</Button>
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet, Text, Alert } from "react-native";
import * as firebase from "firebase";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

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

  handlePressLogin() {
    // Navigate to LoginScreen
    this.props.navigation.navigate("Login");
  }

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
          <Text>Account aanmaken</Text>
          <Input
            label="Email"
            placeholder="Vul een email..."
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            label="Wachtwoord"
            placeholder="Vul een wachtwoord in..."
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry
          />
          <Input
            label="Herhaal wachtwoord"
            placeholder="Vul het wachtwoord opnieuw in..."
            onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
            value={this.state.passwordConfirm}
            secureTextEntry
          />
          <Button onPress={() => this.handlePressSignup()}>Account aanmaken</Button>

          <Text>---</Text>
          <Button onPress={() => this.handlePressLogin()}>Ik heb wel een account</Button>
        </View>
      );
    }
  };

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

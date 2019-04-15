import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default class LoginScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "Inloggen"
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      authenticating: false
    };
  }

  onPressLogin() {
    this.setState({ authenticating: true });

    setTimeout(() => {
      this.setState({ authenticating: false });
    }, 1000);
  }

  onPressSignup() {
    // Navigate to new screen without a back button being showed
    this.props.navigation.reset([NavigationActions.navigate({ routeName: "Signup" })], 0);
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Vul je email in..."
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Input
            label="Wachtwoord"
            placeholder="Vul je wachtwoord in..."
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry
          />
          <Button onPress={() => this.onPressLogin()}>Inloggen</Button>

          <Button onPress={() => this.onPressSignup()}>Account aanmaken</Button>
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default class SignupScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "Account aanmaken"
  };

  constructor(props) {
    super(props);

    console.log("Hey");

    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      loading: false
    };
  }

  onPressLogin = () => {
    // Navigate to new screen without a back button being showed
    this.props.navigation.reset([NavigationActions.navigate({ routeName: "Login" })], 0);
  };

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
          <Input
            label="Email"
            placeholder="Vul een email..."
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
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
          <Button onPress={() => this.onPressLogin()}>Account aanmaken</Button>

          <Button onPress={() => this.onPressLogin()}>Inloggen</Button>
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

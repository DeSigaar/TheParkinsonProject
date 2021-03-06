import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet, Text, ImageBackground } from "react-native";
import { connect } from "react-redux";
import {
  registerWithCreds,
  logInWithGoogle,
  logInAsAnon,
  setAuthLoading,
  clearError
} from "../../store/actions/authActions";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

import { Input, Button, Upper, Chevron, Divider, GoogleButton } from "../../components/auth";

class SignupScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    registerWithCreds: PropTypes.func,
    logInWithGoogle: PropTypes.func,
    logInAsAnon: PropTypes.func,
    setAuthLoading: PropTypes.func,
    clearError: PropTypes.func,
    authLoading: PropTypes.bool,
    authError: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
    };
  }

  handlePressSignup = () => {
    // Signup the user
    const { email, password, passwordConfirm } = this.state;
    const { registerWithCreds, setAuthLoading, clearError } = this.props;

    clearError();
    setAuthLoading();
    setTimeout(() => {
      registerWithCreds({ email, password, passwordConfirm });
    }, 250);
  };

  handlePressGoogleRegister = () => {
    // Start registering in with Google
    const { logInWithGoogle, setAuthLoading, clearError } = this.props;

    clearError();
    setAuthLoading();
    setTimeout(() => {
      logInWithGoogle();
    }, 250);
  };

  handlePressAnonRegister = () => {
    // Registering user without any creds
    const { logInAsAnon, setAuthLoading, clearError } = this.props;

    clearError();
    setAuthLoading();
    setTimeout(() => {
      logInAsAnon();
    }, 250);
  };

  handlePressNavigateLogin = () => {
    // Navigate to ForgotPasswordScreen and clear errors and messages
    const { clearError, navigation } = this.props;

    clearError();
    navigation.navigate("Login");
  };

  renderCurrentState = () => {
    const { email, password, passwordConfirm } = this.state;
    const { authLoading, authError } = this.props;

    if (!authLoading) {
      return (
        <View style={styles.form}>
          <Upper top="Nieuw hier?" bottom="Maak hier je account aan" />

          <View style={styles.innerForm}>
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
            <Input
              placeholder="Bevestig wachtwoord"
              onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
              value={passwordConfirm}
              secureTextEntry
            />
            <Button onPress={this.handlePressSignup} type="dark" value="Registreer" />
            <View style={styles.errors}>{authError && <Text style={styles.error}>{authError}</Text>}</View>

            <Divider />

            <GoogleButton onPress={this.handlePressGoogleRegister} value="Registreren met Google" />
            <Button onPress={this.handlePressAnonRegister} type="light" value="Ga verder zonder account" />
          </View>

          <Chevron onPress={this.handlePressNavigateLogin} direction="left" value="Inloggen" />
        </View>
      );
    } else {
      return <ActivityIndicator style={styles.load} size="large" />;
    }
  };

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/auth/background.jpg")}
        imageStyle={styles.backgroundImage}
        style={styles.background}
      >
        <View style={styles.container}>{this.renderCurrentState()}</View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: null,
    height: null,
    padding: 20
  },
  backgroundImage: {
    resizeMode: "cover"
  },
  container: {
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
  innerForm: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 75
  },
  load: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  errors: {
    height: 25
  },
  error: {
    fontFamily: ProductSans.regular,
    color: Colors.red
  },
  success: {
    fontFamily: ProductSans.regular,
    color: Colors.green
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authLoading: state.auth.authLoading,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    registerWithCreds: credentials => {
      dispatch(registerWithCreds(credentials));
    },
    logInWithGoogle: () => {
      dispatch(logInWithGoogle());
    },
    logInAsAnon: () => {
      dispatch(logInAsAnon());
    },
    setAuthLoading: () => {
      dispatch(setAuthLoading());
    },
    clearError: () => {
      dispatch(clearError());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);

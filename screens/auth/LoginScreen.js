import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet, Text, ImageBackground } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {
  logInWithCreds,
  logInWithGoogle,
  logInAsAnon,
  setAuthLoading,
  clearError
} from "../../store/actions/authActions";

import { Input, Button, Upper, Chevron } from "../../components/auth";

class LoginScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    logInWithCreds: PropTypes.func,
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
      password: ""
    };
  }

  handlePressLogin = () => {
    // Log in the user
    const { email, password } = this.state;
    const { logInWithCreds, setAuthLoading, clearError } = this.props;

    clearError();
    setAuthLoading();
    setTimeout(() => {
      logInWithCreds({ email, password });
    }, 250);
  };

  handlePressGoogleLogin = () => {
    // Start logging in with Google
    const { logInWithGoogle, setAuthLoading, clearError } = this.props;

    clearError();
    setAuthLoading();
    setTimeout(() => {
      logInWithGoogle();
    }, 250);
  };

  handlePressAnonLogin = () => {
    // Logging user in without any creds
    const { logInAsAnon, setAuthLoading, clearError } = this.props;

    clearError();
    setAuthLoading();
    setTimeout(() => {
      logInAsAnon();
    }, 250);
  };

  handlePressNavigateSignup = () => {
    // Navigate to SignupScreen and clear errors and messages
    const { clearError, navigation } = this.props;
    clearError();
    navigation.navigate("Signup");
  };

  handlePressNavigateForgotPassword = () => {
    // Navigate to ForgotPasswordScreen and clear errors and messages
    const { clearError, navigation } = this.props;
    clearError();
    // TODO: Make it navigate to the left
    navigation.navigate("ForgotPassword");
  };

  renderCurrentState() {
    const { email, password } = this.state;
    const { authLoading, authError } = this.props;
    if (authLoading) {
      return <ActivityIndicator style={styles.load} size="large" />;
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
          <Button onPress={this.handlePressLogin} type="dark" title="Log in" />
          <View style={styles.errors}>{authError ? <Text style={styles.error}>{authError}</Text> : null}</View>

          {/* TODO: Create divider */}

          {/* TODO: Create Google Button */}
          <Button onPress={this.handlePressGoogleLogin} type="light" title="Log in met Google" />
          <Button onPress={this.handlePressAnonLogin} type="light" title="Ga verder zonder account" />

          {/* TODO: Make these chevrons */}
          <Chevron onPress={this.handlePressNavigateSignup} title="Registreren" direction="right" />
          <Chevron onPress={this.handlePressNavigateForgotPassword} title="Wachtwoord vergeten" direction="left" />
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
  load: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  errors: {
    height: 25
  },
  error: {
    fontFamily: "product-sans",
    color: "#FF0000"
  },
  success: {
    fontFamily: "product-sans",
    color: "#00FF00"
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
    logInWithCreds: credentials => {
      dispatch(logInWithCreds(credentials));
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
)(LoginScreen);

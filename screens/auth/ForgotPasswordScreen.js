import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet, Text, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { sendPasswordResetEmail, setAuthLoading, clearError } from "../../store/actions/authActions";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

class ForgotPasswordScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    sendPasswordResetEmail: PropTypes.func,
    setAuthLoading: PropTypes.func,
    clearError: PropTypes.func,
    authLoading: PropTypes.bool,
    authError: PropTypes.string,
    authMessage: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  handlePressForgotPassword = () => {
    // Send password reset to email through action
    const { sendPasswordResetEmail, setAuthLoading, clearError } = this.props;
    const { email } = this.state;

    clearError();
    setAuthLoading();
    // TODO: Do this more elegantly by using a callback on setAuthLoading?
    setTimeout(() => {
      sendPasswordResetEmail(email);
    }, 250);
  };

  handlePressNavigateLogin = () => {
    // Navigate to LoginScreen and clear errors and messages
    const { clearError, navigation } = this.props;
    clearError();
    navigation.navigate("Login");
  };

  renderCurrentState = () => {
    const { email } = this.state;
    const { authLoading, authMessage, authError } = this.props;

    if (authLoading) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <View style={styles.form}>
          <View style={styles.upper}>
            <View style={styles.upperTop}>
              <Text style={styles.h1}>Wachtwoord vergeten?</Text>
            </View>
            <View style={styles.upperBottom}>
              <Text style={styles.h2}>Herstel hier je wachtwoord</Text>
            </View>
          </View>

          <Input
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={authError}
          />
          <Button onPress={this.handlePressForgotPassword}>Stuur een email</Button>
          <Text style={styles.error}>{authError}</Text>
          <Text style={styles.success}>{authMessage}</Text>

          <Button onPress={this.handlePressNavigateLogin}>Inloggen</Button>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/auth_background.jpg")}
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
    authError: state.auth.authError,
    authMessage: state.auth.authMessage
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    sendPasswordResetEmail: email => {
      dispatch(sendPasswordResetEmail(email));
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
)(ForgotPasswordScreen);

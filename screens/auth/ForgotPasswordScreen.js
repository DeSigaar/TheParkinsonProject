import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet, Text, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { sendPasswordResetEmail, setAuthLoading, clearError } from "../../store/actions/authActions";

import { Input, Button, Upper } from "../../components/auth";

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
      return <ActivityIndicator style={styles.load} size="large" />;
    } else {
      return (
        <View style={styles.form}>
          <Upper top="Wachtwoord vergeten?" bottom="Herstel hier je wachtwoord" />

          <Input
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={authError}
          />
          <Button onPress={this.handlePressForgotPassword} type="dark" title="Stuur een email" />
          <Text style={styles.error}>{authError}</Text>
          <Text style={styles.success}>{authMessage}</Text>

          <Button onPress={this.handlePressNavigateLogin} type="light" title="Inloggen" />
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
  },
  load: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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

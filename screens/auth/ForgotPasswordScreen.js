import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet, Text, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { sendPasswordResetEmail, setAuthLoading, clearError } from "../../store/actions/authActions";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

import { Input, Button, Upper, Chevron } from "../../components/auth";

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

    // Check if the stack just got initialized, if so, go to Login
    if (props.navigation.state.params.init) {
      props.navigation.navigate("Login");
    }

    this.state = {
      email: ""
    };
  }

  handlePressForgotPassword = () => {
    // Send password reset to email through action
    const { email } = this.state;
    const { sendPasswordResetEmail, setAuthLoading, clearError } = this.props;

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

    if (!authLoading) {
      return (
        <View style={styles.form}>
          <Upper top="Wachtwoord vergeten?" bottom="Herstel hier je wachtwoord" />

          <View style={styles.innerForm}>
            <Input
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button onPress={this.handlePressForgotPassword} type="dark" value="Stuur een email" />
            <View style={styles.errors}>
              {authError && <Text style={styles.error}>{authError}</Text>}
              {authMessage && <Text style={styles.success}>{authMessage}</Text>}
            </View>
          </View>

          <Chevron onPress={this.handlePressNavigateLogin} direction="right" value="Inloggen" />
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
    width: "100%"
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
    backgroundColor: Colors.darkGray,
    height: 21,
    padding: 2,
    borderRadius: 2,
    fontFamily: ProductSans.regular,
    color: Colors.red
  },
  success: {
    backgroundColor: Colors.darkGray,
    height: 21,
    padding: 2,
    borderRadius: 2,
    fontFamily: ProductSans.regular,
    color: Colors.green
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

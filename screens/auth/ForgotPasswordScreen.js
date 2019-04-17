import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View, StyleSheet, Text, Alert, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { sendPasswordResetEmail, setAuthLoading } from "../../store/actions/authActions";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

class ForgotPasswordScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    sendPasswordResetEmail: PropTypes.func,
    setAuthLoading: PropTypes.func,
    authLoading: PropTypes.bool,
    authError: PropTypes.string,
    authMessage: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      loading: false
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.authLoading) {
      this.setState({ loading: false });
    }
  };

  handlePressForgotPassword = () => {
    // Send password reset to email through action
    const { sendPasswordResetEmail, setAuthLoading } = this.props;
    const { email } = this.state;

    this.setState({ loading: true });

    setAuthLoading();

    // Do this more elegantly
    setTimeout(() => {
      sendPasswordResetEmail(email);
    }, 250);

    // .then(
    //   () => {
    //     console.log("This worked!");
    //     this.setState({ loading: false });
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );

    // const { email } = this.state;
    // firebase
    //   .auth()
    //   .sendPasswordResetEmail(email)
    //   .then(
    //     () => {
    //       // Send password reset email was successful
    //       this.setState({ loading: false });
    //       Alert.alert("Wachtwoord opnieuw instellen email is verstuurd!");
    //     },
    //     error => {
    //       // Returned an error and is displaying it to the user
    //       this.setState({ loading: false });
    //       Alert.alert(error.message);
    //     }
    //   );
  };

  renderCurrentState = () => {
    const { email, loading } = this.state;
    const { navigation, authLoading, authError, authMessage } = this.props;
    console.log("TCL: ForgotPasswordScreen -> renderCurrentState -> loading", loading);

    if (authMessage) Alert.alert(authMessage);
    if (authError) Alert.alert(authError);
    if (authLoading) {
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
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button onPress={this.handlePressForgotPassword}>Stuur mij een nieuw wachtwoord</Button>

          <Text>---</Text>
          <Button onPress={() => navigation.navigate("Login")}>Ik weet mijn wachtwoord weer</Button>
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  form: {
    flex: 1
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);

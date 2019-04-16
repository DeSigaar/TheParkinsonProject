import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";

import Button from "../components/common/Button";

class FirstScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    logOut: PropTypes.func,
    authError: PropTypes.string
  };

  static navigationOptions = {
    title: "First"
  };

  render() {
    const { navigation, logOut, authError } = this.props;
    if (authError) Alert.alert(authError);

    return (
      <View style={styles.container}>
        <Text>The Parkinson Project</Text>

        <Button onPress={() => navigation.navigate("Second", { variable: 2 })}>Go to second screen</Button>

        <Button onPress={logOut}>Uitloggen</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    logOut: () => {
      dispatch(logOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstScreen);

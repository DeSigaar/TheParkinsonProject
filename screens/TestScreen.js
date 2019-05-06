import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";
import Gradients from "../constants/Gradients";

class TestScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            this.props.navigation.navigate("First");
          }}
          title="Back"
        />
        <Text>Hey</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#ffffff",
    marginLeft: 20,
    marginRight: 20
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user: state.firebase.profile,
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
)(TestScreen);

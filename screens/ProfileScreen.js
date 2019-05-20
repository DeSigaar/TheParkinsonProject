import React, { Component } from "react";
import { StyleSheet, View, Alert, Button } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";

import { Header } from "../components/common";

class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    logOut: PropTypes.func,
    authError: PropTypes.string,
    user: PropTypes.object
  };

  render() {
    const { navigation, logOut, authError } = this.props;
    if (authError) Alert.alert(authError);

    return (
      <>
        <Header navigation={navigation} title="Profiel" />
        <View style={styles.container}>
          <Button title="Uitloggen" onPress={logOut} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 75
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authError: state.auth.authError,
    user: state.firebase.profile
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
)(ProfileScreen);

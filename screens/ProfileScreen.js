import React, { Component } from "react";
import { Alert, Button } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";

import { Header, Container } from "../components/common";

class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    logOut: PropTypes.func,
    authError: PropTypes.string
  };

  render() {
    const { navigation, logOut, authError } = this.props;
    if (authError) Alert.alert(authError);

    return (
      <>
        <Header navigation={navigation} title="Profiel" />
        <Container>
          <Button title="Uitloggen" onPress={logOut} />
        </Container>
      </>
    );
  }
}

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
)(ProfileScreen);

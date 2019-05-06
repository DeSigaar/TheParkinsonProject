import React, { Component } from "react";
import { StyleSheet, View, Alert, Button } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";
import { MenuItem } from "../components";
import Gradients from "../constants/Gradients";

class FirstScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    logOut: PropTypes.func,
    user: PropTypes.object,
    authError: PropTypes.string
  };

  render() {
    const { navigation, logOut, authError, user } = this.props;
    if (authError) Alert.alert(authError);

    console.log(user);

    return (
      <View style={styles.container}>
        <View style={styles.menuItemContainer}>
          <MenuItem title="Medicijnen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.blue} />
          <MenuItem
            title="Oefeningen"
            img="http://logodust.com/img/free/logo28.png"
            gradientColor={Gradients.green}
            onPress={() => navigation.navigate("ExerciseHomeScreen")}
          />
          <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} />
          <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} />
          <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} />
          {/* <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} /> */}
        </View>

        <Button title="2e scherm test" onPress={() => navigation.navigate("Second", { variable: 2 })} />
        <Button title="Uitloggen" onPress={logOut} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginLeft: 20,
    marginRight: 20
  },
  menuItemContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "stretch"
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
)(FirstScreen);

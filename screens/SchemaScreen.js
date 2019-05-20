import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";
import { SchemaItem } from "../components/schema";
import { SchemaMomentIndicator } from "../components/schema";
import Gradients from "../constants/Gradients";
import Colors from "../constants/Colors";
import Header from "../components/common/Header";

class SchemaScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    logOut: PropTypes.func,
    authError: PropTypes.string,
    user: PropTypes.object
  };

  render() {
    const { navigation, logOut, authError, user } = this.props;

    return (
      <>
        <Header navigation={navigation} title="Schema" />
        <ScrollView>
          <View style={styles.container}>
            <SchemaMomentIndicator moment="Ochtend">
              <SchemaItem
                title={"Neem uw medicijn"}
                description={"Dopamine - 200mg"}
                img={require("../assets/images/icon/medicatie.png")}
                gradientColor={Gradients.blue}
              />
              <SchemaItem
                title={"Stretches"}
                description={"Arm, been en rug stretches"}
                img={require("../assets/images/icon/oefeningen.png")}
                gradientColor={Gradients.green}
              />
            </SchemaMomentIndicator>

            <SchemaMomentIndicator moment="Middag">
              <SchemaItem
                title={"Stretches"}
                description={"Arm, been en rug stretches"}
                img={require("../assets/images/icon/oefeningen.png")}
                gradientColor={Gradients.green}
              />
            </SchemaMomentIndicator>
            <SchemaMomentIndicator moment="Ochtend">
              <SchemaItem
                title={"Neem uw medicijn"}
                description={"Dopamine - 200mg"}
                img={require("../assets/images/icon/medicatie.png")}
                gradientColor={Gradients.blue}
              />
              <SchemaItem
                title={"Stretches"}
                description={"Arm, been en rug stretches"}
                img={require("../assets/images/icon/oefeningen.png")}
                gradientColor={Gradients.green}
              />
            </SchemaMomentIndicator>

            <SchemaMomentIndicator moment="Middag">
              <SchemaItem
                title={"Stretches"}
                description={"Arm, been en rug stretches"}
                img={require("../assets/images/icon/oefeningen.png")}
                gradientColor={Gradients.green}
              />
            </SchemaMomentIndicator>
            <SchemaMomentIndicator moment="Ochtend">
              <SchemaItem
                title={"Neem uw medicijn"}
                description={"Dopamine - 200mg"}
                img={require("../assets/images/icon/medicatie.png")}
                gradientColor={Gradients.blue}
              />
              <SchemaItem
                title={"Stretches"}
                description={"Arm, been en rug stretches"}
                img={require("../assets/images/icon/oefeningen.png")}
                gradientColor={Gradients.green}
              />
            </SchemaMomentIndicator>

            <SchemaMomentIndicator moment="Middag">
              <SchemaItem
                title={"Stretches"}
                description={"Arm, been en rug stretches"}
                img={require("../assets/images/icon/oefeningen.png")}
                gradientColor={Gradients.green}
              />
            </SchemaMomentIndicator>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    padding: 20
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
    },
    setExpoPushToken: (uid, token) => {
      dispatch(setExpoPushToken(uid, token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchemaScreen);

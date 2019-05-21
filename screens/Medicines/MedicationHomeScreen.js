import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, ScrollView } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SchemaItem, SchemaMomentIndicator } from "../../components/schema";
import Gradients from "../../constants/Gradients";
import Colors from "../../constants/Colors";

import { Header } from "../../components/common";

class MedicationHomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.object,
    medicines: PropTypes.array
  };

  // constructor(props) {
  //   super(props);

  //   let { moments } = this.props;
  //   moments.forEach((moment, i) => {
  //     moments[i] = {
  //       ...moment,
  //       count: 0
  //     };
  //   });

  //   this.state = {0
  //     moments
  //   };
  // }

  render() {
    const { navigation, user, moments } = this.props;
    const { getParam } = navigation;

    if (moments) {
      moments.forEach((moment, i) => {
        console.log(moment.exercises);
      });
    }

    // console.log(moments);
    //(body)
    return (
      <>
        <Header
          navigation={navigation}
          title="Medicatie"
          actionType1="add"
          actionType2="delete"
          actionType3="arrow-left"
          actionPress1={() => navigation.navigate("MedicinesAddScreen")}
        />
        <ScrollView>
          <View style={[styles.container, Platform.OS === "ios" && styles.ios]}>
            <SchemaMomentIndicator moment="N">
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
            </SchemaMomentIndicator>
            <SchemaMomentIndicator moment="N">
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
            </SchemaMomentIndicator>
            <SchemaMomentIndicator moment="N">
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
            </SchemaMomentIndicator>
            <SchemaMomentIndicator moment="N">
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
            </SchemaMomentIndicator>
            <SchemaMomentIndicator moment="N">
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}
                gradientColor={Gradients.blue}
              />
            </SchemaMomentIndicator>
            <SchemaMomentIndicator moment="N">
              <SchemaItem
                title={"Naproxen"}
                description={"Naproxen 250mg"}
                // img={require("../assets/images/icon/home/medicatie.png")}as
                gradientColor={Gradients.blue}
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
  },
  ios: {
    marginTop: 100
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user: state.firebase.profile,
    moments: state.firebase.profile.moments
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicationHomeScreen);

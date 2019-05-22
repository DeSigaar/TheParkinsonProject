import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SchemaItem, SchemaMomentIndicator } from "../../components/schema";
import Gradients from "../../constants/Gradients";

import { Header, Container } from "../../components/common";

class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.array,
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
    const { navigation, moments } = this.props;

    if (moments) {
      moments.forEach((moment, i) => {
        // console.log(moment.exercises);
      });
    }

    return (
      <>
        <Header
          navigation={navigation}
          title="Medicatie"
          actionType1="add"
          actionType2="delete"
          actionType3="error"
          actionPress1={() => navigation.navigate("MedicinesAdd")}
          actionPress2={() => Alert.alert("Action2 is empty!")}
          actionPress3={() => Alert.alert("Action3 is empty!")}
          amountActions={3}
        />
        <Container type="ScrollView">
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
        </Container>
      </>
    );
  }
}

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
)(HomeScreen);

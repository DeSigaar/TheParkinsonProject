import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SchemaItem, SchemaMomentIndicator } from "../../components/schema";
import Gradients from "../../constants/Gradients";

import { Header, Container } from "../../components/common";

class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.array
  };

  //new
  getUniqueMedicines = () => {
    const { moments } = this.props;
    let uniqueMedicine = new Array();

    if (moments) {
      moments.forEach(moment => {
        moment.medicines.forEach(medicine => {
          if (uniqueMedicine.filter(m => m.name === medicine.name).length === 0) {
            uniqueMedicine.push(medicine);
          }
        });
      });

      return uniqueMedicine;
    }
  };

  showMedicinesContainer = () => {
    const medicines = this.getUniqueMedicines();
    if (medicines) {
      return <SchemaMomentIndicator moment="A">{this.loopMedicines(medicines)}</SchemaMomentIndicator>;
    } else {
      //image (medicine not found, see adobeXD)
      return <Text>Geen medicijnen ingesteld</Text>;
    }
  };

  loopMedicines = array => {
    return array.map(item => {
      return (
        <SchemaItem
          key={item.id}
          title={item.name}
          description={"description"}
          img={require("../../assets/images/icon/home/medicatie.png")}
          gradientColor={Gradients.blue}
        />
      );
    });
  };

  render() {
    const { navigation } = this.props;

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
        <Container type="ScrollView">{this.showMedicinesContainer()}</Container>
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

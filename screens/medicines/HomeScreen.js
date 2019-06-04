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
    moments: PropTypes.array,
    medicines: PropTypes.array
  };

  //new
  getUniqueMedicines = () => {
    const { moments } = this.props;
    let uniqueMedicine = [];
    let sortedMedicine = {};
    var currentLetter = "";

    // Filter all medicine so it only appears once.
    if (moments) {
      moments.forEach(moment => {
        moment.medicines.forEach(medicine => {
          if (uniqueMedicine.filter(m => m.name === medicine.name).length === 0) {
            uniqueMedicine.push(medicine);
          }
        });
      });

      // Sort medicines on alpabetical order
      uniqueMedicine.sort(function(a, b) {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      // Create new object with "letter" -> medcines
      uniqueMedicine.forEach((medicine, i) => {
        if (
          medicine.name
            .toUpperCase()
            .trim()
            .charAt(0) !== currentLetter
        ) {
          currentLetter = medicine.name
            .toUpperCase()
            .trim()
            .charAt(0);
          sortedMedicine[currentLetter] = [];
          sortedMedicine[currentLetter].push(medicine);
        } else {
          sortedMedicine[currentLetter].push(medicine);
        }
      });

      return sortedMedicine;
    }
  };

  showMedicinesContainer = () => {
    const medicines = this.getUniqueMedicines();

    if (medicines) {
      return Object.keys(medicines).map((key, index) => {
        return (
          <SchemaMomentIndicator moment={key} key={index}>
            {this.loopMedicines(medicines[key])}
          </SchemaMomentIndicator>
        );
      });
    } else {
      return <Text>Geen medicijnen ingesteld</Text>;
    }
  };

  loopMedicines = array => {
    const { navigation } = this.props;

    return array.map(item => {
      return (
        <SchemaItem
          key={item.id}
          title={item.name}
          description={"description"}
          img={require("../../assets/images/icon/home/medicatie.png")}
          gradientColor={Gradients.blue}
          onPress={() => navigation.navigate("MedicinesEdit", { id: item.id })}
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

import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import PropTypes from "prop-types";
import Gradients from "../../constants/Gradients";
import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";
import { LinearGradient } from "expo";

import { connect } from "react-redux";

import { addMedicines } from "../../store/actions/medicineActions";

import { Header, Container, Moments } from "../../components/common";

class MedicinesAdd extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.array.isRequired,
    addMedicines: PropTypes.func,
    inputName: PropTypes.string
  };

  constructor(props) {
    super(props);

    let { moments } = this.props;
    moments.forEach((moment, i) => {
      moments[i] = {
        ...moment,
        count: 0
      };
    });

    this.state = {
      isDateTimePickerVisible: false,
      inputName: " ",
      startText: "Vandaag",
      endText: "N.v.t.",
      startOrEnd: "",
      uniqid: "",
      moments
    };
  }

  handlePressMoment = (position, type) => {
    let { moments } = this.state;
    let count = moments[position].count;

    switch (type) {
      case "add":
        count++;
        break;
      case "remove":
        if (count !== 0) count--;
        break;
    }

    moments[position] = {
      ...moments[position],
      count
    };

    this.setState({ moments });
  };

  showAlert = () => {
    Alert.alert("Vul alle nodige velden in");
  };

  handleSubmit = () => {
    const { navigation, addMedicines, user } = this.props;
    let { moments } = this.state;

    const uuidv4 = require("uuid/v4");

    moments.forEach((moment, i) => {
      if (moment.count !== 0) {
        moments[i] = {
          ...moment,
          medicines: [
            ...moment.medicines,
            {
              id: uuidv4(),
              name: this.state.inputName,
              startTime: this.state.startText,
              endTime: this.state.endText,
              amount: moment.count
            }
          ]
        };
      }
      delete moments[i].count;
    });

    addMedicines(user.uid, moments);
    navigation.navigate("Medicines");
  };

  render() {
    const { navigation } = this.props;
    const { moments, inputName, startText, endText, isDateTimePickerVisible } = this.state;
    return (
      <>
        <Header navigation={navigation} title="Medicijn toevoegen" style={styles.header} />
        <Container type="ScrollView">
          {/* Naam */}
          <Text style={styles.inputHeader}>Naam van medicijn</Text>
          <TextInput
            style={styles.textInput}
            placeholder="medicijn"
            onChangeText={inputName => this.setState({ inputName })}
            value={inputName}
          />
          {/* Periode */}
          <Text style={styles.inputHeader}>Periode</Text>
          <View style={styles.datePickerBox}>
            <TouchableOpacity
              style={styles.datePickerButtonLeft}
              onPress={() => this.showDateTimePicker("start")}
              activeOpacity={0.8}
            >
              <View style={styles.textCenterHorizontalVertical}>
                <Text style={styles.datePickerBoxHeaderText}>Stardatum</Text>
                <Text style={styles.datePickerBoxText}>{startText}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datePickerButtonRight}
              onPress={() => this.showDateTimePicker("end")}
              activeOpacity={0.8}
            >
              <View style={styles.textCenterHorizontalVertical}>
                <Text style={styles.datePickerBoxHeaderText}>Einddatum</Text>
                <Text style={styles.datePickerBoxText}>{endText}</Text>
              </View>
            </TouchableOpacity>
            {/* TODO: !NOT WORKING! */}
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
            {/* TODO: !NOT WORKING! */}
          </View>
          {/* <PickerBox /> */}
          {/* Moments */}
          <View style={styles.momentsContainer}>
            <Moments moments={moments} colors={Gradients.blue} handlePress={this.handlePressMoment} />
          </View>
          {/* Submit button */}
          <TouchableOpacity style={styles.btnSubmit} onPress={() => this.handleSubmit()}>
            <LinearGradient
              colors={Gradients.blue}
              start={[0, 0]}
              end={[1, 1]}
              locations={[0.3, 1]}
              style={styles.gradient}
            >
              <Text style={styles.gradientText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    height: "100%",
    borderRadius: 13,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  gradientText: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: ProductSans.regular
  },
  textInput: {
    flex: 1,
    height: 50,
    borderColor: Colors.greyTextColor,
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 10,
    paddingLeft: 16,
    marginBottom: 16,
    fontFamily: ProductSans.regular
  },
  inputHeader: {
    fontSize: 20,
    color: Colors.greyTextColor,
    fontFamily: ProductSans.regular,
    marginBottom: 8
  },
  dayButton: {
    height: 50
  },
  inpuperiodeBoxtHeader: {
    width: 50
  },
  textCenterHorizontalVertical: {
    height: 75,
    justifyContent: "center",
    alignItems: "center"
  },
  datePickerBox: {
    height: 75,
    justifyContent: "center",
    flexDirection: "row"
  },
  datePickerBoxHeaderText: {
    color: Colors.lightGrey,
    fontFamily: ProductSans.regular,
    fontSize: 19
  },
  datePickerBoxText: {
    fontSize: 19,
    fontFamily: ProductSans.regular
  },
  datePickerButtonLeft: {
    width: "50%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderLeftColor: Colors.black,
    borderLeftWidth: 1.5,
    borderTopColor: Colors.black,
    borderTopWidth: 1.5,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1.5,
    marginRight: -1
  },
  datePickerButtonRight: {
    width: "50%",
    borderWidth: 1.5,
    textAlign: "center",
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10
  },
  btnSubmit: {
    flex: 1,
    height: 50,
    color: Colors.white,
    marginTop: 24,
    marginBottom: 80
  },
  momentsContainer: {
    flex: 1,
    marginTop: 24,
    backgroundColor: Colors.white
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
    ...ownProps,
    addMedicines: (uid, moments) => {
      dispatch(addMedicines(uid, moments));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicinesAdd);

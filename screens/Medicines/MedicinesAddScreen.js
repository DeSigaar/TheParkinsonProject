import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, Picker, TouchableOpacity } from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import PropTypes from "prop-types";
import Gradients from "../../constants/Gradients";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo";
import { Moments } from "../../components";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../../components/common/Header";

class MedicinesAdd extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.array.isRequired
  };

  static navigationOptions = {
    title: "MedicinesAddScreen"
  };

  constructor(props) {
    super(props);
    let { moments } = this.props;
    console.log(moments);
    moments.forEach((moment, i) => {
      moments[i] = {
        ...moment,
        count: 0
      };
    });
    this.state = {
      isDateTimePickerVisible: false,
      inputName: "",
      startText: "Vandaag",
      endText: "N.v.t.",
      startOrEnd: "",
      moments
    };
  }

  showDateTimePicker = endOrStart => {
    if (endOrStart == "start") {
      this.setState({ startOrEnd: endOrStart });
    } else if (endOrStart == "end") {
      this.setState({ startOrEnd: endOrStart });
    }

    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    let dateShorted = "";
    const timestamp = new Date(date).toString();
    var string = timestamp;
    for (let i = 4; i < 15; i++) {
      let letter = string.charAt(i);
      dateShorted += letter;
    }

    if (this.state.startOrEnd == "start") {
      this.setState({ startText: dateShorted });
    } else if (this.state.startOrEnd == "end") {
      this.setState({ endText: dateShorted });
    }
    if (Date.parse(this.state.startText) > Date.parse(this.state.endText)) {
      this.setState({ endText: this.state.startText });
    }
    if (Date.parse(this.state.endText) < Date.parse(this.state.startText)) {
      this.setState({ startText: this.state.endText });
    }

    this.hideDateTimePicker();
  };

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

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { moments } = this.state;
    return (
      <React.Fragment>
        <Header navigation={navigation} title="Medicijn toevoegen" style={styles.header} />

        <ScrollView style={styles.container}>
          {/* Back Button */}
          {/* <TouchableOpacity style={styles.btnBack} title="Go back" onPress={() => navigate("MedicinesHomeScreen")}>
          <LinearGradient
            colors={Gradients.blue}
            start={[0, 0]}
            end={[1, 1]}
            locations={[0.3, 1]}
            style={styles.gradient}
          >
            <Text style={styles.gradientText}>Back</Text>
          </LinearGradient>
        </TouchableOpacity> */}

          {/* Naam */}
          <Text style={styles.inputHeader}>Naam van medicijn</Text>
          <TextInput
            style={styles.textInput}
            placeholder="medicijn"
            onChangeText={inputName => this.setState({ inputName })}
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
                <Text style={styles.datePickerBoxText}>{this.state.startText}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.datePickerButtonRight}
              onPress={() => this.showDateTimePicker("end")}
              activeOpacity={0.8}
            >
              <View style={styles.textCenterHorizontalVertical}>
                <Text style={styles.datePickerBoxHeaderText}>Einddatum</Text>
                <Text style={styles.datePickerBoxText}>{this.state.endText}</Text>
              </View>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </View>

          {/* Moments */}
          <View style={styles.momentsContainer}>
            <View>
              <Moments moments={moments} colors={Gradients.blue} handlePress={this.handlePressMoment} />
            </View>
          </View>
          {/* Submit button */}
          <TouchableOpacity style={styles.btnSubmit}>
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
        </ScrollView>
      </React.Fragment>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",

    flex: 1,
    padding: 24,
    marginTop: 80
  },
  header: {
    flex: 1,
    height: "50%",
    color: "#fff"
  },
  btnBack: {
    flex: 1,
    height: "5%",
    color: "#fff"
  },
  gradient: {
    height: "100%",
    borderRadius: 13,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  gradientText: {
    color: "#fff"
  },

  // name

  textInput: {
    flex: 1,
    height: "5%",
    borderColor: "grey",
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 10,
    paddingLeft: 16,
    marginBottom: 16
  },
  inputHeader: {
    fontSize: 20,
    color: "#5A5A5A",
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

  //Datepickerstuff
  datePickerBox: {
    height: 75,
    justifyContent: "center",
    flexDirection: "row"
  },
  datePickerBoxHeaderText: {
    color: "#B1B1B1",
    fontSize: 19
  },
  datePickerBoxText: {
    fontSize: 19
  },
  datePickerButtonLeft: {
    width: "50%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderLeftColor: "#000",
    borderLeftWidth: 1.5,
    borderTopColor: "#000",
    borderTopWidth: 1.5,
    borderBottomColor: "#000",
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
    color: "#fff",
    marginTop: 24,
    marginBottom: 80
  },
  momentsContainer: {
    flex: 1,
    marginTop: 24,
    backgroundColor: Colors.white
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicinesAdd);

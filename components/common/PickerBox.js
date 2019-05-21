import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity, DateTimePicker } from "react-native";

class PickerBox extends Component {
  static propTypes = {
    prop: PropTypes
  };

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      inputName: "",
      startText: "Vandaag",
      endText: "N.v.t.",
      startOrEnd: "",
      uniqid: "",
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

  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});
export default PickerBox;

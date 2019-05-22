import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, DateTimePicker } from "react-native";

class PickerBox extends Component {
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
    const { startOrEnd, startText, endText } = this.state;

    let dateShorted = "";
    var timestamp = new Date(date).toString();
    for (let i = 4; i < 15; i++) {
      let letter = timestamp.charAt(i);
      dateShorted += letter;
    }

    if (startOrEnd == "start") {
      this.setState({ startText: dateShorted });
    } else if (startOrEnd == "end") {
      this.setState({ endText: dateShorted });
    }
    if (Date.parse(startText) > Date.parse(endText)) {
      this.setState({ endText: startText });
    }
    if (Date.parse(endText) < Date.parse(startText)) {
      this.setState({ startText: endText });
    }

    this.hideDateTimePicker();
  };

  render() {
    const { startText, endText, isDateTimePickerVisible } = this.state;

    return (
      <>
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
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>
      </>
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

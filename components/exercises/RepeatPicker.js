import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Daybutton from "../exercises/dayButton";
import { Picker, StyleSheet, TextInput, Text, View, TouchableHighlight } from "react-native";

class RepeatPicker extends Component {
  static propTypes = {
    header: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    inputplaceholderTextColor: PropTypes.string,
    pickerSelectedValue: PropTypes.string,
    onValueChange: PropTypes.func,
    state: PropTypes.object,
    toggleButton: PropTypes.func
  };
  render() {
    const {
      header,
      inputPlaceholder,
      inputplaceholderTextColor,
      pickerSelectedValue,
      onValueChange,
      state,
      toggleButton
    } = this.props;
    return (
      <View>
        <Text style={styles.inputHeader}>{header}</Text>
        <View style={styles.periodeBoxView}>
          <Text style={styles.periodeElke}>Elke</Text>
          <TextInput
            inputPlaceholder={inputPlaceholder}
            inputKeyBoardType="number-pad"
            inputplaceholderTextColor={inputplaceholderTextColor}
            style={styles.periodeBoxInputBox}
          />
          <View style={styles.periodeBoxPickerBox}>
            <Picker selectedValue={pickerSelectedValue} style={styles.dropdown} onValueChange={onValueChange}>
              <Picker.Item label="Dag" value="day" />
              <Picker.Item label="Week" value="week" />
              <Picker.Item label="Maand" value="month" />
            </Picker>
          </View>
        </View>
        <View style={styles.periodeBoxButtons}>
          <Daybutton
            buttonState={state["buttonMonday"]}
            buttonText="Ma"
            toggleButton={e => toggleButton("buttonMonday")}
          />
          <Daybutton
            buttonState={state["buttonTuesday"]}
            buttonText="Di"
            toggleButton={e => toggleButton("buttonTuesday")}
          />
          <Daybutton
            buttonState={state["buttonWednesday"]}
            buttonText="Wo"
            toggleButton={e => toggleButton("buttonWednesday")}
          />
          <Daybutton
            buttonState={state["buttonThursday"]}
            buttonText="Do"
            toggleButton={e => toggleButton("buttonThursday")}
          />
          <Daybutton
            buttonState={state["buttonFriday"]}
            buttonText="Fr"
            toggleButton={e => toggleButton("buttonFriday")}
          />
          <Daybutton
            buttonState={state["buttonSaturday"]}
            buttonText="Sa"
            toggleButton={e => toggleButton("buttonSaturday")}
          />
          <Daybutton
            buttonState={state["buttonSunday"]}
            buttonText="Su"
            toggleButton={e => toggleButton("buttonSunday")}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputHeader: {
    fontSize: 20,
    paddingTop: 16,
    color: "#5A5A5A"
  },
  periodeBoxView: {
    display: "flex",
    padding: 16,
    backgroundColor: "#A8E063",
    borderTopEndRadius: 13,
    borderTopLeftRadius: 13,
    flexWrap: "wrap",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  periodeBoxPickerBox: {
    width: "40%",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginLeft: 16
  },
  periodeBoxInputBox: {
    width: "15%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    color: "#fff",
    backgroundColor: "#A8E063"
  },
  dropdown: {
    color: "#fff"
  },
  periodeElke: {
    width: "100%",
    color: "#fff",
    fontSize: 19
  },
  dropdown: {
    color: "#fff"
  },
  //Weekbuttons start
  periodeBoxButtons: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "#56AB2F",
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13
  }

  //Weekbuttons end
});
const mapStateToProps = ownProps => {
  return {
    ...ownProps
  };
};

const mapDispatchToProps = ownProps => {
  return {
    ...ownProps
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepeatPicker);

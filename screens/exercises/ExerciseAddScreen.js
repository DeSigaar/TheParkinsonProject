import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Picker, TouchableOpacity, TextInput, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Input from "../../components/common/Input";
import DateTimePicker from "react-native-modal-datetime-picker";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo";
import Gradients from "../../constants/Gradients";
import Moments from "../../components/Moments";
import { ScrollView } from "react-native-gesture-handler";
import { addExercise } from "../../store/actions/exerciseActions";
import TextInputBox from "../../components/common/TextInput";

class ExerciseAddScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.array.isRequired,
    addExercise: PropTypes.func
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
      moments,
      buttonMonday: false,
      buttonTuesday: false,
      buttonWednesday: false,
      buttonThursday: false,
      buttonFriday: false,
      buttonSaturday: false,
      buttonSunday: false,
      oefeningHeader: "Oefening",
      periodeHeader: "Periode",
      repetitieHeader: "Repetitie oefening",
      momentsHeader: "Kies momenten",
      isDateTimePickerVisible: false,
      startText: "Vandaag",
      endText: "N.v.t.",
      startOrEnd: "",
      textInputName: "",
      days: ""
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
  toggleDateButton = buttonName => {
    this.setState({ [buttonName]: !this.state[buttonName] });
    this.setState({
      days: {
        monday: this.state.buttonMonday,
        tuesday: this.state.buttonTuesday,
        wednesday: this.state.buttonWednesday,
        thursday: this.state.buttonThursday,
        friday: this.state.buttonFriday,
        saturday: this.state.buttonSaturday,
        sunday: this.state.buttonSunday
      }
    });
  };
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
  handleSubmit = () => {
    const { addExercise, user } = this.props;
    let { moments } = this.state;
    const today = new Date().getDate();
    if (this.state.startText == "Vandaag") {
      this.setState({ startText: today });
    }

    moments.forEach((moment, i) => {
      if (moment.count !== 0) {
        moments[i] = {
          ...moment,
          exercises: [
            ...moment.exercises,
            {
              id: Math.floor(Math.random() * 11111111),
              name: this.state.textInputName,
              startDate: this.state.startText,
              endDate: this.state.endText,
              days: this.state.days
            }
          ]
        };
      }
      delete moments[i].count;
    });
    addExercise(user.uid, moments);
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

  static navigationOptions = {
    title: "Second"
  };

  render() {
    const { moments } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Button title="Go back" onPress={() => navigate("ExerciseHomeScreen")} />

        <TextInputBox
          header={this.state.oefeningHeader}
          onChangeText={textInputName => this.setState({ textInputName })}
          placeholder="Test1"
        >
          {this.state.textInputName}
        </TextInputBox>
      
        <View>
          <Text style={styles.inputHeader}>{this.state.periodeHeader}</Text>
        </View>
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
        {/*--------------------------------  NEEDS TO BE A COMPONENT----------------------------------------------- */}
        <View>
          <Text style={styles.inputHeader}>{this.state.repetitieHeader}</Text>
          <View style={styles.periodeBoxView}>
            <Text style={styles.periodeElke}>Elke</Text>
            <TextInput
              placeholderTextColor="#fff"
              style={styles.periodeBoxInputBox}
              keyboardType="number-pad"
              placeholder="10"
            />

            <View style={styles.periodeBoxPickerBox}>
              <Picker
                selectedValue={this.state.indication}
                style={styles.dropdown}
                onValueChange={(itemValue, itemIndex) => this.setState({ indication: itemValue })}
              >
                <Picker.Item label="Dag" value="day" />
                <Picker.Item label="Week" value="week" />
                <Picker.Item label="Maand" value="month" />
              </Picker>
            </View>
          </View>
          <View style={styles.periodeBoxButtons}>
            <TouchableHighlight
              activeOpacity={0.4}
              style={this.state.buttonMonday ? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}
              onPress={() => this.toggleDateButton("buttonMonday")}
            >
              <View style={styles.weekButton}>
                <Text style={styles.weekButtonText}>Ma</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.buttonTuesday ? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}
              onPress={() => this.toggleDateButton("buttonTuesday")}
            >
              <View style={styles.weekButton}>
                <Text style={styles.weekButtonText}>Di</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.buttonWednesday ? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}
              onPress={() => this.toggleDateButton("buttonWednesday")}
            >
              <View style={styles.weekButton}>
                <Text style={styles.weekButtonText}>Wo</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.buttonThursday ? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}
              onPress={() => this.toggleDateButton("buttonThursday")}
            >
              <View style={styles.weekButton}>
                <Text style={styles.weekButtonText}>Do</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.buttonFriday ? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}
              onPress={() => this.toggleDateButton("buttonFriday")}
            >
              <View style={styles.weekButton}>
                <Text style={styles.weekButtonText}>Vr</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.buttonSaturday ? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}
              onPress={() => this.toggleDateButton("buttonSaturday")}
            >
              <View style={styles.weekButton}>
                <Text style={styles.weekButtonText}>Za</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.buttonSunday ? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}
              onPress={() => this.toggleDateButton("buttonSunday")}
            >
              <View style={styles.weekButton}>
                <Text style={styles.weekButtonText}>Zo</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.momentenDoos}>
          <Text style={styles.inputHeader}>{this.state.momentsHeader}</Text>
          <Moments moments={moments} colors={Gradients.green} handlePress={this.handlePressMoment} />
        </View>
        <TouchableOpacity style={styles.btnSubmit} onPress={() => this.handleSubmit()}>
          <LinearGradient
            colors={Gradients.green}
            start={[0, 0]}
            end={[1, 1]}
            locations={[0.3, 1]}
            style={styles.gradient}
          >
            <Text style={styles.gradientText}>Oefening Toevoegen</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20
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
    flex: 1,
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    borderLeftColor: "#000",
    borderLeftWidth: 1,
    borderTopColor: "#000",
    borderTopWidth: 1,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginRight: -1
  },
  datePickerButtonRight: {
    width: "50%",
    flex: 1,
    borderWidth: 1,
    textAlign: "center",
    borderTopEndRadius: 13,
    borderBottomRightRadius: 13
  },
  //End Datepickerstuff
  //Start periodeBox
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
  //End periodeBox
  //Weekbuttons start
  periodeBoxButtons: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "#56AB2F",
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13
  },
  weekButton: {
    textAlign: "center"
  },
  weekButtonText: {
    color: "white",
    textAlign: "center"
  },
  weekButtonsBoxActive: {
    width: 40,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    height: 40,
    borderRadius: 20000,
    backgroundColor: "green"
  },
  weekButtonsBoxInActive: {
    width: 40,
    marginTop: 10,
    opacity: 0.4,
    marginBottom: 10,
    justifyContent: "center",
    height: 40,
    borderRadius: 20000,
    backgroundColor: "#489428"
  },
  //Weekbuttons end
  momentenDoos: {
    marginTop: 15
  },
  btnSubmit: {
    width: "100%",
    height: 50,
    color: "#fff",
    marginTop: 24,
    marginBottom: 80
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
    addExercise: (id, moments) => {
      dispatch(addExercise(id, moments));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseAddScreen);

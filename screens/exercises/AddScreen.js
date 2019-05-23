import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RepeatPicker from "../../components/exercises/RepeatPicker";
import { updateMoments } from "../../store/actions/firebaseActions";
import { Header, Container } from "../../components/common";
import { TextInputWithHeader, MomentsWithHeader, PeriodPickerWithHeader, SubmitButton } from "../../components/forms";
import Gradients from "../../constants/Gradients";

class AddScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.array.isRequired,
    updateMoments: PropTypes.func
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
      name: "",
      startText: "Vandaag",
      endText: "N.v.t.",
      isDateTimePickerVisible: false,
      startOrEnd: "",
      days: "",
      buttonMonday: false,
      buttonTuesday: false,
      buttonWednesday: false,
      buttonThursday: false,
      buttonFriday: false,
      buttonSaturday: false,
      buttonSunday: false
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
    const timestamp = new Date(date).toString();
    var string = timestamp;
    for (let i = 4; i < 15; i++) {
      let letter = string.charAt(i);
      dateShorted += letter;
    }

    // TODO: This logic isn't flawless / doesn't work correctly
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

  handleSubmit = () => {
    const { navigation, updateMoments, user } = this.props;
    const { name, startText, endText, days } = this.state;

    let { moments } = this.state;
    const uuidv4 = require("uuid/v4");

    const today = new Date().getDate();
    if (startText == "Vandaag") {
      this.setState({ startText: today });
    }

    moments.forEach((moment, i) => {
      if (moment.count !== 0) {
        moments[i] = {
          ...moment,
          exercises: [
            ...moment.exercises,
            {
              id: uuidv4(),
              name,
              startTime: startText,
              startDate: endText,
              amount: moment.count,
              days
            }
          ]
        };
      }
      delete moments[i].count;
    });

    updateMoments(user.uid, moments);
    navigation.navigate("Exercises");
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

  render() {
    const { navigation } = this.props;
    const { moments, name, startText, endText, isDateTimePickerVisible } = this.state;

    return (
      <>
        <Header navigation={navigation} title="Oefening toevoegen" />
        <Container type="ScrollView">
          <TextInputWithHeader
            header="Naam van oefening"
            onChangeText={name => {
              this.setState({ name });
            }}
            value={name}
          />

          <PeriodPickerWithHeader
            onPress={endOrStart => this.showDateTimePicker(endOrStart)}
            startText={startText}
            endText={endText}
            isVisible={isDateTimePickerVisible}
            onConfirm={date => this.handleDatePicked(date)}
            onCancel={() => this.hideDateTimePicker()}
          />

          {/* TODO: See if this is needed */}
          <RepeatPicker
            header={this.state.repetitieHeader}
            inputPlaceholder="10"
            inputplaceholderTextColor="#fff"
            pickerSelectedValue={this.state.indication}
            state={this.state}
            toggleButton={this.toggleDateButton}
            onValueChange={(item, i) => this.setState({ indication: item })}
          />

          <MomentsWithHeader
            moments={moments}
            gradient={Gradients.green}
            handlePressMoment={(position, type) => this.handlePressMoment(position, type)}
          />

          <SubmitButton handleSubmit={() => this.handleSubmit()} gradient={Gradients.green} text="Voeg oefening toe" />
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
    ...ownProps,
    updateMoments: (uid, moments) => {
      dispatch(updateMoments(uid, moments));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddScreen);

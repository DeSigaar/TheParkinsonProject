import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
      name: " ",
      startText: "Vandaag",
      endText: "N.v.t.",
      isDateTimePickerVisible: false,
      startOrEnd: "",
      days: ""
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
          medicines: [
            ...moment.medicines,
            {
              id: uuidv4(),
              name,
              startTime: startText,
              endTime: endText,
              amount: moment.count,
              days
            }
          ]
        };
      }
      delete moments[i].count;
    });

    updateMoments(user.uid, moments);
    navigation.navigate("Medicines");
  };

  render() {
    const { navigation } = this.props;
    const { moments, name, startText, endText, isDateTimePickerVisible } = this.state;

    return (
      <>
        <Header navigation={navigation} title="Medicijn toevoegen" />
        <Container type="ScrollView">
          <TextInputWithHeader
            header="Naam van medicijn"
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

          {/* TODO: See if <RepeatPicker /> is needed */}

          <MomentsWithHeader
            moments={moments}
            gradient={Gradients.blue}
            handlePressMoment={(position, type) => this.handlePressMoment(position, type)}
          />

          <SubmitButton handleSubmit={() => this.handleSubmit()} gradient={Gradients.blue} text="Voeg medicijn toe" />
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

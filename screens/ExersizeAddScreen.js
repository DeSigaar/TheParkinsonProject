import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PropTypes from "prop-types";
import Input from "../components/common/Input";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class ExersizeAddScreen extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      oefeningHeader: "Oefening",
      periodeHeader: "Periode",
      isDateTimePickerVisible: false
    };
  } 

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "Second"
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const variable = navigation.getParam("variable", 1);
    return (
      <View style={styles.container}>
       <Button title="Go back" onPress={() => navigate("ExerciseHomeScreen")} />
        <Text>Second screen (Variable: {variable})</Text>
        <Text style={styles.inputHeader}>{this.state.inputHeader}</Text>
        <Input placeholder="Test"></Input>
        <Text style={styles.inputHeader}>{this.state.periodeHeader}</Text>
        <Input placeholder="Test"></Input>



        <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  inputHeader: {
    fontSize: 20
  }
});

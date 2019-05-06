import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Picker, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Input from "../../components/common/Input";
import DateTimePicker from "react-native-modal-datetime-picker";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo";
import Gradients from "../../constants/Gradients";

export default class ExersizeAddScreen extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      oefeningHeader: "Oefening",
      periodeHeader: "Periode",
      repetitieHeader: "Repetitie oefening",
      isDateTimePickerVisible: false,
      startText: "Vandaag",
      endText: "N.v.t.",
      startOrEnd: ""
    };
  } 

  showDateTimePicker = endOrStart => {
    if(endOrStart == "start"){
      this.setState({startOrEnd: endOrStart });
    } else if (endOrStart == "end"){
      this.setState({startOrEnd: endOrStart });
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
    for(let i = 4; i < 15; i++){ 
      let letter = string.charAt(i);
      dateShorted += letter;
    }
  
    if(this.state.startOrEnd == "start"){
      this.setState({startText: dateShorted}); 
    }else if (this.state.startOrEnd == "end"){
      this.setState({endText: dateShorted}); 
    }
    if(Date.parse(this.state.startText) > Date.parse(this.state.endText)){
      this.setState({endText: this.state.startText}); 
    } 


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
    return (
      <View style={styles.container}>
        <Button title="Go back" onPress={() => navigate("ExerciseHomeScreen")} /> 
        <View>
          <Text style={styles.inputHeader}>{this.state.oefeningHeader}</Text>
          <View style={styles.textInputBox}>
            <Input style={styles.textInput} placeholder="Test1"></Input>
          </View>
        </View>
        <View>
          <Text style={styles.inputHeader}>{this.state.periodeHeader}</Text>
          <View style={styles.textInputBox}>
            <Input placeholder="Test1"></Input>
          </View>
        </View>
        <View style={styles.datePickerBox}>
          <TouchableOpacity style={styles.datePickerButtonLeft} onPress={() => this.showDateTimePicker('start')} activeOpacity={0.8} > 
            <View style={styles.textCenterHorizontalVertical}>
              <Text style={styles.datePickerBoxHeaderText}>Stardatum</Text>
              <Text style={styles.datePickerBoxText}>{this.state.startText}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datePickerButtonRight} onPress={() => this.showDateTimePicker('end')} activeOpacity={0.8} >
          
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
        <View>
          <Text style={styles.inputHeader}>{this.state.repetitieHeader}</Text>
          <View style={styles.periodeBoxView}>
            <Input style={styles.periodeBoxInput} placeholder="Test"></Input>
            <Picker
              selectedValue={this.state.indication}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({indication: itemValue})
              }>
              <Picker.Item label="Dag" value="day" />
              <Picker.Item label="Week" value="week" />
              <Picker.Item label="Maand" value="month" />
            </Picker> 
            <View style={styles.periodeBoxButtons}>
              <Button onPress={() => doNothing()} style={styles.dayButton} title="Ma"></Button>
              <Button onPress={() => doNothing()} style={styles.dayButton} title="Di"></Button>
              <Button onPress={() => doNothing()} style={styles.dayButton} title="Wo"></Button>
              <Button onPress={() => doNothing()} style={styles.dayButton} title="Do"></Button>
              <Button onPress={() => doNothing()} style={styles.dayButton} title="Vr"></Button>
              <Button onPress={() => doNothing()} style={styles.dayButton} title="Za"></Button>
              <Button onPress={() => doNothing()} style={styles.dayButton} title="Zo"></Button>
            </View>
            <Text>Test</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20
  },
  textInputBox: {
    borderWidth: 1.5,
    borderColor: '#5A5A5A',
    borderRadius: 15,
  },  
  textInput: {
    alignSelf:'center'
  },
  inputHeader: {
    fontSize: 20,
    color: '#5A5A5A'
  },
  dayButton: {
    height: 50
  },
  inpuperiodeBoxtHeader: {
    width: 50
  },    
  dropdown: {
    width: 50
  },
  periodeBoxInput: {
    width: 50
  },
  textCenterHorizontalVertical: {
    height: 75, 
    justifyContent:"center", 
    alignItems:"center"
  },
  //Datepickerstuff
  datePickerBox: {
    marginTop: 50,
    height: 75,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  datePickerBoxHeaderText: {
    color: '#B1B1B1',
    fontSize: 19
  },
  datePickerBoxText: {
    fontSize: 19
  },
  datePickerButtonLeft: {
    width: '50%',
    flex: 1, 
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderLeftColor: '#000',
    borderLeftWidth: 1.5,
    borderTopColor: '#000',
    borderTopWidth: 1.5,
    borderBottomColor: '#000',
    borderBottomWidth: 1.5,
    marginRight: -1
  },  
  datePickerButtonRight: {
    width: '50%',
    flex: 1,
    borderWidth: 1.5,
    textAlign: 'center',
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10,
  },

});

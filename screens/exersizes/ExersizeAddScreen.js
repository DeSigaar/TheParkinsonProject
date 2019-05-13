import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Picker, TouchableOpacity, TextInput } from "react-native";
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
      startOrEnd: "",
      buttonMonday: false,
      buttonTuesday: false,
      buttonWednesday: false,
      buttonThursday: false,
      buttonFriday: false,
      buttonSaturday: false,
      buttonSunday: false,
    };
  } 
  ToggleButtonFunction = (buttonName) =>{
    this.setState({[buttonName]: !this.state[buttonName]});
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
    if(Date.parse(this.state.endText) < Date.parse(this.state.startText)){
      this.setState({startText: this.state.endText}); 
    }
    console.log(this.state.startText);
    console.log(this.state.endText);
    console.log("_______");


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
        <TextInput style={styles.textInput} placeholder="Test1"></TextInput>
      </View>
      <View>
        <Text style={styles.inputHeader}>{this.state.periodeHeader}</Text>
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
      {/* -------------------------------------------------------------------------------------------------------------- */}
      <View>
        <Text style={styles.inputHeader}>{this.state.repetitieHeader}</Text>
        <View style={styles.periodeBoxView}>
          <Text style={styles.periodeElke}>Elke</Text>
          <TextInput placeholderTextColor="#fff" style={styles.periodeBoxInputBox} keyboardType="number-pad" placeholder="10"></TextInput>
        
          <View style={styles.periodeBoxPickerBox}>
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
          </View>
        </View>
        <View style={styles.periodeBoxButtons}>
          <TouchableOpacity style={ this.state.buttonMonday? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive} onPress={() => this.ToggleButtonFunction("buttonMonday") }  activeOpacity={0.8} > 
            <View style={styles.weekButton}>
              <Text style={styles.weekButtonText}>Ma</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={ this.state.buttonTuesday? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive} onPress={() => this.ToggleButtonFunction("buttonTuesday")} activeOpacity={0.8} > 
          <View style={styles.weekButton}>
            <Text style={styles.weekButtonText}>Di</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={ this.state.buttonWednesday? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}  onPress={() => this.ToggleButtonFunction("buttonWednesday")}  activeOpacity={0.8} > 
            <View style={styles.weekButton}>
              <Text style={styles.weekButtonText}>Wo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={ this.state.buttonThursday? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}  onPress={() => this.ToggleButtonFunction("buttonThursday")}  activeOpacity={0.8} > 
            <View style={styles.weekButton}>
              <Text style={styles.weekButtonText}>Do</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={ this.state.buttonFriday? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}  onPress={() => this.ToggleButtonFunction("buttonFriday")}  activeOpacity={0.8} > 
            <View style={styles.weekButton}>
              <Text style={styles.weekButtonText}>Vr</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={ this.state.buttonSaturday? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}  onPress={() => this.ToggleButtonFunction("buttonSaturday")}  activeOpacity={0.8} > 
            <View style={styles.weekButton}>
              <Text style={styles.weekButtonText}>Za</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={ this.state.buttonSunday? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}  onPress={() => this.ToggleButtonFunction("buttonSunday")}  activeOpacity={0.8} > 
            <View style={styles.weekButton}>
              <Text style={styles.weekButtonText}>Zo</Text>
            </View>
          </TouchableOpacity>
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
  textInput: {
    width: "100%",
    height: 36,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 13,
    paddingLeft: 5,
    paddingLeft: 5
  },
  inputHeader: {
    fontSize: 20,
    paddingTop: 16,
    color: '#5A5A5A'
  },
  dayButton: {
    height: 50
  },
  inpuperiodeBoxtHeader: {
    width: 50
  },    
 

  textCenterHorizontalVertical: {
    height: 75, 
    justifyContent:"center", 
    alignItems:"center"
  },
  //Datepickerstuff
  datePickerBox: {
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
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    borderLeftColor: '#000',
    borderLeftWidth: 1,
    borderTopColor: '#000',
    borderTopWidth: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginRight: -1
  },  
  datePickerButtonRight: {
    width: '50%',
    flex: 1,
    borderWidth: 1,
    textAlign: 'center',
    borderTopEndRadius: 13,
    borderBottomRightRadius: 13,
  },
  //End Datepickerstuff
  //Start periodeBox
  periodeBoxView: {
    display: 'flex',
    padding: 16,
    backgroundColor: '#A8E063',
    borderTopEndRadius: 13,
    borderTopLeftRadius: 13,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  periodeBoxPickerBox: {
    width: '40%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginLeft: 16
  },
  periodeBoxInputBox: {
   width: '15%',
   textAlign: 'center',
   borderBottomWidth: 1,
   borderBottomColor: '#fff',
   color: '#fff',
   backgroundColor: '#A8E063',
   

  },
  dropdown: {
    color: '#fff'
  }, 
  periodeElke :{
    width: '100%',
    color: '#fff',
    fontSize: 19
  },
  //End periodeBox
  //Weekbuttons start
  periodeBoxButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#56AB2F',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  weekButton :{
    textAlign: 'center'
  },
  weekButtonText :{
    color: 'white',
    textAlign: 'center',
  },
  weekButtonsBoxActive :{
    width: 40,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    height: 40,
    borderRadius: 20000,
    backgroundColor: 'green',
  },
  weekButtonsBoxInActive :{
    width: 40,
    marginTop: 10,
    opacity: 0.5,
    marginBottom: 10,
    justifyContent: 'center',
    height: 40,
    borderRadius: 20000,
    backgroundColor: 'green',
  }
  //Weekbuttons end
});

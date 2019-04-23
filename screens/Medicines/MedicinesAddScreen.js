import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import PropTypes from "prop-types";
import Gradients from "../../constants/Gradients";



class MedicinesAdd extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "MedicinesAddScreen"
  };


  render() {
    return (
      <View style={styles.container}>
        
      </View>
    )


  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff"
  }
});
  
export default MedicinesAdd;

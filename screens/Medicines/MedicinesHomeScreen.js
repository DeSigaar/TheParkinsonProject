import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PropTypes from "prop-types";
import { MenuItem } from "../../components";
import Gradients from "../../constants/Gradients";

 class MedicinesHomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "MedicinesHomeScreen"
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const variable = navigation.getParam("variable", 1);
    return (
      <View style={styles.container}>
        <Text>medicine</Text>
        <Button title="Go back" onPress={() => navigate("First")} />
        <View>
          <MenuItem title="Add" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} onPress={() => navigate("MedicinesAddScreen")}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
    paddingTop: "10%"
  }
});

export default MedicinesHomeScreen;

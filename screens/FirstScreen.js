import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PropTypes from "prop-types";
import { MenuItem } from "../components";
import Gradients from "../constants/Gradients";

export default class FirstScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "First"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.menuItemContainer}>
          <MenuItem title="Medicijnen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.blue} />
          <MenuItem
            title="Oefeningen"
            img="http://logodust.com/img/free/logo28.png"
            gradientColor={Gradients.green}
            onPress={() => navigate("ExerciseHomeScreen")}
          />
          <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} />
          <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} />
          <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} />
          {/* <MenuItem title="Oefeningen" img="http://logodust.com/img/free/logo28.png" gradientColor={Gradients.green} /> */}
        </View>

        <Button title="Go to second screen" onPress={() => navigate("Second", { variable: 2 })} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginLeft: 20,
    marginRight: 20
  },
  menuItemContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});

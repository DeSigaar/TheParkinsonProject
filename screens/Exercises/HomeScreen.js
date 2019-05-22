import React, { Component } from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

import { Header, Container } from "../../components/common";

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  render() {
    const { navigation } = this.props;
    const { getParam } = navigation;
    const variable = getParam("variable", 1);
    return (
      <>
        <Header navigation={navigation} title="Oefeningen" />
        <Container>
          <Text>Screen with variable {variable}</Text>
        </Container>
      </>
    );
  }
}

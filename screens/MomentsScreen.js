import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Header } from "../components/common";
import { Moments } from "../components";

import Gradients from "../constants/Gradients";

class MomentsScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.array.isRequired
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
      moments
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

  render() {
    const { navigation } = this.props;
    const { moments } = this.state;

    return (
      <>
        <Header navigation={navigation} title="Momenten" />
        <View style={styles.container}>
          <Moments moments={moments} colors={Gradients.blue} handlePress={this.handlePressMoment} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 75
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
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MomentsScreen);

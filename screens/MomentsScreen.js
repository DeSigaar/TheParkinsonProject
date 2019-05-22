import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Header, Container, Moments } from "../components/common";

import Gradients from "../constants/Gradients";

class MomentsScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
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
        <Container>
          <Moments moments={moments} colors={Gradients.blue} handlePress={this.handlePressMoment} />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
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

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import Header from "../components/common/Header";
import Moments from "../components/Moments";

import Gradients from "../constants/Gradients";

class MomentsScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.array
  };

  renderMoments() {
    const { moments } = this.props;

    const sortedMoments = moments.sort((a, b) => {
      return a.time.seconds - b.time.seconds;
    });

    return sortedMoments.map(sortedMoment => {
      return (
        <View key={sortedMoment.id} style={{ height: 50, width: "100%", marginBottom: 10 }}>
          <LinearGradient
            style={{
              height: 50,
              width: "100%",
              borderRadius: 13,
              padding: 13,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
            colors={Gradients.blue}
            start={[0, 0]}
            end={[1, 1]}
            locations={[0.3, 1]}
          >
            <Text style={{ color: "white", fontFamily: "product-sans" }}>{sortedMoment.name}</Text>
            <Text style={{ color: "white", fontFamily: "product-sans" }}>
              {moment(sortedMoment.time.seconds * 1000).format("HH:mm")}
            </Text>
          </LinearGradient>
        </View>
      );
    });
  }

  render() {
    const { navigation, moments } = this.props;

    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Momenten" />
        <View style={styles.inner}>
          {/* <View>{this.renderMoments()}</View> */}
          <Moments moments={moments} colors={Gradients.blue} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#ffffff"
  },
  inner: {
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

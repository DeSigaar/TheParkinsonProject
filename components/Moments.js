import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo";
import PropTypes from "prop-types";
import moment from "moment";

export default class Moments extends Component {
  static propTypes = {
    moments: PropTypes.array,
    colors: PropTypes.array
  };

  renderMoments() {
    const { moments, colors } = this.props;

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
            colors={colors}
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
    return (
      <View style={styles.container}>
        <Text style={{ color: "black", backgroundColor: "yellow" }}>Hello</Text>

        <View>{this.renderMoments()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});

import React, { Component } from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SchemaItem, SchemaMomentIndicator } from "../components/schema";
import { Header, Container } from "../components/common";
import Gradients from "../constants/Gradients";

class SchemaScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.array
  };

  getMoments = () => {
    const { moments } = this.props;
    if (moments) {
      return moments.map(moment => {
        return (
          <SchemaMomentIndicator moment={moment.name} key={moment.id}>
            {this.loopItems(moment.medicines, "medicines")}
            {this.loopItems(moment.exercises, "exercises")}
            {this.loopItems(moment.activities, "activities")}
          </SchemaMomentIndicator>
        );
      });
    } else {
      return <Text>Geen informatie voor vandaag</Text>;
    }
  };

  getDay = () => {
    var d = new Date();
    var weekdays = new Array(7);
    weekdays[0] = "sunday";
    weekdays[1] = "monday";
    weekdays[2] = "tuesday";
    weekdays[3] = "wednesday";
    weekdays[4] = "thursday";
    weekdays[5] = "friday";
    weekdays[6] = "saturday";
    return weekdays[d.getDay()];
  };

  loopItems = (array, type) => {
    return array.map(item => {
      let title, img, gradient, description;

      switch (type) {
        default:
        case "medicines":
          title = "Neem uw medicijn";
          const amountString = item.amount > 1 ? "stuks" : "stuk";
          description = item.name + " - " + item.amount + " " + amountString;
          img = require("../assets/images/icon/home/medicatie.png");
          gradient = Gradients.blue;
          break;
        case "exercises":
          title = "Doe uw oefeningen";
          description = item.name;
          img = require("../assets/images/icon/home/oefeningen.png");
          gradient = Gradients.green;
          break;
        case "activities":
          title = item.name;
          img = require("../assets/images/icon/home/activiteiten.png");
          gradient = Gradients.red;
          break;
      }

      if (type == "exercises" && !item.days[this.getDay()]) {
        return;
      } else {
        return <SchemaItem title={title} description={description} img={img} gradientColor={gradient} key={item.id} />;
      }
    });
  };

  render() {
    const { navigation } = this.props;

    return (
      <>
        <Header navigation={navigation} title="Schema" />
        <Container type="ScrollView">{this.getMoments()}</Container>
      </>
    );
  }
}

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
)(SchemaScreen);

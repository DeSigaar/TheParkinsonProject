import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SchemaItem, SchemaMomentIndicator } from "../../components/schema";
import Gradients from "../../constants/Gradients";

import { Header, Container } from "../../components/common";

class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    moments: PropTypes.array,
    exercises: PropTypes.array
  };

  //new
  getUniqueExercises = () => {
    const { moments } = this.props;
    let uniqueExercise = [];
    let sortedExercise = {};
    var currentLetter = "";

    // Filter all Exercise so it only appears once.
    if (moments) {
      moments.forEach(moment => {
        moment.exercises.forEach(exercise => {
          if (uniqueExercise.filter(m => m.name === exercise.name).length === 0) {
            uniqueExercise.push(exercise);
          }
        });
      });

      // Sort Exercises on alpabetical order
      uniqueExercise.sort(function(a, b) {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      // Create new object with "letter" -> medcines
      uniqueExercise.forEach((exercise, i) => {
        if (
          exercise.name
            .toUpperCase()
            .trim()
            .charAt(0) !== currentLetter
        ) {
          currentLetter = exercise.name
            .toUpperCase()
            .trim()
            .charAt(0);
          sortedExercise[currentLetter] = [];
          sortedExercise[currentLetter].push(exercise);
        } else {
          sortedExercise[currentLetter].push(exercise);
        }
      });

      return sortedExercise;
    }
  };

  showExercisesContainer = () => {
    const exercises = this.getUniqueExercises();

    if (exercises) {
      return Object.keys(exercises).map((key, index) => {
        return (
          <SchemaMomentIndicator moment={key} key={index}>
            {this.loopExercises(exercises[key])}
          </SchemaMomentIndicator>
        );
      });
    } else {
      return <Text>Geen medicijnen ingesteld</Text>;
    }
  };

  loopExercises = array => {
    const { navigation } = this.props;

    return array.map(item => {
      return (
        <SchemaItem
          key={item.id}
          title={item.name}
          description={"description"}
          img={require("../../assets/images/icon/home/oefeningen.png")}
          gradientColor={Gradients.green}
          onPress={() => navigation.navigate("ExercisesEdit", { id: item.id })}
        />
      );
    });
  };

  render() {
    const { navigation } = this.props;

    return (
      <>
        <Header
          navigation={navigation}
          title="Oefeningen"
          actionType1="add"
          actionType2="delete"
          actionType3="error"
          actionPress1={() => navigation.navigate("ExercisesAdd")}
          actionPress2={() => Alert.alert("Action2 is empty!")}
          actionPress3={() => Alert.alert("Action3 is empty!")}
          amountActions={3}
        />
        <Container type="ScrollView">{this.showExercisesContainer()}</Container>
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
)(HomeScreen);

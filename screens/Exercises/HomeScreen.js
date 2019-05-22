import React, { Component } from "react";
import { StyleSheet, Text, ScrollView, View, Platform } from "react-native";
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

  getUniqueExercises = () => {
    const { moments } = this.props;
    let uniqueExercises = new Array();

    if (moments) {
      moments.forEach(moment => {
        moment.exercises.forEach(exercise => {
          if (uniqueExercises.filter(e => e.name === exercise.name).length === 0) {
            uniqueExercises.push(exercise);
          }
        });
      });

      return uniqueExercises;
    }
  };

  showExercisesContainer = () => {
    const exercises = this.getUniqueExercises();
    if (exercises) {
      return <SchemaMomentIndicator moment="A">{this.loopExercises(exercises)}</SchemaMomentIndicator>;
    } else {
      //image (medicine not found, see adobeXD)
      return <Text>Geen oefeningen ingesteld</Text>;
    }
  };

  loopExercises = array => {
    return array.map(item => {
      return (
        <SchemaItem
          key={item.id}
          title={item.name}
          description={"description"}
          img={require("../../assets/images/icon/home/oefeningen.png")}
          gradientColor={Gradients.green}
        />
      );
    });
  };

  render() {
    const { navigation, user, moments } = this.props;
    const { getParam } = navigation;

    return (
      <>
        <Header
          navigation={navigation}
          title="Oefeningen"
          actionType1="add"
          actionType2="delete"
          actionType3="error"
          actionPress1={() => navigation.navigate("ExerciseAddScreen")}
          actionPress2={() => Alert.alert("Action2 is empty!")}
          actionPress3={() => Alert.alert("Action3 is empty!")}
          amountActions={3}
        />
        <ScrollView>
          <View style={[styles.container, Platform.OS === "ios" && styles.ios]}>{this.showExercisesContainer()}</View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    padding: 20
  },
  ios: {
    marginTop: 100
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
)(HomeScreen);

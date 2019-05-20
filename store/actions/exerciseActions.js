import * as firebase from "firebase";

export const addExercise = (id, moments) => {
  return dispatch => {
    // Add new exercises to the moment in firebase
    // firebase call to add 
    firebase.firestore().collection("users").doc(id).update({moments})
  };
};

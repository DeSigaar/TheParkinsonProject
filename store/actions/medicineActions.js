import * as firebase from "firebase";

export const addMedicines = (id, moments) => {
  return dispatch => {
    // Add new moments to firebase
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({ moments });
    // firebase call to add
  };
};

import * as firebase from "firebase";

export const addMedicines = (uid, moments) => {
  return () => {
    // Add new moments to firebase
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ moments });
  };
};

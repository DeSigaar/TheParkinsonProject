import * as firebase from "firebase";

export const updateMoments = (uid, moments) => {
  return () => {
    // Add new exercises to the moment in firebase
    // firebase call to add
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ moments });
  };
};

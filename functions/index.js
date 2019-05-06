const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Cloud Firestore
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUserInFirestore = functions.auth.user().onCreate(user => {
  // Adds document to users to stay up to date with auth
  const { uid, displayName, email, photoURL, phoneNumber } = user;

  // TODO
  // Create collections instead of objects
  const docData = {
    uid,
    displayName,
    email,
    photoURL,
    phoneNumber,
    expoPushToken,
    activities: {},
    exercises: {},
    medication: {},
    moments: [
      { id: 1, name: "Opstaan" },
      { id: 2, name: "Ontbijt" },
      { id: 3, name: "Tandenpoetsen" },
      { id: 4, name: "Lunch" },
      { id: 5, name: "Avondeten" },
      { id: 6, name: "Tandenpoetsen" },
      { id: 7, name: "Voor het slapen" }
    ]
  };

  return admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set(docData)
    .then(() => {
      return console.log("User document created for " + uid + "!");
    })
    .catch(error => {
      return console.log("Error adding user document for " + uid + ": " + error);
    });
});

exports.deleteUserInFirestore = functions.auth.user().onDelete(user => {
  // Removes document from users to stay up to date with auth
  const { uid } = user;

  return admin
    .firestore()
    .collection("users")
    .doc(uid)
    .delete()
    .then(() => {
      return console.log("User document deleted for " + uid + "!");
    })
    .catch(error => {
      return console.error("Error removing user document for " + uid + ": " + error);
    });
});

const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Cloud Firestore
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUserInFirestore = functions.auth.user().onCreate(async user => {
  // Adds document to users to stay up to date with auth
  const { uid, displayName, email, photoURL, phoneNumber } = user;
  let docData = {
    uid,
    displayName,
    email,
    photoURL,
    phoneNumber,
    expoPushToken: null,
    activities: [],
    exercises: [],
    medication: [],
    moments: []
  };

  await admin
    .firestore()
    .collection("moments")
    .get()
    .then(querySnapshot => {
      let moments = [];
      querySnapshot.forEach(doc => {
        moments.push(doc.data());
      });
      docData = { ...docData, moments };
      return console.log("Fetched latest default moments: " + docData.moments);
    })
    .catch(error => {
      return console.log(error);
    });

  await admin
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

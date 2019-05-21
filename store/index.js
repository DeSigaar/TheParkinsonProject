import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import rootReducer from "./reducers";
import ApiKeys from "../constants/ApiKeys";

// Check if Firebase is already initialized otherwise initialize
if (!firebase.apps.length) firebase.initializeApp(ApiKeys.FirebaseConfig);

// Create middleware
const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];

// Create store with Firebase to stay up to date
const createStoreWithFirebase = compose(
  applyMiddleware(...middleware),
  reduxFirestore(ApiKeys.FirebaseConfig),
  reactReduxFirebase(firebase, {
    useFirestoreForProfile: true,
    userProfile: "users",
    logErrors: false,
    updateProfileOnLogin: true,
    resetBeforeLogin: false
  })
)(createStore);

// Create store with the root reducer
const store = createStoreWithFirebase(rootReducer);

export default store;

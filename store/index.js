import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import rootReducer from "./reducers";
import ApiKeys from "../constants/ApiKeys";

if (!firebase.apps.length) firebase.initializeApp(ApiKeys.FirebaseConfig);

const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];

const createStoreWithFirebase = compose(
  applyMiddleware(...middleware),
  reduxFirestore(ApiKeys.FirebaseConfig),
  reactReduxFirebase(firebase, {
    useFirestoreForProfile: true,
    userProfile: "users"
  })
)(createStore);

const store = createStoreWithFirebase(rootReducer);

export default store;

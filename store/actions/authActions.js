import * as firebase from "firebase";

export const logInWithCreds = credentials => {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(error => {
        dispatch({ type: "LOGIN_ERROR", error });
      });
  };
};

export const logInWithGoogle = credentials => {
  return { type: "LOGIN_SUCCESS" };
};

export const sendPasswordResetEmail = email => {
  // Send password reset to email
  return dispatch => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(
        () => {
          // Send password reset email was successful
          dispatch({ type: "PASSWORDRESET_SUCCESS" });
          // this.setState({ loading: false });
          // Alert.alert("Wachtwoord opnieuw instellen email is verstuurd!");
        },
        error => {
          dispatch({ type: "PASSWORDRESET_ERROR", error });
          // Returned an error and is displaying it to the user
          // this.setState({ loading: false });
          // Alert.alert(error.message);
        }
      );
  };
};

export const logOut = () => {
  // Logs out the current user
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" });
      })
      .catch(error => {
        dispatch({ type: "LOGOUT_ERROR", error });
      });
  };
};

export const clearError = () => {
  return { type: "AUTH_CLEAR" };
};

export const setAuthLoading = () => {
  return { type: "AUTH_LOADING" };
};

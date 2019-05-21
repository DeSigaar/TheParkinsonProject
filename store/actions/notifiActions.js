// Set new ExpoPushToken for the user
export const setExpoPushToken = (uid, token) => {
  return () => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ expoPushToken: token });
  };
};

// Send a push notification to the token with title and body
export const sendPushNotification = (token, title, text) => {
  return () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: token,
        sound: "default",
        badge: "1",
        title: title,
        body: text
      })
    });
  };
};

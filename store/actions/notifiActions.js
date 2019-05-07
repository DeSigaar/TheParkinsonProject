export const sendPushNotification = (token, title, text) => {
  return () => {
    let response = fetch("https://exp.host/--/api/v2/push/send", {
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

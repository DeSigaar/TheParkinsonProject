const initState = {
  authError: null,
  user: {}
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: action.error.message
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "LOGOUT_ERROR":
      return {
        ...state,
        authError: action.error.message
      };
    default:
      return state;
  }
};

export default authReducer;

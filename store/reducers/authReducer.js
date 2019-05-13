const initState = {
  authLoading: false,
  authError: null,
  authMessage: null,
  user: {}
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        user: action.user
      };
    case "AUTH_LOADING":
      return {
        ...state,
        authLoading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.user,
        authLoading: false,
        authError: null
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authLoading: false,
        authError: action.error.message
      };
    case "PASSWORDRESET_SUCCESS":
      return {
        ...state,
        authLoading: false,
        authError: null,
        authMessage: "Wachtwoord opnieuw instellen email is verstuurd!"
      };
    case "PASSWORDRESET_ERROR":
      return {
        ...state,
        authLoading: false,
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
    case "AUTH_CLEAR":
      return {
        ...state,
        authLoading: false,
        authError: null,
        authMessage: null
      };
    case "SET_EXPOPUSHTOKEN":
      return {
        ...state
      };
    default:
      return state;
  }
};

export default authReducer;

import { fetch } from "../../services/fetch";

// Action constants
const SET_SESSION_USER = "session/setSessionUser";
const LOGIN_SESSION_USER = "session/loginSessionUser";

// State template
const userTemplate = {
  id: null,
  username: null,
  email: null,
};

// Action creators
const loginSessionUserActionCreator = (payload) => ({
  type: LOGIN_SESSION_USER,
  payload,
});

// Actions
export const setSessionUser = (payload) => ({
  type: SET_SESSION_USER,
  payload,
});

// Thunks
export const loginSessionUser = ({ email, password }) => async (dispatch) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const { data } = res.data;
  dispatch(loginSessionUserActionCreator(data));
  return data;
};

// Reducer configuration
const reducer = (state = { user: userTemplate }, { type, payload }) => {
  switch (type) {
    case SET_SESSION_USER:
      return { user: { ...state.user, ...payload } };

    case LOGIN_SESSION_USER:
      return { user: { ...state.user, ...payload } };

    default:
      return state;
  }
};

export default reducer;

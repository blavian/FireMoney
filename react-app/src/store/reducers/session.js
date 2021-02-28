import {fetch} from "../../services/fetch";

// Action constants
const SET_SESSION_USER = "session/setSessionUser";
const LOGIN_SESSION_USER = "session/loginSessionUser";
const LOGOUT_SESSION_USER = "session/logoutSessionUser";
const GET_USER_MONTH = "session/getUserMonth"

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

const logoutSessionUserActionCreator = (payload) => ({
  type: LOGOUT_SESSION_USER,
  payload,
});

const getUserMonth = (payload) => ({
  type: GET_USER_MONTH,
  payload,
});


export const setSessionUser = (payload) => ({
  type: SET_SESSION_USER,
  payload,
});

// Thunks
export const loginSessionUser = ({email, password}) => async (dispatch) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({email, password}),
  });
  const {data} = res.data;
  dispatch(loginSessionUserActionCreator(data));
  return data; };
export const logoutSessionUser = () => async (dispatch) => {
  dispatch(logoutSessionUserActionCreator(userTemplate));
  return; };
// -------------------------------------------------------- getAllUserMonths
export const getUserMonths = () => async (dispatch) => {
  const res = await fetch(
    '/api/months/all');
  const {data} = res.data;

  dispatch(getUserMonth(data));
  return data; };

// Reducer configuration
const reducer = (state={user: userTemplate}, {type, payload}) => {
  switch(type) {
    case SET_SESSION_USER:
      return {user: {...state.user, ...payload}};

    case LOGIN_SESSION_USER:
      return {user: {...state.user, ...payload}};

    case LOGOUT_SESSION_USER:
      return {user: {...state.user, ...payload}};

    default:
      return state; }
};

// State template
const monthTemplate = {
  monthInt: null,
  yearInt: null,
};
export const userMonthsReducer = (state={userMonth: monthTemplate}, {type, payload}) => {
  switch(type) {
    case GET_USER_MONTH:
      return {userMonths: {...state.userMonth, ...payload}}
    default:
      return state;
    }
  }
export default reducer;

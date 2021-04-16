import {fetch} from "../../services/fetch";

// Action constants
const SET_SESSION_USER = "session/setSessionUser";
const LOGIN_SESSION_USER = "session/loginSessionUser";
const LOGOUT_SESSION_USER = "session/logoutSessionUser";
const GET_USER_MONTH = "session/getUserMonth";
const GET_USER_TRANSACTIONS = "session/getUserTransactions";

// State template
const userTemplate = {
  id: null,
  username: null,
  email: null,
  groups: null,
  months: null,
  transactions: null
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

const getUserMonthActionCreator = (payload) => ({
  type: GET_USER_MONTH,
  payload,
});

const getUserTransactionsActionCreator = (payload) => ({
  type: GET_USER_TRANSACTIONS,
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
  let {data} = res.data;
  // data.months = data.months.map( el => {
  //   return el[el.monthInt] = el;
  // })
  dispatch(getUserMonthActionCreator(data));
  return data; };

  export const getUserTransactions = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/transactions`, { method: 'GET'});
    const { data } = res.data;
    dispatch(getUserTransactionsActionCreator(data));
    return data;
  }

// Reducer configuration
const reducer = (state={user: userTemplate, months: null, transactions: null}, {type, payload}) => {
  switch(type) {
    case SET_SESSION_USER:
      return {user: {...state.user, ...payload}};

    case LOGIN_SESSION_USER:
      return {user: {...state.user, ...payload}};

    case LOGOUT_SESSION_USER:
      return {user: {...state.user, ...payload}};

    case GET_USER_MONTH:
      return { user: { ...state.user, ...state.months, ...payload } };
    
    case GET_USER_TRANSACTIONS:
      return { user: { ...state.user, ...state.transactions, ...payload } };

    default:
      return state; }
};


// export const userMonthsReducer = (state={userMonth: monthTemplate}, {type, payload}) => {
//   switch(type) {
//     case GET_USER_MONTH:
//       return {userMonths: {...state.userMonth, ...payload}}
//     default:
//       return state;
//     }
//   }

export default reducer;





//have date in order from newest to latest
//go to current month based off of current date
//forward button --> find current date index and subtract one (if exists)
//back button --> find current date index and add one (if exists)

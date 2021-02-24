import { fetch } from '../../services/fetch';


// Action constants
const SET_SESSION_USER = 'session/setSessionUser';

// State template
const userTemplate = {
  id: null,
  username: null,
  email: null,
};

// Action creators
const setSessionUserActionCreator = payload => ({
  type: SET_SESSION_USER,
  payload,
});

// Thunks
export const setSessionUser = ({ email, password }) => async dispatch => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const { data } = res.data;
  dispatch(setSessionUserActionCreator(data));
  return data;
};

// Reducer configuration
const reducer = (state = { user: userTemplate }, { type, payload }) => {
  switch (type) {
    case SET_SESSION_USER:
      return { user: { ...state.user, ...payload } };

    default:
      return state;
  }
};

export default reducer;

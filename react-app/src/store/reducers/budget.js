import { fetch } from "../../services/fetch";

// Action constants
const SET_BUDGET_MONTH = "session/setBudgetMonth";

// State template
const budgetMonthTemplate = {
  monthInt: null,
  month: null,
  year: null,
  groups: [],
};

// Action creators
const setBudgetMonthActionCreator = (payload) => ({
  type: SET_BUDGET_MONTH,
  payload,
});

// Thunks
export const setBudgetMonth = ({ monthInt, yearInt }) => async (dispatch) => {
  const res = await fetch(
    `/api/month?month_int=${monthInt}&year_int=${yearInt}`,
    {
      method: "GET",
    }
  );
  const { data } = res.data;
  dispatch(setBudgetMonthActionCreator(data));
  return data;
};

// Reducer configuration
const reducer = (state = { budgetMonth: budgetMonthTemplate }, { type, payload }) => {
  switch (type) {
    case SET_BUDGET_MONTH:
      const convertData = {
        monthInt: payload.month_int,
        month: getMonthFromInt(payload.month_int),
        year: payload.year_int,
        groups: payload.groups,
      }
      return { budgetMonth: { ...state.budgetMonth, ...convertData } };

    default:
      return state;
  }
};

/**
 * Accepts a string integer between 1 and 12 and returns the corresponding
 * calendar month as a string.
 * 
 * @param {monthIntAsString} monthIntAsString
 * Integer as string, e.g. "12" will return "December"
 * 
 */
export const getMonthFromInt = (monthIntAsString) => {
  for (const key in monthDict) {
    console.log(key);
    if (monthIntAsString === key) return monthDict[key];
  }
  throw RangeError("Month integer is out of range; must be between 1 and 12.")
}

const monthDict = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December",
}

export default reducer;

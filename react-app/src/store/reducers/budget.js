import { fetch } from "../../services/fetch";

// Action constants
const CREATE_BUDGET_MONTH = "session/createBudgetMonth";
const GET_BUDGET_MONTH = "session/setBudgetMonth";

// State template
const budgetMonthTemplate = {
  monthInt: null,
  month: null,
  year: null,
  groups: [],
};

// Action creators
const createBudgetMonthActionCreator = (payload) => ({
  type: CREATE_BUDGET_MONTH,
  payload,
});
const getBudgetMonthActionCreator = (payload) => ({
  type: GET_BUDGET_MONTH,
  payload,
});

// Thunks
export const createBudgetMonth = ({
  monthInt,
  yearInt,
  copyPrevious,
}) => async (dispatch) => {
  const res = await fetch(`/api/month`, {
    method: "POST",
    body: JSON.stringify({
      month_int: monthInt,
      year_int: yearInt,
      copy_previous: copyPrevious,
    }),
  });
  const { data } = res.data;
  dispatch(createBudgetMonthActionCreator(data));
  return data;
};
export const getBudgetMonth = ({ monthInt, yearInt }) => async (dispatch) => {
  const res = await fetch(
    `/api/month?month_int=${monthInt}&year_int=${yearInt}`,
    {
      method: "GET",
    }
  );
  const { data } = res.data;
  dispatch(getBudgetMonthActionCreator(data));
  return data;
};

// Reducer configuration
const reducer = (
  state = { budgetMonth: budgetMonthTemplate },
  { type, payload }
) => {
  switch (type) {
    case CREATE_BUDGET_MONTH:
      const convertData = {
        monthInt: payload.data.month_int,
        month: getMonthFromInt(payload.data.month_int),
        year: payload.data.year_int,
        groups: payload.data.groups,
      };
      return { budgetMonth: { ...state.budgetMonth, ...convertData } };

    case GET_BUDGET_MONTH:
      const convertData = {
        monthInt: payload.data.month_int,
        month: getMonthFromInt(payload.data.month_int),
        year: payload.data.year_int,
        groups: payload.data.groups,
      };
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
  throw RangeError("Month integer is out of range; must be between 1 and 12.");
};

const monthDict = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export default reducer;

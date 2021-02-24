import { fetch } from "../../services/fetch";

// Action constants
const CREATE_BUDGET_MONTH = "budget/createBudgetMonth";
const GET_BUDGET_MONTH = "budget/setBudgetMonth";
const CREATE_BUDGET_GROUP = "budget/createBudgetGroup";
const UPDATE_BUDGET_GROUP = "budget/updateBudgetGroup";

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
const createBudgetGroupActionCreator = (payload) => ({
  type: CREATE_BUDGET_GROUP,
  payload,
});
const updateBudgetGroupActionCreator = (payload) => ({
  type: UPDATE_BUDGET_GROUP,
  payload,
});


// Thunks
export const createBudgetMonth = ({
  monthInt,
  yearInt,
  copyPrevious,
}) => async (dispatch) => {
  const res = await fetch(`/api/months/`, {
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
    `/api/months?month_int=${monthInt}&year_int=${yearInt}`,
    {
      method: "GET",
    }
  );
  const { data } = res.data;
  dispatch(getBudgetMonthActionCreator(data));
  return data;
};

export const createBudgetGroup = ({
  title,
  monthInt,
  yearInt,
}) => async (dispatch) => {
  const res = await fetch(`/api/groups`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      month_int: monthInt,
      year_int: yearInt
    }),
  });
  const { data } = res.data;
  dispatch(createBudgetGroupActionCreator(data));
  return data;
};

export const updateBudgetGroup = ({
  title,
  monthInt,
  yearInt,
}) => async (dispatch) => {
  const res = await fetch(`/api/groups`, {
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      month_int: monthInt,
      year_int: yearInt
    }),
  });
  const { data } = res.data;
  dispatch(updateBudgetGroupActionCreator(data));
  return data;
};

// Reducer configuration
const reducer = (
  state = { budgetMonth: budgetMonthTemplate },
  { type, payload }
) => {
  switch (type) {
    case CREATE_BUDGET_MONTH:
      console.log(payload)
      const createBudgetConvertData = {
        monthInt: payload.month_int,
        month: getMonthFromInt(payload.month_int),
        year: payload.year_int,
        groups: payload.groups,
      };
      return { budgetMonth: { ...state.budgetMonth, ...createBudgetConvertData } };

    case GET_BUDGET_MONTH:
      const getBudgetConvertData = {
        monthInt: payload.month_int,
        month: getMonthFromInt(payload.month_int),
        year: payload.year_int,
        groups: payload.groups,
      };
      return { budgetMonth: { ...state.budgetMonth, ...getBudgetConvertData } };

    case CREATE_BUDGET_GROUP:
      const createBudgetGroupConvertData = [{
        title: payload.title,
        monthInt: payload.month_int,
        month: getMonthFromInt(payload.month_int),
        year: payload.year_int,
        items: payload.items,
      }];
      return { budgetMonth: { ...state.budgetMonth, groups: [...state.budgetMonth.groups, ...createBudgetGroupConvertData] } }

    case UPDATE_BUDGET_GROUP:
      const updateBudgetGroupConvertData = [{
        title: payload.title,
        monthInt: payload.month_int,
        month: getMonthFromInt(payload.month_int),
        year: payload.year_int,
        items: payload.items,
      }];
      return { budgetMonth: { ...state.budgetMonth, groups: [...state.budgetMonth.groups, ...updateBudgetGroupConvertData] } }

    default:
      return state;
  }
};

/**
 * Accepts an integer between 1 and 12 and returns the corresponding calendar
 * month as a string.
 *
 * @param {monthInt} monthInt
 * Integer representing a calendar month, e.g. 12 will return "December"
 *
 */
export const getMonthFromInt = (monthInt) => {
  for (const key in monthDict) {
    if (monthInt.toString() === key) return monthDict[key];
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

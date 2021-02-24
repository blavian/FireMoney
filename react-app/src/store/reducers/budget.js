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
      const createBudgetConvertData = {
        monthInt: payload.data.month_int,
        month: getMonthFromInt(payload.data.month_int),
        year: payload.data.year_int,
        groups: payload.data.groups,
      };
      return { budgetMonth: { ...state.budgetMonth, ...createBudgetConvertData } };

    case GET_BUDGET_MONTH:
      const getBudgetConvertData = {
        monthInt: payload.data.month_int,
        month: getMonthFromInt(payload.data.month_int),
        year: payload.data.year_int,
        groups: payload.data.groups,
      };
      return { budgetMonth: { ...state.budgetMonth, ...getBudgetConvertData } };

    case CREATE_BUDGET_GROUP:
      const createBudgetGroupConvertData = [{
        title: payload.data.title,
        monthInt: payload.data.month_int,
        month: getMonthFromInt(payload.data.month_int),
        year: payload.data.year_int,
        items: payload.data.items,
      }];
      return { budgetMonth: { ...state.budgetMonth, groups: [...state.budgetMonth.groups, ...createBudgetGroupConvertData] } }

    case UPDATE_BUDGET_GROUP:
      const updateBudgetGroupConvertData = [{
        title: payload.data.title,
        monthInt: payload.data.month_int,
        month: getMonthFromInt(payload.data.month_int),
        year: payload.data.year_int,
        items: payload.data.items,
      }];
      return { budgetMonth: { ...state.budgetMonth, groups: [...state.budgetMonth.groups, ...updateBudgetGroupConvertData] } }

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

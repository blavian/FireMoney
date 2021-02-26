import { fetch } from "../../services/fetch";
import { normalizedData } from "../../services/normalize_data"

// Action constants
const CREATE_BUDGET_MONTH = "budget/createBudgetMonth";
const GET_BUDGET_MONTH = "budget/setBudgetMonth";
const CREATE_BUDGET_GROUP = "budget/createBudgetGroup";
const UPDATE_BUDGET_GROUP = "budget/updateBudgetGroup";
const DELETE_BUDGET_GROUP = "budget/deleteBudgetGroup";

const CREATE_BUDGET_ITEM = "budget/createBudgetItem";
const UPDATE_BUDGET_ITEM = "budget/updateBudgetItem";
const DELETE_BUDGET_ITEM = "budget/deleteBudgetItem";

const CREATE_TRANSACTION = "budget/createTransaction";
const GET_TRANSACTION = "budget/getTransaction";
const UPDATE_TRANSACTION = "budget/updateTransaction";
const DELETE_TRANSACTION = "budget/deleteTransaction";




// --------------------------BUDGET MONTH------------------------

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
const deleteBudgetGroupActionCreator = (payload) => ({
  type: DELETE_BUDGET_GROUP,
  payload,
});


// Thunks
export const createBudgetMonth = ({
  monthInt,
  yearInt,
  copyPrevious,
}) => async (dispatch) => {
  const res = await fetch(`/api/months`, {
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

  for (let i = 0; i < data.groups.length; i++) {
    let group = data.groups[i]
    for (let j = 0; j < group.items.length; j++) {
      let item = group.items[j]
      item.transactions = normalizedData(item.transactions)
    }
    group.items = normalizedData(group.items)
  }

  data.groups = normalizedData(data.groups)

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
  groupId,
  monthInt,
  yearInt,
}) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}`, {
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


export const deleteBudgetGroup = ({
  groupId
}) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}`, {
    method: "DELETE"
  });
  const { data } = res.data;
  data.groupId = groupId;
  dispatch(deleteBudgetGroupActionCreator(data));
  return data;
};

const budgetItemTemplate = {
  id: null,
  description: null,
  due_date: null,
  expected_amount: null,
  group_id: null,
  title: null,
  transactions: []
};


// -----------------------------------BUDGET ITEM ----------------------------------
const createBudgetItemActionCreator = (payload) => ({
  type: CREATE_BUDGET_ITEM,
  payload,
});
const updateBudgetItemActionCreator = (payload) => ({
  type: UPDATE_BUDGET_ITEM,
  payload,
});
const deleteBudgetItemActionCreator = (payload) => ({
  type: DELETE_BUDGET_ITEM,
  payload,
});


export const createBudgetItem = ({
  title,
  description,
  expectedAmount,
  groupId,
  dueDate
}) => async (dispatch) => {
  const res = await fetch(`/api/items`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      description: description,
      expected_amount: expectedAmount,
      group_id: groupId,
      due_date: dueDate
    }),
  });
  const { data } = res.data;

  dispatch(createBudgetItemActionCreator(data));
  return data;
};


export const updateBudgetItem = ({
  title,
  description,
  expectedAmount,
  groupId,
  dueDate
}) => async (dispatch) => {
  const res = await fetch(`/api/items`, {
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      description: description,
      expected_amount: expectedAmount,
      group_id: groupId,
      due_date: dueDate
    }),
  });
  const { data } = res.data;

  dispatch(updateBudgetItemActionCreator(data));
  return data;
};


// --------------------- REDUCER -----------------------------------
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

    case CREATE_BUDGET_ITEM:
      const createBudgetItemConvertData = {
          id: payload.id,
          title: payload.title,
          groupId: payload.group_id,
      }
      const newState = { budgetMonth: {...state.budgetMonth }}
      newState.budgetMonth.groups[createBudgetItemConvertData.groupId]
        .items[createBudgetItemConvertData.id] = createBudgetItemConvertData
      return newState

    case GET_BUDGET_MONTH:
      const getBudgetConvertData = {
        monthInt: payload.month_int,
        month: getMonthFromInt(payload.month_int),
        year: payload.year_int,
        groups: payload.groups,
      };
      return { budgetMonth: { ...state.budgetMonth, ...getBudgetConvertData } };

    case CREATE_BUDGET_GROUP:
      const createBudgetGroupConvertData = {
        id: payload.id,
        title: payload.title,
        monthInt: payload.month_int,
        month: getMonthFromInt(payload.month_int),
        year: payload.year_int,
        items: payload.items,
      };
      return { budgetMonth: { ...state.budgetMonth, groups: [...state.budgetMonth.groups, createBudgetGroupConvertData] } }

    case UPDATE_BUDGET_GROUP:
      const updateBudgetGroupConvertData = {
        id: payload.id,
        title: payload.title,
        monthInt: payload.month_int,
        month: getMonthFromInt(payload.month_int),
        year: payload.year_int,
        items: payload.items,
      }
      const groupCopy = [...state.budgetMonth.groups]
      // const groupsCopy = state.budgetMonth.groups.filter(x => x.id !== payload.groupId);
      return { budgetMonth: { ...state.budgetMonth, groups: [...groupsCopy, ...updateBudgetGroupConvertData] } }

    case DELETE_BUDGET_GROUP:
      const groupsCopy = state.budgetMonth.groups.filter(x => x.id !== payload.groupId);
      return { budgetMonth: { ...state.budgetMonth, groups: [...groupsCopy] } };

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



//  =============================== Budget Month ==============================================

//     Create Budget Month with previous month True - FAILED
//     Expected Result: should create new month with previous month's groups - failed
//     Reason: New month is not saving to db and groups are not passing over. Redux store shows new month
//             but empty groups array
//     Test(s):
//       store.dispatch(budgetActions.createBudgetMonth({ monthInt: 4, yearInt: 2021, copyPrevious: "True" }))

//     Create Budget Month with previous month False - NOT TESTED - Depends on previous test
//     Expected Result: Undefined
//     Reason: NOT TESTED
//     Test(s):
//       store.dispatch(budgetActions.createBudgetMonth({ monthInt: 5, yearInt: 2021, copyPrevious: "False" }))

//     Create Budget Month with nonexistent previous month - PASSED
//     Expected Result: Should return Error status 400 with message:"previous_month_does_not_exist"
//     Reason: PASSED
//     Test(s):
//       store.dispatch(budgetActions.createBudgetMonth({ monthInt: 2, yearInt: 2021, copyPrevious: "True" }))
//       store.dispatch(budgetActions.createBudgetMonth({ monthInt: 2, yearInt: 2021, copyPrevious: "False" }))

//     Create Budget Month that already exists - PASSED
//     Expected Result: Should return Error status 400 with message:"month_already_exists"
//     Reason: PASSED
//     Test(s):
//       store.dispatch(budgetActions.createBudgetMonth({ monthInt: 3, yearInt: 2021, copyPrevious: "True" }))
//       store.dispatch(budgetActions.createBudgetMonth({ monthInt: 3, yearInt: 2021, copyPrevious: "False" }))

//     Get Budget Month - PASSED
//     Expected Result: Should return month with groups
//     Reason: PASSED
//     Test(s):
//       store.dispatch(budgetActions.getBudgetMonth({ monthInt: 3, yearInt: 2021 }))

//     Get Budget Month that does not exist- PASSED
//     Expected Result: Should return Error status 400 with message:"month_does_not_exist"
//     Reason: PASSED
//     Test(s):
//       store.dispatch(budgetActions.getBudgetMonth({ monthInt: 3, yearInt: 2021 }))

//  =============================== Budget Group ==============================================

//     Create Budget Group
//     Expected Result:
//     Reason:
//     Test(s):
//       store.dispatch(budgetActions.createBudgetGroup({ monthInt: 3, yearInt: 2021, title: "Gas4" }))

//     Update Budget Group
//     Expected Result:
//     Reason:
//     Test(s):
//       store.dispatch(budgetActions.updateBudgetGroup({ groupId: 1, monthInt: 3, yearInt: 2021, title: "Gas4" }))

//     Delete Budget Group
//     Expected Result:
//     Reason:
//     Test(s):
//       store.dispatch(budgetActions.deleteBudgetGroup({ monthInt: 3, yearInt: 2021, title: "Gas4" }))

//  =============================== Budget Items ==============================================

//     Create Budget Items
//     Expected Result:
//     Reason:
//     Test(s):
//       store.dispatch(budgetActions.createBudgetItem({ title: "gas", description: "spent on gas", expectedAmount: 20.00, groupId:1, dueDate: "2022-01-22" }))

//     Update Budget Items
//     Expected Result:
//     Reason:
//     Test(s):
//       store.dispatch(budgetActions.updateBudgetItem({ title: "gas", description: "spent on gas", expectedAmount: 20.00, groupId:1, dueDate: "2022-01-22" }))

//     Delete Budget Items
//     Expected Result:
//     Reason:
//     Test(s):
//       store.dispatch(budgetActions.deleteBudgetItem({ monthInt: 3, yearInt: 2021, title: "Gas4" }))

//  =============================== Transactions ==============================================
// Create Transactions
// Expected Result:
// Reason:
// Test(s):
// store.dispatch(budgetActions.createTransaction({ monthInt: 3, yearInt: 2021, title: "Gas4" }))

// Get Transactions
// Expected Result:
// Reason:
// Test(s):
// store.dispatch(budgetActions.getTransaction({ monthInt: 3, yearInt: 2021, title: "Gas4" }))

// Update Transactions
// Expected Result:
// Reason:
// Test(s):
// store.dispatch(budgetActions.updateTransaction({ monthInt: 3, yearInt: 2021, title: "Gas4" }))

// Delete Transactions
// Expected Result:
// Reason:
// Test(s):
// store.dispatch(budgetActions.deleteTransaction({ monthInt: 3, yearInt: 2021, title: "Gas4" }))

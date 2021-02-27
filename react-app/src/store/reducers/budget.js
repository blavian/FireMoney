import { fetch } from "../../services/fetch";
import { normalizedData } from "../../services/normalize_data";

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
// const GET_TRANSACTION = "budget/getTransaction";
const UPDATE_TRANSACTION = "budget/updateTransaction";
const DELETE_TRANSACTION = "budget/deleteTransaction";

// --------------------------BUDGET MONTH------------------------

// State template
const budgetMonthTemplate = {
  monthInt: null,
  month: null,
  yearInt: null,
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

// * ------------------------------------------------------ //
// * THUNKS
// * ------------------------------------------------------ //

// -------------------------------------------------------- createBudgetMonth
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

// -------------------------------------------------------- getBudgetMonth
export const getBudgetMonth = ({ monthInt, yearInt }) => async (dispatch) => {
  const res = await fetch(
    `/api/months?month_int=${monthInt}&year_int=${yearInt}`,
    {
      method: "GET",
    }
  );
  const { data } = res.data;

  for (let i = 0; i < data.groups.length; i++) {
    let group = data.groups[i];
    for (let j = 0; j < group.items.length; j++) {
      let item = group.items[j];
      item.transactions = normalizedData(item.transactions);
    }
    group.items = normalizedData(group.items);
  }

  data.groups = normalizedData(data.groups);

  dispatch(getBudgetMonthActionCreator(data));
  return data;
};

export const createBudgetGroup = ({ title, monthInt, yearInt }) => async (
  dispatch
) => {
  const res = await fetch(`/api/groups`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      month_int: monthInt,
      year_int: yearInt,
    }),
  });
  const { data } = res.data;
  dispatch(createBudgetGroupActionCreator(data));
  return data;
};

export const updateBudgetGroup = ({
  title,
  id
}) => async (dispatch) => {
  const res = await fetch(`/api/groups/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      // month_int: monthInt,
      // year_int: yearInt,
    }),
  });
  const { data } = res.data;
  dispatch(updateBudgetGroupActionCreator(data));
  return data;
};

export const deleteBudgetGroup = ({ id }) => async (dispatch) => {
  const res = await fetch(`/api/groups/${id}`, {
    method: "DELETE",
  });
  const { data } = res.data;
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
  transactions: [],
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
  dueDate,
}) => async (dispatch) => {
  const res = await fetch(`/api/items`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      description: description,
      expected_amount: expectedAmount,
      group_id: groupId,
      due_date: dueDate,
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
  id,
  dueDate,
}) => async (dispatch) => {
  const res = await fetch(`/api/items/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      description: description,
      expected_amount: expectedAmount,
      due_date: dueDate,
    }),
  });
  const { data } = res.data;

  dispatch(updateBudgetItemActionCreator(data));
  return data;
};

export const deleteBudgetItem = ({
  id
}) => async (dispatch) => {
  const res = await fetch(`/api/items/${id}`, {
    method: "DELETE"
  });
  const { data } = res.data;

  dispatch(updateBudgetItemActionCreator(data));
  return data;
};

//-----------------------------TRANSACTIONS----------------------------

const createTransactionActionCreator = (payload) => ({
  type: CREATE_TRANSACTION,
  payload,
});
const updateTransactionActionCreator = (payload) => ({
  type: UPDATE_TRANSACTION,
  payload,
});
const deleteTransactionActionCreator = (payload) => ({
  type: DELETE_TRANSACTION,
  payload,
});

export const createTransaction = ({
  title,
  amount,
  itemId,
  date,
}) => async (dispatch) => {
  const res = await fetch(`/api/transactions`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      amount: amount,
      item_id: itemId,
      date: date,
    }),
  });
  const { data } = res.data;

  dispatch(createTransactionActionCreator(data));
  return data;
};

export const updateTransaction = ({
  title,
  amount,
  date,
  id
}) => async (dispatch) => {
  const res = await fetch(`/api/transactions/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      amount: amount,
      date: date,
    }),
  });
  const { data } = res.data;

  dispatch(updateTransactionActionCreator(data));
  return data;
};

export const deleteTransaction = ({
  id
}) => async (dispatch) => {
  const res = await fetch(`/api/transactions/${id}`, {
    method: "DELETE"
  });
  const { data } = res.data;
  // data.groupId = groupId

  dispatch(deleteTransactionActionCreator(data));
  return data;
};

// --------------------- REDUCER -----------------------------------
const reducer = (
  state = { budgetMonth: budgetMonthTemplate },
  { type, payload }
) => {
  let stateCopy;
  switch (type) {
    case CREATE_BUDGET_MONTH:
      return state;

    case GET_BUDGET_MONTH:
      const month = { ...payload, month: getMonthFromInt(payload.monthInt) };
      return { budgetMonth: { ...state.budgetMonth, ...month } };

    case CREATE_BUDGET_GROUP:
      stateCopy = { budgetMonth: { ...state.budgetMonth } };
      stateCopy.budgetMonth.groups[payload.id] = payload;
      return stateCopy;

    case UPDATE_BUDGET_GROUP:
      stateCopy = { budgetMonth: { ...state.budgetMonth } };
      stateCopy.budgetMonth.groups[payload.id] = payload;
      return stateCopy;

    case DELETE_BUDGET_GROUP:
      stateCopy = { ...state }
      delete stateCopy.budgetMonth.groups[payload.groupId]
      return stateCopy

    case CREATE_BUDGET_ITEM:
      stateCopy = { budgetMonth: { ...state.budgetMonth } };
      console.log("payload----------------", payload)
      stateCopy.budgetMonth.groups[payload.groupId].items[payload.id] = payload;
      return stateCopy;

    case UPDATE_BUDGET_ITEM:
      stateCopy = { budgetMonth: { ...state.budgetMonth } };
      stateCopy.budgetMonth.groups[payload.groupId].items[payload.id] = payload;
      return stateCopy;

    case DELETE_BUDGET_ITEM:
      stateCopy = { ...state }
      delete stateCopy.budgetMonth.groups[payload.groupId].items[payload.id]
      return stateCopy

    case CREATE_TRANSACTION:
      stateCopy = { ...state }
      stateCopy.budgetMonth.groups[payload.groupId].items[payload.itemId].transactions[payload.id] = payload
      return stateCopy

    case UPDATE_TRANSACTION:
      stateCopy = { ...state }
      stateCopy.budgetMonth.groups[payload.groupId].items[payload.itemId].transactions[payload.id] = payload
      return stateCopy

    case DELETE_TRANSACTION:
      stateCopy = { ...state }
      delete stateCopy.budgetMonth.groups[payload.groupId].items[payload.itemId].transactions[payload.id]
      return stateCopy

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


//-------------- up to date tests---------------------------------

//CBM store.dispatch(budgetActions.createBudgetMonth({ monthInt: 3, yearInt: 2021, copyPrevious: "True" }))
//GBM store.dispatch(budgetActions.getBudgetMonth({ monthInt: 3, yearInt: 2021 }))
//CBG store.dispatch(budgetActions.createBudgetGroup({ monthInt: 3, yearInt: 2021, title: "Gas4" }))
//UBG store.dispatch(budgetActions.updateBudgetGroup({ id: 1, title: "Gas8" }))
//CBI store.dispatch(budgetActions.createBudgetItem({ title: "gas", description: "spent on gas", expectedAmount: 20.00, groupId:2, dueDate: "2022-01-22" }))
//UBI store.dispatch(budgetActions.updateBudgetItem({ title: "yus", description: "spent on nothin", expectedAmount: 21.00, id:1, dueDate: "2022-01-23" }))
//DBI store.dispatch(budgetActions.deleteBudgetItem({ id: 1 }))
//CT store.dispatch(budgetActions.createTransaction({ "title": "paid foascascasr exhaust", "amount": "20", "itemId": 11, "date": "2022-01-22"}))
//UT store.dispatch(budgetActions.updateTransaction({ "title": "paid for exhaust", "amount": "30", "id": 10, "date": "2022-01-22"}))
//DT store.dispatch(budgetActions.deleteTransaction({"id": 10}))


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
//       store.dispatch(budgetActions.updateBudgetGroup({ groupId: 1, monthInt: 3, yearInt: 2021, title: "Gas5" }))
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
//       store.dispatch(budgetActions.updateBudgetItem({ title: "yus", description: "spent on nothin", expectedAmount: 21.00, itemId:1, dueDate: "2022-01-23" }))

//     Delete Budget Items
//     Expected Result:
//     Reason:
//     Test(s):
//       store.dispatch(budgetActions.deleteBudgetItem({ itemId: 1 }))

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
// store.dispatch(budgetActions.deleteTransaction({ id: 3 }))

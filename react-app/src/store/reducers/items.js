import normalizedData from "../../services/normalize_data"
import {fetch} from "../../services/fetch"
const CREATE_BUDGET_ITEM = "budget/createBudgetItem";
const UPDATE_BUDGET_ITEM = "budget/updateBudgetItem";
const DELETE_BUDGET_ITEM = "budget/deleteBudgetItem";


const budgetItemTemplate = {
  id: null,
  description: null,
  due_date: null,
  expected_amount: null,
  group_id: null,
  title: null,
  transactions: []
};


// BUDGET ITEM ACTION CREATORS
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


// BUDGET ITEM THUNKS
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


//  =============================== Budget Items ==============================================

//     Create Budget Items
//     Expected Result:
//     Reason:
//     Test(s):
//       store.dispatch(itemActions.createBudgetItem({ title: "gas", description: "spent on gas", expectedAmount: 20.00, groupId:1, dueDate: "2022-01-22" }))

//     Update Budget Items
//     Expected Result:
//     Reason:
//     Test(s):
//       store.dispatch(itemActions.updateBudgetItem({ monthInt: 3, yearInt: 2021, title: "Gas4" }))

//     Delete Budget Items
//     Expected Result:
//     Reason:
//     Test(s):
//       store.dispatch(itemActions.deleteBudgetItem({ monthInt: 3, yearInt: 2021, title: "Gas4" }))

//  =============================== Budget Transactions ==============================================


// Reducer configuration
// const itemReducer = (
//   state = { budgetItem: budgetItemTemplate },
//   { type, payload }
// ) => {
//   switch (type) {
//     case CREATE_BUDGET_ITEM:
//       return { budgetItem: { ...state.budgetItem, ...createBudgetConvertData } };

//     case GET_BUDGET_MONTH:
//       const getBudgetConvertData = {
//         monthInt: payload.month_int,
//         month: getMonthFromInt(payload.month_int),
//         year: payload.year_int,
//         groups: payload.groups,
//       };
//       return { budgetMonth: { ...state.budgetMonth, ...getBudgetConvertData } };

//     case CREATE_BUDGET_GROUP:
//       const createBudgetGroupConvertData = {
//         id: payload.id,
//         title: payload.title,
//         monthInt: payload.month_int,
//         month: getMonthFromInt(payload.month_int),
//         year: payload.year_int,
//         items: payload.items,
//       };
//       return { budgetMonth: { ...state.budgetMonth, groups: [...state.budgetMonth.groups, createBudgetGroupConvertData] } }

//     case UPDATE_BUDGET_GROUP:
//       const updateBudgetGroupConvertData = {
//         id: payload.id,
//         title: payload.title,
//         monthInt: payload.month_int,
//         month: getMonthFromInt(payload.month_int),
//         year: payload.year_int,
//         items: payload.items,
//       }
//       const groupCopy = [...state.budgetMonth.groups]
//       // const groupsCopy = state.budgetMonth.groups.filter(x => x.id !== payload.groupId);
//       return { budgetMonth: { ...state.budgetMonth, groups: [...groupsCopy, ...updateBudgetGroupConvertData] } }

//     case DELETE_BUDGET_GROUP:
//       const groupsCopy = state.budgetMonth.groups.filter(x => x.id !== payload.groupId);
//       return { budgetMonth: { ...state.budgetMonth, groups: [...groupsCopy] } };

//     default:
//       return state;
//   }
// };

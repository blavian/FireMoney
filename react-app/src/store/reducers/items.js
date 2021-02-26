import normalizedData from "../services/normalize_data"

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

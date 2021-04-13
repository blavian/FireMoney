import { fetch } from "../../services/fetch";
import { normalizedData } from "../../services/normalize_data";

// Action constants
const CREATE_TRANSACTION = "transaction/createTransaction";
const GET_TRANSACTIONS = "transaction/setTransactions";
const DELETE_TRANSACTION = "transaction/deleteTransaction";
const UPDATE_TRANSACTION = "transaction/updateTransaction";

const transactionsTemplate = {
    transactions: {}
}

// Action creators
const createTransactionActionCreator = (payload) => ({
    type: CREATE_TRANSACTION,
    payload,
});

const getTransactionsActionCreator = (payload) => ({
    type: GET_TRANSACTIONS,
    payload,
});

const deleteTransactionActionCreator = (payload) => ({
    type: DELETE_TRANSACTION,
    payload,
});

const updateTransactionActionCreator = (payload) => ({
    type: UPDATE_TRANSACTION,
    payload,
});

// Thunks

export const getTransactions = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/transactions`, { method: "GET"});
    const { data } = res.data;
    console.log(res.data)
    dispatch(getTransactionsActionCreator(data));
    return data;
}

// TODO: update api route to return all user data for profile and transaction page use

const reducer = (
    state = { allTransactions: transactionsTemplate },
    { type, payload }
) => {
    let stateCopy;
    switch (type){
        case GET_TRANSACTIONS:
            return { ...payload}
        default:
            return state;
    }
}

export default reducer;
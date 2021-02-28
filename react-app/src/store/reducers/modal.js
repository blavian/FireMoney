//Action Constants
const SHOW_LOGIN_MODAL = "modal/login";
const SHOW_SIGNUP_MODAL = "modal/signup";
const HIDE_MODAL = "modal/hide";
const SHOW_TRANSACTION_MODAL = "transactionModal/show";
const HIDE_TRANSACTION_MODAL = "transactionModal/hide";

//Action Creators
const showLoginModalAction = (payload) => ({
    type: SHOW_LOGIN_MODAL,
    payload,
});

const showSignUpModalAction = (payload) => ({
    type: SHOW_SIGNUP_MODAL,
    payload,
});

const hideModalAction = (payload) => ({
    type: HIDE_MODAL,
    payload,
});

const showTransactionModalAction = (payload) => ({
    type: SHOW_TRANSACTION_MODAL,
    payload,
});

const hideTransactionModalAction = (payload) => ({
    type: HIDE_TRANSACTION_MODAL,
    payload,
});

//Thunks
export const getLoginModal = () => async (dispatch) => {
    dispatch(showLoginModalAction());
};

export const getSignUpModal = () => async (dispatch) => {
    dispatch(showSignUpModalAction());
};

export const hideModal = () => async (dispatch) => {
    dispatch(hideModalAction());
};

export const getTransactionModal = ({id}) => async (dispatch) => {
    const data = {id}
    dispatch(showTransactionModalAction(data));
};

export const hideTransactionModal = () => async (dispatch) => {
    dispatch(hideTransactionModalAction());
};

//State Template
const modalsTemplate = {
    loginModalShow: false,
    signUpModalShow: false
}

const transactionModalTemplate = {
    transactionModalShow: false,
    itemId: null
}

//Reducer
export const modal = (
    state = {...modalsTemplate },
    { type, payload }
) => {
    let stateCopy;
    switch (type) {
        case SHOW_LOGIN_MODAL:
            state = {
                loginModalShow: true,
                signUpModalShow: false,
            }
            return state
        
        case SHOW_SIGNUP_MODAL:
            state = {
                loginModalShow: false,
                signUpModalShow: true,
            }
            return state;
        
        case HIDE_MODAL:
            return state = {...modalsTemplate}
        default:
            return state;
    }
}

export const transactionModal = (
    state = { ...transactionModalTemplate },
    { type, payload}
) => {
    switch (type) {
        case SHOW_TRANSACTION_MODAL:
            state = { transactionModalShow: true, ...payload}
            return state
        case HIDE_TRANSACTION_MODAL:
            state = { ...transactionModalTemplate }
            return state
        default:
            return state
    }
}
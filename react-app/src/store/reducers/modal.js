//Action Constants
const SHOW_LOGIN_MODAL = "modal/login";
const SHOW_SIGNUP_MODAL = "modal/signup";
const HIDE_MODAL = "modal/hide";
// const SHOW_HBMENU = "hbmenu/show";
// const HIDE_HBMENU = "hbmenu/hide";

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

// const showHBMenuAction = (payload) => ({
//     type: SHOW_HBMENU,
//     payload,
// });

// const hideHBMenuAction = (payload) => ({
//     type: HIDE_HBMENU,
//     payload,
// });

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

// export const getHBMenu = () => async (dispatch) => {
//     dispatch(showHBMenuAction());
// };

// export const hideHBMenu = () => async (dispatch) => {
//     dispatch(hideHBMenuAction());
// };

//State Template
const modalsTemplate = {
    loginModalShow: false,
    signUpModalShow: false
}

// const hbMenuTemplate = {
//     hbMenuShow: false
// }

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

// export const hbMenu = (
//     state = { ...hbMenuTemplate },
//     { type, payload}
// ) => {
//     switch (type) {
//         case SHOW_HBMENU:
//             state = { hbMenuShow: true}
//             return state
//         case HIDE_HBMENU:
//             state = { hbMenuShow: false }
//             return state
//         default:
//             return state = { ...hbMenuTemplate}
//     }
// }
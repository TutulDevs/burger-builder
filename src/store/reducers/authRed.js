import * as actType from "../actions/actionsTypes";
import { updateObj } from "../../shared/utility";

const initState = {
    token: null, 
    userId: null,
    error: null ,
    loading: false ,
    authRedirectPath: '/',
}

const authStart = (state, action) => {
    return updateObj(state, {
        error: null, 
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObj(state, {
        token: action.idToken,
        userId: action.userId,
        error: null, 
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObj(state, {
        error: action.error, 
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObj(state, {
        token: null,
        userId: null, 
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObj(state, {
        authRedirectPath: action.path, 
    })
}


const reducer = (state = initState, action) => {
    switch (action.type) {
        case actType.AUTH_START: 
            return authStart(state, action);
        case actType.AUTH_SUCCESS: 
            return authSuccess(state, action);
        case actType.AUTH_FAIL: 
            return authFail(state, action);
        case actType.AUTH_LOGOUT:
            return authLogout(state, action) ;
        case actType.SET_AUTH_REDIRECT_PATH: 
            return setAuthRedirectPath(state, action);
        default: 
            return state ;
    }
}

export default reducer ;
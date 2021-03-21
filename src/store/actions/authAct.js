import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const authStart = () => ({
    type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error,
});

// for log out
export const logout = () => {
    // remove from localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

// for dispatching expire time
export const checkAuthTimeout = (expireTime) => (dispatch) => {
    setTimeout(() => {
        dispatch(logout());
    }, expireTime * 1000);
};

// This will deal w/ async stuffs
export const auth = (email, password, isSignUp) => (dispatch) => {
    dispatch(authStart());

    // send this auth email as to be registered
    const authData = {
        email,
        password,
        returnSecureToken: true,
    };

    // post to server
    let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqxHsca1wESEZeL0ba7KLME4yZFwFVPo0';

    if (!isSignUp) {
        url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqxHsca1wESEZeL0ba7KLME4yZFwFVPo0';
    }

    axios
        .post(url, authData)
        .then((res) => {
            console.log(res);
            // save on localStorage
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);

            // now dispatch
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            // log out
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch((err) => {
            console.log(err.response.data.error.message);
            dispatch(authFail(err.response.data.error));
        });
};

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
});

// check the localStorage for token
export const authCheckState = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const userId = localStorage.getItem('userId');

        if (expirationDate < new Date()) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()));
        }
    }
};

import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

// for log out
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

// for dispatching expire time
export const checkAuthTimeout = expireTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch( logout() ) ;
        }, expireTime * 1000);
    }
}


// This will deal w/ async stuffs
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch( authStart() ) ;

        // send this auth email as to be registered
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }

        // post to server
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqxHsca1wESEZeL0ba7KLME4yZFwFVPo0' ;

        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqxHsca1wESEZeL0ba7KLME4yZFwFVPo0' ;
        }
        
        axios.post(url, authData)
        .then(res => {
            console.log(res);
            dispatch(authSuccess(res.data.idToken, res.data.localId)) ;
            // log out
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            console.log(err.response.data.error.message);
            dispatch(authFail(err.response.data.error)) ;
        })
    }
}


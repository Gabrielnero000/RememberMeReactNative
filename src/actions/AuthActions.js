import {
    AUTH_CREATE_USER,
    AUTH_CREATE_USER_FAIL,
    AUTH_CREATE_USER_SUCCESS,
    AUTH_LOGIN_USER,
    AUTH_LOGIN_USER_FAIL,
    AUTH_LOGIN_USER_SUCCESS
} from './types'

import firebase from 'firebase'

import { Actions } from 'react-native-router-flux'

const createUserFail = (dispatch, error) => {
    dispatch({
        type: AUTH_CREATE_USER_FAIL,
        reason: error
    })
}

const createUserSuccess = (dispatch, user) => {
    dispatch({
        type: AUTH_CREATE_USER_SUCCESS,
        payload: user
    })

    Actions.app()
}

const loginUserFail = (dispatch, error) => {
    dispatch({
        type: AUTH_LOGIN_USER_FAIL,
        reason: error
    })
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: user
    })

    Actions.app()
}

export const createUser = (email, password) => {
    return dispatch => {
        dispatch({ type: AUTH_LOGIN_USER })

        const username = email.split('@')[0]

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => createUserSuccess(dispatch, user))
            .then(() => {
                const { currentUser } = firebase.auth()
                firebase
                    .database()
                    .ref(`/users/${currentUser.uid}/`)
                    .set({
                        profile: {
                            email,
                            username,
                            password,
                            userpic: 'https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png',
                            memoriesCount: 0,
                            bio: 'Please edit your profile to add a nice description about yourself :)',
                        }
                    })
            })
            .catch(error => createUserFail(dispatch, error.message))
    }
}

export const loginUser = (email, password) => {
    return dispatch => {
        dispatch({ type: AUTH_LOGIN_USER })

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(error => loginUserFail(dispatch, error.message))
    }
}
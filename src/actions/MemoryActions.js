import firebase from 'firebase'
import {
    MEMORY_ADD,
    MEMORY_ADD_SUCCESS,
    MEMORY_ADD_FAIL,
    MEMORY_FETCH_ALL,
    MEMORY_FETCH_ALL_SUCCESS,
    MEMORY_FETCH_ALL_FAIL,
    MEMORY_SELECT_IMAGE
} from './types'

import { Actions } from 'react-native-router-flux'

const addMemoryFail = (dispatch, error) => {
    dispatch({
        type: MEMORY_ADD_FAIL,
        reason: error
    })
}

const addMemorySuccess = dispatch => {
    dispatch({
        type: MEMORY_ADD_SUCCESS,
    })
    Actions.reset('app')
}

const fetchMemoriesFail = (dispatch, error) => {
    dispatch({
        type: MEMORY_FETCH_ALL_FAIL,
        reason: error
    })
}

const fetchMemoriesSuccess = (dispatch, memories) => {
    dispatch({
        type: MEMORY_FETCH_ALL_SUCCESS,
        payload: memories
    })
}

export const addMemory = (image, location, description) => {
    const { currentUser } = firebase.auth()

    return dispatch => {
        dispatch({ type: MEMORY_ADD })

        firebase
            .database()
            .ref(`/users/${currentUser.uid}/`)
            .child('profile')
            .once('value', snapshot => {
                const profile = snapshot.val()
                firebase
                    .database()
                    .ref(`/users/${currentUser.uid}/`)
                    .child('memories')
                    .push({
                        username: profile.username,
                        userpic: profile.userpic,
                        image: image,
                        title: description,
                        location: location,
                    })
            })
            .then(() => {
                firebase
                    .database()
                    .ref(`/users/${currentUser.uid}/profile/memoriesCount`)
                    .once('value', snapshot => {
                        const memories = snapshot.val() + 1
                        firebase
                            .database()
                            .ref(`/users/${currentUser.uid}/profile`)
                            .update({
                                memoriesCount: memories
                            })
                    })
            })
            .then(() => addMemorySuccess(dispatch))
            .catch(error => addMemoryFail(dispatch, error.message))
    }
}

export const fetchMemories = () => {
    const { currentUser } = firebase.auth()

    return dispatch => {
        dispatch({ type: MEMORY_FETCH_ALL })

        try {
            firebase
                .database()
                .ref(`/users/${currentUser.uid}/`)
                .child('memories')
                .on('value', snapshot => {
                    if (snapshot.val() === null || snapshot.val() === undefined) {
                        fetchMemoriesSuccess(dispatch, [])
                    } else {
                        fetchMemoriesSuccess(dispatch, snapshot.val())
                    }
                })
        } catch(error) {
            fetchMemoriesFail(dispatch, error)
        }

    }
}

export const selectImage = (uri, fromGallery) => ({
    type: MEMORY_SELECT_IMAGE,
    payload: {uri, fromGallery}
})
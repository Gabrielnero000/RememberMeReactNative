import firebase from 'firebase'
import {
    UPLOAD,
    UPLOAD_FAIL,
    UPLOAD_SUCCESS
} from './types'

const uploadFail = (dispatch, error) => {
    dispatch({
        type: UPLOAD_FAIL,
        reason: error
    })
}

const uploadSucces = (dispatch, url) => {
    dispatch({
        type: UPLOAD_SUCCESS,
        payload: url
    })
}

export const upload = (localUri, tag, callback) => {
    return dispatch => {
        dispatch({ type: UPLOAD })

        const { currentUser } = firebase.auth();

        fetch(localUri)
            .then(response => {
                response
                    .blob()
                    .then(blob => {
                        const imageRef = firebase
                            .storage()
                            .ref(`/images/${currentUser.uid}`)
                            .child(tag)
                            .put(blob, { contentType: 'image/jpeg' })
                            .then(snapshot => {
                                snapshot.ref.getDownloadURL().then(url => uploadSucces(dispatch, url))
                            })
                            .catch(error => uploadFail(dispatch, error))
                    })
            })
    }
}
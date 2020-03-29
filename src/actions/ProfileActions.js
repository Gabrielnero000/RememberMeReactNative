import firebase from 'firebase'
import {
	PROFILE_FETCH,
	PROFILE_FETCH_FAIL,
	PROFILE_FETCH_SUCESS,
	PROFILE_UPDATE,
	PROFILE_UPDATE_FAIL,
	PROFILE_UPDATE_SUCESS
} from './types'

import { Actions } from 'react-native-router-flux'

const fetchProfileFail = (dispatch, error) => {
	dispatch({
		type: PROFILE_FETCH_FAIL,
		reason: error
	})
}

const fetchProfileSucces = (dispatch, profile) => {
	dispatch({
		type: PROFILE_FETCH_SUCESS,
		payload: profile
	})
}

const updateProfileFail = (dispatch, error) => {
	dispatch({
		type: PROFILE_UPDATE_FAIL,
		reason: error
	})
}

const updateProfileSuccess = dispatch => {
	dispatch({
		type: PROFILE_UPDATE_SUCESS,
	})

	Actions.profile();
}

export const fetchProfile = () => {

	return dispatch => {
		dispatch({ type: PROFILE_FETCH })

		try {
			const { currentUser } = firebase.auth()

			firebase
				.database()
				.ref(`/users/${currentUser.uid}/profile`)
				.on('value', snapshot => fetchProfileSucces(dispatch, snapshot.val()))
		} catch (error) {
			fetchProfileFail(dispatch, error)
		}
	}
}

export const onSaveChanges = (userpic, username, bio) => {

	return dispatch => {

		dispatch({ type: PROFILE_UPDATE })

		const { currentUser } = firebase.auth();

		firebase
			.database()
			.ref(`/users/${currentUser.uid}/profile`)
			.update({
				userpic,
				username,
				bio,
			})
			.then(() => updateProfileSuccess(dispatch))
			.catch(error => updateProfileFail(dispatch, error))

	}
}
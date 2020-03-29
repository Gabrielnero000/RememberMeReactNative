import {
    PROFILE_FETCH,
    PROFILE_FETCH_FAIL,
    PROFILE_FETCH_SUCESS,
    PROFILE_UPDATE,
    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_SUCESS
} from '../actions/types';

const initialState = {
    profile: {},
    fetching: false,
    updating: false,
    fetchError: '',
    updateError: ''
}

const profile = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_FETCH:
            return { ...initialState, fetching: true }
        case PROFILE_FETCH_FAIL: {
            console.error(action.reason)
            return { ...state, fetchError: 'Failed to fetch profile, try again later', fetching: false }
        }
        case PROFILE_FETCH_SUCESS:
            return { ...state, profile: action.payload, fetching: false }
        case PROFILE_UPDATE:
            return { ...initialState, updating: true };
        case PROFILE_UPDATE_FAIL: {
            console.error(action.reason)
            return { ...state, updateError: 'Failed to update profile, try again later', updating: false }
        }
        case PROFILE_UPDATE_SUCESS:
            return { ...state, updating: false }
        default:
            return state
    }
}

export default profile
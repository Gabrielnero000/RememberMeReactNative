import {
    AUTH_CREATE_USER,
    AUTH_CREATE_USER_FAIL,
    AUTH_CREATE_USER_SUCCESS,
    AUTH_LOGIN_USER,
    AUTH_LOGIN_USER_FAIL,
    AUTH_LOGIN_USER_SUCCESS
} from '../actions/types'

const initialState = {
    errorLoging: '',
    errorCreating: '',
    loading: false,
    user: null
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_CREATE_USER:
            return { ...initialState, loading: true }
        case AUTH_CREATE_USER_FAIL:
            return { ...state, errorCreating: action.reason, loading: false }
        case AUTH_CREATE_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload }
        case AUTH_LOGIN_USER:
            return { ...initialState, loading: true }
        case AUTH_LOGIN_USER_FAIL:
            return { ...state, errorLoging: action.reason, loading: false}
        case AUTH_LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload }
        default:
            return state
    }
}

export default auth
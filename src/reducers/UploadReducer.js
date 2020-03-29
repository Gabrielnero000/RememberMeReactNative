import {
    UPLOAD,
    UPLOAD_FAIL,
    UPLOAD_SUCCESS
} from '../actions/types'

const initialState = {
    uploading: false,
    error: '',
    url: ''
}

const upload = (state = initialState, action) => {
    switch(action.type) {
        case UPLOAD:
            return {...initialState, uploading: true}
        case UPLOAD_FAIL: {
            console.error(action.reason)
            return {...state, error: 'Failed to upload image, try again later', uploading: false}
        }
        case UPLOAD_SUCCESS:
            return {...state, url: action.payload, uploading: false}
        default:
            return state
    }
}

export default upload
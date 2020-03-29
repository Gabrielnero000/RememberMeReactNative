import {
    MEMORY_ADD,
    MEMORY_ADD_FAIL,
    MEMORY_ADD_SUCCESS,
    MEMORY_FETCH_ALL,
    MEMORY_FETCH_ALL_FAIL,
    MEMORY_FETCH_ALL_SUCCESS,
    MEMORY_SELECT_IMAGE
} from "../actions/types"

const initialState = {
    memories: [],
    adding: false,
    fetching: false,
    errorAdding: '',
    errorFetching: '',
    imageUri: '',
    fromGallery: false
}

const memory = (state = initialState, action) => {
    switch (action.type) {
        case MEMORY_FETCH_ALL:
            return { ...initialState, fetching: true }
        case MEMORY_FETCH_ALL_SUCCESS:
            return { ...state, memories: action.payload, fetching: false }
        case MEMORY_FETCH_ALL_FAIL: {
            console.error(action.reason)
            return { ...state, errorFetching: 'Failed to retrieve memories, try again later', fetching: false }
        }
        case MEMORY_ADD:
            return { ...initialState, adding: true }
        case MEMORY_ADD_SUCCESS:
            return { ...state, adding: false }
        case MEMORY_ADD_FAIL: {
            console.error(action.reason)
            return { ...state, errorAdding: 'Failed to add memory, try again later.', fetching: false }
        }
        case MEMORY_SELECT_IMAGE: {
            return { ...state, imageUri: action.payload.uri, fromGallery: action.payload.fromGallery }
        }
        default:
            return state
    }
}

export default memory
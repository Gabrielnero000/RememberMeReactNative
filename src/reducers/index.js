import { combineReducers } from 'redux'
import auth from './AuthReducer'
import memory from './MemoryReducer'
import profile from './ProfileReducer'
import upload from './UploadReducer'

export default combineReducers({
    authReducer: auth,
    memoryReducer: memory,
    profileReducer: profile,
    uploadReducer: upload
})
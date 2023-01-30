import { SIGNUP_FAIL, SIGNUP_SUCCESS } from '../actions/types'
import axios from 'axios'
import { AnyAction } from 'redux'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loading: null
}

export default function Auth (state = initialState, action: AnyAction) {
    const { type, payload } = action

    switch (type) {
        case SIGNUP_SUCCESS:
        case SIGNUP_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }

        default:
            return state
    }
}
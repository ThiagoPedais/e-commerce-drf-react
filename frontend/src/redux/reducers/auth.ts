import {
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    REMOVE_AUTH_LOADING,
    SET_AUTH_LOADING,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    REFRESH_FAIL,
    REFRESH_SUCCESS
} from '../actions/types'
import { AnyAction } from 'redux'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loading: null
}

export default function Auth(state = initialState, action: AnyAction) {
    const { type, payload } = action

    switch (type) {
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }

        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                isAuthenticated: true,
                access: null,
                refres: null

            }


        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                isAthenticated: true,
                access: localStorage.getItem('access'),
                refresh: localStorage.getItem('refresh')

            }

        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        
        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access)
            return {
                ...state,
                access: localStorage.getItem('access')
            }


        case SIGNUP_SUCCESS:
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case REFRESH_FAIL:
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
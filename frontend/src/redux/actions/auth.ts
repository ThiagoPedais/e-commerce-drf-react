import { Dispatch } from 'redux'
import {
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING
} from './types'
import axios from 'axios'



export const signup = (first_name: string, last_name: string, email: string, password: string, re_password: string) =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: SET_AUTH_LOADING
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            re_password
        })

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/`, body, config)

            if (res.status === 201) {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: SIGNUP_FAIL,
                })
            }

            dispatch({
                type: REMOVE_AUTH_LOADING
            })
        }
        catch (err) {
            dispatch({
                type: SIGNUP_FAIL,
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
        }
    }


export const activate = (uid: string, token: string) =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: SET_AUTH_LOADING
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            uid,
            token,
        })

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/activation/`, body, config)

            if (res.status === 204) {
                dispatch({
                    type: ACTIVATION_SUCCESS
                })
            }
            else {
                dispatch({
                    type: ACTIVATION_FAIL
                })
            }
            dispatch({
                type: REMOVE_AUTH_LOADING
            })

        }
        catch (err) {
            dispatch({
                type: ACTIVATION_FAIL
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
        }
    }
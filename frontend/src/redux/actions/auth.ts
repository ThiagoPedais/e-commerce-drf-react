import { Dispatch } from 'redux'
import {
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING
} from './types'
import { setALert } from './alert'

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
                dispatch(setALert('We send a email, please activate your account. Look the box spam', 'green') as any) 

            }
            else {
                dispatch({
                    type: SIGNUP_FAIL,
                })
                dispatch(setALert('Erro to create account', 'red') as any)
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
            dispatch(setALert('Error to connect with server. Please, try later', 'red') as any)
        }
    }


export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        email,
        password
    })

    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/jwt/create/`, body, config)

        if(res.status === 200){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(setALert('Session started successfully :)', '#080') as any)
        }
        else {
            dispatch({
                type: LOGIN_FAIL                
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(setALert('Error when logging in :(', '#ff0000') as any)
        }

    } catch(err){
        dispatch({
            type: LOGIN_FAIL                
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(setALert('Error when logging in. Try later :(', '#ff0000') as any)
    }
}


export const activate = (uid: string, token: string) => async (dispatch: Dispatch) => {
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
                dispatch(setALert('Account activate with succeful', 'green') as any)
            }
            else {
                dispatch({
                    type: ACTIVATION_FAIL
                })
                dispatch(setALert('Error to activate account', 'red') as any)
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
            dispatch(setALert('Error to connect with server. Please, try later', 'red') as any)
        }
    }
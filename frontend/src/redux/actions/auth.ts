import { Dispatch } from 'redux'
import { SIGNUP_FAIL, SIGNUP_SUCCESS } from './types'
import axios from 'axios'



export const signup = (first_name: string, last_name: string, email: string, password: string, re_password: string) => 
    async (dispatch: Dispatch) => {
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
            const res = await axios.post(`${import.meta.env.REACT_APP_API_URL}/auth/users/`, body, config)

            if(res.status === 201) {
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
        }
        catch(err) {
            dispatch({
                type: SIGNUP_FAIL,                    
            })
        }
    }


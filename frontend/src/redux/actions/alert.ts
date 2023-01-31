import { Dispatch } from 'redux'
import {
    SET_ALERT,
    REMOVE_ALERT
} from './types'



export const setALert = (msg: string, alertType: string, timeout = 5000) => 
    (dispatch: Dispatch) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg, alertType }
        })

        setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout)
    } 
import axios from 'axios'
import { Dispatch } from 'redux'
import {
    GET_SHIPPING_OPTIONS_FAIL,
    GET_SHIPPING_OPTIONS_SUCCESS
} from './types'


const URL = `${import.meta.env.VITE_BACKEND_URL}/api/shipping`

export const get_shipping_options = () => async (dispatch: Dispatch) => {

    const config = {
        headers: {
            'Accept': 'application/json',
        }
    }

    try {
        const res = await axios.get(`${URL}/get-shipping-options`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_SHIPPING_OPTIONS_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_SHIPPING_OPTIONS_FAIL
            })
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_SHIPPING_OPTIONS_FAIL
        })
    }
}
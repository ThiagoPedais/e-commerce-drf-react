import axios from 'axios'
import { Dispatch } from 'redux'
import { setALert } from './alert'
import { get_item_total } from './cart'
import {
    GET_PAYMENT_TOTAL_SUCCESS,
    GET_PAYMENT_TOTAL_FAIL,
    LOAD_BT_TOKEN_SUCCESS,
    LOAD_BT_TOKEN_FAIL,
    PAYMENT_SUCCESS,
    PAYMENT_FAIL,
    RESET_PAYMENT_INFO,
    SET_PAYMENT_LOADING,
    REMOVE_PAYMENT_LOADING
} from './types'

const URL = `${import.meta.env.VITE_BACKEND_URL}/api/payment`

type Payment = {
    nonce: any
    shipping_id: string
    coupon_name: string
    full_name: string
    address_line_1: string | number
    address_line_2: string | number
    city: string
    state_province_region: string
    postal_zip_code: string
    country_region: string
    phone_number: string | number
}

export const get_payment_total = (shipping_id: number | string, coupon_name: string) =>
    async (dispatch: Dispatch) => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        try {
            const res = await axios.get(`${URL}/get-payment-total?shipping_id=${shipping_id}&coupon_name=${coupon_name}`, config)

            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: GET_PAYMENT_TOTAL_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: GET_PAYMENT_TOTAL_FAIL,
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_PAYMENT_TOTAL_FAIL
            })
        }
    }


export const get_client_token = () => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try {
        const res = await axios.get(`${URL}/get-token`, config)

        if (res.status === 200) {
            dispatch({
                type: LOAD_BT_TOKEN_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: LOAD_BT_TOKEN_FAIL,
            })
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_BT_TOKEN_FAIL
        })
    }

}


export const process_payment = (payment: Payment) => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    const body = JSON.stringify({
        ...payment
    })

    dispatch({
        type: SET_PAYMENT_LOADING
    })

    try {
        const res = await axios.post(`${URL}/make-payment`, body, config)

        if (res.status === 200 && res.data.success) {
            dispatch({
                type: PAYMENT_SUCCESS
            });
            dispatch(setALert(res.data.success, 'green') as any);
            dispatch(get_item_total() as any);
        } else {
            dispatch({
                type: PAYMENT_FAIL
            });
            dispatch(setALert(res.data.error, 'red') as any);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: PAYMENT_FAIL
        })
        dispatch(setALert('Error processing payment', 'red') as any)
    }
    dispatch({
        type: REMOVE_PAYMENT_LOADING
    });
    window.scrollTo(0, 0);
}


export const reset = () => (dispatch: Dispatch) => {
    dispatch({
        type: RESET_PAYMENT_INFO
    });
};

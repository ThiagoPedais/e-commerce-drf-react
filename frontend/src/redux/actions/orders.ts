import axios from 'axios'
import { Dispatch } from 'redux'
import {
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL_SUCCESS,
    GET_ORDER_DETAIL_FAIL
} from './types'


const URL = `${import.meta.env.VITE_BACKEND_URL}/api/orders`

export const list_orders = () => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        try {
            const res = await axios.get(`${URL}/get-orders`, config)

            if (res.status === 200) {
                dispatch({
                    type: GET_ORDERS_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: GET_ORDERS_FAIL
                })
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_ORDERS_FAIL
            })

        }
    }
}


export const get_order_detail = (transactionId: number | string) => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${URL}/api/orders/get-order/${transactionId}`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ORDER_DETAIL_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_ORDER_DETAIL_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: GET_ORDER_DETAIL_FAIL
            });
        }
    }
}
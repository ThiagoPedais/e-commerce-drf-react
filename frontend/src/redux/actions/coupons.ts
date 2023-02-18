import axios from 'axios';
import { Dispatch } from 'redux';
import { setALert } from './alert';
import {
    GET_COUPON_SUCCESS,
    GET_COUPON_FAIL,
} from './types';

const URL = `${import.meta.env.VITE_BACKEND_URL}/api/coupons/`

export const check_coupon = (coupon_name: string) => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.get(`${URL}/check-coupon?coupon_name=${coupon_name}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COUPON_SUCCESS,
                payload: res.data
            });
            dispatch(setALert('Coupon applied', 'green') as any);
        }
        else {
            dispatch({
                type: GET_COUPON_FAIL
            });
            if (res.data.error) {
                dispatch(setALert(res.data.error, 'red') as any);
            } else {
                dispatch(setALert('This coupon does not exist', 'red') as any);
            }
        }
    }
    catch (err) {
        dispatch({
            type: GET_COUPON_FAIL
        });
        dispatch(setALert('This coupon does not exist', 'red') as any);
    }

    window.scrollTo(0, 0);
}
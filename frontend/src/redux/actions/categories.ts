import axios from "axios";
import { Dispatch } from "redux";
import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS
} from './types'


export const get_categories = () => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/category/categories`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_CATEGORIES_FAIL
            })
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_CATEGORIES_FAIL          
        })       
        
    }
}
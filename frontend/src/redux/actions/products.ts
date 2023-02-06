import axios from 'axios'
import { Dispatch } from 'redux'
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
    GET_PRODUCTS_BY_ARRIVAL_FAIL,
    GET_PRODUCTS_BY_SOLD_SUCCESS,
    GET_PRODUCTS_BY_SOLD_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAIL,
    RELATED_PRODUCTS_SUCCESS,
    RELATED_PRODUCTS_FAIL,
    FILTER_PRODUCTS_SUCCESS,
    FILTER_PRODUCTS_FAIL,
} from './types'

const URL = `${import.meta.env.VITE_BACKEND_URL}/api/product`

export const get_products = () => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${URL}/get-products`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            })
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_PRODUCTS_FAIL
        })
    }
}


export const get_products_by_arrival = () => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${URL}/get-products?sortBy=date_created&order=desc&limit=3`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_PRODUCTS_BY_ARRIVAL_FAIL
            })
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_PRODUCTS_BY_ARRIVAL_FAIL
        })
    }
}


export const get_products_by_sold = () => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${URL}/get-products?sortBy=sold&order=desc&limit=3`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_BY_SOLD_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_PRODUCTS_BY_SOLD_FAIL
            })
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_PRODUCTS_BY_SOLD_FAIL
        })
    }
}


export const get_product = (productId: number) => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${URL}/product/${productId}`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_PRODUCT_FAIL
            })
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_PRODUCT_FAIL
        })
    }
}


export const get_related_products = (productId: number) => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${URL}/related/${productId}`, config)

        if (res.status === 200 && !res.data.error) {
            dispatch({
                type: RELATED_PRODUCTS_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: RELATED_PRODUCTS_FAIL
            })
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: RELATED_PRODUCTS_FAIL
        })
    }
}


export const get_filtered_products = (category_id: string | number, price_range: string | number, sort_by: string, order: string) =>
    async (dispatch: Dispatch) => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            category_id,
            price_range,
            sort_by,
            order
        })

        try {
            const res = await axios.post(`${URL}/by/search`, body, config)

            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: FILTER_PRODUCTS_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: FILTER_PRODUCTS_FAIL
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: FILTER_PRODUCTS_FAIL
            })
        }
    }


export const get_search_products = (search: string, category_id: number) => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        category_id,
        search        
    })

    try {
        const res = await axios.post(`${URL}/search`, body, config)

        if (res.status === 200) {
            dispatch({
                type: SEARCH_PRODUCTS_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: SEARCH_PRODUCTS_FAIL
            })
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: SEARCH_PRODUCTS_FAIL
        })
    }
}
import axios from 'axios'
import { parse } from 'qs'
import { Dispatch } from 'redux'

import {
    ADD_ITEM,
    GET_TOTAL,
    GET_ITEM_TOTAL,
    GET_ITEMS,
    UPDATE_ITEM,
    REMOVE_ITEM,
    EMPTY_CART,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAIL,
    GET_TOTAL_SUCCESS,
    GET_TOTAL_FAIL,
    GET_ITEM_TOTAL_SUCCESS,
    GET_ITEM_TOTAL_FAIL,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAIL,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAIL,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_FAIL,
    EMPTY_CART_SUCCESS,
    EMPTY_CART_FAIL,
    SYNCH_CART_SUCCESS,
    SYNCH_CART_FAIL
} from './types'



const URL = `${import.meta.env.VITE_BACKEND_URL}/api/cart`
interface Item {
    product_id: any;
    count: any;
}

interface CartItem {
    product: {
        id: any;
    };
    count: any;
}


export const add_item = (product: { id: number }) => async (dispatch: Dispatch) => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        const product_id = product.id
        const body = JSON.stringify({ product_id })

        try {
            const res = await axios.post(`${URL}/add-item`, body, config)

            if (res.status === 201) {
                dispatch({
                    type: ADD_ITEM_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: ADD_ITEM_FAIL
                })
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: ADD_ITEM_FAIL
            })
        }

    }
    else {
        let cart = []
        const storedCart = localStorage.getItem('cart')

        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        let shouldAddItem = true

        cart.map((item: { product: { id: { toString: () => string } } }) => {
            if (product.id.toString() === item.product.id.toString()) {
                shouldAddItem = false
            }
        })

        const order_item = {
            product: product,
            count: 1
        }

        if (shouldAddItem) {
            cart.push(order_item)
        }

        dispatch({
            type: ADD_ITEM,
            payload: cart
        })


    }
}


export const get_item = () => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        try {
            const res = await axios.get(`${URL}/cart-items`, config)

            if (res.status === 200) {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: GET_ITEMS_FAIL
                })
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_ITEMS_FAIL
            })
        }
    }
    else {
        dispatch({
            type: GET_ITEMS
        })
    }
}


export const get_total = () => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            const res = await axios.get(`${URL}/get-total`, config)

            if (res.status === 200) {
                dispatch({
                    type: GET_TOTAL_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: GET_TOTAL_FAIL
                })
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_TOTAL_FAIL
            })
        }
    }
    else {

        let total = 0.0
        let compare_total = 0.0
        let cart = []

        const storedCart = localStorage.getItem('cart')

        if (storedCart) {
            cart = JSON.parse(storedCart);

            cart.map((item: { product: { id: { compare_price: string } }; count: string }) => {
                total += parseFloat(item.product.id.compare_price) * parseFloat(item.count)
            })
        }

        dispatch({
            type: GET_TOTAL,
            payload: [parseFloat(total.toFixed(2)), parseFloat(compare_total.toFixed(2))]
        })
    }


}


export const get_item_total = () => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            const res = await axios.get(`${URL}/get-item-total`, config)

            if (res.status === 200) {
                dispatch({
                    type: GET_ITEM_TOTAL_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: GET_ITEM_TOTAL_FAIL
                })
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_ITEM_TOTAL_FAIL
            })
        }
    }
    else {
        let total = 0
        const storedCart = localStorage.getItem('cart')

        if (storedCart) {
            total = JSON.parse(storedCart).length;
        }

        dispatch({
            type: GET_ITEM_TOTAL,
            payload: total
        })

    }
}


export const update_item = (item: { product: { id: any } }, count: any) => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }

        const product_id = item.product.id
        const body = JSON.stringify({ product_id, count })

        try {
            const res = await axios.put(`${URL}/update-item`, body, config)

            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: UPDATE_ITEM_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: UPDATE_ITEM_FAIL
                })
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: UPDATE_ITEM_FAIL
            })
        }


    }
    else {
        let cart: any = []
        const storedCart = localStorage.getItem('cart')

        if (storedCart) {
            cart = JSON.parse(storedCart);

            cart.map((cart_item: { product: { id: { toString: () => any } } }, index: string | number) => {
                if (cart_item.product.id.toString() === item.product.id.toString()) {
                    cart[index].count = parseInt(count)
                }
            })
        }

        dispatch({
            type: UPDATE_ITEM,
            payload: cart
        })
    }

}


export const remove_item = (item: { product: { id: any } }, count: any) => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {

        const product_id = item.product.id
        const body = JSON.stringify({ product_id })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
            data: body
        }

        try {
            const res = await axios.delete(`${URL}/remove-item`, config)

            if (res.status === 200) {
                dispatch({
                    type: REMOVE_ITEM_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: REMOVE_ITEM_FAIL
                })
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: REMOVE_ITEM_FAIL
            })
        }
    }
    else {
        let cart = []
        let new_cart: { product: { id: { toString: () => any } } }[] = []
        const storedCart = localStorage.getItem('cart')

        if (storedCart) {
            cart = JSON.parse(storedCart);

            cart.map((cart_item: { product: { id: { toString: () => any } } }) => {
                if (cart_item.product.id.toString() !== item.product.id.toString()) {
                    new_cart.push(cart_item)
                }
            })
        }

        dispatch({
            type: REMOVE_ITEM,
            payload: new_cart
        })
    }
}


export const empty_cart = () => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        try {
            const res = await axios.delete(`${URL}/empty-cart`, config);

            if (res.status === 200) {
                dispatch({
                    type: EMPTY_CART_SUCCESS
                });
            } else {
                dispatch({
                    type: EMPTY_CART_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: EMPTY_CART_FAIL
            });
        }
    } else {
        dispatch({
            type: EMPTY_CART
        });
    }
}


export const synch_cart = () => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        },
    };

    let cart_items: Item[] = [];
    const storedCart = localStorage.getItem('cart');
    
    if (storedCart) {
        const cart = JSON.parse(storedCart);

        cart.map((cart_item: CartItem) => {
            const item: Item = {
                product_id: undefined,
                count: undefined
            };

            item.product_id = cart_item.product.id;
            item.count = cart_item.count;
            cart_items.push(item);
        });
    }

    const body = JSON.stringify({ cart_items });

    try {
        const res = await axios.put(`${URL}/synch`, body, config);

        if (res.status === 201) {
            dispatch({
                type: SYNCH_CART_SUCCESS,
            });
        } else {
            dispatch({
                type: SYNCH_CART_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: SYNCH_CART_FAIL,
        });
    }
};
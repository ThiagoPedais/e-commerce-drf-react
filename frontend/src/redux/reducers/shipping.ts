import { AnyAction } from 'redux'
import {
    GET_SHIPPING_OPTIONS_FAIL,
    GET_SHIPPING_OPTIONS_SUCCESS
} from '../actions/types'

const initialState = {
    shipping: null,
}



export default function Shipping(state = initialState, action: AnyAction) {
    const { type, payload } = action

    switch (type) {
        case GET_SHIPPING_OPTIONS_SUCCESS:
            return {
                ...state,
                shipping: payload.shipping_options
            }
        case GET_SHIPPING_OPTIONS_FAIL:
            return {
                ...state,
                shipping: null
            }
        default: {
            return state
        }
    }
}
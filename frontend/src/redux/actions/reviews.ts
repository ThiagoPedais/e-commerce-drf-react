import axios from 'axios';
import { Dispatch } from 'redux';
import {
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAIL,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    FILTER_REVIEWS_SUCCESS,
    FILTER_REVIEWS_FAIL,
} from './types';


const URL = `${import.meta.env.VITE_BACKEND_URL}/api/reviews`


export const get_reviews = (product_id: number | string) => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    }

    try {
        const res = await axios.get(`${URL}/get-reviews/${product_id}`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_REVIEWS_SUCCESS,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: GET_REVIEWS_FAIL
            })
        }

    }
    catch (error) {
        console.log(error);
        dispatch({
            type: GET_REVIEWS_FAIL
        })
    }
}


export const get_review = (product_id: number | string) => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {
            const res = await axios.get(`${URL}/get-review/${product_id}`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_REVIEW_SUCCESS,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: GET_REVIEW_FAIL
                });
            }
        }
        catch (err) {
            dispatch({
                type: GET_REVIEW_FAIL
            });
        }
    }
}


export const create_review = (product_id: number | string, rating: number, comment: string) =>
    async (dispatch: Dispatch) => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify({
                rating,
                comment
            })

            try {
                const res = await axios.post(`${URL}/create-review/${product_id}`, body, config);

                if (res.status === 201) {
                    dispatch({
                        type: CREATE_REVIEW_SUCCESS,
                        payload: res.data
                    });
                }
                else {
                    dispatch({
                        type: CREATE_REVIEW_FAIL
                    });
                }
            }
            catch (err) {
                dispatch({
                    type: CREATE_REVIEW_FAIL
                });
            }
        }
    }


export const update_review = (product_id: number | string, rating: number, comment: string) =>
    async (dispatch: Dispatch) => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify({
                rating,
                comment
            })

            try {
                const res = await axios.put(`${URL}/create-review/${product_id}`, body, config);

                if (res.status === 200) {
                    dispatch({
                        type: UPDATE_REVIEW_SUCCESS,
                        payload: res.data
                    });
                }
                else {
                    dispatch({
                        type: UPDATE_REVIEW_FAIL
                    });
                }
            }
            catch (err) {
                dispatch({
                    type: UPDATE_REVIEW_FAIL
                });
            }

        }
    }


export const delete_review = (product_id: number | string) => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            },
            data: {}
        }
        try {
            const res = await axios.delete(`${URL}/get-review/${product_id}`, config);

            if (res.status === 200) {
                dispatch({
                    type: DELETE_REVIEW_SUCCESS,
                    payload: res.data
                });
            }
            else {
                dispatch({
                    type: DELETE_REVIEW_FAIL
                });
            }
        }
        catch (error) {
            console.log(error);
            dispatch({
                type: DELETE_REVIEW_FAIL
            });
        }

    }
}


export const filter_reviews = (product_id: number | string, rating: number) => async (dispatch: Dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    let myRating;

    if (rating === 0.5)
        myRating = '0.5';
    else if (rating === 1 || rating === 1.0)
        myRating = '1.0';
    else if (rating === 1.5)
        myRating = '1.5';
    else if (rating === 2 || rating === 2.0)
        myRating = '2.0';
    else if (rating === 2.5)
        myRating = '2.5';
    else if (rating === 3 || rating === 3.0)
        myRating = '3.0';
    else if (rating === 3.5)
        myRating = '3.5';
    else if (rating === 4 || rating === 4.0)
        myRating = '4.0';
    else if (rating === 4.5)
        myRating = '4.5';
    else
        myRating = '5.0';

    try {
        const res = await axios.get(`${URL}/filter-reviews/${product_id}?rating=${myRating}`, config);

        if (res.status === 200) {
            dispatch({
                type: FILTER_REVIEWS_SUCCESS,
                payload: res.data
            });
        }
        else {
            dispatch({
                type: FILTER_REVIEWS_FAIL
            });
        }
    }
    catch (error) {
        console.log(error);

        dispatch({
            type: FILTER_REVIEWS_FAIL
        });
    }
}

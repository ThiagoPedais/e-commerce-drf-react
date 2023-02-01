import { Dispatch } from 'redux'
import {
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    REFRESH_FAIL,
    REFRESH_SUCCESS,
    LOGOUT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS
} from './types'
import { setALert } from './alert'

import axios from 'axios'



export const check_authenticated = () => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        })

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/jwt/verify/`, body, config)

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            }
            else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }

        }
        catch (error) {
            console.log(error);
            
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }
    }
    else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}


export const signup = (first_name: string, last_name: string, email: string, password: string, re_password: string) =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: SET_AUTH_LOADING
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            re_password
        })

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/`, body, config)

            if (res.status === 201) {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: res.data
                })
                dispatch(setALert('We send a email, please activate your account. Look the box spam', 'green') as any)

            }
            else {
                dispatch({
                    type: SIGNUP_FAIL,
                })
                dispatch(setALert('Erro to create account', 'red') as any)
            }

            dispatch({
                type: REMOVE_AUTH_LOADING
            })
        }
        catch (error) {
            console.log(error);
            
            dispatch({
                type: SIGNUP_FAIL,
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(setALert('Error to connect with server. Please, try later', 'red') as any)
        }
    }


export const load_user = () => async (dispatch: Dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/users/me/`, config)

            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: USER_LOADED_FAIL
                })
            }
        }
        catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    }
    else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }

}


export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        email,
        password
    })

    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/jwt/create/`, body, config)

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(load_user() as any)
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(setALert('Session started successfully :)', '#080') as any)
        }
        else {
            dispatch({
                type: LOGIN_FAIL
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(setALert('Error when logging in :(', '#ff0000') as any)
        }

    } catch (error) {
        console.log(error);

        dispatch({
            type: LOGIN_FAIL
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(setALert('Error when logging in. Try later :(', '#ff0000') as any)
    }
}


export const activate = (uid: string, token: string) => async (dispatch: Dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING
    })


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        uid,
        token,
    })

    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/activation/`, body, config)

        if (res.status === 204) {
            dispatch({
                type: ACTIVATION_SUCCESS
            })
            dispatch(setALert('Account activate with successfully', 'green') as any)
        }
        else {
            dispatch({
                type: ACTIVATION_FAIL
            })
            dispatch(setALert('Error to activate account', 'red') as any)
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        })

    }
    catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(setALert('Error to connect with server. Please, try later', 'red') as any)
    }
}


// export const refresh = () => async (dispatch: Dispatch) => {
//     if (localStorage.getItem('refresh')) {
//         const config = {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         };

//         const body = JSON.stringify({
//             refresh: localStorage.getItem('refresh')
//         });

//         try {
//             const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/jwt/refresh/`, body, config);
            
//             if (res.status === 200) {
//                 dispatch({
//                     type: REFRESH_SUCCESS,
//                     payload: res.data
//                 });
//             } else {
//                 dispatch({
//                     type: REFRESH_FAIL
//                 });
//             }
//         }catch(error){
//             console.log(error);

//             dispatch({
//                 type: REFRESH_FAIL
//             });
//         }
//     } else {        
//         dispatch({
//             type: REFRESH_FAIL
//         });
//     }
// }


export const reset_password = (email: string) => async (dispatch: Dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email })

    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/reset_password/`, body, config)

        if (res.status === 204) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(setALert("Password reset email sent", "green") as any)
        }
        else {
            dispatch({
                type: RESET_PASSWORD_FAIL
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(setALert("Error sending password reset email", "red") as any)
        }
    }
    catch(error){
        console.log(error);
        dispatch({
            type: RESET_PASSWORD_FAIL
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(setALert("Error sending password reset email", "red") as any)
        
    }
}


export const reset_password_confirm = (uid: string, token: string, new_password: string, re_new_password: string) =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: SET_AUTH_LOADING
        })
    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            uid,
            token,
            new_password,
            re_new_password
        })

        if (new_password !== re_new_password) {
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            })
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(setALert("Password do not match", "red") as any)        
        } 
        else {
            try {
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/users/reset_password_confirm/`, body, config)

                if (res.status === 204) {
                    dispatch({
                        type: RESET_PASSWORD_CONFIRM_SUCCESS
                    })
                    dispatch({
                        type: REMOVE_AUTH_LOADING
                    })
                    dispatch(setALert("Password has been rest successfully", "green") as any)  
                }
            }
            catch(error){
                console.log(error);
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_FAIL
                })                
                dispatch(setALert("Password reset fail", "red") as any)  
            }
        }
    }


export const logout = () => (dispatch: Dispatch) => {
    dispatch({
        type: LOGOUT
    })
    dispatch(setALert('Sucessfully logged out', 'green') as any)
}

import { Dispatch } from 'redux';
import actionTypes from './actionTypes'
import axios from 'axios'


/**
 * *Registering a user
 * {email,password}
 */

type SIFormData = {
    email: string,
    password: string,
}

type SUFormData = {
    email: string,
    username: string,
    password: string,
}

type ResponseData = {
    token: string;
    userID?: string;
    email?: string;
    username?: string;
}

type Action = {
    type: string,
    data: any,
    userID?: string,
    email?: string,
    username?: string,
}

export const signUp = (formData: SUFormData, cb: () => void) => async (dispatch: Dispatch<Action>) => {

    try{
        // api call to our backend 

        let response = await axios.post('/register', formData)
        // response.data.token
        // console.log(response); // token 

        // setting our token inside of global storage
        dispatch<any>({
            type: actionTypes.AUTH_USER,
            data: response.data.token
        })

        cb()

        // store token in local storage

        localStorage.setItem('token', response.data.token)

    }
    catch(error){

        // console.log(error);

        dispatch<any>({
            type: actionTypes.ERROR,
            data: error
        })
    }

    
}



/**
 * LoggingIn
 */


export const signIn = (formData: SIFormData, cb: () => void) => async (dispatch: Dispatch<Action>) => {

    try{
        // make an api call to /login

        let response = await axios.post('/login', formData)

        // console.log("action user login", response)

        dispatch({
            type: actionTypes.AUTH_USER,
            data: response.data.token,
            userID: response.data.userID,
            email: response.data.email,
            username: response.data.username
        })

        // invoke the callback function to navigate to a feature page
        cb()

        localStorage.setItem('token', response.data.token)
    }
    catch(error){

        // console.log("error", error)

        dispatch({
            type: actionTypes.ERROR,
            data: error
        })

        
    }
}


export const signOut = (cb: () => void) => (dispatch: Dispatch<Action>) => {

    // call to backend destroy token on backend

    dispatch({
        type: actionTypes.AUTH_USER,
        data: ""
    })


    // clear local storage

    localStorage.removeItem('token')

    cb(); // navigate our user to some other page

}



export const checkToken = () => async (dispatch: Dispatch<Action>) => {

    if(localStorage.token){
        // api call

        try{

            let response = await axios.get('/protected', {

                headers: {
                    'authorization': localStorage.token
                }
            })

            // our token is valid

            if(response.data.isValid){
                dispatch({
                    type: actionTypes.AUTH_USER,
                    data: localStorage.token
                })
            }
        }
        catch(error){
            dispatch({
                type: actionTypes.ERROR,
                data: error
            })
        }
    }

}

export const lists = () => async (dispatch: Dispatch<Action>) => {

    try{
        // make an api call to /login

        let response = await axios.get('/list')

        // console.log("action user login", response)

        dispatch({
            type: actionTypes.AUTH_USER,
            data: response.data.token,
            // listID: response.data.listID
        })

        // // invoke the callback function to navigate to a feature page
        // cb()

        // localStorage.setItem('token', response.data.token)
    }
    catch(error){

        dispatch({
            type: actionTypes.ERROR,
            data: error
        })
    }
}




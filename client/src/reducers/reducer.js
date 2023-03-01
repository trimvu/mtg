import actionTypes from '../actions/actionTypes';

const initialState = {
   auth: "",
   error: "",
   userID: "",
   email: "",
   username: "",
   listID: "",
}

const reducerTemplate = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.AUTH_USER:
            return {
                ...state,
                auth: action.data,
                userID: action.userID,
                username: action.username
            }
        case actionTypes.ERROR:
            return {
                ...state,
                auth: action.data,
                error: action.data
            }
            
        default:
            return state;
    } 
}


export default reducerTemplate
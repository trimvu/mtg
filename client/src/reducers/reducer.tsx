import actionTypes from '../actions/actionTypes';

type InitialStateProp = {
  auth: string | null;
  error: string;
  userID: number | string | undefined;
  email: string;
  username: string | undefined;
  listID: number | string;
}

const initialState: InitialStateProp = {
  auth: "",
  error: "",
  userID: "",
  email: "",
  username: "",
  listID: "",
}

type ActionProp = {
  type: string;
  data: any;
  userID?: string;
  username?: string;
}

const reducerTemplate = (state: InitialStateProp = initialState, action: ActionProp) => {
  switch (action.type) {
    case actionTypes.AUTH_USER:
      return {
        ...state,
        auth: action.data,
        userID: action.userID,
        username: action.username
      };
    case actionTypes.ERROR:
      return {
        ...state,
        auth: action.data,
        error: action.data
      };
    default:
      return state;
  }
};

export default reducerTemplate;

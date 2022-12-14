import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";


const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = intialState, action) {
    const { type, payload } = action; 

    switch(type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.action); 
            return {
                ...state, 
                ...payload, 
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token'); 

            return {
                ...state, 
                token: null, 
                isAuthenticated: false,
                loading: false
            }

        default:
            return state;
    }
}
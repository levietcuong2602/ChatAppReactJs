import {combineReducers} from 'redux';
import * as actionTypes from '../actions/types';

// user
const initialUserState = {
    currentUser: null,
    isLoading: true
}

const user_reducer = (state=initialUserState, action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionTypes.CLEAT_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
        return state;
    }
}

//chanel
const initialChanelState = {
    currentChanel: null
}

const chanel_reducer = (state = initialChanelState, action) => {
    switch(action.type){
        case actionTypes.SET_CURRENT_CHANEL:
            return {
                ...state,
                currentChanel: action.payload.currentChanel
            };
        default:
            return { ...state};
    }
}

const rootReducer = combineReducers({
    user: user_reducer,
    chanel: chanel_reducer
});

export default rootReducer;
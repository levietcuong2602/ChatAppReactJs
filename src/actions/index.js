import * as actionTypes from './types';

//USER
export const setUser = user =>{
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = ()=>{
    return {
        type: actionTypes.CLEAT_USER
    }
}

//CHANEL
export const setCurrentChanel = chanel => {
    return {
        type: actionTypes.SET_CURRENT_CHANEL,
        payload: {
            currentChanel: chanel
        }
    }
}

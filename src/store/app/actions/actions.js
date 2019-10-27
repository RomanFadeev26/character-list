import * as appActionTypes from './actionTypes';

export const loadingStart = (message) => ({type: appActionTypes.LOADING_START, payload: message});
export const loadingSuccess = () => ({type: appActionTypes.LOADING_SUCCESS});
export const loadingError = (message) => ({type: appActionTypes.LOADING_ERROR, payload: message});
export const clearMessages = () => ({type: appActionTypes.CLEAR_MESSAGES});
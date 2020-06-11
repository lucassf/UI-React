import * as ActionTypes from './ActionTypes'

export const Auth = (state = {
    isLoading: false, isAuthenticated: localStorage.getItem('token') !== null,
    token: localStorage.getItem('token'), errMsg: null, username: ''
}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return { ...state, isLoading: true, errMsg: null, isAuthenticated: false, username: '' }
        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, isLoading: false, errMsg: null, isAuthenticated: true, token: action.token, username: action.username }
        case ActionTypes.LOGIN_FAILURE:
            return { ...state, isLoading: false, errMsg: action.message, isAuthenticated: false, username: '' }
        case ActionTypes.LOGOUT_REQUEST:
            return { ...state, isLoading: true, isAuthenticated: true}
        case ActionTypes.LOGOUT_SUCCESS:
            return { ...state, isLoading: false, errMsg: null, isAuthenticated: false, token: '', username: '' }
        default:
            return state;
    }
}
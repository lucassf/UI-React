import * as ActionTypes from './ActionTypes'

export const Favorites = (state = {
    isLoading: true, errMsg: null, favorites: null
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITES:
            return { ...state, isLoading: false, errMsg: null, favorites: action.payload}
        case ActionTypes.FAVORITES_LOADING:
            return { ...state, isLoading: true, errMsg: null, favorites: null }
        case ActionTypes.FAVORITES_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload, favorites: null }
        default:
            return state;
    }
}
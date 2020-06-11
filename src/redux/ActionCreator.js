import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds));

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        throw new Error(error.message);
    })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                localStorage.setItem('token', response.token);
                dispatch(fetchFavorites());
                dispatch(receiveLogin(response, creds.username));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => {
            dispatch(loginError(error.message))
        });
}

const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

const receiveLogin = (response, username) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        username: username
    }
}

const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

export const postComment = (dishId, rating, comment) => (dispatch) => {
    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment
    }
    console.log(newComment)
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        throw new Error(error.message);
    })
        .then(response => response.json())
        .then(comment => dispatch(addComment(comment)))
        .catch(error => {
            console.log('Post error: ' + error.message)
            alert('Your comment could not be posted\nError: ' + error.message)
        });
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading())

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errMsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMsg
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errMsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMsg
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading())

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errMsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMsg
})

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const leadersFailed = (errMsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMsg
})

export const postFeedback = (newFeedback) => (dispatch) => {
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        throw new Error(error.message);
    })
        .then(response => response.json())
        .then(feedback => {
            alert("Posted feedback on server:\n" + JSON.stringify(feedback))
        })
        .catch(error => {
            console.log('Post error: ' + error.message)
            alert('Your feedback could not be posted\nError: ' + error.message)
        });
}

export const postFavorite = (dishId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: 'POST',
        body: JSON.stringify({ '_id': dishId }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        throw error;
    })
        .then(response => response.json())
        .then(favorites => {
            console.log('Favorite added: ' + favorites);
            dispatch(addFavorites(favorites));
        })
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (dishId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: 'DELETE',
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    }).then(response => {
        if (response.ok) return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        throw error;
    })
        .then(response => response.json())
        .then(favorites => {
            console.log('Favorite deleted. Remained: ' + favorites);
            dispatch(addFavorites(favorites));
        })
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const fetchFavorites = () => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    dispatch(favoritesLoading());

    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(favorites => dispatch(addFavorites(favorites)))
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
})

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
})

export const favoritesFailed = (errMsg) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errMsg
})
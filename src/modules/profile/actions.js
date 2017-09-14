
export const LOAD = 'load'
export const LOADING = 'loading'
export const LOADED = 'loaded'

export const ERROR = 'error'

export const NEXT_PHOTO = 'next-photo'
export const PREV_PHOTO = 'prev-photo'

export function load () {
    return (dispatch, getState) => {
        dispatch(loading())

        fetch('/profiles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('http query failed')
            }
            return response
        })
        .catch(e => {
            dispatch(error())
            console.error(e)            
        })
        .then(response => response && response.json())
        .then(json => {
            if (json) {
                dispatch(loaded(json))
                dispatch(loading(false))
            }
        })
    }
}

export function error(message) {
    return {
        type: ERROR,
        message
    }
}

export function loading(status = true) {
    return {
        type: LOADING,
        action: status
    }
}

export function loaded (data) {
    return {
        type: LOADED,
        data
    }
}




export function nextPhoto () {
    return (dispatch, getState) => {
        const state = getState()
        if (state.profileUI.currentPhoto < state.profiles.list[state.profiles.current].photos.length - 1) {
            dispatch({
                type: NEXT_PHOTO
            })
        }
    }
}

export function prevPhoto () {
    return (dispatch, getState) => {
        const state = getState()
        if (state.profileUI.currentPhoto > 0) {
            dispatch({
                type: PREV_PHOTO
            })
        }
    }
}
import profilesData from './profilesData'

export const ERROR = 'error'

export const LOAD = 'load'
export const LOADING = 'loading'
export const LOADED = 'loaded'

export const GO_NEXT = 'go-next'
export const LIKE = 'like'
export const NOPE = 'nope'

export const NEXT_PHOTO = 'next-photo'
export const PREV_PHOTO = 'prev-photo'

export const EXPAND_PROFILE = 'expand-profile'


// PROFIL

export function error(message) {
    return {
        type: ERROR,
        message
    }
}


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
                profilesData.load(json)
                dispatch(loaded())
                dispatch(loading(false))
            }
        })
    }
}

export function loading(status = true) {
    return {
        type: LOADING,
        action: status
    }
}

export function loaded() {
    return {
        type: LOADED,
        current: profilesData.current(),
        next: profilesData.next()
    }
}

export function goNext(direction) {
    return {
        type: GO_NEXT,
        direction,
    }
}

export function liked() {
    return {
        type: LIKE,
        current: profilesData.current(),
        next: profilesData.next()
    }
}

export function like() {
    return (dispatch, getState) => {
        dispatch(goNext(1))
        setTimeout(() => {
            dispatch(liked())
        }, 500)
    }
}

export function nope() {
    
}



// PHOTOS

export function nextPhoto () {
    return (dispatch, getState) => {
        const state = getState()
        if (state.profileUI.currentPhoto < state.profiles.current.photos.length - 1) {
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

export function expandProfile(open = true) {
    return {
        type: EXPAND_PROFILE,
        open
    }
}
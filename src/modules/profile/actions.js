
export const LOAD = 'load'
export const LOADED = 'loaded'

export function load () {
    return {
        type: LOAD
    }
}

export function loaded () {
    return {
        type: LOADED,
        data: []
    }
}
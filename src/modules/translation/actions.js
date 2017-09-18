export const ADD_TRANSLATION = 'add-translation'
export const SET_LOCALE = 'set-locale'

export function addTranslation (data) {
    return {
        type: ADD_TRANSLATION,
        data
    }
}

export function setLocale (locale) {
    return {
        type: SET_LOCALE,
        locale
    }
}

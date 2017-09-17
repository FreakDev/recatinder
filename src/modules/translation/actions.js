export const ADD_TRANSLATION = 'add-translation'
export const SET_LOCALE = 'set-locale'
export const SET_AVAILABLE_LOCALES = 'set-available-locals'

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

export function setAvailableLocales(locales) {
    return {
        type: SET_AVAILABLE_LOCALES,
        locales
    }
}
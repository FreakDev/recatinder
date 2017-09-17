
export function getTranslate(state) {
    return (key) => {
        let localeIndex = state.translation.locales ? state.translation.locales.indexOf(state.translation.locale) : -1 
        
        let keyIndex = state.translation.keys.indexOf(key)
        if (localeIndex === -1 || keyIndex === -1) {
            return key
        }
        return state.translation.labels[keyIndex][localeIndex] || key
    }
}
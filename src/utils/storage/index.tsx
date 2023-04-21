import store from 'store'
import { key_const } from '../../const'

const _prefix = 'arent.test'

const _getRealKey = (key: any, noPrefix = false) => {
    if (noPrefix) {
        return key
    }

    return _prefix + key
}

export const removeLocalData = (key: any, noPrefix = false) => {
    const realKey = _getRealKey(key, noPrefix)

    return store.remove(realKey)
}

export const getLocalData = (key: any, defaultValue = null, noPrefix = false) => {
    const realKey = _getRealKey(key, noPrefix)

    const value = store.get(realKey) || defaultValue

    try {
        return JSON.parse(value)
    } catch (e) {
        return value
    }
}

export const setLocalData = (key: any, value: any, noPrefix = false) => {
    const realKey = _getRealKey(key, noPrefix)

    const type = typeof value
    if (type === 'object') {
        value = JSON.stringify(value)
    }

    store.set(realKey, value)

    return value
}

export const getSessionKey = () =>
    getLocalData(key_const.session_key)

export const setSessionKey = (key: any) => {
    setLocalData(key_const.session_key, key)
}
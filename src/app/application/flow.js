export const INFO = 'APPLICATION/INFO';
export const UPDATE = 'APPLICATION/UPDATE';
export const LEARN = 'APPLICATION/LEARN';

import {
    getWeights as apiInfoGet,
    setWeight as apiSetWeight
} from '../api/index.js'

export function infoGet() {
    return (dispatch, getState) => {
        return apiInfoGet().then((res) => {
            dispatch({type: INFO, payload: res})
        })
    }
}
export function setWeight(name, weight) {
    return (dispatch, getState) => {
        return apiSetWeight(name, weight).then((res) => {
            return apiInfoGet().then((res) => {
                dispatch({type: UPDATE, payload: res})
            });
            //dispatch({type: LEARN, payload: {name, data: weight}});
            // Тут можно продиспатчить сообщение об успешной записи
            //dispatch({type: LEARN, payload: res})
        })
    }
}
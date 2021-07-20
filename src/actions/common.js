import { ERROR } from '../constants/ActionTypes';

export const addError = (data) => {
    return {
        type: ERROR,
        payload: data
    }
}
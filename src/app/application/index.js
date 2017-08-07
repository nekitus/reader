import {
    INFO,
    UPDATE,
    LEARN
}  from './flow.js'

export {
    infoGet,
    setWeight
} from './flow.js'

const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action = null) {
    const {type, error, payload} = action;
    switch (type) {
        case INFO:
            return {
                weights: payload
            };
        case UPDATE:
            return {
                weights: payload,
                update: true
            };
        default:
            return {};
    }
}

function mapWeights(weights) {
    return weights.map((weight) => {
        weight.data = weight.data.split(',');
        return weight
    })
}


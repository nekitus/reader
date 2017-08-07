import {post} from './request';


export function getWeights() {
    return post('/getSymbols', {}).then((weights) => {
        return weights
    });
}

export function setWeight(symbol, weight) {
    return post('/setSymbol', {symbol, weight}).then((res) => {
        console.log("success?", res);
    });
}
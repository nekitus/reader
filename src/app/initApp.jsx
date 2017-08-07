import React, {Component} from 'react'
import ReactRouter,{Router, browserHistory, hashHistory} from 'react-router'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import multi from 'redux-multi';
const middlewares = [thunk, promise, multi];

import {getWeights as apiInfoGet} from './api/index.js'
import {infoGet} from './application/index.js'

import App from './App.jsx'

import { AppContainer } from 'react-hot-loader'

import {
    HashRouter,
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom';



export default function (createRoutes, rootReducer){
    const enhancer = applyMiddleware(...middlewares);
    const store = createStore(rootReducer, {}, enhancer);
    const routes = createRoutes(store);

    class App extends Component {
        render() {
            return (
                <Provider store={store}>
                    <HashRouter
                        children={routes}
                        onUpdate={(e)=> {console.log("router update", e)}}
                    />
                </Provider>
            )
        }
    }
    const render = Component => {
        ReactDOM.render(
            <AppContainer>
                <Component store={store} routes={routes} />
            </AppContainer>,
            document.querySelector('.application'));
    };

    store.dispatch(infoGet()).then(() => {
        render(App)
    });

    console.log("sdfcccccc")

    if (module.hot) {
        console.log(module.hot)
        console.log("sdfsdfsdf")
        module.hot.accept('./App.jsx', () => { render(App) })
    }
}

console.log("mmodule hot", module.hot);
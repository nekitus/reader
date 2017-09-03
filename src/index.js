import _ from "lodash"
import React from 'react';
//import {Route} from 'react-router'
import {combineReducers} from 'redux';

import LayoutApp from './pages/LayoutApp.jsx'
import Header from './pages/Header.jsx'

import initApp from './app/initApp.jsx'

import 'react-hot-loader/patch';

// reducers
import application from './app/application/index.js'

const rootReducer = combineReducers({
    application
});
import {
    HashRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';


function createRoutes (store){
    return (
        <div>
            <Header />
            <LayoutApp />
        </div>
    );
}
console.log("module.hot")
console.log(module.hot)

initApp(createRoutes, rootReducer);
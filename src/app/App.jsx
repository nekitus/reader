import React, {Component} from 'react'
import {Provider} from 'react-redux';

import {
    BrowserRouter
} from 'react-router-dom';


export default class App extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <BrowserRouter
                    children={this.props.routes}
                    onUpdate={(e)=> {console.log("router update", e)}}
                    />
            </Provider>
        )
    }
}
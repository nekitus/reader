import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom'

import ApplicationPage from './ApplicationPage.jsx'
import LearningPage from './LearningPage.jsx'

export default class LayoutApp extends Component {
    render(){
        const {children, selectedMenuItem, redirect} = this.props;
        return (<div>
            <main>
                <Redirect path="/" to="/application" />
                <Route path="/learning" component={LearningPage} />
                <Route path="/application" component={ApplicationPage} />
            </main>
        </div>)
    }
}
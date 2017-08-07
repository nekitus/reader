import React, {Component} from 'react';
import {connect} from 'react-redux';

class LearningPage extends Component {
    render(){
        return (<div>LearningPage</div>)
    }
}

export default connect(function(state){
    console.log(state, 'state');
    return {}
}, {})(LearningPage)
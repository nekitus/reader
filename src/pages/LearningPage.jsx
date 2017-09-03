import React, {Component} from 'react';
import {connect} from 'react-redux';

import Canvas from '../ui/components/ui/canvas/Canvas'

class LearningPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            <Canvas weights={this.props.weights}/>
        </div>)
    }
}

export default connect(function(state){
    return {
        weights: state.application.weights
    }
}, {

})(LearningPage)
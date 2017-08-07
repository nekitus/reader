import React, {Component} from 'react'

import styles from './ui-input.css'


export default class UIInput extends Component {
    constructor(props){
        super(props);
        this.state = {value: ""}
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            value
        });
        this.props.onChange(event, value)
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.result !== this.props.result) {
            this.setState({
                value: nextProps.result
            })
        }
    }


    render() {
        return <input value={this.getValue()} onChange={this.handleChange} className="uiInput" type="text" />
    }

    getValue() {
        return this.state.value
    }
}


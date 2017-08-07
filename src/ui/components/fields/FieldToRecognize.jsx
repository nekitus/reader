import React from 'react'
import UIInput from '../ui/input/UIInput.jsx'

export default class FieldToRecognize extends UIInput {
    render(){
        return (<UIInput result={this.props.result} onChange={this.handleChange}></UIInput>)
    }
    handleChange(event, value) {
        this.props.onChange(event, value)
    }
}
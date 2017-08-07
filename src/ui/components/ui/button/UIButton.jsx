import React, {Component} from 'react'

import styles from './ui-button.css'


export default class UIButton extends Component {
    handleClick = event => {
        this.props.onClick(event)
    };

    render() {
        return <button onClick={this.handleClick} className="ui-button">Запомнить</button>
    }
}


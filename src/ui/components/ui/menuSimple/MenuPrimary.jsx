import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import './menu-primary.css'

class UIMenuPrimary extends Component {
    render(){
        const {items} = this.props;
        return (<div className="ui-menu-primary">
            <div className="ui-menu-primary__list">
            {items.map(item => {
                return <div className="ui-menu-primary__item" key={item.name}>
                    <Link style={{color:'#74a3c7', textDecoration: 'none', font: '13px/20px pragmatica, Helvetica, Arial, sans-serif'}} to={item.path} className='ui-link ui-menu-primary__link ui-menu-primary__link_active ui-menu-primary__link_not-showed'>{item.name}</Link>
                </div>
                }
            )}
            </div>
        </div>)
    }
}

export default UIMenuPrimary;

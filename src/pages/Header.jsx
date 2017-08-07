import React, {Component} from 'react';

import UIMenuPrimary from '../ui/components/ui/menuSimple/MenuPrimary.jsx'

export default class Header extends Component {
    render(){
        const items = [
            {name: "Распознавание", path: "/application"},
            {name: "Обучение", path: "/learning"}
        ];

        return (<div>
            <UIMenuPrimary items={items}/>
        </div>)
    }
}
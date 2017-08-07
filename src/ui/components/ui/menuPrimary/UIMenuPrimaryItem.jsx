import React, { Component, PropTypes as pt } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';
import {Link} from 'react-router';

// mixins
import mixin from '../../../../utils/decorators/mixinComponent';
import setRef from '../../../../utils/decorators/setRef';
import onboardingElements from '../../../mixins/OnboardingElements';

// components
import UILink from '../link/UILink.jsx';
import MenuCounter from './UIMenuPrimaryItemCounter.jsx';

// utils
import propsFor from '../../../../utils/propsFor';

// TODO: Tutorial: Ставить элементы индивидуально, а не все на каждый элемент меню
@mixin(onboardingElements({
    listProviders: 'itemplatformPayments',
    listProviders2: 'itemplatformPayments',
    nocardTarget: 'itembonuses',
    viewTarget: 'itembonuses',
    availableTarget: 'itembonuses'
}))
@pureRender
@setRef
class UIMenuPrimaryItem extends Component {

    static contextTypes = {
        executeAction: pt.func.isRequired
    };

    static propTypes = {
        externalPage: pt.string,
        path: pt.string,
        title: pt.string,
        mod: pt.string,
        count: pt.number,
        style: pt.object,
        active: pt.bool,
        showed: pt.bool,
        onClickCallback: pt.func,
        routeName: pt.string,
        ...UILink.propTypes
    };

    static defaultProps = {
        mod: ''
    };

    componentWillUpdate(nextProps) {
        nextProps.count && this.addElements({
            newInvoicing: 'itemplatformPaymentsCounter'
        });
    }

    render() {
        const {
            external,
            path,
            title,
            count,
            mod,
            active,
            showed,
            onClickCallback,
            style,
            routeName
        } = this.props;
        const menuMod = mod.toLowerCase();
        return <div className={classNames({
            'ui-menu-primary__item': true,
            [`ui-menu-primary__item_${menuMod}`]: mod
        })} style={style}
        >
            <CustomLink
                onClick={onClickCallback}
                mod={mod}
                active={active}
                showed={showed}
                path={path}
                external={external}
            >
                {title}
                {count ? <MenuCounter
                    ref={this.setRef(`item${routeName}Counter`)}
                    count={count}
                /> : null}
            </CustomLink>
            {this.props.children}
        </div>;
    }
}
export const itemProps = propsFor(UIMenuPrimaryItem);

export default UIMenuPrimaryItem;


function CustomLink(props) {
    const menuMod = props.mod.toLowerCase();
    const className = classNames({
        'ui-link': true,
        'ui-menu-primary__link': true,
        'ui-menu-primary__link_active': props.active,
        'ui-menu-primary__link_not-showed': !props.showed,
        [`ui-menu-primary__link_${menuMod}`]: props.mod,
        [`ui-menu-primary__link_${menuMod}_active`]: props.mod
    });
    const linkProps = {
        children: props.children,
        onClick: props.onClick,
        className
    };
    return props.external ?
        <a href={props.path} {...linkProps} /> :
        <Link to={props.path} {...linkProps} />;
}

import React, { Component, PropTypes as pt } from 'react';
//import pureRender from 'pure-render-decorator';
import watchStores from '../../../../utils/decorators/watchStores';
import mixin from '../../../../utils/decorators/mixinComponent';
import scrollPosition from '../../../../utils/decorators/scrollPosition';
import onboardingElements from '../../../mixins/OnboardingElements';
// import menu from '../../../../utils/decorators/menu';
import windowSize from '../../../../utils/decorators/windowSize';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Item, { itemProps } from './UIMenuPrimaryItem.jsx';
import { accessLevels } from '../../../../stores/UserStore';
import setRef from '../../../../utils/decorators/setRef';

import './menu-primary.css';

const isItem = ref => ref.indexOf('item') === 0;

// HoC
// @menu({
//     mainMenuItems: {}
// })
//@windowSize
//@scrollPosition()

// mixins
//@mixin(onboardingElements())
//@watchStores(
//    'user'
//)
//@pureRender
//@setRef
class UIMenuPrimary extends Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    static propTypes = {
        mainMenuItems: pt.array.isRequired,
        pageScroll: pt.number,
        isLogoHovered: pt.bool,
        fromHomePage: pt.bool,
        chatShowed: pt.bool,
        sidebarShowed: pt.bool,
        showUpperLevel: pt.bool
    };

    static defaultProps = {
        mod: ''
    };

    getStoresState() {
        return {
            isAnonymous: this.context.getStore('user').getState().accessLevel === accessLevels.ANONYMOUS
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLogoHovered !== nextProps.isLogoHovered) {
            // FIXME setTimeout - временное решение, пока не будет исправлена анимация в задаче PF-680
            this.timeoutId = setTimeout(() => this.onWindowResize, 300);
        }

        if (this.props.windowWidth !== nextProps.windowWidth) {
            this.onWindowResize();
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.pageScroll > 0 && nextProps.pageScroll === 0) {
            this.addElements({
                availableTarget: 'itembonuses'
            });
        }

        !nextState.isAnonymous && this.addElements({
            mainMenuSection: 'mainMenuToggle'
        });
    }

    componentWillMount() {
        this.state = {
            showed: false,
            more: false
        };
    }

    componentDidMount() {
        this.getWidthItems();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    getWidthItems() {
        return Object
            .keys(this)
            .filter(isItem)
            .reduce((totalWidth, ref) => {
                const node = ReactDOM.findDOMNode(this[ref]);
                return totalWidth + (node && node.offsetWidth || 0);
            }, 0);
    }

    onWindowResize() {
        var node = ReactDOM.findDOMNode(this.list) || {},
            widthList = node.offsetWidth || 0;

        this.setState({
            more: widthList < this.getWidthItems()
        });
    }

    onClick = () => {
        var newShowed = !this.state.showed;

        this.setState({
            showed: newShowed
        });
        this.context.executeAction('pageScrollDisabled', newShowed);
        this.context.executeAction('tutorial/mainMenu', newShowed);
    };

    onClickCallback = () => {
        this.setState({
            showed: false
        });
        this.context.executeAction('pageScrollDisabled', false);
    };

    renderItem = (memo, route, index) => {
        if (route.type === 'text') {
            memo.push(
                <div key={route.name} className="ui-menu-primary__item">
                    {route.title}
                </div>
            );
            return memo;
        }
        memo.push(
            <Item
                key={route.name}
                routeName={route.name}
                count={route.badge}
                {...itemProps(this.props)}
                {...itemProps(route)}
                showed={this.state.showed}
                onClickCallback={this.onClickCallback}
                ref={this.setRef(`item-${index}`)}
                />
        );

        return memo;
    };

    render() {
        var items = this.props.mainMenuItems.reduce(this.renderItem, []);
        return <div className={classNames({
            'ui-menu-primary': true,
            'ui-menu-primary_active': this.state.showed,
            'ui-menu-primary_more': true,
            'ui-menu-primary_sidebar-showed': this.props.sidebarShowed,
            'ui-menu-primary_main-page': this.props.fromHomePage,
            'ui-menu-primary_chat-showed': this.props.chatShowed
        })}>
            <nav
                className={classNames({
                    'ui-menu-primary__list': true,
                    'ui-menu-primary__list_active': this.state.showed,
                    'ui-menu-primary__list_main-page': this.props.fromHomePage
                })}
                ref={this.setRef('list')}
                >
                {items.concat(
                    this.state.showed ?
                        <div
                            key='toggle-spacer'
                            className='ui-menu-primary__toggle-spacer'> </div> :
                        null
                )}
            </nav>
            {Boolean(items.length) && (<div
                className={classNames({
                    'ui-menu-primary__toggle': true,
                    'ui-menu-primary__toggle_active': this.state.showed,
                    'ui-menu-primary__toggle_sidebar-showed': this.props.sidebarShowed,
                    'ui-menu-primary__toggle_anonymous': this.state.isAnonymous
                })}
                onClick={this.onClick}
                ref={this.setRef('mainMenuToggle')}
                >
                <span
                    className={classNames({
                        'ui-menu-primary__toggle-element': true
                    })}
                    /> <span
                className={classNames({
                        'ui-menu-primary__toggle-element': true
                    })}
                /> <span
                className={classNames({
                        'ui-menu-primary__toggle-element': true
                    })}
                />
            </div>)}
        </div>;
    }
}

export default UIMenuPrimary;

import mixin from 'smart-mixin';

export default mixin({
    // React components
    componentDidMount: mixin.MANY,
    componentWillMount: mixin.MANY,
    componentWillReceiveProps: mixin.MANY,
    shouldComponentUpdate: mixin.ONCE,
    componentWillUpdate: mixin.MANY,
    componentDidUpdate: mixin.MANY,
    componentWillUnmount: mixin.MANY,

    // Forms // TODO Вынести в отдельную политику
    onChange: mixin.MANY,
    onSubmit: mixin.MANY,
    onFocus: mixin.MANY,
    onBlur: mixin.MANY,
    onRender: mixin.MANY,
    onStepChange: mixin.MANY,
    saveApp: mixin.MANY,

    // Animation
    animationStep: mixin.MANY,
    startAnimating: mixin.MANY,

    // Mask
    onKeyDown: mixin.MANY
});

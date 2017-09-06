import React, { Component, PropTypes } from 'react';
import "pixi.js"

export default class Canvas extends Component {

    static propTypes = {
    };

    constructor( props ) {
        super(props);

        //bind our animate function
        this.animate = this.animate.bind(this);
        //bind our zoom function
        this.updateZoomLevel = this.updateZoomLevel.bind(this);
    }

    weightToImageData(weights) {
        const data = weights.data;

        var c = document.createElement("canvas");
        var ctx = c.getContext("2d");
        var imgData = ctx.createImageData(50,50);
        for (let i = 0, j = 0;i<imgData.data.length; i += 4, j++) {
            imgData.data[i+0]= (data[j] * -255 / 4) + 255;
            imgData.data[i+1]= (data[j] * -255 / 4) + 255;
            imgData.data[i+2]= (data[j] * -255 / 4) + 255;
            imgData.data[i+3]= 160;
        }
        return imgData
    }

    componentDidMount() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 100;
        this.canvas.height = 1000;
        this.refs.gameCanvas.appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');
        const weights = this.props.weights;
        for(let i = 0; i < weights.length; i++) {
            const imageData = this.weightToImageData(weights[i]);
            this.context.translate(0, 55 * i);
            this.context.putImageData(imageData, 0, 55 * i);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        //this is easy with 1 prop, using Immutable helpers make
        //this easier to scale

        return nextProps.zoomLevel !== this.props.zoomLevel;
    }

    componentWillReceiveProps(nextProps) {
        this.updateZoomLevel(nextProps);
    }

    updateZoomLevel(props) {
        this.stage.scale.x = props.zoomLevel;
        this.stage.scale.y = props.zoomLevel;
    }

    animate() {
        // render the stage container
        //this.renderer.render(this.stage);
        //this.frame = requestAnimationFrame(this.animate);
    }

    render() {
        return (
            <div className="game-canvas-container" ref="gameCanvas">
            </div>
        );
    }
}
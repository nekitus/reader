import React, { Component, PropTypes } from 'react';
import "pixi.js"

export default class Canvas extends Component {

    /**
     * Define our prop types
     **/
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

        var c=document.createElement("canvas");
        var ctx=c.getContext("2d");
        var imgData=ctx.createImageData(50,50);
        for (let i=0, j = 0;i<imgData.data.length;i+=4, j++) {
            imgData.data[i+0]= data[j] * 255 / 4;
            imgData.data[i+1]= data[j] * 255 / 4;
            imgData.data[i+2]= data[j] * 255 / 4;
            imgData.data[i+3]= data[j] * 255 / 4;
        }
        return imgData
    }



    /**
     * In this case, componentDidMount is used to grab the canvas container ref, and
     * and hook up the PixiJS renderer
     **/
    componentDidMount() {
        //Setup PIXI Canvas in componentDidMount
        this.canvas = document.createElement('canvas');
        this.canvas.width = 100;
        this.canvas.height = 1000;
        this.refs.gameCanvas.appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');
        const weights = this.props.weights;
        for(let i = 0; i < weights.length; i++) {
            const imageData = this.weightToImageData(weights[i]);
            this.context.putImageData(imageData, 0, 55 * i);
        }
    }
    /**
     * shouldComponentUpdate is used to check our new props against the current
     * and only update if needed
     **/
    shouldComponentUpdate(nextProps, nextState) {
        //this is easy with 1 prop, using Immutable helpers make
        //this easier to scale

        return nextProps.zoomLevel !== this.props.zoomLevel;
    }
    /**
     * When we get new props, run the appropriate imperative functions
     **/
    componentWillReceiveProps(nextProps) {
        this.updateZoomLevel(nextProps);
    }

    /**
     * Update the stage "zoom" level by setting the scale
     **/
    updateZoomLevel(props) {
        this.stage.scale.x = props.zoomLevel;
        this.stage.scale.y = props.zoomLevel;
    }

    /**
     * Animation loop for updating Pixi Canvas
     **/
    animate() {
        // render the stage container
        //this.renderer.render(this.stage);
        //this.frame = requestAnimationFrame(this.animate);
    }

    /**
     * Render our container that will store our PixiJS game canvas. Store the ref
     **/
    render() {
        return (
            <div className="game-canvas-container" ref="gameCanvas">
            </div>
        );
    }
}
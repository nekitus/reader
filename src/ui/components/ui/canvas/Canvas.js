import React, { Component, PropTypes } from 'react';
import "pixi.js"

const COLOR_MAX = 255;

export default class Canvas extends Component {

    static propTypes = {
    };

    constructor( props ) {
        super(props);
    }

    weightToSprite(weights) {
        const data = weights.data;
        let c = document.createElement("canvas");
        let ctx = c.getContext("2d");
        let imgData = ctx.createImageData(50, 50);
        for (let i = 0, j = 0; i < imgData.data.length; i += 4, j++) {
            let color = weightToRGBColor(data[j]);
            imgData.data[i]     = color;
            imgData.data[i + 1] = color;
            imgData.data[i + 2] = color;
            imgData.data[i + 3] = 160;
        }
        ctx.putImageData(imgData, 1, 1);
        return PIXI.Sprite.from(c.toDataURL());
    }

    componentDidMount() {
        var app = new PIXI.Application(600, 800, {backgroundColor : 0xFFFFFF});
        this.refs.learnCanvas.appendChild(app.view);
        const weights = this.props.weights;
        for(let i = 0; i < weights.length; i++) {
            let container = new PIXI.Container();
            const char = this.weightToSprite(weights[i]);
            const title = new PIXI.Text(weights[i].name);

            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xEEEEEE);
            graphics.drawRect(0, 0, 200, 60);


            title.position.x = 60;
            title.position.y = 10;
            container.addChild(graphics);
            container.addChild(title);
            container.addChild(char);
            container.position.x = 30;
            container.position.y = (60 * i) + 60;
            app.stage.addChild(container);
        }
    }

    render() {
        return (
            <div ref="learnCanvas"></div>
        );
    }
}

function weightToRGBColor(weight) {
    return (weight * -COLOR_MAX / 4) + COLOR_MAX
}
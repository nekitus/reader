import React, { Component } from 'react';
import {Link} from 'react-router-dom'

//TODO: сделать библиотеку или обособленный модуль(посмотреть в др проекте)
import Recognition, {imageCapture} from '../../../app/recognition/index.js'

const RECOGNITION_IMAGE_SIZE = 50;

class Matrix extends Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.store = {
            path: [],
            timeouts: null
        }
    }

    shouldComponentUpdate() {
        return false
    }

    componentDidMount(){
        this.canvas.width = window.innerWidth - 6;
        this.canvas.height = 300;

        this.canvas.addEventListener("mousedown", this.handleMouseDown);
        this.canvas.addEventListener("mouseup", this.handleMouseUp);
        this.canvas.addEventListener("mousemove", this.handleMouseMove);

        this.canvas.addEventListener("touchstart", this.handleTouchDown);
        this.canvas.addEventListener("touchend", this.handleTouchUp);
        this.canvas.addEventListener("touchmove", this.handleTouchMove);
        this.context = this.canvas.getContext('2d');

        const context = this.getContext();
        context.fillStyle = 'white';
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        context.save();
        context.strokeStyle = "rgb(159, 204, 239)";
        context.lineWidth = 3;
        context.strokeRect(-3, -3, 54, 54);
        context.restore()
    }

    getContext(){
        return this.canvas.getContext('2d')
    }

    render(){
        const {items} = this.props;
        return (<canvas style={{border: "3px solid rgb(159, 204, 239)"}} ref={(canvas) => { this.canvas = canvas; }}></canvas>)
    }

    handleTouchDown = (e) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        this.handleDown(e, x, y)
    };

    handleTouchUp = (e) => {
        //const x = e.touches[0].clientX;
        //const y = e.touches[0].clientY;
        this.handleUp(e)
    };

    handleTouchMove = (e) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        this.handleMove(e, x, y)
    };

    handleMouseDown = (e) => {
        this.handleDown(e, e.offsetX, e.offsetY)

    };

    handleMouseUp = (e) => {
        this.handleUp(e, e.offsetX, e.offsetY)

    };

    handleMouseMove = (e) => {
        this.handleMove(e, e.offsetX, e.offsetY)
    };

    handleMove(e, x, y) {
        e.preventDefault();
        if (this.write) {
            const context = this.getContext();
            context.lineTo(x, y);
            context.stroke();
            this.store.path.push({y, x})
        }
    }

    handleDown(e, x ,y) {
        e.preventDefault();
        const context = this.getContext();
        context.lineWidth = 3;
        context.beginPath();
        context.lineCap="round";
        context.moveTo(x, y);
        this.write = true;
        this.store.continueTimeout && clearTimeout(this.store.continueTimeout)
    }

    handleUp(e) {
        e.preventDefault();
        this.write = false;
        this.store.continueTimeout = setTimeout(() => this.handlePaintEnd(), 2000)
    }

    handlePaintEnd() {
        const context = this.getContext();
        // Вырезать из канваса букву по крайним точкам
        const imageData = imageCapture(this.getContext(), this.store.path);
        this.store.path = [];
        const img = this.copyForScale(imageData);
        //const maxSize = imageData.width > imageData.height ? imageData.width : imageData.height;

        let width;
        let height;

        if(img.width > img.height) {
            width = RECOGNITION_IMAGE_SIZE;
            height = RECOGNITION_IMAGE_SIZE * img.height / img.width;
        } else {
            width = RECOGNITION_IMAGE_SIZE * img.width / img.height;
            height = RECOGNITION_IMAGE_SIZE;
        }

        img.onload = () => {
            context.drawImage(
                img,
                0, 0,
                img.width,
                img.height,
                0, 0,
                width,
                height);

            // можн обрать imageData с этого img(для простоты рисуем его в левом верхнем углу нашего канвас)
            const currentSizeImageData = context.getImageData(0, 0, RECOGNITION_IMAGE_SIZE, RECOGNITION_IMAGE_SIZE);
            this.props.onChange(currentSizeImageData);
            setTimeout(() => {
                context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                context.save();
                context.strokeStyle = "rgb(159, 204, 239)";
                context.strokeRect(-3, -3, 54, 54);
                context.restore()
            }, 1000)
        };
    }

    copyForScale(imageData){
        const tempCanvas = this.getTempCanvas(imageData.width, imageData.height);
        tempCanvas.getContext('2d').putImageData(imageData, 0, 0);
        var dataURL = tempCanvas.toDataURL();
        const image = document.createElement("img");
        image.width = imageData.width;
        image.height = imageData.height;
        image.src = dataURL;
        return image;
    }

    getTempCanvas(width, height){
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
}

export default Matrix;

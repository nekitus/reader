import React, {Component} from 'react';
import {connect} from 'react-redux';

import FieldToRecognize from '../ui/components/fields/FieldToRecognize.jsx'
import Matrix from '../ui/components/matrix/Matrix.jsx'
import UIButton from '../ui/components/ui/button/UIButton.jsx'
import Recognition, {imageCapture} from '../app/recognition/index.js'
import {setWeight} from '../app/application/index'

//import s from '/Users/nikita/projects/reader/src/app/testing/index.js'

class ApplicationPage extends Component {
     constructor(props) {
         super(props);
         this.state = {}
     }
     componentWillReceiveProps(newProps) {

         if(newProps.update) {
             this.setState({
                 update: newProps.update
             });
             window.setTimeout(() => {
                 this.setState({
                     update: false
                 });
             }, 2000)
         }
     }

     render(){
         const {results} = this.state;
         const oneResult = results && results.length && results[0].name;
        return (<div>
            <div style={{display: "flex"}}>
                <div style={{marginRight: "15px"}}>
                    <Matrix onChange={this.handleChangeMatrix} weights={this.props.weights}/>
                </div>
            </div>
            <h2>Результат</h2>
            {results && results.length > 1 && <div>Есть несколько вариантов: </div>}
            {results && results.length > 1 && results.map((result)=>{
                return <span>{result.name}</span>
            })}
            <div>
                <FieldToRecognize result={oneResult || ""} onChange={this.handleChange} />
                <UIButton onClick={this.handleClick}></UIButton>
            </div>
            {this.state.update && <div style={{color: "#0d8c0d", padding: "10px"}}>Данные сохранены</div>}
        </div>)
     }

     handleClick = () => {
         // сохраняем вес
         const weight = Recognition.getLearnWeights(this.props.weights, this.state.currentSizeImageData, this.state.symbol);
         this.props.saveWeights(this.state.symbol, weight);
         //this.setState({learnWeight: weight});
     };

     handleChange = (event, value) => {
         this.setState({symbol: value})
     };

     handleChangeMatrix = (currentSizeImageData) => {
         //context.putImageData(imageData, 0, 0);
         this.setState({currentSizeImageData});
         const recognition = new Recognition(this.props.weights, currentSizeImageData);
         const results = recognition.recognize();
         this.setState({results})
     }
}

export default connect(function(state) {
    return {
        weights: state.application && state.application.weights,
        update: state.application.update
    }
}, {
    saveWeights
})(ApplicationPage)

function saveWeights(name, weight) {
    return (dispatch, getState) => {
        dispatch(setWeight(name, weight))

    }
}

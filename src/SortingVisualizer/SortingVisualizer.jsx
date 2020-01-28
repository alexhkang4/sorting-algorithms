import React from 'react';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(probs) {
        super(probs);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 30; i++) {
            array.push(randomInt(10, 100));
        }
        this.setState({array});
    }

    bubbleSort () {
        var n = this.state.array.length;
        var thisArray = this.state.array;
        var component = this;
        async function load () {
            for(let i = 0; i < n; i++) {
                for(let j = 1; j < n; j++) {
                    const arrayBars = document.getElementsByClassName('array-bar');
                    for (let k = 0; k < arrayBars.length;k++) {
                        arrayBars[k].style.backgroundColor = "gray"
                    }
                    if(thisArray[j - 1] > thisArray[j]) {
                        swap(thisArray, j - 1, j);
                        arrayBars[j].style.backgroundColor = "red"
                        arrayBars[j - 1].style.backgroundColor = 'red';
                    }
                    component.setState(thisArray);
                    await timer(0);
                }
            }
        }
        load();
    }

    render() {
        const {array} = this.state;

        return (

            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value}px`}}>
                    </div>
                ))}
                <button onClick={() => this.resetArray()}>Randomize Array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
        );
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}
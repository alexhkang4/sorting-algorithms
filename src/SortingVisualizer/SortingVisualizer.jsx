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
        let n = this.state.array.length;
        let thisArray = this.state.array;
        let component = this;
        async function load () {
            for(let i = 0; i < n; i++) {
                for(let j = 1; j < n; j++) {
                    setGray();
                    if(thisArray[j - 1] > thisArray[j]) {
                        swap(thisArray, j - 1, j);
                    }
                    component.setState(thisArray);
                    await timer(30);
                }
            }
        }
        load();
    }

    insertionSort () {
        
    }

    quickSort() {
        let thisArray = this.state.array;
        let n = thisArray.length;
        let component = this;
        async function load (low, high) {
            let index;
            if (n > 1) {
                index = partition(thisArray, low, high);
                component.setState(thisArray);
            }
            
            if (low < index - 1) {
                load(low, index - 1);
            }
            if (index < high) {
                load(index, high);
            }
            await timer(30);
        }
        load(0, n - 1);   
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
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
            </div>
        );
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    const arrayBars = document.getElementsByClassName('array-bar');
    arrayBars[i].style.backgroundColor = "red"
    arrayBars[j].style.backgroundColor = 'red';
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function partition(array, low, high) {
    setGray();
    let pivot = array[Math.floor((low + high) / 2)];
    let i = low;
    let j = high;
    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function setGray() {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let k = 0; k < arrayBars.length;k++) {
        arrayBars[k].style.backgroundColor = "gray";
    }
}
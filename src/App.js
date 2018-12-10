import React, { Component } from 'react';
import Bar from './components/Bar';
import './App.css';

import { BAR_AMOUNT, BAR_WIDTH, BAR_MAX_HEIGHT, SPEED } from './app-settings';
import { Bubble, Merge } from './sorts';
import { sleep } from './utils';

import Tone from 'tone';
import scribble from 'scribbletune';

const generateBars = () =>
    Array.from(Array(BAR_AMOUNT), (v, index) => ({
        id: index,
        height: (BAR_MAX_HEIGHT / BAR_AMOUNT) * (index + 1),
        color: 'rebeccapurple',
        y: 0,
        value: index + 1,
        selected: false
    }));

class App extends Component {
    constructor() {
        super();
        this.state = {
            bars: generateBars(),
            done: true,
        };

        this.autoSort = this.autoSort.bind(this);
        this.step = this.step.bind(this);
        this.setSort = this.setSort.bind(this);
        this.isSorting = false;
    }
    async autoSort() {

        for(const b of this.state.sort) {
            this.setState({
              bars: b.bars
            })
            if(b.sleep) {
              await sleep(SPEED)
            }
        }

        this.setState({
            done: true
        })
    }
    setSort(sortCreator) {
        const barCopy = [...this.state.bars];
        barCopy.forEach((bar, index) => {
            const index2 = Math.floor(Math.random() * (index + 1));
            [barCopy[index], barCopy[index2]] = [
                barCopy[index2],
                barCopy[index]
            ];
        });

        this.setState({
            bars: barCopy,
            sort: sortCreator(barCopy),
            done: false,
        });

        this.isSorting = false;
    }
    step() {
        const b = this.state.sort.next().value;
        if (b) {
            this.setState({
                bars: b.bars
            });
        } else {
            this.setState({
                done: true,
            });

            this.isSorting = false;
        }
    }

    render() {
        return (
            <div
                className="App"
                style={{ backgroundColor: this.state.done ? 'green' : 'black' }}
            >
                {this.state.done ? (
                    <React.Fragment>
                        <button onClick={() => this.setSort(Bubble)}>Bubble sort</button>
                        <button onClick={() => this.setSort(Merge)}>Merge sort</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <button onClick={this.autoSort}>Autosort</button>
                        <button onClick={this.step}>next step</button>
                    </React.Fragment>
                )}

                {this.state.bars.map((bar, index) => (
                    <Bar key={bar.id} barNumber={index + 1} {...bar} x={BAR_WIDTH * index} />
                ))}
            </div>
        );
    }
}

export default App;

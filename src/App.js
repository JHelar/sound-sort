import React, { Component } from "react";
import Bar from "./components/Bar";
import "./App.css";

import { BAR_AMOUNT, BAR_WIDTH, BAR_MAX_HEIGHT } from "./app-settings";
import {
  Bubble
} from './sorts'
import {
  sleep
} from './utils'

class App extends Component {
  constructor() {
    super();
    this.state = {
      bars: Array.from(Array(BAR_AMOUNT), (v, index) => ({
        id: index,
        height: (BAR_MAX_HEIGHT / BAR_AMOUNT) * (index + 1),
        color: "rebeccapurple",
        y: 0,
        value: index + 1,
        selected: false
      })),
      done: true
    };
    this.scramble = this.scramble.bind(this);
    this.autoSort = this.autoSort.bind(this);
    this.step = this.step.bind(this);
  }
  scramble(){
    const barCopy = [...this.state.bars];
    barCopy.forEach((bar, index) => {
      const index2 = Math.floor(Math.random() * (index + 1));
      [barCopy[index], barCopy[index2]] = [barCopy[index2], barCopy[index]];
    })

    this.setState({
      bars: barCopy,
      done: false
    })
  }
  async autoSort(){
    if(!this.sort){
      this.sort = Bubble(this.state.bars);
    }
    for(const b of this.sort) {

      this.setState({
        bars: b.bars
      })
      if(b.sleep) {
        await sleep(25)
      }
    }
    this.setState({
      done: true
    })
    this.sort = null;
  }
  step(){
    if(!this.sort){
      this.sort = Bubble(this.state.bars);
    }
    const b = this.sort.next().value;
    if(b) {
      this.setState({
        bars: b.bars
      })
    } else {
      this.setState({
        done: true
      })
    }
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: this.state.done ? 'green' : 'black' }}>
        {
          this.state.done ? 
            <button onClick={this.scramble}>scramble</button> : 
            (
            <React.Fragment>
              <button onClick={this.autoSort}>Autosort</button>
              <button onClick={this.step}>next step</button>
            </React.Fragment>
            )
        }

        {this.state.bars.map((bar, index) => (
          <Bar key={bar.id} {...bar} x={BAR_WIDTH * index}/>
        ))}
      </div>
    );
  }
}

export default App;

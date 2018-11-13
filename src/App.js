import React, { Component } from "react";
import Bar from "./components/Bar";
import "./App.css";

import { BAR_AMOUNT, BAR_WIDTH, BAR_MAX_HEIGHT } from "./app-settings";

const maxHeight = document.body.clientHeight;
const maxWidth = document.body.clientWidth;

class App extends Component {
  constructor() {
    super();
    this.state = {
      bars: Array.from(Array(BAR_AMOUNT), (v, index) => ({
        id: index,
        height: (BAR_MAX_HEIGHT / BAR_AMOUNT) * (index + 1),
        color: "rebeccapurple",
        y: 0,
        value: index + 1
      }))
    };
    this.scramble = this.scramble.bind(this);
    this.sort = this.sort.bind(this);
  }
  scramble(){
    const barCopy = [...this.state.bars];
    barCopy.forEach((bar, index) => {
      const index2 = Math.floor(Math.random() * (index + 1));
      [barCopy[index], barCopy[index2]] = [barCopy[index2], barCopy[index]];
    })

    this.setState({
      bars: barCopy
    })
  }
  sort(){
    const barCopy = [...this.state.bars];
    this.setState({
      bars: barCopy.sort((a, b) => a.value > b.value ? 1 : b.value > a.value ? -1 : 0)
    }) 
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.scramble}>scramble</button>
        <button onClick={this.sort}>sort</button>
        {this.state.bars.map((bar, index) => (
          <Bar key={bar.id} {...bar} x={BAR_WIDTH * index}/>
        ))}
      </div>
    );
  }
}

export default App;

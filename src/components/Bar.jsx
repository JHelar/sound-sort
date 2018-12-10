import React from 'react';
import scribble from 'scribbletune';
import { BAR_WIDTH } from '../app-settings';

const getBarStyle = ({ height, x, color, selected }) =>({
    height: `${height}px`,
    width: `${BAR_WIDTH}px`,
    position: 'absolute',
    left: `${x}px`,
    bottom: 0,
    backgroundColor: selected ? 'red' : color,
    borderRadius: '3px 0 0 0',
    border: '1px solid aliceblue',
    borderWidth: '1px 0 0 1px'
})

export default class Bar extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        if(this.props.selected) { // Play a sound
            console.log({
                selected: this.props.selected   
            })
            scribble.clip({
                synth: 'PolySynth',
                pattern: 'x',
                nodes: 'CM',
            }).start();
            Tone.Transport.start();
        }
        return <div style={getBarStyle(this.props)}></div>
    }
}
import React from 'react';
import Tone from 'tone';
import scribble from 'scribbletune';
import { BAR_WIDTH, BAR_AMOUNT, SPEED, BAR_MAX_HEIGHT } from '../app-settings';

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
        const synth = new Tone.Synth().toMaster(); 
        this.state = {
            synth
        }
    }
    render(){
        if(this.props.selected) { // Play a sound
            this.state.synth.triggerAttackRelease((this.props.height / BAR_MAX_HEIGHT) * 4000, SPEED / 1000)
        }
        return <div style={getBarStyle(this.props)}></div>
    }
}
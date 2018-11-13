import React from 'react';

import { BAR_WIDTH } from '../app-settings';

const getBarStyle = ({ height, x, color }) =>({
    height: `${height}px`,
    width: `${BAR_WIDTH}px`,
    position: 'absolute',
    left: `${x}px`,
    bottom: 0,
    backgroundColor: color,
    borderRadius: '3px 0 0 0',
    border: '1px solid aliceblue',
    borderWidth: '1px 0 0 1px'
})

export default (props) => (
    <div style={getBarStyle(props)}></div>
)
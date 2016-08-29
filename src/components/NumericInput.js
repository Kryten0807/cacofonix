// dependencies
//
import React from 'react';

import Label from './Label';

const NumericInput = (props) => (
    <div className="form-group">
        <input type="text" className="form-control" />
        {props.label ? <Label label={props.label} /> : ''}
    </div>
);

export default NumericInput;

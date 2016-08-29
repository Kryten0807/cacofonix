// dependencies
//
import React from 'react';

const NumericInput = () => (
import Label from './Label';

    <div className="form-group">
        <input type="text" className="form-control" />
        {props.label ? <Label label={props.label} /> : ''}
    </div>
);

export default NumericInput;

// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';

import Label from './Label';

const NumericInput = (props) => (
    <div className="form-group">
        {props.label ? <Label label={props.label} /> : ''}
        <input type="text" className="form-control" placeholder={props.placeholder || ''}/>
    </div>
);

export default NumericInput;

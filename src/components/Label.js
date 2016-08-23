// dependencies
//
import React from 'react';

const Label = (props) => (
    <label className="control-label">
        {props.label}
        {props.required
            && <sup style={{ color: 'red' }}>
                <i className="glyphicon glyphicon-asterisk" />
            </sup>
        }
    </label>
);

export default Label;

// dependencies
//
import React from 'react';

const Label = ({ required, label }) => (
    <label className="control-label">
        {label}
        {required
            && <sup style={{ color: 'red' }}>
                <i className="glyphicon glyphicon-asterisk" />
            </sup>
        }
    </label>
);

export default Label;

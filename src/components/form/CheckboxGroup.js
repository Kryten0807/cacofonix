// dependencies
//
import React from 'react';

const CheckboxGroup = ({ label }) => (
    <div className="form-group">
        {label
            ? <label>{label}</label>
            : null
        }
    </div>
);

export default CheckboxGroup;

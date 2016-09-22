// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';

const CheckboxGroup = ({ label, options }) => (
    <div className="form-group">
        {label
            ? <label>{label}</label>
            : null
        }
    </div>
);

export default CheckboxGroup;

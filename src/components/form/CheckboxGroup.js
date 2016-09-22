// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';

const CheckboxGroup = ({ label, options }) => (
    <div className="form-group">
        {label
            ? <label className="checkboxgroup">{label}</label>
            : null
        }
        {options.map((opt) =>
            <div key={uniqueId('form-checkboxgroup-option-')} className="checkbox">
            </div>
        )}
    </div>
);

export default CheckboxGroup;

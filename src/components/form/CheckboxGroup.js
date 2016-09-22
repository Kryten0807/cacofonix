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
                <label>{opt.name}</label>
                    <input type="checkbox" value={opt.value} />
            </div>
        )}
    </div>
);

export default CheckboxGroup;

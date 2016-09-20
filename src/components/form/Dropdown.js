// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';

const Dropdown = ({ options }) => {
    return (
        <select className="form-control">
            {options.map((opt) =>
                <option key={uniqueId('form-dropdown-option-')} value={opt.value}>{opt.name}</option>
            )}
        </select>
    );
};

export default Dropdown;

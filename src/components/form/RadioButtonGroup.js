// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';


const RadioButtonGroup = ({ label, options }) => (
    <div>
        {label ? (<label>{label}</label>) : null}
        {options.map((opt) => <div key={uniqueId('form-radiobuttongroup-option-')} className="radio"></div>)}
    </div>
);


export default RadioButtonGroup;

// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';


const RadioButtonGroup = ({ label, options }) => (
    <div>
        {options.map((opt) => <div key={uniqueId('form-radiobuttongroup-option-')} className="radio"></div>)}
        {label ? (<label className="radiobuttongroup">{label}</label>) : null}
    </div>
);


export default RadioButtonGroup;

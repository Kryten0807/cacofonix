// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Label from './Label';

const TextInput = ({ label, placeholder }) => {

    const id = uniqueId('TextInput-');

    return (
        <div className="form-group">
            {label &&
                <Label htmlFor={id} label={label} />
            }
            <input id={id} type="text" className="form-control" placeholder={placeholder || ''} />
        </div>
    );
};

export default TextInput;

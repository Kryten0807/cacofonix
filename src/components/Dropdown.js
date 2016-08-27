// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Label from './Label';

const Dropdown = (props) => (
    <div className="form-group">
        {props.label ? <Label label={props.label} required={props.required} /> : ''}
        <select className="form-control">
            {props.includeNull ? <option key={uniqueId('Dropdown-')} value="">{props.nullName}</option> : ''}
            {props.options.map((opt) => <option key={uniqueId('Dropdown-')} />)}
        </select>
    </div>
);

// set the property types for the Dropdown component
//
Dropdown.propTypes = {
    label:       React.PropTypes.string,
    includeNull: React.PropTypes.bool,
    nullName:    React.PropTypes.string,
    required:    React.PropTypes.bool,
    options:    React.PropTypes.array,
};


export default Dropdown;

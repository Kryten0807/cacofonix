// dependencies
//
import React from 'react';
import Label from './Label';

const Dropdown = (props) => (
    <div className="form-group">
        {props.label ? <Label label={props.label} required={props.required} /> : ''}
        <select className="form-control" />
    </div>
);


// set the property types for the Dropdown component
//
Dropdown.propTypes = {
    label:       React.PropTypes.string,
    required:    React.PropTypes.bool,
    options:    React.PropTypes.array,
};


export default Dropdown;

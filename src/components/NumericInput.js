// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';

import Label from './Label';

class NumericInput extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqueId('NumericInput-');
    }

    render() {
        return (
            <div className="form-group">
                {this.props.label ? <Label htmlFor={this.id} required={!!this.props.required} label={this.props.label} /> : ''}
                <input
                    type="text"
                    id={this.id}
                    className="form-control"
                    placeholder={this.props.placeholder || ''}
                />
            </div>
        );
    }
}

// set the property types for the NumericInput component
//
NumericInput.propTypes = {
    label:       React.PropTypes.string,
    placeholder: React.PropTypes.string,
};


export default NumericInput;

// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';

import Label from './Label';

class NumericInput extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqueId('NumericInput-');

        this.validationMessage = `${props.description} is required`;
    componentWillMount() {
        if (this.props.onValidation) {
            this.props.onValidation(this.state.hasValidated, this.state.isValid, this.state.validationMessage);
        }
    }

    onBlur(event) {
        const newState = this.validate(event.target.value);
        newState.hasValidated = true;

        this.setState(newState);

        if (this.props.onValidation) {
            this.props.onValidation(newState.hasValidated, newState.isValid, newState.validationMessage);
        }
    }

    onChange(event) {
        const newState = this.validate(event.target.value);
        newState.hasValidated = this.state.hasValidated;

        this.setState(newState);

        if (this.props.onValidation && newState.hasValidated) {
            this.props.onValidation(newState.hasValidated, newState.isValid, newState.validationMessage);
        }
    }

    }

    render() {
        return (
            <div className="form-group">
                {this.props.label
                    ? <Label
                        htmlFor={this.id}
                        required={!!this.props.required}
                        label={this.props.label}
                    />
                    : ''
                }
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
    required:    React.PropTypes.bool,
    placeholder: React.PropTypes.string,
};


export default NumericInput;

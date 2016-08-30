// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';

import Label from './Label';

const clean = (value) => `${value}`.replace(/[^0-9.]/g, '');

const decimals = (value, decimals) => `${value.toFixed(decimals)}`;

const currency = (value) => `$ ${decimals(value, 2)}`;


class NumericInput extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqueId('NumericInput-');

        this.validationMessage = `${props.description} is required`;

        this.state = this.validate(props.value);

        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    componentWillMount() {
        if (this.props.onValidation) {
            this.props.onValidation(
                this.state.hasValidated,
                this.state.isValid,
                this.state.validationMessage
            );
        }
    }

    onBlur(event) {
        const newState = this.validate(event.target.value);
        newState.hasValidated = true;

        this.setState(newState);

        if (this.props.onValidation) {
            this.props.onValidation(
                newState.hasValidated,
                newState.isValid,
                newState.validationMessage
            );
        }

        if (this.props.onChange && newState.value !== this.state.value) {
            this.props.onChange(newState.value);
        }
    }

    onChange(event) {
        const newState = this.validate(event.target.value);
        newState.hasValidated = this.state.hasValidated;

        this.setState(newState);

        if (this.props.onValidation && newState.hasValidated) {
            this.props.onValidation(
                newState.hasValidated,
                newState.isValid,
                newState.validationMessage
            );
        }

        if (this.props.onChange && newState.value !== this.state.value) {
            this.props.onChange(newState.value);
        }
    }

    onFocus(event) {
        const newState = this.validate(event.target.value);
        newState.hasValidated = this.state.hasValidated;

        newState.value = newState.value.replace(/[^0-9.]/g, '');

        this.setState(newState);
    }

    validate(newValue) {
        let value = parseFloat(`${newValue}`.replace(/[^0-9.]/g, ''));

        const notANumber = Number.isNaN(value);

        if (notANumber) {
            value = '';
        } else if (this.props.isCurrency) {
            value = `$ ${value.toFixed(2)}`;
        } else if (this.props.decimals) {
            value = value.toFixed(this.props.decimals);
        } else {
            value = `${value}`;
        }

        const isValid = !this.props.required || (!notANumber || !!value);

        return {
            value,
            isValid,
            validationMessage: isValid ? null : this.validationMessage,
            hasValidated:      false,
        };
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
                    value={this.state.value}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                />
            </div>
        );
    }
}

// set the property types for the NumericInput component
//
NumericInput.propTypes = {
    label:        React.PropTypes.string,
    description:  React.PropTypes.string,
    required:     React.PropTypes.bool,
    placeholder:  React.PropTypes.string,
    value:        React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    onChange:     React.PropTypes.func,
    onValidation: React.PropTypes.func,
};


export default NumericInput;

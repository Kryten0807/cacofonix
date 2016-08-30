// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

import Label from './Label';

const clean = (value) => `${value}`.replace(/[^0-9.]/g, '');

const decimals = (value, count) => `${value.toFixed(count)}`;

const currency = (value) => `$ ${decimals(value, 2)}`;


class NumericInput extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqueId('NumericInput-');

        this.validationMessage = this.props.validationMessage || `${props.description} is required`;

        this.state = this.validate(props.value, true);

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

    componentWillReceiveProps(newProps) {
        if (this.props.onValidation && `${newProps.value}` !== `${this.state.value}`) {
            this.props.onValidation(false, true, null);
        const newState = this.validate(newProps.value);
        newState.hasValidated = this.state.hasValidated;

        }

        if (this.props.onChange && `${newProps.value}` !== `${this.state.value}`) {
            this.props.onChange(newProps.value);
        }
    }

    onBlur(event) {

        const newState = this.validate(event.target.value, true);
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

        newState.value = clean(newState.value);

        this.setState(newState);
    }

    validate(newValue, format = false) {
        let value = parseFloat(clean(newValue));

        const notANumber = Number.isNaN(value);

        if (notANumber) {
            value = '';
        } else if (format && this.props.isCurrency) {
            value = currency(value);
        } else if (format && (this.props.decimals || this.props.decimals === 0)) {
            value = decimals(value, this.props.decimals);
        } else {
            value = `${value}`;
        }


        const isValid = !this.props.required || !!value;

        return {
            value,
            isValid,
            validationMessage: isValid ? null : this.validationMessage,
            hasValidated:      false,
        };
    }

    render() {
        const divClasses = classnames('form-group', {
            'has-error': this.state.hasValidated && !this.state.isValid,
        });

        return (
            <div className={divClasses}>
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
                {this.state.hasValidated && !this.state.isValid
                    ? <span className="help-block">{this.validationMessage}</span>
                    : ''
                }
            </div>
        );
    }
}

// set the property types for the NumericInput component
//
NumericInput.propTypes = {
    label:             React.PropTypes.string,
    description:       React.PropTypes.string,
    required:          React.PropTypes.bool,
    validationMessage: React.PropTypes.string,
    placeholder:       React.PropTypes.string,
    isCurrency:        React.PropTypes.bool,
    decimals:          React.PropTypes.number,
    value:             React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    onChange:          React.PropTypes.func,
    onValidation:      React.PropTypes.func,
};


export default NumericInput;

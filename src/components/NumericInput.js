// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

import Label from './Label';

/**
 * Clean a value of any non-numeric characters
 * @param  {String|Number} value The value to clean
 * @return {String}              The cleaned value
 */
const clean = (value) => `${value}`.replace(/[^0-9.-]/g, '');

/**
 * Convert a value to a fixed-decimal number
 * @param  {Number} value The number to convert
 * @param  {Number} count The number of decimal places
 * @return {String}       The formatted number
 */
const decimals = (value, count) => `${value.toFixed(count)}`;

/**
 * Convert a value to a currency string (2 decimal places, prefixed by "$")
 * @param  {Number} value The value to convert
 * @return {String}       The formatted value
 */
const currency = (value) => `$ ${decimals(value, 2)}`;

/**
 * The NumericInput component
 */
class NumericInput extends React.Component {
    constructor(props) {
        super(props);

        // generate a unique ID for the component
        //
        this.id = uniqueId('NumericInput-');

        // set the validation message from the properties or from a default
        //
        this.validationMessage = this.props.validationMessage
            || `${props.description} is required`;

        // initialize the component state
        //
        this.state = this.validate(props.value, true);

        // bind `this` to the event handlers
        //
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    /**
     * Handle the initial mounting of the component
     */
    componentWillMount() {
        // do we have an onValidation handler? if so, call it with the current
        // validation state
        //
        if (this.props.onValidation) {
            this.props.onValidation(
                this.state.hasValidated,
                this.state.isValid,
                this.state.validationMessage
            );
        }
    }

    /**
     * Handle new props passed from the parent component
     * @param  {Object} newProps The new props
     */
    componentWillReceiveProps(newProps) {
        // validate the new value
        //
        const newState = this.validate(newProps.value, false);

        // ensure that we preserve the `hasValidated` state of the component
        //
        newState.hasValidated = this.state.hasValidated;

        // do we have a new value? if not, then don't bother changing anything
        //
        if (newState.value !== this.state.value) {
            // update the component state
            //
            this.setState(newState);

            // do we have an onValidation handler? if so, call it with the new
            // validation state
            //
            if (this.props.onValidation) {
                this.props.onValidation(
                    newState.hasValidated,
                    newState.isValid,
                    newState.validationMessage
                );
            }

            // do we have an onChange handler? if so, call it with the new value
            //
            if (this.props.onChange) {
                this.props.onChange(newState.value);
            }
        }
    }

    /**
     * Handle the blur event for the input element
     * @param  {Object} event The event object
     */
    onBlur(event) {
        // validate the new value WITH FORMATTING
        //
        const newState = this.validate(event.target.value, true);

        // set `hasValidated` to true
        //
        newState.hasValidated = true;

        // handle the updated state
        //
        this.onUpdatedState(newState);
    }

    /**
     * Handle the change event for the input element
     * @param  {Object} event The event object
     */
    onChange(event) {
        // validate the new value without formatting it
        //
        const newState = this.validate(event.target.value, false);

        // preserve the `hasValidated` state
        //
        newState.hasValidated = this.state.hasValidated;

        // handle the updated state
        //
        this.onUpdatedState(newState);
    }

    /**
     * Handle the "update state" event
     * @param  {Object} newState The new state for the component
     */
    onUpdatedState(newState) {
        // set the new component state
        //
        this.setState(newState);

        // do we have an onValidation handler? has the component previously
        // validated? if so, call the onValidation handler with the new validation state
        //
        if (this.props.onValidation && newState.hasValidated) {
            this.props.onValidation(
                newState.hasValidated,
                newState.isValid,
                newState.validationMessage
            );
        }

        // do we have an onChange handler? do we have a new value? if so, call
        // the onChange handler with the new value
        //
        if (this.props.onChange && newState.value !== this.state.value) {
            this.props.onChange(newState.value);
        }
    }

    onFocus(event) {
        const newState = this.validate(event.target.value, false);
        newState.hasValidated = this.state.hasValidated;

        this.setState(newState);
    }

    validate(newValue, format) {
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

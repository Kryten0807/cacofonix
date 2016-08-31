// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

import Label from './Label';
import columns from '../helpers/columns';

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
const decimals = (value, count) => (value !== '' ? `${value.toFixed(count)}` : '');

/**
 * Convert a value to a currency string (2 decimal places, prefixed by "$")
 * @param  {Number} value The value to convert
 * @return {String}       The formatted value
 */
const currency = (value) => (value !== '' ? `$ ${decimals(value, 2)}` : '');

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
        this.state = this.validate(props.value);

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
        const newState = this.validate(newProps.value);

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
        const newState = this.validate(event.target.value);

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
        const newState = this.validate(event.target.value);

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

    /**
     * Handle the focus event for the input element
     * @param  {Object} event The event object
     */
    onFocus(event) {
        // validate the new value
        //
        const newState = this.validate(event.target.value);

        // preserve the `hasValidated` state
        //
        newState.hasValidated = this.state.hasValidated;

        // set the new state
        //
        this.setState(newState);
    }

    /**
     * Validate a value, optionally formatting it
     * @param  {String|Number} newValue The new value
     * @param  {Boolean} format         If true, then format the value according
     *                                  to the component props; otherwise, just
     *                                  clean it
     * @return {Object}                 The new state for the component,
     *                                  including value & validation state
     */
    validate(newValue) {
        // clean the value & convert it to a floating point number
        //
        let value = parseFloat(clean(newValue));

        // determine if the value is not a number (NaN)
        //
        const notANumber = Number.isNaN(value);

        // examine the value & format it appropriately
        //
        if (notANumber) {
            // it's not a number - change to an empty string
            //
            value = '';
        } else if (format && this.props.isCurrency) {
            // the format option is set and the isCurrency flag is set - format
            // it as currency
            //
            value = currency(value);
        } else if (format && (this.props.decimals || this.props.decimals === 0)) {
            // the format option is set and the decimals property is set -
            // format it as a fixed decimal number
            //
            value = decimals(value, this.props.decimals);
        } else {
            // otherwise just convert it to a string as-is
            //
            value = `${value}`;
        }

        // check to see if the value is valid
        //
        const isValid = !this.props.required || !!value;

        // return the new component state
        //
        return {
            value,
            isValid,
            validationMessage: isValid ? null : this.validationMessage,
            hasValidated:      false,
        };
    }

    /**
     * Render the component
     * @return {React.Element} The React Element representing this component
     */
    render() {
        // generate the classes for the outermost div element
        //
        const divClasses = classnames('form-group', {
            'has-error': this.state.hasValidated && !this.state.isValid,
        });

        // instantiate the input element
        //
        const input = (
            <input
                type="text"
                id={this.id}
                className="form-control"
                placeholder={this.props.placeholder || ''}
                value={this.state.value}
                readOnly={this.props.readOnly}
                onBlur={this.onBlur}
                onChange={this.onChange}
                onFocus={this.onFocus}
            />
        );

        // instantiate the help block if there's a validation error
        //
        const helpBlock = this.state.hasValidated && !this.state.isValid
            ? <span className="help-block">{this.validationMessage}</span>
            : '';

        // render the component & return it
        //
        return (
            <div className={divClasses}>
                {this.props.label
                    ? <Label
                        htmlFor={this.id}
                        required={!!this.props.required}
                        label={this.props.label}
                        className={columns(this.props.labelColumns)}
                    />
                    : ''
                }
                <div className={columns(this.props.inputColumns)}>{input}{helpBlock}</div>
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
    readOnly:          React.PropTypes.bool,
    validationMessage: React.PropTypes.string,
    placeholder:       React.PropTypes.string,
    isCurrency:        React.PropTypes.bool,
    decimals:          React.PropTypes.number,
    labelColumns:      React.PropTypes.object,
    inputColumns:      React.PropTypes.object,
    value:             React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    onChange:          React.PropTypes.func,
    onValidation:      React.PropTypes.func,
};

// export the component
//
export default NumericInput;

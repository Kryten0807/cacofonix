import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Moment from 'moment';
import classnames from 'classnames';

import Label from './Label';
import columns from '../helpers/columns';

class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqueId('DateInput-');

        this.validationMessage = props.validationMessage
            || `${props.description} is not a valid date`;

        this.state = this.validate(props.value);

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
     * Handle new props from the parent
     * @param  {Object} newProps The new component properties
     */
    componentWillReceiveProps(newProps) {
        // validate the new props & create the new state
        //
        const newState = this.validate(newProps.value);

        // preserve the `hasValidated` and `isEditing` state
        //
        newState.hasValidated = this.state.hasValidated;
        newState.isEditing = this.state.isEditing;

        // call the `onValidation` handler
        //
        this.callOnValidation(newState);

        // call the `onChange` handler with the new value
        //
        this.callOnChange(newState);

        // update the component state
        //
        this.setState(newState);
    }

    /**
     * Handle a blur event for the input element
     * @param  {Object} event The event object
     */
    onBlur(event) {
        // validate the value & generate the new state
        //
        const newState = this.validate(event.target.value);

        // set `hasValidated` to true, since the component has officially been
        // validated now that the user has tabbed out of it
        //
        newState.hasValidated = true;

        // set `isEditing` to false since the user is no longer "in" the
        // component
        //
        newState.isEditing = false;

        // call the `onValidation` handler
        //
        this.callOnValidation(newState);

        // call the `onChange` handler with the new value
        //
        this.callOnChange(newState);

        // update the state
        //
        this.setState(newState);
    }

    /**
     * Handle a change event for the input element
     * @param  {Object} event The event object
     */
    onChange(event) {
        // validate the value & generate the new state
        //
        const newState = this.validate(event.target.value);

        // preserve the `hasValidated` state
        //
        newState.hasValidated = this.state.hasValidated;

        // set `isEditing` flag to true
        //
        newState.isEditing = true;

        // call the `onValidation` handler if the `hasValidated` flag is set
        //
        if (newState.hasValidated) {
            this.callOnValidation(newState);
        }

        // call the `onChange` handler with the new value
        //
        this.callOnChange(newState);

        // update the state
        //
        this.setState(newState);
    }

    /**
     * Handle the focus event for the input element
     * @param  {Object} event The event object
     */
    onFocus(event) {
        // validate the value & generate the new state
        //
        const newState = this.validate(event.target.value);

        // preserve the `hasValidated` state
        //
        newState.hasValidated = this.state.hasValidated;

        // set `isEditing` to true, since the user has now focused the input
        // element
        //
        newState.isEditing = true;

        // update the state
        //
        this.setState(newState);
    }

    /**
     * Call the onValidation handler if it exists and if the value has changed
     * @param  {Object} newState The new component state
     */
    callOnValidation(newState) {
        // do we have an `onValidation` handler? has the value changed? if so,
        // call the handler with the new validation state
        //
        if (this.props.onValidation && newState.value !== this.state.value) {
            this.props.onValidation(
                newState.hasValidated,
                newState.isValid,
                newState.validationMessage
            );
        }
    }

    /**
     * Call the onChange handler if it exists and if the value has changed
     * @param  {Object} newState The new component state
     */
    callOnChange(newState) {
        // do we have an `onChange` handler? has the value changed? if so,
        // call the handler with the new value (or `null` if it's not valid)
        //
        if (this.props.onChange && newState.value !== this.state.value) {
            this.props.onChange(newState.isValid ? newState.value : null);
        }
    }

    /**
     * Validate a value, generating new component state in the process
     * @param  {String} value The value to validate
     * @return {Object}       The updated component state
     */
    validate(value) {
        // save the value that is currently being edited
        //
        const editedValue = value;

        // create a Moment object from the value
        //
        const datetime = new Moment(`${value || ''}`, 'M/D/YYYY');

        // determine if it's a valid date/time
        //
        let isValid = datetime.isValid();

        // check for a valid blank value - if it's not required and the value is
        // falsy, then count it as true
        //
        if (!this.props.required && !value) {
            isValid = true;
        }

        // determine the validation message based on the `isValid` flag
        //
        const validationMessage = isValid ? null : this.validationMessage;

        // return the new component state
        //
        return {
            hasValidated: false,
            value:        isValid ? datetime.format('M/D/YYYY') : editedValue,
            editedValue,
            isEditing:    false,
            isValid,
            validationMessage,
        };
    }

    /**
     * Render the component
     * @return {React.Element} The React Element describing the component
     */
    render() {
        // generate the outermost div classes
        //
        const groupClasses = classnames('form-group', {
            'has-error': this.state.hasValidated && !this.state.isValid,
        });

        // instantiate the help block if there's a validation error
        //
        const helpBlock = this.state.hasValidated && !this.state.isValid
            ? <span className="help-block">{this.state.validationMessage}</span>
            : '';

        // return the component
        //
        return (
            <div className={groupClasses}>
                {this.props.label
                    ? <Label
                        htmlFor={this.id}
                        required={this.props.required}
                        label={this.props.label}
                        className={columns(this.props.labelColumns)}
                    />
                    : ''
                }
                <div className={columns(this.props.inputColumns)}>
                    <input
                        id={this.id}
                        type="text"
                        value={this.state.isEditing ? this.state.editedValue : this.state.value}
                        readOnly={this.props.readOnly}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                    />
                    {helpBlock}
                </div>
            </div>
        );
    }
}

// set the property types for the DateInput component
//
DateInput.propTypes = {
    placeholder:       React.PropTypes.string,
    readOnly:          React.PropTypes.bool,
    labelColumns:      React.PropTypes.object,
    inputColumns:      React.PropTypes.object,
    label:             React.PropTypes.string,
    required:          React.PropTypes.bool,
    value:             React.PropTypes.string,
    description:       React.PropTypes.string,
    validationMessage: React.PropTypes.string,
    onValidation:      React.PropTypes.func,
    onChange:          React.PropTypes.func,
};

// export the component
//
export default DateInput;

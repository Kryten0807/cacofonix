// dependencies
//
import React from 'react';
import update from 'react-addons-update';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

import Alert from './Alert';
import Button from './form/Button';
import CheckboxGroup from './form/CheckboxGroup';
import Dropdown from './form/Dropdown';
import RadioButtonGroup from './form/RadioButtonGroup';
import SubmitButton from './form/SubmitButton';
import TextInput from './form/TextInput';

// @TODO added labelColumns, inputColumns to Form
// @TODO changing values of children via props should trigger re-validation

/**
 * The Form component
 */
class Form extends React.Component {
    /**
     * Construct the Form component instance
     * @param  {Object} props The component properties
     */
    constructor(props) {
        super(props);

        // initialize the state, which consists of the validation messages for
        // any children. This is just an empty object now, but as child
        // components are mounted, they will "call in" via the
        // `onChildValidationEvent` handler, at which time this state will
        // become populated with values
        //
        this.state = {
            validation:   {},
            hasValidated: {},
        };

        // bind `this` to the `isValid` method
        //
        this.isValid = this.isValid.bind(this);

        // bind `this` to the onChildValidationEvent handler
        //
        this.onChildValidationEvent = this.onChildValidationEvent.bind(this);
    }

    /**
     * Get the child context values
     *
     * These  values are availabe for use by children of the Form component.
     *
     * @return {Object} The child context values
     */
    getChildContext() {
        return {
            isValid:                this.isValid(),
            onChildValidationEvent: this.onChildValidationEvent,
        };
    }

    /**
     * Handle a validation event from one of the children of this Form
     * @param  {String} validationKey     A unique key identifying the child
     *                                    component
     * @param  {[type]} childHasValidated A flag to indicate whether the
     *                                    component has validated in response to
     *                                    user input
     * @param  {String|null} message      The validation error message, or null
     *                                    if the component is valid
     */
    onChildValidationEvent(validationKey, childHasValidated, message) {
        // build a change event to update the `validation` and `hasValidated`
        // state
        //
        const validation = {};
        validation[validationKey] = { $set: message };

        const hasValidated = {};
        hasValidated[validationKey] = { $set: !!childHasValidated };

        const delta = { validation, hasValidated };

        // update the Form component state
        //
        this.setState((state) => update(state, delta));
    }

    /**
     * Determine if the form is valid
     * @return {Boolean} If true, then all form components are valid
     */
    isValid() {
        // get the list of keys from the validation state
        //
        const keys = Object.keys(this.state.validation);

        // iterate over the list of keys
        //
        for (let idx = 0; idx < keys.length; idx++) {
            // do we have a validation error message for the current item? if
            // so, return false, since we have at least one component which has
            // failed validation
            //
            if (this.state.validation[keys[idx]]) {
                return false;
            }
        }

        // if we get here, then none of the children have failed validation.
        // Return true
        //
        return true;
    }

    /**
     * Build a list of validation errors for the Form
     * @return {Array} An array of validation errors (possibly empty, if all
     *                 components are valid)
     */
    validationErrors() {
        // declare an array to hold the error messages
        //
        const errors = [];

        // iterate through the keys of the validation state and add non-null
        // messages for children which have validated to the array
        //
        Object.keys(this.state.validation).forEach((key) => {
            if (this.state.hasValidated[key] && this.state.validation[key]) {
                errors.push(this.state.validation[key]);
            }
        });

        // return the list of error messages
        //
        return errors;
    }

    /**
     * Render the component
     * @return {React.Element} The React element describing the component
     */
    render() {
        // get the list of validation error messages for the form
        //
        const errors = this.validationErrors();

        // if we have errors, then add an Alert component describing the
        // problems
        //
        const alert = errors.length > 0
            ? <Alert style="error">
                <p>Please correct the following problems:</p>
                <ul>
                    {errors.map((err) => <li key={uniqueId()}>{err}</li>)}
                </ul>
            </Alert>
            : '';

        // render the component and return it
        //
        return (
            <div
                className={classnames({
                    'form-inline':     this.props.inline,
                    'form-horizontal': this.props.horizontal,
                })}
            >
                {alert}
                {this.props.children}
            </div>
        );
    }
}

// set the property types for the component
//
Form.propTypes = {
    inline:     React.PropTypes.bool,
    horizontal: React.PropTypes.bool,
    children:   React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node,
    ]).isRequired,
};

// set the child context types to propagate to the children
//
Form.childContextTypes = {
    isValid:                React.PropTypes.bool,
    onChildValidationEvent: React.PropTypes.func,
};

// add the "sub-components" so that they can be imported as part of the same
// package
//
Form.Button = Button;
Form.CheckboxGroup = CheckboxGroup;
Form.Dropdown = Dropdown;
Form.RadioButtonGroup = RadioButtonGroup;
Form.SubmitButton = SubmitButton;
Form.TextInput = TextInput;

// export the component
//
export default Form;

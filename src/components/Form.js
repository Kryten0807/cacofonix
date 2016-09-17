// dependencies
//
import React from 'react';
import update from 'react-addons-update';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

import Alert from './Alert';
import TextInput from './form/TextInput';

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
        this.state = { validation: {} };

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
            onChildValidationEvent: this.onChildValidationEvent,
        };
    }

    /**
     * Handle a validation event from one of the children of this Form
     * @param  {String} validationKey A unique key identifying the child
     *                                component
     * @param  {String|null} message  The validation error message, or null if
     *                                the component is valid
     */
    onChildValidationEvent(validationKey, message) {
        // build a change event to update the state
        //
        const delta = {};
        delta[validationKey] = { $set: message };

        // update the Form component state
        //
        this.setState(update(this.state, { validation: delta }));
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
        // messages to the array
        //
        Object.keys(this.state.validation).forEach((key) => {
            if (this.state.validation[key]) {
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
            <form
                className={classnames({
                    'form-inline':     this.props.inline,
                    'form-horizontal': this.props.horizontal,
                })}
            >
                {alert}
                {this.props.children}
            </form>
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
    onChildValidationEvent: React.PropTypes.func,
};

// add the "sub-components" so that they can be imported as part of the same
// package
//
Form.TextInput = TextInput;

// export the component
//
export default Form;

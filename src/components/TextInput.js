// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';
import Label from './Label';
import columns from '../helpers/columns';

/**
 * The TextInput component
 */
class TextInput extends React.Component {
    constructor(props) {
        super(props);

        // set a unique ID for this component's elements
        //
        this.id = uniqueId('TextInput-');

        // save the validation message for future use
        //
        this.validationMessage = props.validationMessage
            || `${props.description} is required`;

        // initialize the state
        //
        this.state = this.validate(props.value);

        // reset the hasValidated state to false
        //
        this.state.hasValidated = false;

        // bind `this` to the event handlers
        //
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Handle the "component is about to mount" event
     *
     * The component needs to inform the parent of it's current state upon
     * mounting. This will allow the "higher-level" components to build a list
     * of validation errors (for example).
     */
    componentWillMount() {
        // do we have an onValidation handler? if so, then call it
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
     * Handle new props passed from parent
     * @param  {Object} newProps The new properties
     */
    componentWillReceiveProps(newProps) {
        // build the new state for the component
        //
        const newState = this.validate(newProps.value);

        // ensure that the hasValidated state is preserved
        //
        newState.hasValidated = this.state.hasValidated;

        // do we have an onValidation handler? has the value changed? if so,
        // call the handler with the new validation state
        //
        if (this.props.onValidation && this.state.value !== newState.value) {
            this.props.onValidation(
                newState.hasValidated,
                newState.isValid,
                newState.validationMessage
            );
        }

        // do we have an onChange handler? has the value changed? if so, call
        // the handler with the new value
        //
        if (this.props.onChange && this.state.value !== newState.value) {
            this.props.onChange(newState.value);
        }

        this.setState(newState);
    }

    /**
     * Handle a generic event
     *
     * The code for the `onBlur` and `onChange` handler is almost identical, so
     * this "generic" event handler will to the work for both of them.
     *
     * @param  {String}  eventValue   The new value for the component
     * @param  {Boolean} hasValidated A flag to indicate the new state of the
     *                                `hasValidated` flag
     */
    onEvent(eventValue, hasValidated) {
        // validate the value & get the important values
        //
        const { value, isValid, validationMessage } = this.validate(eventValue);

        // update the state
        //
        this.setState({ value, isValid, validationMessage, hasValidated });

        // do we have an onChange handler? if so, call it with the new value
        //
        if (this.props.onChange) {
            this.props.onChange(value);
        }

        // has the component validated? do we have an onValidation handler? if
        // so, call it with the validation state
        //
        if (hasValidated && this.props.onValidation) {
            this.props.onValidation(hasValidated, isValid, validationMessage);
        }
    }

    /**
     * Handle the blurring of the input element
     * @param  {Object} event The event object
     */
    onBlur(event) {
        this.onEvent(event.target.value, true);
    }

    /**
     * Handle a change to the input element
     * @param  {Object} event The event object
     */
    onChange(event) {
        this.onEvent(event.target.value, this.state.hasValidated);
    }

    /**
     * Validate a value
     * @param  {String} val The value to validate
     * @return {Object}     The new validation state
     */
    validate(val) {
        // ensure the value is a string
        //
        const value = `${val || ''}`;

        // check the value & determine if it's valid
        //
        const isValid = !this.props.required || !!value;

        // initialize the validation message
        //
        const validationMessage = isValid ? null : this.validationMessage;

        // return the new validation state
        //
        return {
            value, isValid, validationMessage,
            hasValidated: true,
        };
    }

    /**
     * Render the component
     * @return {React.Element} The React Element describing this component
     */
    render() {
        // generate the classes for the outermost div
        //
        const classes = classnames('form-group', {
            'has-error': (this.state.hasValidated && !this.state.isValid),
        });

        const helpBlock = this.state.hasValidated && !this.state.isValid
            ? <span className="help-block">{this.state.validationMessage}</span>
            : '';

        // render the component & return it
        //
        return (
            <div className={classes}>
                {this.props.label &&
                    <Label
                        htmlFor={this.id}
                        label={this.props.label}
                        required={this.props.required}
                        className={columns(this.props.labelColumns)}
                    />
                }
                <div className={columns(this.props.inputColumns)}>
                    <input
                        id={this.id}
                        type={this.props.password ? 'password' : 'text'}
                        value={this.state.value}
                        className="form-control"
                        placeholder={this.props.placeholder || ''}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                    />
                    {helpBlock}
                </div>
            </div>
        );
    }

}

// set the property types for the TextInput component
//
TextInput.propTypes = {
    required:          React.PropTypes.bool,
    password:          React.PropTypes.bool,
    label:             React.PropTypes.string,
    description:       React.PropTypes.string,
    placeholder:       React.PropTypes.string,
    validationMessage: React.PropTypes.string,
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
export default TextInput;

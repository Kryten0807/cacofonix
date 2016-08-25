// dependencies
//
import React from 'react';
import update from 'react-addons-update';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';
import Label from './Label';

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
        this.validationMessage = `${props.description} is required`;

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
     * Handle a change to the input element
     * @param  {Object} event The event object
     */
    onChange(event) {
        // validate the value & get the important values
        //
        const { value, isValid, validationMessage } = this.validate(event.target.value);

        // update the state
        //
        this.setState((state) => update(state, {
            value:             { $set: value },
            hasValidated:      { $set: false },
            isValid:           { $set: isValid },
            validationMessage: { $set: validationMessage },
        }));

        // do we have an onChange handler? if so, call it with the new value
        //
        if (this.props.onChange) {
            this.props.onChange(value);
        }

        // do we have an onValidation handler? if so, call it with the
        // validation state
        //
        if (this.props.onValidation) {
            this.props.onValidation(true, isValid, validationMessage);
        }
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

        // render the component & return it
        //
        return (
            <div className={classes}>
                {this.props.label &&
                    <Label htmlFor={this.id} label={this.props.label} />
                }
                <input
                    id={this.id}
                    type="text"
                    className="form-control"
                    placeholder={this.props.placeholder || ''}
                    onChange={this.onChange}
                />
                {(this.state.hasValidated && !this.state.isValid) &&
                    <span className="help-block">{this.state.validationMessage}</span>
                }
            </div>
        );
    }

}

// set the property types for the TextInput component
//
TextInput.propTypes = {
    required:     React.PropTypes.bool,
    label:        React.PropTypes.string,
    description:  React.PropTypes.string,
    placeholder:  React.PropTypes.string,
    value:        React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    onChange:     React.PropTypes.func,
    onValidation: React.PropTypes.func,
};

// export the component
//
export default TextInput;

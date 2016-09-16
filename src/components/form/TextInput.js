// dependencies
//
import React from 'react';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';

/**
 * The TextInput component
 *
 * @TODO add regex validation
 * @TODO add different validation error messages for failing different rules
 * @TODO label
 * @TODO horizontal form - label & input element widths
 */
class TextInput extends React.Component {
    /**
     * Construct the component instance
     * @param  {Object} props The component props
     */
    constructor(props) {
        super(props);

        // initialize the state for the component
        //
        this.state = {
            value:   props.value,
            isValid: true,
        };

        // intialize the validation message for the component
        //
        this.validationMessage = props.validationMessage
            || `${this.props.description} is required`;

        // bind `this` to the component event handlers
        //
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Handle the blur event for the input element
     * @param  {Object} event The event object
     */
    onBlur(event) {
        // get the new value
        //
        const value = event.target.value;

        // determine if it's valid
        //
        const isValid = !this.props.required || !!value;

        // set the `isValid` state
        //
        this.setState({ isValid });

        // call the `onChildValidationEvent` handler
        //
        this.props.onChildValidationEvent(
            this.props.validationKey,
            isValid ? null : this.validationMessage
        );
    }

    /**
     * Handle the change event for the input element
     * @param  {Object} event The event object
     */
    onChange(event) {
        const value = event.target.value;

        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    /**
     * Render the component
     * @return {React.Element} The React element describing the component
     */
    render() {
        return (
            <div className={classnames('form-group', { 'has-error': !this.state.isValid })}>
                <input
                    type="text"
                    value={this.state.value}
                    className="form-control"
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />
                {!this.state.isValid
                    ? <span className="help-block">{this.validationMessage}</span>
                    : null
                }
            </div>
        );
    }
}

// set the property types for the component
// @TODO placeholder
//
TextInput.propTypes = {
    required:               React.PropTypes.bool,
    value:                  React.PropTypes.string,
    label:                  React.PropTypes.string,
    description:            React.PropTypes.string,
    validationMessage:      React.PropTypes.string,
    onChange:               React.PropTypes.func,
    validationKey:          React.PropTypes.string,
    onChildValidationEvent: React.PropTypes.func,
};

export default TextInput;

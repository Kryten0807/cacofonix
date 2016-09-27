// dependencies
//
import React from 'react';
import update from 'react-addons-update';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import isRegExp from 'lodash/isRegExp';
import isFunction from 'lodash/isFunction';

// @TODO add different validation error messages for failing different rules
// @TODO horizontal form - label & input element widths
// @TODO permitted characters regex
// @TODO CurrencyInput - must clear non-numeric characters when reporting value
// @TODO DateInput - must ensure date is formatted as M/D/YYYY when reporting value

/**
 * The TextInput component
 *
 */
class TextInput extends React.Component {
    /**
     * Construct the component instance
     * @param  {Object} props The component props
     */
    constructor(props) {
        super(props);

        // format the value if we have a format method
        //
        const value = props.format ? props.format(props.value) : props.value;

        // initialize the state for the component
        //
        this.state = {
            value,
            isValid:   true,
            isEditing: false,
        };

        // generate a unique ID for this component instance if an ID prop has
        // not been provided
        //
        this.id = this.props.id || uniqueId('form-textinput-');

        // intialize the validation message for the component
        //
        this.validationMessage = props.validationMessage
            || `${this.props.description} is required`;

        // bind `this` to the component event handlers
        //
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Handle the "component is about to mount" event
     */
    componentWillMount() {
        // determine if it's valid
        //
        const isValid = this.validate(this.state.value);

        // call the `onChildValidationEvent` handler once with
        // `hasValidated`=false, just to ensure that the parent knows about this
        // child
        //
        if (this.context.onChildValidationEvent) {
            this.context.onChildValidationEvent(
                this.id,
                false,
                isValid ? null : this.validationMessage
            );
        }
    }

    /**
     * Handle new props received from parent components
     * @param  {Object} newProps The new properties for the component
     */
    componentWillReceiveProps(newProps) {
        // get the value from the event object
        //
        const value = newProps.value;

        // update the component state
        //
        this.setState((state) => update(state, { value: { $set: value } }));
    }

    /**
     * Handle the blur event for the input element
     * @param  {Object} event The event object
     */
    onBlur() {
        // get the value
        //
        const value = this.state.value;

        // determine if it's valid
        //
        const isValid = this.validate(value);

        // set the `isValid` state
        //
        this.setState(() => ({ value, isValid, isEditing: false }));

        // call the `onChildValidationEvent` handler
        //
        if (this.context.onChildValidationEvent) {
            this.context.onChildValidationEvent(
                this.id,
                true,
                isValid ? null : this.validationMessage
            );
        }

        // call the `onChange` handler
        //
        if (this.props.onChange) {
            this.props.onChange(this.props.format ? this.props.format(value) : value);
        }
    }

    /**
     * Handle the `onFocus` event
     */
    onFocus() {
        // do we have a parse prop? is the component NOT read only?
        //
        if (this.props.parse && !this.props.readOnly) {
            // yes! parse the value before editing begins
            //
            this.setState((state) => update(state, {
                value:     { $set: this.props.parse(this.state.value) },
                isEditing: { $set: true },
            }));
        }
    }

    /**
     * Handle the change event for the input element
     * @param  {Object} event The event object
     */
    onChange(event) {
        // get the value from the event object
        //
        const value = event.target.value;
        // update the component state
        //
        this.setState((state) => update(state, {
            value:     { $set: value },
            isEditing: { $set: true },
        }));

        // do we have an `onChange` handler? if so call it with the new value
        //
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    /**
     * Validate a value
     * @param  {String} value The value to validate
     * @return {Boolean}      True if the value is valid, false otherwise
     */
    validate(value) {
        // declare a variable to hold the result
        //
        let isValid = true;

        // do we have a value?
        //
        if (!value) {
            // we do not have a value - in this case, whether it's valid or not
            // is determined solely by whether a valid is required or not
            //
            isValid = !this.props.required;
        } else {
            // we do have a value. Do we have a pattern prop?
            //
            if (this.props.pattern) {
                // yes, we have a pattern prop. is the pattern a regex or is it
                // a function?
                //
                if (isRegExp(this.props.pattern)) {
                    // the pattern is a regex. Test the value against it
                    //
                    isValid = this.props.pattern.test(`${value}`);
                } else if (isFunction(this.props.pattern)) {
                    // the pattern is a function. Pass the value to the function
                    //
                    isValid = this.props.pattern(value);
                }
            } else {
                // we don't have a pattern prop. That means if we get here that
                // we have a value and it doesn't matter whether it's required
                // or not because we have a value
                //
                isValid = true;
            }
        }

        // return the results of the validation
        //
        return isValid;
    }

    /**
     * Render the component
     * @return {React.Element} The React element describing the component
     */
    render() {
        // is the component hidden? if so, return null
        //
        if (this.props.hidden) {
            return null;
        }

        const label = this.props.label
            ? <label
                htmlFor={this.id}
                className={classnames('control-label', {
                    [`col-xs-${this.context.labelColumns}`]: this.context.labelColumns,
                })}
            >
                {this.props.label}
            </label>
            : null;

        // determine the value to display, formatting it if necessary
        //
        const value = (this.props.format && !this.state.isEditing)
            ? this.props.format(this.state.value)
            : this.state.value;

        const helpBlock = !this.state.isValid
            ? <span className="help-block">{this.validationMessage}</span>
            : null;

        const input = (
            <div
                className={classnames(
                    'form-textinput-input-columns',
                    { [`col-xs-${12 - this.context.labelColumns}`]: this.context.labelColumns }
                )}
            >
                <input
                    type="text"
                    readOnly={!!this.props.readOnly}
                    id={this.id}
                    value={value}
                    placeholder={this.props.placeholder}
                    className="form-control"
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                />

                {helpBlock}
            </div>
        );

        // return the rendered component
        //
        return (
            <div className={classnames('form-group', { 'has-error': !this.state.isValid })}>
                {label}
                {input}
            </div>
        );
    }
}

// set the property types for the component
//
TextInput.propTypes = {
    required:          React.PropTypes.bool,
    readOnly:          React.PropTypes.bool,
    hidden:            React.PropTypes.bool,
    id:                React.PropTypes.string,
    value:             React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    label:             React.PropTypes.string,
    placeholder:       React.PropTypes.string,
    description:       React.PropTypes.string,
    validationMessage: React.PropTypes.string,
    pattern:           (props, propName, componentName) => {
        if (props.pattern && !isRegExp(props.pattern) && !isFunction(props.pattern)) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}` +
                ' - should be a regular expression'
            );
        }
        return null;
    },
    format:            React.PropTypes.func,
    parse:             React.PropTypes.func,
    onChange:          React.PropTypes.func,
    validationKey:     React.PropTypes.string,
};

// set the context types for values received from higher up the food chain
//
TextInput.contextTypes = {
    onChildValidationEvent: React.PropTypes.func,
    labelColumns:           React.PropTypes.number,
};

// export the component
//
export default TextInput;

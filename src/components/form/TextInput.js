// npm dependencies
//
import React from 'react';
import update from 'react-addons-update';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import isRegExp from 'lodash/isRegExp';
import isFunction from 'lodash/isFunction';

// @TODO permitted characters regex

// @TODO add this.state.hasBlurred,hasFocused to track blur/focus state

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
            required:        this.props.required,
            isValid:         true,
            validationError: null,
            isEditing:       false,
            hasBlurred:      false,
        };

        // generate a unique ID for this component instance
        //
        this.id = props.id || uniqueId('form-textinput-');

        // intialize the validation message for the component
        //
        let required = `${this.props.description} is required`;
        if (props.validationMessage) {
            required = `${props.validationMessage.required || props.validationMessage}`;
        }

        let valid = `${this.props.description} is not valid`;
        if (props.validationMessage) {
            valid = `${props.validationMessage.valid || props.validationMessage}`;
        }

        // initialize the validation messages for the component
        //
        this.validationMessage = { required, valid };

        // bind `this` to the component event handlers
        //
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onNewRequiredFlag = this.onNewRequiredFlag.bind(this);
        this.onNewValue = this.onNewValue.bind(this);
    }

    /**
     * Handle the "component is about to mount" event
     */
    componentWillMount() {
        // determine if it's valid
        //
        const { validationError } = this.validate(this.state.value);

        // set the new validationError state
        //
        this.setState(update(this.state, { validationError: { $set: validationError } }));

        // call the `onChildValidationEvent` handler once with
        // `hasValidated`=false, just to ensure that the parent knows about this
        // child
        //
        if (this.context.onChildValidationEvent) {
            this.context.onChildValidationEvent(this.id, false, validationError);
        }
    }

    /**
     * Handle new props received from parent components
     * @param  {Object} newProps The new properties for the component
     */
    componentWillReceiveProps(newProps) {
        if (this.state.required !== newProps.required) {
            this.onNewRequiredFlag(newProps.required, newProps.value);
        } else {
            this.onNewValue(newProps.value);
        }
    }

    onNewRequiredFlag(required, value) {
        // update the new required prop (if it's changing)
        //
        this.setState((state) => update(state, {
            required: { $set: required }
        }), () => {
            // figure out the formatted value
            //
            const formattedValue = this.props.format ? this.props.format(value) : value;

            const oldValue = this.state.value;
            const oldValidationError = this.state.validationError;

            // determine if it's valid
            //
            const { isValid, validationError } = this.validate(formattedValue);

            // update the component state if
            // a) we're currently editing and the value is subject to formatting, or
            // b) we have a brand new value
            //
            if (oldValidationError !== validationError || oldValue !== value) {
                this.setState((state) => update(state, {
                    value:           { $set: value },
                    isValid:         { $set: isValid },
                    validationError: { $set: validationError },
                }), () => {
                    // call the `onChildValidationEvent` handler
                    //
                    if (this.context.onChildValidationEvent) {
                        this.context.onChildValidationEvent(
                            this.id,
                            true,
                            validationError
                        );
                    }
                });
            }
        });
    }

    onNewValue(value) {
        this.setState((state) => update(state, {
            value: { $set: value }
        }), () => {
            if (this.state.hasBlurred) {
                // figure out the formatted value
                //
                const formattedValue = this.props.format ? this.props.format(value) : value;

                const oldValue = this.state.value;
                const oldValidationError = this.state.validationError;

                // determine if it's valid
                //
                const { isValid, validationError } = this.validate(formattedValue);

                // update the component state if
                // a) we're currently editing and the value is subject to formatting, or
                // b) we have a brand new value
                //
                if (oldValidationError !== validationError || oldValue !== value) {
                    this.setState((state) => update(state, {
                        isValid:         { $set: isValid },
                        validationError: { $set: validationError },
                    }), () => {
                        // call the `onChildValidationEvent` handler
                        //
                        if (this.context.onChildValidationEvent) {
                            this.context.onChildValidationEvent(
                                this.id,
                                true,
                                validationError
                            );
                        }
                    });
                }
            }
        });
    }

    /**
     * Handle the blur event for the input element
     * @param  {Object} event The event object
     */
    onBlur() {
        // get the value
        //
        const value = this.state.value;

        // get the formatted value
        //
        const formattedValue = this.props.format ? this.props.format(value) : value;

        // determine if it's valid
        //
        const { isValid, validationError } = this.validate(formattedValue);

        // set the `isValid` state
        //
        this.setState(() => ({
            value:      formattedValue,
            isValid,
            validationError,
            isEditing:  false,
            hasBlurred: true,
        }));

        // call the `onChildValidationEvent` handler
        //
        if (this.context.onChildValidationEvent) {
            this.context.onChildValidationEvent(
                this.id,
                true,
                validationError
            );
        }

        // call the `onChange` handler
        //
        if (this.props.onChange) {
            this.props.onChange(formattedValue);
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

        let validationError = null;

        // do we have a value?
        //
        if (!value) {
            // we do not have a value - in this case, whether it's valid or not
            // is determined solely by whether a valid is required or not
            //
            isValid = !this.state.required;

            validationError = isValid ? null : this.validationMessage.required;
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
                    validationError = isValid ? null : this.validationMessage.valid;
                } else if (isFunction(this.props.pattern)) {
                    // the pattern is a function. Pass the value to the function
                    //
                    isValid = this.props.pattern(value);
                    validationError = isValid ? null : this.validationMessage.valid;
                }
            } else {
                // we don't have a pattern prop. That means if we get here that
                // we have a value and it doesn't matter whether it's required
                // or not because we have a value
                //
                isValid = true;
                validationError = null;
            }
        }

        // return the results of the validation
        //
        return { isValid, validationError };
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

        // render the label for the component, if we have one
        //
        const labelStyles = this.props.inline ? { marginRight: '1em' } : {};

        // instantiate the label element
        //
        const label = this.props.label
            ? <label
                htmlFor={this.id}
                className={classnames({
                    'control-label':                         !this.props.inline,
                    [`col-xs-${this.context.labelColumns}`]: !this.props.inline
                        && this.context.labelColumns,
                })}
                style={labelStyles}
            >
                {this.props.label}
                {this.state.required
                    ? <sup>&nbsp;<i className="required fa fa-star" /></sup>
                    : ''
                }
            </label>
            : null;

        // render the help block (validation error message) if appropriate
        //
        const helpBlock = !this.state.isValid
            ? <span className="help-block">{this.state.validationError}</span>
            : null;

        // initialize the styles for the input element
        //
        const inputStyles = this.props.inline && this.props.inlineWidth
            ? { width: this.props.inlineWidth }
            : {};

        // render the input component
        //
        let input = (
            <input
                type={this.props.password ? 'password' : 'text'}
                readOnly={!!this.props.readOnly}
                id={this.id}
                name={this.props.name}
                value={this.state.value}
                placeholder={this.props.placeholder}
                className="form-control"
                style={inputStyles}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                onChange={this.onChange}
            />
        );

        // is this an inline text input? if not, wrap it in a div
        //
        if (!this.props.inline) {
            input = (
                <div
                    className={classnames(
                        'form-textinput-input-columns',
                        { [`col-xs-${12 - this.context.labelColumns}`]: this.context.labelColumns }
                    )}
                >
                    {input}

                    {helpBlock}
                </div>
            );
        }

        // return the rendered component
        //
        return this.props.inline
            ? (
            <div
                className="form-inline"
                style={{
                    display:     'inline-block',
                    marginRight: '1em',
                }}
            >
                <div className={classnames('form-group', { 'has-error': !this.state.isValid })}>

                    {label}

                    {input}

                    {helpBlock}

                </div>
            </div>
            )
            : (
            <div className={classnames('form-group', { 'has-error': !this.state.isValid })}>

                {label}

                {input}

            </div>
            );
    }
}

/**
 * The property types for the component
 * @type {Object}
 */
TextInput.propTypes = {
    /** The name for the component */
    name:              React.PropTypes.string,
    /** The ID for the component */
    id:                React.PropTypes.string,
    /** A flag to indicate whether this is a password input component */
    password:          React.PropTypes.bool,
    /** A flag to indicate whether this component is required */
    required:          React.PropTypes.bool,
    /** A flag to indicate whether this component is read only */
    readOnly:          React.PropTypes.bool,
    /** A flag to indicate whether this component is hidden */
    hidden:            React.PropTypes.bool,
    /** A flag to indicate whether this component is to be rendered inline */
    inline:            React.PropTypes.bool,
    /** The width of the component if rendering inline */
    inlineWidth:       React.PropTypes.string,
    /** The value of the text input component */
    value:             React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    /** The label for the component */
    label:             React.PropTypes.string,
    /** The placeholder for the component */
    placeholder:       React.PropTypes.string,
    /** The description for the component (used in validation error messages) */
    description:       React.PropTypes.string,
    /** A custom validation message, or set of messages */
    validationMessage: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object,
    ]),
    /** A regex used to validate values */
    pattern:           (props, propName, componentName) => {
        if (props.pattern && !isRegExp(props.pattern) && !isFunction(props.pattern)) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}` +
                ' - should be a regular expression'
            );
        }
        return null;
    },
    /**
     * A function used to format the value
     *
     * Note that if you are using a `format` function, the value should be
     * formatted **before** passing it as a property; if you fail to do this,
     * then the user will initially see an unformatted value which will be
     * formatted after the first edit.
    */
    format:            React.PropTypes.func,
    /**
     * A function used to parse the value which has been formatted by the
     * `format` function
     */
    parse:             React.PropTypes.func,
    /** The `onChange` handler for the component */
    onChange:          React.PropTypes.func,
    /**
     * The key used to identify this component by the parent Form component for
     * tracking validation errors in Form children
     */
    validationKey:     React.PropTypes.string,
};

/**
 * The context types for the component
 * @type {Object}
 */
TextInput.contextTypes = {
    onChildValidationEvent: React.PropTypes.func,
    labelColumns:           React.PropTypes.number,
};

// export the component
//
export default TextInput;

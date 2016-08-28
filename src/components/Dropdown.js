// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Label from './Label';

/**
 * The Dropdown class
 */
class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        // build a list of permitted values from the options values
        //
        this.permittedValues = props.options.map((opt) => opt.value);

        // generate a unique ID for this component
        //
        this.id = uniqueId('Dropdown-');

        // build the default validation message
        //
        this.validationMessage = `${props.description || 'This value'} is required`;

        // validate the initial value & set the initial state
        //
        this.state = this.validate(props.value);

        // set the `hasValidated` state to its initial value
        //
        this.state.hasValidated = false;

        // bind `this` to the onEvent method
        //
        this.onEvent = this.onEvent.bind(this);
    }

    /**
     * Handle the initial mounting of the component
     *
     * This method ensures that `onValidation` is called once when the component
     * is first initialized. This allows the component to inform its parent of
     * the initial validation state.
     */
    componentWillMount() {
        // do we have an `onValidation` handler?
        //
        if (this.props.onValidation) {
            // call the `onValidation` handler
            //
            this.props.onValidation(
                this.state.hasValidated,
                this.state.isValid,
                this.state.validationMessage
            );
        }
    }

    /**
     * Handle changes to the `select` element
     * @param  {Object} event The event object
     */
    onEvent(event) {
        // get the current value of the component
        //
        const currentValue = this.state.value;

        // get the new state of the component based on the new value from the
        // select element
        //
        const newState = this.validate(event.target.value);

        // set the new state
        //
        this.setState(() => newState);

        // do we have an `onChange` handler? do we have a new value? if so,
        // call the `onChange` handler with the new value
        //
        if (this.props.onChange && newState.value !== currentValue) {
            this.props.onChange(newState.value);
        }

        // do we have an `onValidation` handler? if so, call it with the new
        // validation state
        //
        if (this.props.onValidation) {
            this.props.onValidation(
                newState.hasValidated,
                newState.isValid,
                newState.validationMessage
            );
        }
    }

    /**
     * Validate a value for the component
     * @param  {String} option The value to validate
     * @return {Object}        The new state of the component, including the
     *                         value
     */
    validate(option) {
        // make sure the value is cast to a string
        //
        let value = `${option || ''}`;

        // determine if the value is in the list of permitted values
        //
        const inValues = this.permittedValues.find((val) => val === value);

        // if the value is not in the list of values, set it to the `null` value
        //
        if (!inValues) {
            value = '';
        }

        // determine if the value is valid, based on the `required` flag
        //
        const isValid = !this.props.required || !!value;

        // return the new state
        //
        return {
            value,
            hasValidated:      true,
            isValid,
            validationMessage: isValid ? null : this.validationMessage,
        };
    }

    /**
     * Render the component
     * @return {React.Element} The React Element describing this component
     */
    render() {
        return (
            <div className="form-group">
                {this.props.label
                    ? <Label
                        htmlFor={this.id}
                        label={this.props.label}
                        required={this.props.required}
                    />
                    : ''
                }
                <select
                    id={this.id}
                    className="form-control"
                    onChange={this.onChange}
                    onBlur={this.onChange}
                >
                    {this.props.includeNull
                        ? <option key={uniqueId('Dropdown-')} value="">
                            {this.props.nullName || 'Please select one'}
                        </option>
                        : ''
                    }
                    {this.props.options.map((opt) =>
                        <option key={uniqueId('Dropdown-')} value={opt.value}>{opt.name}</option>)
                    }
                </select>
            </div>
        );
    }
}

// set the property types for the Dropdown component
//
Dropdown.propTypes = {
    label:        React.PropTypes.string,
    description:  React.PropTypes.string,
    includeNull:  React.PropTypes.bool,
    nullName:     React.PropTypes.string,
    required:     React.PropTypes.bool,
    value:        React.PropTypes.string,
    options:      React.PropTypes.array.isRequired,
    onValidation: React.PropTypes.func,
    onChange:     React.PropTypes.func,
};

// export the component
//
export default Dropdown;

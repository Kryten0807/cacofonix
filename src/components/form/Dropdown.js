// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';

/**
 * The Dropdown component
 */
class Dropdown extends React.Component {
    /**
     * Construct the component instance
     * @param  {Object} props The component props
     */
    constructor(props) {
        super(props);

        // generate a unique ID for this instance
        //
        this.id = uniqueId('form-dropdown-');

        // bind `this` to the event handlers
        //
        this.isValid = this.isValid.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Handle the `onChange` event for the select element
     * @param  {Object} event The event object
     */
    onChange(event) {
        // do we have an onChange handler? if so, call it with the appropriate
        // value
        //
        if (this.props.onChange) {
            // figure out which value to use
            //
            let value = this.isValid(event.target.value)
                ? event.target.value
                : '';

            if (this.props.options[0] && !value) {
                value = this.props.options[0].value;
            }

            // call the onChange handler with the value
            //
            this.props.onChange(value);
        }
    }

    isValid(value = this.props.value) {
        return this.props.options.findIndex((opt) => opt.value === value) !== -1;
    }

    render() {

        let value = this.isValid() ? this.props.value : '';
        if (this.props.options[0] && !value) {
            value = this.props.options[0].value;
        }

        const label = this.props.label ? <label htmlFor={this.id}>{this.props.label}</label> : null;

        const select = (
            <select
                id={this.id}
                className="form-control"
                value={value}
                onChange={this.onChange}
            >
                {this.props.options.map((opt) =>
                    <option key={uniqueId('form-dropdown-option-')} value={opt.value}>
                        {opt.name}
                    </option>
                )}
            </select>
        );

        return label
            ? <div className="form-group">{label}{select}</div>
            : select;
    }
}

Dropdown.propTypes = {
    label:    React.PropTypes.string,
    value:    React.PropTypes.string,
    options:  React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
};

export default Dropdown;

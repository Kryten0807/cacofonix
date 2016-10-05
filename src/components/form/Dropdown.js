// dependencies
//
import React from 'react';
import isArray from 'lodash/isArray';
import flatMap from 'lodash/flatMap';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

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

        this.options = isArray(this.props.options)
            ? this.props.options
            : flatMap(this.props.options, (opt) => opt);

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

    /**
     * Determine if a value is valid
     * @param  {String}  The value to check
     * @return {Boolean} True if the value is valid (ie. found in the array of
     *                   options); false otherwise
     */
    isValid(value = this.props.value) {
        return this.options.findIndex((opt) => opt.value === value) !== -1;
    }

    /**
     * Render the component
     * @return {React.Element} The React element describing the component
     */
    render() {
        // figure out what value to display
        //
        let value = this.isValid() ? this.props.value : '';
        if (this.props.options[0] && !value) {
            value = this.props.options[0].value;
        }

        // generate the label for the component
        //
        const label = this.props.label
            ? (
            <label
                htmlFor={this.id}
                className={classnames('control-label', {
                    [`col-xs-${this.context.labelColumns}`]: this.context.labelColumns,
                })}
            >
                {this.props.label}
            </label>
            )
            : null;

        // build the options
        //
        let options = null;
        if (isArray(this.props.options)) {
            options = this.props.options.map((opt) =>
                (<option key={uniqueId('form-dropdown-option-')} value={opt.value}>
                    {opt.name}
                </option>)
            );
        }
        // generate the select element for the component
        //
        let select = (
            <select
                id={this.id}
                className="form-control"
                value={value}
                onChange={this.onChange}
            >
                {options}
            </select>
        );

        // do we have columns for this component? if so, wrap the select element
        // in a div to implement those columns
        //
        if (this.context.labelColumns) {
            select = (
                <div
                    className={classnames(
                        'form-dropdown-columns',
                        `col-xs-${12 - this.context.labelColumns}`
                    )}
                >
                    {select}
                </div>
            );
        }

        // return the component
        //
        return label
            ? <div className="form-group">{label}{select}</div>
            : select;
    }
}

/**
 * The property types for the component
 * @type {Object}
 */
Dropdown.propTypes = {
    label:    React.PropTypes.string,
    value:    React.PropTypes.string,
    options:  React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
};

/**
 * The context types for the component
 * @type {Object}
 */
Dropdown.contextTypes = {
    labelColumns: React.PropTypes.number,
};

// export the component
//
export default Dropdown;

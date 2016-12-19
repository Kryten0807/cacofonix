// npm dependencies
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
        this.id = props.id || uniqueId('form-dropdown-');

        // do we have a value? if not, then we need call onChange (if it exists)
        // with the first option to ensure that the value is set
        //
        if (!props.value && props.onChange) {
            // is the list of options an array?
            //
            if (isArray(props.options)) {
                // yes - return the value of the first item (if we have one)
                //
                if (props.options.length > 0) {
                    props.onChange(props.options[0].value);
                }
            } else {
                // no - return the value of the first item in the first property
                // (if there is one)
                //
                const keys = Object.keys(props.options);

                if (keys.length > 0) {
                    props.onChange(props.options[keys[0]][0].value);
                }
            }
        }

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
     * Get the list of options as a flat array
     * @return {Array} The list of options
     */
    getOptionsList() {
        // is it an array? if so, return it; otherwise, map it to a flat array
        //
        return isArray(this.props.options)
            ? this.props.options
            : flatMap(this.props.options, (opt) => opt);
    }

    /**
     * Determine if a value is valid (ie. in the list of options)
     * @param  {String}  The value to check
     * @return {Boolean} True if the value is valid (ie. found in the array of
     *                   options); false otherwise
     */
    isValid(value = this.props.value) {
        return this.getOptionsList().findIndex((opt) => `${opt.value}` === `${value}`) !== -1;
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

        // is the list of options an array or an object?
        //
        if (isArray(this.props.options)) {
            // it's an array - simply map it to a list of <option> elements
            //
            options = this.props.options.map((opt) => {
                return (<option key={uniqueId('form-dropdown-option-')} value={opt.value}>
                    {opt.name}
                </option>);
            });
        } else {
            // it's an object - build a list of options, separated into
            // optgroups by key
            //
            options = [];

            Object.keys(this.props.options).forEach((key) => {
                options.push(
                    <optgroup key={uniqueId('form-dropdown-optgroup-')} label={key}>
                        {this.props.options[key].map((opt) => (
                            <option key={uniqueId('form-dropdown-option-')} value={opt.value}>
                                {opt.name}
                            </option>))
                        }
                    </optgroup>
                );
            });
        }

        // generate the select element for the component
        //
        let select = (
            <select
                id={this.id}
                name={this.props.name}
                disabled={!!this.props.disabled}
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
    /** A flag to indicated whether this component is disabled */
    disabled: React.PropTypes.bool,
    /** The ID for the component */
    id:       React.PropTypes.string,
    /** The label for the checkbox group */
    label:    React.PropTypes.string,
    /** The name for the select element */
    name:     React.PropTypes.string,
    /** The selected value */
    value:    React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    /** The options for the dropdown */
    options:  React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]).isRequired,
    /** The 'onChange' handler for the component */
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

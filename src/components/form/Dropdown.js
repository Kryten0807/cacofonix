// npm dependencies
//
import React from 'react';
import isArray from 'lodash/isArray';
import flatMap from 'lodash/flatMap';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

/**
 * Build a list of <option> elements from a list of options
 * @param  {Array} opts The options for which to build the list of elements
 * @return {Array}      An array of <option> elements
 */
const optionsList = (opts) => opts.map((opt) =>
    <option key={uniqueId('form-dropdown-option-')} value={opt.value || opt}>
        {opt.name || opt}
    </option>
);

/**
 * Flatten the list of options
 * @param  {Array|Object} options The list of options
 * @return {Array}                The flattened list of options
 */
const flattenOptionsList = (options) => (
    isArray(options) ? options : flatMap(options, (opt) => opt)
);

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

        // do we have a value? This is an interesting situation... the user has
        // not provided a value, so the value *ought* to be the first item in
        // the Dropdown.
        //
        // I attempted to fix this by "pushing" the updated value to the state
        // via the `onChange` handler, but that's a no-no in React.
        //
        // Possible solutions:
        // 1. require the `value` parameter - but what happens if it's not
        //      valid?
        // 2. push the new value after the component has mounted - but this
        //      requires implementing state on this component
        //
        // I'm going to try number 2.

        // build the list of options for the component
        //
        this.optionsList = flattenOptionsList(props.options || []);

        // get the first value from the list of options (if it exists)
        //
        this.firstValue = this.optionsList[0] ? this.optionsList[0].value : '';

        // validate & save the value
        //
        const value = (props.value && this.isValid(props.value)) ? props.value : this.firstValue;

        // initialize the component state
        //
        this.state = { value };

        // bind `this` to the event handlers
        //
        this.isValid = this.isValid.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Handle the "component just mounted" event
     */
    componentDidMount() {
        // does the value in the props equal the value in the state? if not, and
        // if we have an `onChange` handler, then call the `onChange` handler
        //
        if (this.props.value !== this.state.value && this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    /**
     * Handle the `onChange` event for the select element
     * @param  {Object} event The event object
     */
    onChange(event) {
        // figure out which value to use
        //
        const newValue = this.isValid(event.target.value)
            ? event.target.value
            : this.firstValue;

        this.setState({ value: newValue }, () => {
            // do we have an onChange handler? if so, call it with the new
            // value
            //
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }

        });
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
     * @param  {String}  value The value to check
     * @return {Boolean}       `true` if the value is valid (ie. found in the
     *                         array of options); `false` otherwise
     */
    isValid(value) {
        return this.getOptionsList().findIndex((opt) => `${opt.value}` === `${value}`) !== -1;
    }

    /**
     * Render the component
     * @return {React.Element} The React element describing the component
     */
    render() {
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
            options = optionsList(this.props.options);
        } else {
            // it's an object - build a list of options, separated into
            // optgroups by key
            //
            options = [];

            Object.keys(this.props.options).forEach((key) => {
                options.push(
                    <optgroup key={uniqueId('form-dropdown-optgroup-')} label={key}>
                        {optionsList(this.props.options[key])}
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
                value={this.state.value}
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
    /**
     * The options for the dropdown, in one of three possible forms:
     * + An array of strings - the string is used as both the value & name for
     *   the option
     * + An array of objects of the form  { value: 'x', name: 'y' }
     * + An object where the key is the option group name and each value is
     *   either an array of strings or an array of objects as described above
     */
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

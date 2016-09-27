// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

/**
 * The RadioButtonGroup component
 */
class RadioButtonGroup extends React.Component {
    /**
     * Construct the component instance
     * @param  {Object} props The component props
     */
    constructor(props) {
        super(props);

        // generate a unique ID for this element (used to tie the label to the
        // input elements)
        //
        this.id = uniqueId('form-radiobuttongroup-');

        // build a list of permitted values from the options
        //
        this.permittedValues = this.props.options.map((opt) => `${opt.value}`);

        // initialize the component state
        //
        this.state = {
            value: this.isPermittedValue(this.props.value)
                ? `${this.props.value}`
                : `${this.props.options[0].value}`,
        };

        // bind `this` to the onChange event handler
        //
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Handle a change to the input elements
     * @param  {Object} event The event object
     */
    onChange(event) {
        // get the current value & make sure it's a string
        //
        const value = `${event.target.value}`;

        // has the value changed? if so, then update the state & call the
        // onChange handler
        //
        if (value !== this.state.value) {
            // update the component state
            //
            this.setState({ value });

            // do we have an onChange handler? if so, call it
            //
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        }
    }

    /**
     * Check a value to see if it's one of the permitted values
     * @param  {String}  value The value to check
     * @return {Boolean}       True if it's a permitted value; false otherwise
     */
    isPermittedValue(value) {
        return this.permittedValues.findIndex((val) => val === `${value}`) !== -1;
    }

    /**
     * Render the component
     * @return {React.Element} The React element describing the component
     */
    render() {
        // get the important values from the component properties
        //
        const { label, options } = this.props;

        const labelElement = label
            ? (<label
                    htmlFor={this.id}
                    className="radiobuttongroup"
                    className={classnames('radiobuttongroup', {
                        [`col-xs-${this.context.labelColumns}`]: this.context.labelColumns,
                    })}
                >{label}</label>)
            : null;


        // render the component & return it
        //
        return (
            <div className="form-group">

                {labelElement}

                {options.map((opt) => (
                    <div key={uniqueId('form-radiobuttongroup-option-')} className="radio">
                        <label>
                            <input
                                type="radio"
                                name={this.id}
                                value={opt.value}
                                checked={this.state.value === opt.value}
                                onChange={this.onChange}
                            />
                            <span>{opt.name}</span>
                        </label>
                    </div>
                ))}

            </div>
        );
    }
}

// define the property types for the component
//
RadioButtonGroup.propTypes = {
    label:    React.PropTypes.string,
    options:  React.PropTypes.array,
    value:    React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    onChange: React.PropTypes.func,
};

// set the context types for values received from higher up the food chain
//
RadioButtonGroup.contextTypes = {
    labelColumns:           React.PropTypes.number,
};

// export the component
//
export default RadioButtonGroup;

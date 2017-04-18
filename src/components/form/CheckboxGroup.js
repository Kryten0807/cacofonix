// npm dependencies
//
import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import uniqueId from 'lodash/uniqueId';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';

/**
 * The CheckboxGroup component
 */
class CheckboxGroup extends React.Component {
    /**
     * Construct the component instance
     * @param  {Object} props The component properties
     */
    constructor(props) {
        super(props);

        // declare a variable for the component value
        //
        let value = [];

        // do we have a value prop? if so, make sure it's either an array, or
        // convert it to an array
        //
        if (this.props.value) {
            value = isArray(this.props.value) ? this.props.value : [this.props.value];
        }

        // calculate a unique ID for the component if one is not provided
        //
        this.id = this.props.id || uniqueId('form-checkboxgroup-');

        // intialize the validation message for the component
        //
        this.validationMessage = this.props.validationMessage
            || `At least one item in ${this.props.description} must be selected`;


        // initialize the component state
        //
        this.state = {
            value,
            hasBeenClicked: false,
        };

        // bind `this` to the onClick handler
        //
        this.onClick = this.onClick.bind(this);
    }

    /**
     * Handle the "component is mounting" event
     */
    componentWillMount() {
        // determine if it's valid
        //
        const isValid = !this.props.required || this.state.value.length;

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
     * Handle the receipt of new properties
     * @param  {Object} newProps The new properties for the component
     */
    componentWillReceiveProps(newProps) {
        // save the initial value, so we can check for changes later
        //
        const initialValue = this.state.value;

        // remove any items from the value that do not appear in the new options
        //
        this.setState((state) => update(state, {
            value: {
                $set: state.value.filter((val) =>
                    newProps.options.findIndex((opt) => opt.value === `${val}`) !== -1
                )
            }
        }), () => {
            // then check to see if the value has changed and, if so, call the
            // `onChange` handler with the new values
            //
            if (!isEqual(this.state.value, initialValue) && this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }

    /**
     * Handle a click or change event for one of the input elements
     * @param  {String} value The value for the input element that was clicked
     */
    onClick(value) {
        // determine if the item clicked is currently in the list of checked
        // items
        //
        const idx = this.state.value.findIndex((val) => val === value);

        // declare a variable to hold the update details
        //
        let delta = null;

        // do we have this item in the list of checked items already?
        //
        if (idx === -1) {
            // no. add the item to the array
            //
            delta = { hasBeenClicked: { $set: true }, value: { $push: [value] } };
        } else {
            // yes. remove the item from the array
            //
            delta = { hasBeenClicked: { $set: true }, value: { $splice: [[idx, 1]] } };
        }

        // update the state...
        //
        this.setState((state) => update(state, delta), () => {
            // then call the `onChange` handler (if any)
            //
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }

            // determine if the value is valid
            //
            const isValid = !this.props.required || this.state.value.length;

            // call the "child has validated" handler
            //
            if (this.context.onChildValidationEvent) {
                this.context.onChildValidationEvent(
                    this.id,
                    true,
                    isValid ? null : this.validationMessage
                );
            }
        });
    }

    /**
     * Render the component
     * @return {React.Element} The React element describing the component
     */
    render() {
        // build the list of classes for the outermost div
        //
        const classes = classnames('form-group', {
            'has-error': this.props.required
                && this.state.hasBeenClicked
                && !this.state.value.length,
        });

        // render a label for the component, if a label has been provided
        //
        const label = this.props.label
            ? (
            <label
                className={classnames('control-label', 'pull-left', {
                    [`col-xs-${this.context.labelColumns}`]: this.context.labelColumns,
                })}
            >
                {this.props.label}
                {this.props.required
                    ? <sup>&nbsp;<i className="required fa fa-star" /></sup>
                    : ''
                }
            </label>
            )
            : null;

        // render the help block if the component has failed validation
        //
        const helpBlock =
            this.props.required && this.state.hasBeenClicked && !this.state.value.length
            ? <span className="help-block" style={{ clear: 'both' }}>{this.validationMessage}</span>
            : '';

        // render the input elements for the component
        //
        const inputs = (
            <div
                className={classnames('form-checkboxgroup-inputs', {
                    [`col-xs-${12 - this.context.labelColumns}`]: this.context.labelColumns,
                })}
            >
                {this.props.options.map((opt) =>
                    <div
                        key={uniqueId('form-checkboxgroup-option-')}
                        className="checkbox pull-left"
                        style={{ marginRight: '2em' }}
                    >
                        <label>
                            <input
                                type="checkbox"
                                value={opt.value}
                                checked={
                                    this.state.value.findIndex((val) =>
                                        val === opt.value
                                    ) !== -1
                                }
                                onChange={() => this.onClick(opt.value)}
                            />
                            <span>{opt.name}</span>
                        </label>
                    </div>
                )}

                {helpBlock}

            </div>
        );

        // render the whole component and return it
        //
        return (
            <div className={classes}>

                {label}

                {inputs}

            </div>
        );
    }
}

/**
 * The property types for the component
 * @type {Object}
 */
CheckboxGroup.propTypes = {
    /**
     * A flag to indicated whether this component is required (ie. at least one
     * checkbox must be checked)
     */
    required:          PropTypes.bool,
    /** The ID for the component */
    id:                PropTypes.string,
    /** The label for the checkbox group */
    label:             PropTypes.string,
    /**
     * The description of the component for use in validation error messages
     * (ie., "at least one item in <description> must be checked")
     */
    description:       PropTypes.string,
    /** A custom validation error message for the component */
    validationMessage: PropTypes.string,
    /** The `onChange` handler for the component */
    onChange:          PropTypes.func,
    /** The value of the component */
    value:             PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.string,
        PropTypes.number,
    ]),
    /** The options for the checkbox group */
    options:           PropTypes.arrayOf(PropTypes.object),
};

/**
 * The context types for the component
 * @type {Object}
 */
CheckboxGroup.contextTypes = {
    onChildValidationEvent: PropTypes.func,
    labelColumns:           PropTypes.number,
};

// export the component
//
export default CheckboxGroup;

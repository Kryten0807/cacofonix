// dependencies
//
import React from 'react';
import update from 'react-addons-update';
import uniqueId from 'lodash/uniqueId';
import isArray from 'lodash/isArray';
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

        // render the help block if the component has failed validation
        //
        const helpBlock =
            this.props.required && this.state.hasBeenClicked && !this.state.value.length
            ? <span className="help-block">{this.validationMessage}</span>
            : '';

        // render the component and return it
        //
        return (
            <div className={classes}>
                {this.props.label
                    ? <label className="checkboxgroup">{this.props.label}</label>
                    : null
                }
                {this.props.options.map((opt) =>
                    <div
                        key={uniqueId('form-checkboxgroup-option-')}
                        className="checkbox pull-left"
                    >
                        <label>
                            <input
                                type="checkbox"
                                value={opt.value}
                                checked={
                                    this.state.value.findIndex((val) => val === opt.value) !== -1
                                }
                                onChange={() => this.onClick(opt.value)}
                                onClick={() => this.onClick(opt.value)}
                            />
                            <span>{opt.name}</span>
                        </label>
                    </div>
                )}
                {helpBlock}
            </div>
        );
    }
}

/**
 * The property types for the component
 * @type {Object}
 */
CheckboxGroup.propTypes = {
    required:          React.PropTypes.bool,
    id:                React.PropTypes.string,
    label:             React.PropTypes.string,
    description:       React.PropTypes.string,
    validationMessage: React.PropTypes.string,
    onChange:          React.PropTypes.func,
    value:             React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.arrayOf(React.PropTypes.number),
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    options:           React.PropTypes.arrayOf(React.PropTypes.object),

};

/**
 * The context types for the component
 * @type {Object}
 */
CheckboxGroup.contextTypes = {
    onChildValidationEvent: React.PropTypes.func,
};

// export the component
//
export default CheckboxGroup;

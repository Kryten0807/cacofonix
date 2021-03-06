// npm dependencies
//
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * The SubmitButton component
 * @param  {String}   children   The label to display in the button
 * @param  {String}   name    The name for the component
 * @param  {String}   style   The style with which to display the button
 * @param  {Function} onClick The `onClick` handler for the button
 * @param  {Boolean}  isValid A flag (from the parent Form's context) indicating
 *                            whether the form to which this button is attached
 *                            is valid
 * @return {React.Element}    The React element describing this component
 */

class SubmitButton extends React.Component {
    /**
     * Construct the SubmitButton instance
     * @param  {Object} props The component properties
     */
    constructor(props) {
        super(props);

        // initialize the component state
        //
        this.state = {
            disabled: props.disabled,
        };
    }

    /**
     * Handle new props for the component
     * @param  {Object} newProps The new property values
     */
    componentWillReceiveProps(newProps) {
        // has the disabled flag state changed? if so, update the component
        // state
        //
        if (this.state.disabled !== !!newProps.disabled) {
            this.setState({ disabled: !!newProps.disabled });
        }
    }

    /**
     * Render the component
     * @return {React.Element} The React component
     */
    render() {
        return (
            <button
                name={this.props.name}
                className={classnames('btn', {
                    'btn-danger':  this.props.style === 'danger' || this.props.style === 'error',
                    'btn-warning': this.props.style === 'warning' || this.props.style === 'warn',
                    'btn-info':    this.props.style === 'info',
                    'btn-success': this.props.style === 'success' || this.props.style === 'ok',
                    'btn-default': !this.props.style,
                })}
                disabled={!this.context.isValid || !!this.state.disabled}
                onClick={this.props.onClick}
            >
                {this.props.children || 'Submit'}
            </button>
        );
    }
}

// define the property types for the component
//
SubmitButton.propTypes = {
    /** A flag indicated whether this button is disabled */
    disabled: PropTypes.bool,
    /** The name for the component */
    name:     PropTypes.string,
    /** The style with which to display the button */
    style:       PropTypes.oneOf(
        ['danger', 'error', 'warning', 'warn', 'info', 'success', 'ok']
    ),
    /** The `onClick` handler for the button */
    onClick:  PropTypes.func,
    /** The child(ren) of this component */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

// define the context types for values received from higher up the food chain
//
SubmitButton.contextTypes = {
    isValid: PropTypes.bool,
};

// export the component
//
export default SubmitButton;

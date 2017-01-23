// npm dependencies
//
import React from 'react';
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
const SubmitButton = ({ children, disabled, name, style, onClick }, { isValid }) => (
    <button
        name={name}
        className={classnames('btn', {
            'btn-danger':  style === 'danger' || style === 'error',
            'btn-warning': style === 'warning' || style === 'warn',
            'btn-info':    style === 'info',
            'btn-success': style === 'success' || style === 'ok',
            'btn-default': !style,
        })}
        disabled={!isValid || !!disabled}
        onClick={onClick}
    >
        {children || 'Submit'}
    </button>
);

// define the property types for the component
//
SubmitButton.propTypes = {
    /** A flag indicated whether this button is disabled */
    disabled: React.PropTypes.boolean,
    /** The name for the component */
    name:     React.PropTypes.string,
    /** The style with which to display the button */
    style:       React.PropTypes.oneOf(
        ['danger', 'error', 'warning', 'warn', 'info', 'success', 'ok']
    ),
    /** The `onClick` handler for the button */
    onClick:  React.PropTypes.func,
    /** The child(ren) of this component */
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node,
    ]),
};

// define the context types for values received from higher up the food chain
//
SubmitButton.contextTypes = {
    isValid: React.PropTypes.bool,
};

// export the component
//
export default SubmitButton;

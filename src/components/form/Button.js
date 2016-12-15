// dependencies
//
import React from 'react';
import classnames from 'classnames';

/**
 * The Button component
 * @param  {Object} children  The children of this component
 * @param  {Boolean} disabled A flag to indicate whether the button should be
 *                            rendered as disabled
 * @param  {String} style     The style for the button
 * @param  {Function} onClick The onClick handler for the button
 * @return {React.Element}    The React element describing this component
 */
const Button = ({ children, disabled, name, style, onClick }) => (
    <button
        className={classnames('btn', {
            'btn-danger':  style === 'danger' || style === 'error',
            'btn-warning': style === 'warning' || style === 'warn',
            'btn-info':    style === 'info',
            'btn-success': style === 'success' || style === 'ok',
            'btn-default': !style,
        })}
        disabled={!!disabled}
        onClick={onClick}
        name={name}
    >
        {children || 'Submit'}
    </button>
);

/**
 * The property types for the Button component
 * @type {Object}
 */
Button.propTypes = {
    /** A flag to indicated whether this component is disabled */
    disabled: React.PropTypes.bool,
    /** The button component name */
    name:     React.PropTypes.string,
    /** The button style */
    style:       React.PropTypes.oneOf(
        ['danger', 'error', 'warning', 'warn', 'info', 'success', 'ok']
    ),
    /** The `onClick` handler for the button */
    onClick:  React.PropTypes.func,
    /** The child(ren) of the button */
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node,
    ]),
};

// export the component
//
export default Button;

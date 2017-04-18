// npm dependencies
//
import React from 'react';
import PropTypes from 'prop-types';
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
    disabled: PropTypes.bool,
    /** The button component name */
    name:     PropTypes.string,
    /** The button style */
    style:       PropTypes.oneOf(
        ['danger', 'error', 'warning', 'warn', 'info', 'success', 'ok']
    ),
    /** The `onClick` handler for the button */
    onClick:  PropTypes.func,
    /** The child(ren) of the button */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

// export the component
//
export default Button;

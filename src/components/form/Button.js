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
const Button = ({ children, disabled, style, onClick }) => (
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
    >
        {children || 'Submit'}
    </button>
);

/**
 * The property types for the Button component
 * @type {Object}
 */
Button.propTypes = {
    disabled: React.PropTypes.bool,
    style:    React.PropTypes.string,
    onClick:  React.PropTypes.func,
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node,
    ]),
};

// export the component
//
export default Button;

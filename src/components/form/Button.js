// dependencies
//
import React from 'react';
import classnames from 'classnames';

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

Button.propTypes = {
    disabled: React.PropTypes.bool,
    style:    React.PropTypes.string,
    onClick:  React.PropTypes.func,
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node,
    ]),
};

export default Button;

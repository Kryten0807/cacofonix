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
        onClick={onClick}
    >
        {children || 'Submit'}
    </button>
);

export default Button;

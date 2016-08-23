// dependencies
//
import React from 'react';
import classnames from 'classnames';

const Alert = ({ style, dismissible, children }) => {
    const classes = classnames('alert', {
        'alert-danger':      style === 'danger' || style === 'error',
        'alert-warning':     style === 'warning' || style === 'warn',
        'alert-info':        style === 'info',
        'alert-success':     style === 'success' || style === 'ok' || !style,
        'alert-dismissible': dismissible,
    });
    return (
        <div className={classes}>
            {dismissible &&
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                ><span aria-hidden="true">&times;</span></button>
            }
            {children}
        </div>
    );
};

// set the property types for the Alert component
//
Alert.propTypes = {
    style:       React.PropTypes.string,
    dismissible: React.PropTypes.bool,
    children:    React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element),
    ]),
};

export default Alert;

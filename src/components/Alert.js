// npm dependencies
//
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * The Alert component
 * @param  {String}              style       The style of the alert
 * @param  {Boolean}             dismissible If true, then the alert is
 *                                           dismissible & will include a
 *                                           button which will remove the
 *                                           component when clicked
 * @param  {Array|React.Element} children    The child (or children) to display in this component
 * @return {React.Element}                   The React Element representing this component
 */
const Alert = ({ style, dismissible, children }) => {
    // determine the classes for the outermost div
    //
    const classes = classnames('alert', {
        'alert-danger':      style === 'danger' || style === 'error',
        'alert-warning':     style === 'warning' || style === 'warn',
        'alert-info':        style === 'info',
        'alert-success':     style === 'success' || style === 'ok' || !style,
        'alert-dismissible': dismissible,
    });

    // return the React Element
    //
    return (
        <div className={classes}>
            {dismissible &&
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            }
            {children}
        </div>
    );
};

// set the property types for the Alert component
//
Alert.propTypes = {
    /** The style of the Alert */
    style:       PropTypes.oneOf(
        ['danger', 'error', 'warning', 'warn', 'info', 'success', 'ok']
    ),
    /**
     * A flag to indicate whether this alert can be dismissed by the user (not
     * currently implementd)
     */
    dismissible: PropTypes.bool,
    /** The child(ren) to display in this component */
    children:    PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]),
};

// export the component
//
export default Alert;

// dependencies
//
import React from 'react';
import classnames from 'classnames';

/**
 * The Label component
 * @param  {Boolean} required A flag indicating whether this label should be
 *                            postfixed with the required asterisk
 * @param  {String}  label    The text to display in the label component
 * @return {React.Element}    The React Element describing this component
 */
const Label = ({ htmlFor, required, label, className }) => {
    // generate the classes for the label element
    //
    const classes = classnames('control-label', className || null);

    // render & return the component
    //
    return (
        <label htmlFor={htmlFor} className={classes}>

            {label}

            {required
                && <sup style={{ color: 'red' }}>
                    <i className="glyphicon glyphicon-asterisk" />
                </sup>
            }

        </label>
    );
};

// set the property types for the Label component
//
Label.propTypes = {
    htmlFor:  React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
    label:    React.PropTypes.string,
    className: React.PropTypes.string,
};

// export the component
//
export default Label;

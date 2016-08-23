// dependencies
//
import React from 'react';
import classnames from 'classnames';

/**
 * The Panel component
 * @param  {String|Undefined} header   The header for the component
 * @param  {Object|Array}     children The child elements/components that appear
 *                                     inside the panel
 * @return {React.Element}             The React element describing this component
 */
const Panel = ({ style, header, children }) => {
    const classes = classnames(
        'panel',
        {
            'panel-danger':  style === 'danger' || style === 'error',
            'panel-warning': style === 'warning' || style === 'warn',
            'panel-info':    style === 'info',
            'panel-success': style === 'success' || style === 'ok',
            'panel-primary': style === 'primary',
            'panel-default': typeof style === 'undefined',
        }
    );

        <div className="panel-body">{children}</div>
    return (
        <div className={classes}>

    </div>
);
            {header
                ? (
                <div className="panel-heading">
                    <h3 className="panel-title">{header}</h3>
                </div>
                )
                : ''
            }
    );
};

// set the property types for the Panel component
//
Panel.propTypes = {
    header:   React.PropTypes.string,
    children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element),
    ]),
};

// export the component
//
export default Panel;

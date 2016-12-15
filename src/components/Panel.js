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

    return (
        <div className={classes}>

            {header
                ? (
                <div className="panel-heading">
                    <h3 className="panel-title">{header}</h3>
                </div>
                )
                : ''
            }

            <div className="panel-body">{children}</div>

        </div>
    );
};

// set the property types for the Panel component
//
Panel.propTypes = {
    /** The style of the panel */
    style:       React.PropTypes.oneOf(
        ['danger', 'error', 'warning', 'warn', 'info', 'success', 'ok']
    ),
    /** The header (title) for the panel */
    header:   React.PropTypes.string,
    /** The child(ren) of this panel */
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node,
    ]),
};

// export the component
//
export default Panel;

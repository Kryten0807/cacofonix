// dependencies
//
import React from 'react';

/**
 * The Panel component
 * @param  {String|Undefined} header   The header for the component
 * @param  {Object|Array}     children The child elements/components that appear
 *                                     inside the panel
 * @return {React.Element}             The React element describing this component
 */
const Panel = ({ header, children }) => (
    <div className="panel panel-default">

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

// export the component
//
export default Panel;

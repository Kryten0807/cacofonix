// dependencies
//
import React from 'react';

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

export default Panel;

// dependencies
//
import React from 'react';

const SubmitButton = ({ label, onClick }, { isValid }) => (
    <button className="btn btn-default" disabled={!isValid} onClick={onClick}>
        {label || 'Submit'}
    </button>
);

SubmitButton.propTypes = {
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
};

// set the context types for values received from higher up the food chain
//
SubmitButton.contextTypes = {
    isValid: React.PropTypes.bool,
};

export default SubmitButton;

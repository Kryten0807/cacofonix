// dependencies
//
import React from 'react';

const SubmitButton = ({ label }, { isValid }) => (
    <button className="btn btn-default" disabled={!isValid}>{label || 'Submit'}</button>
);

SubmitButton.propTypes = {
    label: React.PropTypes.string,
};

// set the context types for values received from higher up the food chain
//
SubmitButton.contextTypes = {
    isValid: React.PropTypes.bool,
};

export default SubmitButton;

// dependencies
//
import React from 'react';

const SubmitButton = (props) => (
    <button className="btn btn-default">{props.label || 'Submit'}</button>
);

SubmitButton.propTypes = {
    label: React.PropTypes.string,
};

export default SubmitButton;

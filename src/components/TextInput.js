// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Label from './Label';

/**
 * The TextInput component
 */
class TextInput extends React.Component {
    constructor(props) {
        super(props);

        // set a unique ID for this component's elements
        //
        this.id = uniqueId('TextInput-');

        this.validationMessage = `${props.description} is required`;

        const value = `${props.value || ''}`;

        const isValid = !props.required || !!value;

        // initialize the state
        //
        this.state = {
            value,
            hasValidated: false,
            isValid,
            validationMessage: isValid ? null : this.validationMessage,
        };
    }

    /**
     * Render the component
     * @return {React.Element} The React Element describing this component
     */
    render() {
        return (
            <div className="form-group">
                {this.props.label &&
                    <Label htmlFor={this.id} label={this.props.label} />
                }
                <input
                    id={this.id}
                    type="text"
                    className="form-control"
                    placeholder={this.props.placeholder || ''}
                />
            </div>
        );
    }

}

// set the property types for the TextInput component
//
TextInput.propTypes = {
    label:       React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value:       React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
};

// export the component
//
export default TextInput;

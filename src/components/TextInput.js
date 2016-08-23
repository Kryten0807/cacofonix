// dependencies
//
import React from 'react';
import update from 'react-addons-update';
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
            isValid,
            validationMessage: isValid ? null : this.validationMessage,
            hasValidated:      false,
        };
    }

    componentWillMount() {
        if (this.props.onValidation) {
            this.props.onValidation(
                this.state.hasValidated,
                this.state.isValid,
                this.state.validationMessage
            );
        }
    }

    validate(val) {
        const value = `${val || ''}`;
        const isValid = !this.props.required || !!value;
        const validationMessage = isValid ? null : this.validationMessage;

        return {
            value, isValid, validationMessage,
            hasValidated: true,
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
    required:     React.PropTypes.bool,
    label:        React.PropTypes.string,
    description:  React.PropTypes.string,
    placeholder:  React.PropTypes.string,
    value:        React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    onValidation: React.PropTypes.func,
};

// export the component
//
export default TextInput;

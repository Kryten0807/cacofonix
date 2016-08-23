// dependencies
//
import React from 'react';
import update from 'react-addons-update';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';
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

        this.state = this.validate(props.value);

        this.state.hasValidated = false;

        this.onChange = this.onChange.bind(this);
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

    onChange(event) {

        const { value, isValid, validationMessage } = this.validate(event.target.value);

        this.setState((state) => update(state, {
            value:             { $set: value },
            hasValidated:      { $set: true },
            isValid:           { $set: isValid },
            validationMessage: { $set: validationMessage },
        }));

        if (this.props.onChange) {
            this.props.onChange(value);
        }

        if (this.props.onValidation) {
            this.props.onValidation(true, isValid, validationMessage);
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
        const classes = classnames('form-group', {
            'has-error': (this.state.hasValidated && !this.state.isValid),
        });

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
                    onChange={this.onChange}
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
    onChange:     React.PropTypes.func,
    onValidation: React.PropTypes.func,
};

// export the component
//
export default TextInput;

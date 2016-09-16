// dependencies
//
import React from 'react';
import classnames from 'classnames';


class TextInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value:   props.value,
            isValid: true,
        };

        this.validationMessage = props.validationMessage || `${this.props.description} is required`;

        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onBlur(event) {
        const value = event.target.value;

        const isValid = !this.props.required || !!value;

        this.setState({ isValid });

        if (this.props.onChildValidationEvent) {
            this.props.onChildValidationEvent(
                this.props.validationKey,
                isValid ? null : this.validationMessage
            );
        }
    }

    onChange(event) {
        const value = event.target.value;

        this.setState({ value });
    }

    render() {
        return (
            <div className={classnames('form-group', { 'has-error': !this.state.isValid })}>
                <input
                    type="text"
                    value={this.state.value}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />
                {!this.state.isValid
                    ? <span className="help-block">{this.validationMessage}</span>
                    : null
                }
            </div>
        );
    }
}


// set the property types for the component
//
TextInput.propTypes = {
    required:               React.PropTypes.bool,
    value:                  React.PropTypes.string,
    description:            React.PropTypes.string,
    validationMessage:      React.PropTypes.string,
    validationKey:          React.PropTypes.string.isRequired,
    onChildValidationEvent: React.PropTypes.func.isRequired,
};

export default TextInput;

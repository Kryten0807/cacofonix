// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Label from './Label';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.permittedValues = props.options.map((opt) => opt.value);

        this.id = uniqueId('Dropdown-');

        this.validationMessage = `${props.description || 'This value'} is required`;

        const isValid = !props.required || !!props.value;

        this.state = {
            hasValidated:      false,
            isValid,
            validationMessage: isValid ? null : this.validationMessage,
        };
    }

    componentWillMount() {
        if (this.props.onValidation) {
            this.props.onValidation(this.state.hasValidated, this.state.isValid, this.state.validationMessage);
        }
    }

    render() {
        return (
            <div className="form-group">
                {this.props.label
                    ? <Label
                        htmlFor={this.id}
                        label={this.props.label}
                        required={this.props.required}
                    />
                    : ''
                }
                <select id={this.id} className="form-control">
                    {this.props.includeNull
                        ? <option key={uniqueId('Dropdown-')} value="">
                            {this.props.nullName || 'Please select one'}
                        </option>
                        : ''
                    }
                    {this.props.options.map((opt) =>
                        <option key={uniqueId('Dropdown-')} value={opt.value}>{opt.name}</option>)
                    }
                </select>
            </div>
        );
    }
}

// set the property types for the Dropdown component
//
Dropdown.propTypes = {
    label:        React.PropTypes.string,
    includeNull:  React.PropTypes.bool,
    nullName:     React.PropTypes.string,
    required:     React.PropTypes.bool,
    options:      React.PropTypes.array,
    onValidation: React.PropTypes.func,
};


export default Dropdown;

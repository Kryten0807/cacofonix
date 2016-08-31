import React from 'react';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';

import Label from './Label';
import columns from '../helpers/columns';

class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqueId('DateInput-');

        this.validationMessage = props.validationMessage || `${props.description} is not a valid date`;

        this.state = this.validate(props.value);

        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        if (this.props.onValidation) {
            this.props.onValidation(this.state.hasValidated, this.state.isValid, this.state.validationMessage);
        }
    }

    onBlur(event) {
        const newState = this.validate(event.target.value);
        newState.hasValidated = true;

        this.setState(newState);

        if (this.props.onValidation) {
            this.props.onValidation(newState.hasValidated, newState.isValid, newState.validationMessage);
        }
    }

    onChange(event) {
        const newState = this.validate(event.target.value);
        newState.hasValidated = this.state.hasValidated;

        this.setState(newState);

        if (this.props.onValidation && newState.hasValidated) {
            this.props.onValidation(newState.hasValidated, newState.isValid, newState.validationMessage);
        }
    }

    validate(value) {
        const datetime = new moment(`${value || ''}`, 'M/D/YYYY');

        let isValid = datetime.isValid();

        if (!this.props.required && !value) {
            isValid = true;
        }

        const validationMessage = isValid ? null : this.validationMessage;

        return {
            hasValidated: false,
            value:        datetime.format('M/D/YYYY'),
            isValid,
            validationMessage,
        };
    }

    render() {
        return (
            <div className="form-group">
                {this.props.label
                    ? <Label
                        htmlFor={this.id}
                        required={this.props.required}
                        label={this.props.label}
                        className={columns(this.props.labelColumns)}
                    />
                    : ''
                }
                <div className={columns(this.props.inputColumns)}>
                    <input
                        id={this.id}
                        type="text"
                        readOnly={this.props.readOnly}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        );
    }
}

export default DateInput;

// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';

class RadioButtonGroup extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqueId('form-radiobuttongroup-');

        this.permittedValues = this.props.options.map((opt) => `${opt.value}`);

        this.state = {
            value: this.isPermittedValue(this.props.value)
                ? `${this.props.value}`
                : `${this.props.options[0].value}`,
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    isPermittedValue(value) {
        return this.permittedValues.findIndex((val) => val === `${value}`) !== -1;
    }

    render() {
        const { label, options } = this.props;

        return (
            <div>
                {label ? (<label htmlFor={this.id} className="radiobuttongroup">{label}</label>) : null}
                {options.map((opt) => (
                    <div key={uniqueId('form-radiobuttongroup-option-')} className="radio">
                        <label>
                            <input type="radio" name={this.id} value={opt.value} checked={this.state.value === opt.value} onClick={this.onClick} />
                            <span>{opt.name}</span>
                        </label>
                    </div>
                ))}
            </div>
        );
    }
}

export default RadioButtonGroup;

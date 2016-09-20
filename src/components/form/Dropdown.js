// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqueId('form-dropdown-');
    }

    onChange(event) {
        if (this.props.onChange) {
            this.props.onChange(this.isValid(event.target.value) ? event.target.value : this.props.options[0].value);
        }
    }

    isValid(value = this.props.value) {
        const validOptions = this.props.options.map((opt) => opt.value);

        return this.props.options.findIndex((opt) => opt.value === value) !== -1;
    }

    render() {

        const label = this.props.label ? <label htmlFor={this.id}>{this.props.label}</label> : null;

        const select = (
            <select id={this.id} className="form-control" value={isValidOption ? this.props.value : this.props.options[0].value}>
                {this.props.options.map((opt) =>
                    <option key={uniqueId('form-dropdown-option-')} value={opt.value}>{opt.name}</option>
                )}
            </select>
        );

        return label
            ? <div className="form-group">{label}{select}</div>
            : select;
    }
}

Dropdown.propTypes = {
    label:   React.PropTypes.string,
    options: React.PropTypes.array.isRequired,
};

export default Dropdown;

// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';


    </div>

class RadioButtonGroup extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqueId('form-radiobuttongroup-');
    }

    render() {
        const { label, options } = this.props;

        return (
            <div>
                {label ? (<label htmlFor={this.id} className="radiobuttongroup">{label}</label>) : null}
                {options.map((opt) => (
                    <div key={uniqueId('form-radiobuttongroup-option-')} className="radio">
                        <label>
                            <input type="radio" name={this.id} value={opt.value} />
                            <span>{opt.name}</span>
                        </label>
                    </div>
                ))}
            </div>
        );
    }
}

export default RadioButtonGroup;

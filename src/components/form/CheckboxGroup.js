// dependencies
//
import React from 'react';
import update from 'react-addons-update';
import uniqueId from 'lodash/uniqueId';
import isArray from 'lodash/isArray';
import classnames from 'classnames';

/*

<div class="form-group">

    <label for="checkboxgroup-107" class="control-label col-xs-2 col-md-3">
        Cycles
        <sup style="color: red;">
            <i class="glyphicon glyphicon-asterisk"></i>
        </sup>
    </label>

    <div class="col-xs-10 col-md-9">

        <div class="checkbox pull-left" style="margin-right: 1.5em;">
            <label>
                <input type="checkbox" value="1">
                <span>1</span>
            </label>
        </div>

        <div class="checkbox pull-left" style="margin-right: 1.5em;">
            <label>
                <input type="checkbox" value="2">
                <span>2</span>
            </label>
        </div>

    </div>

</div>

*/

class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props);

        let value = [];

        if (this.props.value) {
            value = isArray(this.props.value) ? this.props.value : [this.props.value];
        }

        this.state = {
            value,
            hasBeenClicked: false,
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(value) {
        const idx = this.state.value.findIndex((val) => val === value);

        let delta = null;
        if (idx === -1) {
            delta = { value: { $push: [value] } };
        } else {
            delta = { value: { $splice: [[idx, 1]] } };
        }

        this.setState((state) => update(state, delta), () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }

    render() {
        return (
            <div className="form-group">
                {this.props.label
                    ? <label className="checkboxgroup">{this.props.label}</label>
                    : null
                }
                {this.props.options.map((opt) =>
                    <div key={uniqueId('form-checkboxgroup-option-')} className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                value={opt.value}
                                checked={this.state.value.findIndex((val) => val === opt.value) !== -1}
                                onChange={() => this.onClick(opt.value)}
                                onClick={() => this.onClick(opt.value)}
                            />
                            <span>{opt.name}</span>
                        </label>
                    </div>
                )}
            </div>
        );
    }
}

export default CheckboxGroup;

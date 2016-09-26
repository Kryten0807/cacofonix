// dependencies
//
import React from 'react';
import update from 'react-addons-update';
import uniqueId from 'lodash/uniqueId';
import isArray from 'lodash/isArray';
import classnames from 'classnames';

class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props);

        let value = [];

        if (this.props.value) {
            value = isArray(this.props.value) ? this.props.value : [this.props.value];
        }

        this.id = this.props.id || uniqueId('form-checkboxgroup-');

        this.state = {
            value,
            hasBeenClicked: false,
        };

        this.onClick = this.onClick.bind(this);
    }

    componentWillMount() {
        // determine if it's valid
        //
        const isValid = !this.props.required || this.state.value.length;

        // call the `onChildValidationEvent` handler once with
        // `hasValidated`=false, just to ensure that the parent knows about this
        // child
        //
        if (this.context.onChildValidationEvent) {
            this.context.onChildValidationEvent(
                this.id,
                false,
                isValid ? null : 'At least one item must be checked'
            );
        }
    }

    onClick(value) {
        const idx = this.state.value.findIndex((val) => val === value);

        let delta = null;
        if (idx === -1) {
            delta = { hasBeenClicked: { $set: true }, value: { $push: [value] } };
        } else {
            delta = { hasBeenClicked: { $set: true }, value: { $splice: [[idx, 1]] } };
        }

        this.setState((state) => update(state, delta), () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }

            const isValid = !this.props.required || this.state.value.length;

            if (this.context.onChildValidationEvent) {
                this.context.onChildValidationEvent(
                    this.id,
                    true,
                    isValid ? null : 'At least one item must be checked'
                );
            }
        });
    }

    render() {

        const classes = classnames('form-group', {
            'has-error': this.props.required && this.state.hasBeenClicked && !this.state.value.length,
        });

        const helpBlock = this.props.required && this.state.hasBeenClicked && !this.state.value.length
            ? <span className="help-block">At least one item must be checked</span>
            : '';

        return (
            <div className={classes}>
                {this.props.label
                    ? <label className="checkboxgroup">{this.props.label}</label>
                    : null
                }
                {this.props.options.map((opt) =>
                    <div key={uniqueId('form-checkboxgroup-option-')} className="checkbox pull-left">
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
                {helpBlock}
            </div>
        );
    }
}

// set the context types for values received from higher up the food chain
//
CheckboxGroup.contextTypes = {
    onChildValidationEvent: React.PropTypes.func,
};

export default CheckboxGroup;

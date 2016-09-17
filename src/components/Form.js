// dependencies
//
import React from 'react';
import update from 'react-addons-update';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

import Alert from './Alert';
import TextInput from './form/TextInput';

class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = { validation: {} };

        this.onChildValidationEvent = this.onChildValidationEvent.bind(this);
    }

    getChildContext() {
        return {
            onChildValidationEvent: this.onChildValidationEvent,
        };
    }

    onChildValidationEvent(validationKey, message) {
        const delta = {};
        delta[validationKey] = { $set: message };

        this.setState(update(this.state, { validation: delta }));
    }

    validationErrors() {
        const errors = [];
        Object.keys(this.state.validation).forEach((key) => {
            if (this.state.validation[key]) {
                errors.push(this.state.validation[key]);
            }
        });
        return errors;
    }

    render() {
        const errors = this.validationErrors();

        const alert = errors.length > 0
            ? <Alert style="error">
                <p>Please correct the following problems:</p>
                <ul>
                    {errors.map((err) => <li key={uniqueId()}>{err}</li>)}
                </ul>
            </Alert>
            : '';
        return (
            <form
                className={classnames({
                    'form-inline':     this.props.inline,
                    'form-horizontal': this.props.horizontal,
                })}
            >
                {alert}
                {this.children}
            </form>
        );
    }
}

// set the property types for the component
//
Form.propTypes = {
    inline:     React.PropTypes.bool,
    horizontal: React.PropTypes.bool,
    children:   React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node,
    ]).isRequired,
};

// add the "sub-components"
//
Form.TextInput = TextInput;

// export the component
//
export default Form;

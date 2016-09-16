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

        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onBlur(event) {
        const value = event.target.value;

        const isValid = !this.props.required || !!value ;

        this.setState({ isValid });

        if (this.props.onChildValidationEvent) {
            this.props.onChildValidationEvent(this.props.validationKey, isValid ? null : 'some validation error message');
        }
    }

    render() {
        return (<input type="text" />);
    }
}

export default TextInput;

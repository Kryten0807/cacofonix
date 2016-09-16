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

    render() {
        return (<input type="text" />);
    }
}

export default TextInput;

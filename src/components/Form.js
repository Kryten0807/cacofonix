// dependencies
//
import React from 'react';
import classnames from 'classnames';

import TextInput from './form/TextInput';

class Form extends React.Component {
    render() {
        return (
            <form>
                {this.props.children}
            </form>
        );
    }
}




// add the "sub-components"
//
Form.TextInput = TextInput;

// export the component
//
export default Form;

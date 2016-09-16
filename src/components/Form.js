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

        // iterate over the children & add the onChange handler
        //
        this.children = React.Children.map(
            this.props.children,
            (child) => {
                const validationKey = uniqueId('form-child-');

                this.state.validation[validationKey] = null;

                return React.cloneElement(child, {
                    validationKey,
                    onChildValidationEvent: this.onChildValidationEvent,
                });
            }
        );
    }

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

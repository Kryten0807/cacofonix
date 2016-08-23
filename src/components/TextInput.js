// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Label from './Label';

class TextInput extends React.Component {
    constructor(props) {
        super(props);

        this.id = uniqueId('TextInput-');
    }

    render() {
        return (
            <div className="form-group">
                {this.props.label &&
                    <Label htmlFor={this.id} label={this.props.label} />
                }
                <input id={this.id} type="text" className="form-control" placeholder={this.props.placeholder || ''} />
            </div>
        );
    }

}

export default TextInput;

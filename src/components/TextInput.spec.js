// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render, mount } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import TextInput from './TextInput';

const expect = chai.expect;

/* *****************************************************************************
when the readOnly flag is set/not set, the TextInput component
    should have an input with prop readOnly=true when readOnly=true
    should have an input with prop readOnly=false when readOnly=false
*/

/* *****************************************************************************
when the password flag is set/not set, the TextInput component
    should have an input[type="password"] when password=true
    should have an input[type="text"] when password=false
*/
describe('when the password flag is set/not set, the TextInput component', () => {

    const label = 'enter your password';

    it('should have an input[type="password"] when password=true', () => {
        const password = true;

        const component = shallow(<TextInput password={password} label={label} />);

        expect(component.find('input[type="password"]').length).to.equal(1);
        expect(component.find('input[type="text"]').length).to.equal(0);
    });

    it('should have an input[type="text"] when password=false', () => {
        const password = false;

        const component = shallow(<TextInput password={password} label={label} />);

        expect(component.find('input[type="text"]').length).to.equal(1);
        expect(component.find('input[type="password"]').length).to.equal(0);
    });

});

/* *****************************************************************************
when the parent component sends new value prop, a non-required TextInput component
    should call the onValidation handler when required=false, value=valid
    should call the onValidation handler when required=false, value=blank
    should call the onChange handler when required=false, value=valid
    should call the onChange handler when required=false, value=blank
    should not show the validation message when required=false, value=valid
    should not show the validation message when required=false, value=blank
    should not call the onValidation handler when value has not changed
    should not call the onChange handler when value has not changed
    should update the input element value prop
*/
describe('when the parent component sends new value prop, a non-required ' +
    'TextInput component', () => {

    const required = false;
    const description = 'gibberish';

    class TestParent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                testValue: props.testValue || '',
            };
        }

        render() {
            return (<TextInput
                ref="testComponent"
                required={required}
                description={description}
                value={this.state.testValue}
                onValidation={this.props.onValidation}
                onChange={this.props.onChange}
            />);
        }
    }

    TestParent.propTypes = {
        testValue:    React.PropTypes.string,
        onChange:     React.PropTypes.func,
        onValidation: React.PropTypes.func,
    };

    it('should call the onValidation handler when required=false, value=valid', () => {

        const onValidation = sinon.spy();

        const testValue = 'hello';

        const parent = mount(<TestParent onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onValidation.callCount).to.equal(2);

        expect(onValidation.args[1][0]).to.equal(false, 'args[1][0]');
        expect(onValidation.args[1][1]).to.equal(true, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(null, 'args[1][2]');
    });

    it('should call the onValidation handler when required=false, value=blank', () => {

        const onValidation = sinon.spy();

        const initialValue = 'something';

        const testValue = '';

        const parent = mount(<TestParent testValue={initialValue} onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onValidation.callCount).to.equal(2);

        expect(onValidation.args[1][0]).to.equal(false, 'args[1][0]');
        expect(onValidation.args[1][1]).to.equal(true, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(null, 'args[1][2]');
    });

    it('should call the onChange handler when required=false, value=valid', () => {

        const onChange = sinon.spy();

        const testValue = 'a string';

        const parent = mount(<TestParent onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });


    it('should call the onChange handler when required=false, value=blank', () => {

        const onChange = sinon.spy();

        const initialValue = '1234';
        const testValue = '';

        const parent = mount(<TestParent testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });


    it('should not show the validation message when required=false, value=valid', () => {

        const testValue = 'hello';

        const parent = mount(<TestParent />);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('span.help-block').length).to.equal(0);
    });

    it('should not show the validation message when required=false, value=blank', () => {

        const initialValue = 'something';

        const testValue = '';

        const parent = mount(<TestParent testValue={initialValue} />);

        // send a change event to ensure hasValidated is set
        //
        parent.find('input').simulate('blur', {
            target: { value: initialValue }
        });

        expect(parent.find('span.help-block').length).to.equal(0, 'before props');

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('span.help-block').length).to.equal(0, 'after len');
    });

    it('should not call the onValidation handler when value has not changed', () => {

        const onValidation = sinon.spy();

        const testValue = 'hello';

        const parent = mount(<TestParent testValue={testValue} onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onValidation.callCount).to.equal(1);
    });

    it('should not call the onChange handler when value has not changed', () => {

        const onChange = sinon.spy();

        const testValue = 'hello';

        const parent = mount(<TestParent testValue={testValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(0);
    });

    it('should update the input element value prop', () => {

        const initialValue = 'something';

        const testValue = 'something else';

        const parent = mount(<TestParent testValue={initialValue} />);

        expect(parent.find('input').props().value).to.equal(initialValue);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('input').props().value).to.equal(testValue);
    });

});

/* *****************************************************************************
when the parent component sends new value prop, a required TextInput component
    should call the onValidation handler when value=valid
    should call the onValidation handler when value=blank
    should call the onChange handler when value=valid
    should call the onChange handler when value=blank
    should not show the validation message when value=valid
    should show the validation message when value=blank
    should not call the onValidation handler when value has not changed
    should not call the onChange handler when value has not changed

    should show the validation message when value=blank after prior editing
*/
describe('when the parent component sends new value prop, the TextInput component', () => {

    const required = true;
    const description = 'nonsense';
    const expectedMessage = `${description} is required`;

    class TestParent2 extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                testValue: props.testValue || '',
            };
        }

        render() {
            return (<TextInput
                ref="testComponent"
                required={required}
                description={description}
                value={this.state.testValue}
                onValidation={this.props.onValidation}
                onChange={this.props.onChange}
            />);
        }
    }

    TestParent2.propTypes = {
        testValue:    React.PropTypes.string,
        onChange:     React.PropTypes.func,
        onValidation: React.PropTypes.func,
    };

    it('should call the onValidation handler when value=valid', () => {

        const onValidation = sinon.spy();

        const testValue = 'hello';

        const parent = mount(<TestParent2 onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onValidation.callCount).to.equal(2);

        expect(onValidation.args[1][0]).to.equal(false, 'args[1][0]');
        expect(onValidation.args[1][1]).to.equal(true, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(null, 'args[1][2]');
    });

    it('should call the onValidation handler when value=blank', () => {

        const onValidation = sinon.spy();

        const initialValue = 'something';

        const testValue = '';

        const parent = mount(<TestParent2 testValue={initialValue} onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onValidation.callCount).to.equal(2);

        expect(onValidation.args[1][0]).to.equal(false, 'args[1][0]');
        expect(onValidation.args[1][1]).to.equal(false, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(expectedMessage, 'args[1][2]');
    });

    it('should call the onChange handler when value=valid', () => {

        const onChange = sinon.spy();

        const testValue = 'hello';

        const parent = mount(<TestParent2 onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });

    it('should call the onChange handler when value=blank', () => {

        const onChange = sinon.spy();

        const initialValue = '1234';
        const testValue = '';

        const parent = mount(<TestParent2 testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });

    it('should not show the validation message when value=valid', () => {

        const testValue = 'hello';

        const parent = mount(<TestParent2 />);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('span.help-block').length).to.equal(0);
    });

    it('should show the validation message when value=blank', () => {

        const initialValue = 'something';

        const testValue = '';

        const parent = mount(<TestParent2 testValue={initialValue} />);

        // send a change event to ensure hasValidated is set
        //
        parent.find('input').simulate('blur', {
            target: { value: initialValue }
        });

        expect(parent.find('span.help-block').length).to.equal(0, 'before props');

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('span.help-block').length).to.equal(1, 'after len');
        expect(parent.find('span.help-block').text()).to.equal(expectedMessage, 'after msg');
    });

    it('should not call the onValidation handler when value has not changed', () => {

        const onValidation = sinon.spy();

        const testValue = 'hello';

        const parent = mount(<TestParent2 testValue={testValue} onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onValidation.callCount).to.equal(1);
    });

    it('should not call the onChange handler when value has not changed', () => {

        const onChange = sinon.spy();

        const testValue = 'hello';

        const parent = mount(<TestParent2 testValue={testValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(0);
    });

    it('should show the validation message when value=blank after prior editing', () => {

        const initialValue = 'something';

        const testValue = '';

        const parent = mount(<TestParent2 testValue={initialValue} />);

        // edit the value
        //
        parent.find('input').simulate('change', {
            target: { value: testValue }
        });

        expect(parent.find('span.help-block').length).to.equal(0, 'len after change');

        // blur
        //
        parent.find('input').simulate('blur', {
            target: { value: testValue }
        });

        expect(parent.find('span.help-block').length).to.equal(1, 'len after blur');

        // change the state of the parent, which will pass new props to the
        // component
        //
        parent.setState({ testValue });

        expect(parent.find('span.help-block').length).to.equal(1, 'len after new props');
        expect(parent.find('span.help-block').text()).to.equal(expectedMessage, 'msg after new props');
    });

});

/* *****************************************************************************
after the user edits & blurs the input element, the TextInput component
    should not show the validation message when required=true and the value is valid
    should not show the validation message when required=false and the value is blank
    should show the validation message when required=true and the value is blank
    should show the custom validation message when validationMessage is set,
        required=true and the value is blank
*/
describe('after the user edits & blurs the input element, the TextInput component', () => {

    const description = 'something useless';

    const expectedMessage = `${description} is required`;

    it('should not show the validation message when required=true and the value is valid', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'anchovies';
        const newValue = 'pineapple';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

    it('should not show the validation message when required=false and the value is blank', () => {

        const onValidation = sinon.spy();

        const required = false;
        const initialValue = 'anchovies';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

    it('should show the validation message when required=true and the value is blank', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'anchovies';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(1, 'has-error');
        expect(component.find('span.help-block').length).to.equal(1, 'help-block');
        expect(component.find('span.help-block').text()).to.equal(expectedMessage, 'help-block');
    });

    it('should show the custom validation message when validationMessage is ' +
        'set, required=true and the value is blank', () => {

        const onValidation = sinon.spy();

        const customMessage = 'Something is not right...';
        const required = true;
        const initialValue = 'anchovies';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            validationMessage={customMessage}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(1, 'has-error');
        expect(component.find('span.help-block').length).to.equal(1, 'help-block');
        expect(component.find('span.help-block').text()).to.equal(customMessage, 'help-block');
    });

});

/* *****************************************************************************
after the user edits the value, the TextInput component
    should not show the validation message when required=true and the value is valid
    should not show the validation message when required=false and the value is blank
    should not show the validation message when required=true and the value is blank
    should update the value of the input element
*/
describe('after the user edits the value, the TextInput component', () => {

    const description = 'wibbly-wobbly';

    it('should not show the validation message when required=true and the value is valid', () => {
        const required = true;
        const value = 'woooo!';

        const newValue = 'hoo!';

        const component = mount(<TextInput
            required={required}
            description={description}
            value={value}
        />);

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

    });

    it('should not show the validation message when required=false and the value is blank', () => {
        const required = false;
        const value = 'woooo!';

        const newValue = '';

        const component = mount(<TextInput
            required={required}
            description={description}
            value={value}
        />);

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

    });

    it('should not show the validation message when required=true and the value is blank', () => {
        const required = true;
        const value = 'woooo!';

        const newValue = '';

        const component = mount(<TextInput
            required={required}
            description={description}
            value={value}
        />);

        expect(component.find('div.form-group').length).to.equal(1, 'before form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'before has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'before help-block');

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');

    });

    it('should update the value of the input element', () => {
        const required = true;
        const value = 'woooo!';

        const newValue = 'something else';

        const component = mount(<TextInput
            required={required}
            description={description}
            value={value}
        />);

        expect(component.find('input').props().value).to.equal(value, 'before');

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('input').props().value).to.equal(newValue, 'after');

    });

});

/* *****************************************************************************
when it is initialized, the TextInput component
    should not show the validation message when required=true and the value is valid
    should not show the validation message when required=true and the value is blank
    should not show the validation message when required=false and the value is blank
*/
describe('when it is initialized, the TextInput component', () => {

    it('should not show the validation message when required=true and the value is valid', () => {
        const required = true;
        const value = 'woooo!';

        const component = shallow(<TextInput required={required} value={value} />);

        expect(component.is('div.form-group')).to.equal(true, 'form-group');
        expect(component.is('div.form-group.has-error')).to.equal(false, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

    it('should not show the validation message when required=true and the value is blank', () => {
        const required = true;
        const value = '';

        const component = shallow(<TextInput required={required} value={value} />);

        expect(component.is('div.form-group')).to.equal(true, 'form-group');
        expect(component.is('div.form-group.has-error')).to.equal(false, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

    it('should not show the validation message when required=false and the value is blank', () => {
        const required = false;
        const value = '';

        const component = shallow(<TextInput required={required} value={value} />);

        expect(component.is('div.form-group')).to.equal(true, 'form-group');
        expect(component.is('div.form-group.has-error')).to.equal(false, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

});

/* *****************************************************************************
after blur, the TextInput component
    should call onValidation with the correct values when required=true and the new value is valid
    should call onValidation with the correct values when required=true and the new value is blank
    should call onValidation with the correct values when required=false and the new value is blank
    should have the correct validation state when required=true and the new value is valid
    should have the correct validation state when required=true and the new value is blank
    should have the correct validation state when required=false and the new value is blank
    should call onValidation with the correct values for subsequent edits when
        required=true and the new value is valid
    should call onValidation with the correct values for subsequent edits when
        required=true and the new value is blank
    should call onValidation with the correct values for subsequent edits when
        required=false and the new value is blank
    should have the correct validation state after subsequent edits when
        required=true and the new value is valid
    should have the correct validation state after subsequent edits when
        required=true and the new value is blank
    should have the correct validation state after subsequent edits when
        required=false and the new value is blank
*/
describe('after blur, the TextInput component', () => {

    const description = 'holy #&$@!';

    const expectedMessage = `${description} is required`;

    it('should call onValidation with the correct values when required=true ' +
        'and the new value is valid', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'anchovies';
        const newValue = 'pineapple';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(1, 'callcount after change');

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2, 'callcount after blur');
        expect(onValidation.calledWith(true, true, null)).to.equal(true, 'called with');
    });

    it('should call onValidation with the correct values when required=true ' +
        'and the new value is blank', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'mustard';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(1, 'callcount after change');

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2, 'callcount after blur');

        const secondCall = onValidation.getCall(1);

        expect(secondCall.args[0]).to.equal(true, 'secondCall.args[0]');
        expect(secondCall.args[1]).to.equal(false, 'secondCall.args[1]');
        expect(secondCall.args[2]).to.equal(expectedMessage, 'secondCall.args[2]');
    });

    it('should call onValidation with the correct values when required=false ' +
        'and the new value is blank', () => {

        const onValidation = sinon.spy();

        const required = false;
        const initialValue = 'mustard';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(1, 'callcount after change');

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2, 'callcount after blur');

        const secondCall = onValidation.getCall(1);

        expect(secondCall.args[0]).to.equal(true, 'secondCall.args[0]');
        expect(secondCall.args[1]).to.equal(true, 'secondCall.args[1]');
        expect(secondCall.args[2]).to.equal(null, 'secondCall.args[2]');
    });

    it('should have the correct validation state when required=true and the ' +
        'new value is valid', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'mustard';
        const newValue = 'ketchup';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.state().hasValidated).to.equal(true);
        expect(component.state().isValid).to.equal(true);
        expect(component.state().validationMessage).to.equal(null);


    });

    it('should have the correct validation state when required=true and ' +
        'the new value is blank', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'mustard';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.state().hasValidated).to.equal(true);
        expect(component.state().isValid).to.equal(false);
        expect(component.state().validationMessage).to.equal(expectedMessage);


    });

    it('should have the correct validation state when required=false and ' +
        'the new value is blank', () => {

        const onValidation = sinon.spy();

        const required = false;
        const initialValue = 'mustard';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.state().hasValidated).to.equal(true);
        expect(component.state().isValid).to.equal(true);
        expect(component.state().validationMessage).to.equal(null);


    });

    it('should call onValidation with the correct values for subsequent ' +
        'edits when required=true and the new value is valid', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'mustard';
        const intermediateValue = 'ketchup';
        const newValue = 'relish';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: intermediateValue }
        });

        expect(onValidation.callCount).to.equal(1, 'callcount after change');

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2, 'callcount after blur');

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(3, 'callcount after second edit');

        const thirdCall = onValidation.getCall(2);

        expect(thirdCall.args[0]).to.equal(true, 'thirdCall.args[0]');
        expect(thirdCall.args[1]).to.equal(true, 'thirdCall.args[1]');
        expect(thirdCall.args[2]).to.equal(null, 'thirdCall.args[2]');
    });

    it('should call onValidation with the correct values for subsequent ' +
        'edits when required=true and the new value is blank', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'mustard';
        const intermediateValue = 'ketchup';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: intermediateValue }
        });

        expect(onValidation.callCount).to.equal(1, 'callcount after change');

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2, 'callcount after blur');

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(3, 'callcount after second edit');

        const thirdCall = onValidation.getCall(2);

        expect(thirdCall.args[0]).to.equal(true, 'thirdCall.args[0]');
        expect(thirdCall.args[1]).to.equal(false, 'thirdCall.args[1]');
        expect(thirdCall.args[2]).to.equal(expectedMessage, 'thirdCall.args[2]');
    });

    it('should call onValidation with the correct values for subsequent ' +
        'edits when required=false and the new value is blank', () => {

        const onValidation = sinon.spy();

        const required = false;
        const initialValue = 'mustard';
        const intermediateValue = 'ketchup';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: intermediateValue }
        });

        expect(onValidation.callCount).to.equal(1, 'callcount after change');

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2, 'callcount after blur');

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(3, 'callcount after second edit');

        const thirdCall = onValidation.getCall(2);

        expect(thirdCall.args[0]).to.equal(true, 'thirdCall.args[0]');
        expect(thirdCall.args[1]).to.equal(true, 'thirdCall.args[1]');
        expect(thirdCall.args[2]).to.equal(null, 'thirdCall.args[2]');
    });

    it('should have the correct validation state after subsequent edits ' +
        'when required=true and the new value is valid', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'mustard';
        const intermediateValue = 'ketchup';
        const newValue = 'relish';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: intermediateValue }
        });

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.state().hasValidated).to.equal(true);
        expect(component.state().isValid).to.equal(true);
        expect(component.state().validationMessage).to.equal(null);
    });

    it('should have the correct validation state after subsequent edits ' +
        'when required=true and the new value is blank', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'mustard';
        const intermediateValue = 'ketchup';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: intermediateValue }
        });

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.state().hasValidated).to.equal(true);
        expect(component.state().isValid).to.equal(false);
        expect(component.state().validationMessage).to.equal(expectedMessage);
    });

    it('should have the correct validation state after subsequent edits ' +
        'when required=false and the new value is blank', () => {

        const onValidation = sinon.spy();

        const required = false;
        const initialValue = 'mustard';
        const intermediateValue = 'ketchup';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: intermediateValue }
        });

        // blur the component
        //
        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        // edit the component
        //
        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.state().hasValidated).to.equal(true);
        expect(component.state().isValid).to.equal(true);
        expect(component.state().validationMessage).to.equal(null);
    });

});

/* *****************************************************************************
on editing, the TextInput component
    should call onChange with the new value
    should have the new value in the component state
    should not call onValidation when required=true and the new value is valid
    should not call onValidation when required=true and the new value is blank
    should not call onValidation when required=false and the new value is blank
    should have updated validation state when required=true and the new value is blank
    should have updated validation state when required=true and the new value is valid
    should have updated validation state when required=false and the new value is blank
*/
describe('on editing, the TextInput component', () => {
    const description = 'wtf?';

    const expectedMessage = `${description} is required`;

    it('should call onChange with the new value', () => {

        const onChange = sinon.spy();

        const initialValue = 'anchovies';
        const newValue = 'pineapple';

        const component = mount(<TextInput value={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0, 'initial call count');

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1, ' after call count');
        expect(onChange.calledWith(newValue)).to.equal(true, 'called with');
    });

    it('should have the new value in the component state', () => {
        const initialValue = 'anchovies';
        const newValue = 'pineapple';

        const component = mount(<TextInput value={initialValue} />);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.state().value).to.equal(newValue);
    });

    it('should not call onValidation when required=true and the new value is valid', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'anchovies';
        const newValue = 'pineapple';

        const component = mount(<TextInput
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(1, 'callcount after');
    });

    it('should not call onValidation when required=true and the new value is blank', () => {

        const onValidation = sinon.spy();

        const required = true;
        const initialValue = 'anchovies';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(1, 'callcount after');
    });

    it('should not call onValidation when required=false and the new value is blank', () => {

        const onValidation = sinon.spy();

        const required = false;
        const initialValue = 'anchovies';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(1, 'callcount after');
    });

    it('should have updated validation state when required=true and the new ' +
        'value is valid', () => {

        const required = true;
        const initialValue = 'anchovies';
        const newValue = 'pineapple';

        const component = mount(<TextInput required={required} value={initialValue} />);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.state().hasValidated).to.equal(false, 'hasValidated');
        expect(component.state().isValid).to.equal(true, 'isValid');
        expect(component.state().validationMessage).to.equal(null, 'validationMessage');
    });

    it('should have updated validation state when required=true and the new ' +
        'value is blank', () => {

        const required = true;
        const initialValue = 'anchovies';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
        />);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.state().hasValidated).to.equal(false, 'hasValidated');
        expect(component.state().isValid).to.equal(false, 'isValid');
        expect(component.state().validationMessage).to.equal(expectedMessage, 'validationMessage');
    });

    it('should have updated validation state when required=false and the new ' +
        'value is blank', () => {
        const required = false;
        const initialValue = 'anchovies';
        const newValue = '';

        const component = mount(<TextInput
            description={description}
            required={required}
            value={initialValue}
        />);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.state().hasValidated).to.equal(false, 'hasValidated');
        expect(component.state().isValid).to.equal(true, 'isValid');
        expect(component.state().validationMessage).to.equal(null, 'validationMessage');
    });
});

/* *****************************************************************************
on initialization, the TextInput component
    should not call onChange
    should call onValidation with the correct arguments when required=true and value is valid
    should call onValidation with the correct arguments when required=true and value is blank
    should call onValidation with the correct arguments when required=false and value is blank
*/
describe('on initialization, the TextInput component', () => {

    const description = 'description';

    it('should not call onChange', () => {

        const onChange = sinon.spy();

        const value = 'anchovies';

        mount(<TextInput value={value} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);
    });

    it('should call onValidation with the correct arguments when ' +
        'required=true and value is valid', () => {

        const onValidation = sinon.spy();

        const required = true;
        const value = 'anchovies';

        mount(<TextInput required={required} value={value} onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);
        expect(onValidation.calledWith(false, true, null)).to.equal(true);
    });

    it('should call onValidation with the correct arguments when ' +
        'required=true and value is blank', () => {

        const onValidation = sinon.spy();

        const required = true;
        const value = '';

        const expectedMessage = `${description} is required`;

        mount(<TextInput
            required={required}
            description={description}
            value={value}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);
        expect(onValidation.calledWith(false, false, expectedMessage))
            .to.equal(true, 'calledWith');
    });

    it('should call onValidation with the correct arguments when ' +
        'required=false and value is blank', () => {

        const onValidation = sinon.spy();

        const required = false;
        const value = '';

        mount(<TextInput
            required={required}
            description={description}
            value={value}
            onValidation={onValidation}
        />);

        expect(onValidation.callCount).to.equal(1);
        expect(onValidation.calledWith(false, true, null)).to.equal(true, 'calledWith');
    });

});

/* *****************************************************************************
the state of the TextInput component
    should be initialized with the correct value
    should have the correct hasValidated state
    should have the correct isValid state when the value is required and it's blank
    should have the correct isValid state when the value is required and it's not blank
    should have the correct isValid state when the value is not required and it is blank
    should have the correct validationMessage state when the value is required and it's blank
    should have the correct validationMessage state when the value is required
        and it's not blank
    should have the correct validationMessage state when the value is not
        required and it is blank
*/
describe('the state of the TextInput component', () => {

    const description = 'Some value';

    it('should be initialized with the correct value', () => {
        const values = [
            { value: '', expected: '' },
            { value: null, expected: '' },
            { value: undefined, expected: '' },
            { value: 'aaa', expected: 'aaa' },
            { value: 42, expected: '42' },
        ];

        let component;

        values.forEach((val) => {
            component = shallow(<TextInput value={val.value} />);

            expect(component.state().value).to.equal(val.expected);
        });
    });

    it('should have the correct hasValidated state', () => {
        const value = 'anchovies';

        const component = shallow(<TextInput value={value} />);

        expect(component.state().hasValidated).to.equal(false);
    });

    it('should have the correct isValid state when the value is required and ' +
        'it is blank', () => {

        const required = true;
        const value = '';

        const component = shallow(<TextInput required={required} value={value} />);

        expect(component.state().isValid).to.equal(false);
    });

    it('should have the correct isValid state when the value is required and ' +
        'it is not blank', () => {

        const required = true;
        const value = 'pizza';

        const component = shallow(<TextInput required={required} value={value} />);

        expect(component.state().isValid).to.equal(true);
    });

    it('should have the correct isValid state when the value is not required ' +
        'and it is blank', () => {

        const required = false;
        const value = '';

        const component = shallow(<TextInput required={required} value={value} />);

        expect(component.state().isValid).to.equal(true);
    });

    it('should have the correct validationMessage state when the value is ' +
        'required and it is blank', () => {

        const required = true;
        const value = '';
        const expectedMessage = `${description} is required`;

        const component = shallow(<TextInput
            required={required}
            description={description}
            value={value}
        />);

        expect(component.state().validationMessage).to.equal(expectedMessage);
    });

    it('should have the correct validationMessage state when the value is ' +
        'required and it is not blank', () => {

        const required = true;
        const value = 'this is valid';

        const component = shallow(<TextInput
            required={required}
            description={description}
            value={value}
        />);

        expect(component.state().validationMessage).to.equal(null);
    });

    it('should have the correct validationMessage state when the value is ' +
        'not required and it is blank', () => {

        const required = false;
        const value = '';

        const component = shallow(<TextInput
            required={required}
            description={description}
            value={value}
        />);

        expect(component.state().validationMessage).to.equal(null);
    });
});

/* *****************************************************************************
in terms of basic markup, the TextInput component
    should be a div.form-group
    should include an input[type="text"]
    should include an input.form-control
    should include a label with the appropriate text if a label is specified
    should include a placeholder if a placeholder is specified
    should have the correct label widths when labelColumns is set
    should have the correct select widths when inputColumns is set
    should include a label with the the required flag if a label is specified & required is set
    should not include a label with the the required flag if a label is
        specified & required is not set
    should not include a label with the the required flag if a label is not
        specified & required is set
*/
describe('in terms of basic markup, the TextInput component', () => {

    const label = 'something something';
    const placeholder = 'blah-de-blah';

    it('should be a div.form-group', () => {
        const component = shallow(<TextInput />);

        expect(component.is('div.form-group')).to.equal(true);
    });

    it('should include an input[type="text"]', () => {
        const component = render(<TextInput />);

        expect(component.find('div.form-group input').length).to.equal(1);
        expect(component.find('div.form-group input[type="text"]').length).to.equal(1);
    });

    it('should include an input.form-control', () => {
        const component = render(<TextInput />);

        expect(component.find('div.form-group input').length).to.equal(1);
        expect(component.find('div.form-group input.form-control').length).to.equal(1);
    });

    it('should include a label with the appropriate text if a label is specified', () => {
        const component = render(<TextInput label={label} />);

        expect(component.find('div.form-group label').length).to.equal(1);
        expect(component.find('div.form-group label').text()).to.equal(label);
    });

    it('should include a placeholder if a placeholder is specified', () => {
        const component = render(<TextInput placeholder={placeholder} />);

        expect(component.find('div.form-group input').prop('placeholder')).to.equal(placeholder);
    });

    it('should have the correct label widths when labelColumns is set', () => {
        const columns = { xs: 10, md: 8 };
        const expectedClass = 'col-xs-10 col-md-8';

        const component = shallow(<TextInput label={label} labelColumns={columns} />);

        expect(component.find('Label').props().className).to.equal(expectedClass);
    });

    it('should have the correct select widths when inputColumns is set', () => {
        const columns = { xs: 10, md: 8 };
        const expectedClass = '.col-xs-10.col-md-8';

        const component = shallow(<TextInput label={label} inputColumns={columns} />);

        expect(component.find(`div${expectedClass} input`).length).to.equal(1);
    });

    it('should include a label with the the required flag if a label is ' +
        'specified & required is set', () => {
        const required = true;

        const component = shallow(<TextInput required={required} label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().required).to.equal(required);
    });

    it('should not include a label with the required flag if a label is ' +
        'specified & required is not set', () => {
        const required = false;

        const component = shallow(<TextInput required={required} label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().required).to.equal(required);
    });

    it('should not include a label with the the required flag if a label is ' +
        'not specified & required is set', () => {
        const required = true;

        const component = shallow(<TextInput required={required} />);

        expect(component.find('Label').length).to.equal(0);
    });

});

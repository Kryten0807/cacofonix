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
after the user edits the value, the TextInput component
    should not show the validation message when required=true and the value is valid
    should not show the validation message when required=false and the value is blank
    should show the validation message when required=true and the value is blank
*/
describe('after the user edits the value, the TextInput component', () => {

    const description = 'wibbly-wobbly';
    const expectedMessage = `${description} is required`;

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

    it('should show the validation message when required=true and the value is blank', () => {
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

        expect(component.find('div.form-group.has-error').length).to.equal(1, 'after has-error');
        expect(component.find('span.help-block').length).to.equal(1, 'after help-block');
        expect(component.find('span.help-block').text()).to.equal(expectedMessage, 'after message');

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

// @TODO write these tests
/* *****************************************************************************
after blur, the TextInput component
    should call onValidation with the correct values when required=true and the new value is valid
    should call onValidation with the correct values when required=true and the new value is blank
    should call onValidation with the correct values when required=false and the new value is blank
    should call onValidation with the correct values for subsequent edits when required=true and the new value is valid
    should call onValidation with the correct values for subsequent edits when required=true and the new value is blank
    should call onValidation with the correct values for subsequent edits when required=false and the new value is blank
*/

/* *****************************************************************************
on editing, the TextInput component
    should call onChange with the new value
    should have the new value in the component state

    should not call onValidation when required=true and the new value is valid
    should not call onValidation when required=true and the new value is blank
    should not call onValidation when required=false and the new value is blank
*/

// @TODO remove these three tests
/*
    should call onValidation with the correct arguments when required=true and
        the new value is valid
    should call onValidation with the correct arguments when required=true and
        the new value is blank
    should call onValidation with the correct arguments when required=false and
        the new value is blank
*/

// @TODO revise these three tests
/*
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

    it('should call onValidation with the correct arguments when ' +
        'required=true and the new value is valid', () => {

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

        expect(onValidation.callCount).to.equal(2, 'callcount after');

        expect(onValidation.secondCall.args[0]).to.equal(true, 'hasValidated');
        expect(onValidation.secondCall.args[1]).to.equal(true, 'isValid');
        expect(onValidation.secondCall.args[2]).to.equal(null, 'validationMessage');
    });

    it('should call onValidation with the correct arguments when ' +
        'required=true and the new value is blank', () => {

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

        expect(onValidation.callCount).to.equal(2, 'callcount after');

        expect(onValidation.secondCall.args[0]).to.equal(true, 'hasValidated');
        expect(onValidation.secondCall.args[1]).to.equal(false, 'isValid');
        expect(onValidation.secondCall.args[2]).to.equal(expectedMessage, 'validationMessage');
    });

    it('should call onValidation with the correct arguments when ' +
        'required=false and the new value is blank', () => {

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

        expect(onValidation.callCount).to.equal(2, 'callcount after');

        expect(onValidation.secondCall.args[0]).to.equal(true, 'hasValidated');
        expect(onValidation.secondCall.args[1]).to.equal(true, 'isValid');
        expect(onValidation.secondCall.args[2]).to.equal(null, 'validationMessage');
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

        expect(component.state().hasValidated).to.equal(true, 'hasValidated');
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

        expect(component.state().hasValidated).to.equal(true, 'hasValidated');
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

        expect(component.state().hasValidated).to.equal(true, 'hasValidated');
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

});

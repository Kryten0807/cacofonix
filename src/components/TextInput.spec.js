// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render } from 'enzyme';
import chai from 'chai';
import TextInput from './TextInput';

const expect = chai.expect;

/* *****************************************************************************
the state of the TextInput component
    should be initialized with the correct value
    should have the correct hasValidated state
    should have the correct isValid state when the value is required and it's blank
    should have the correct isValid state when the value is required and it's not blank
    should have the correct isValid state when the value is not required and it is blank
    should have the correct validationMessage state when the value is required and it's blank
    should have the correct validationMessage state when the value is required and it's not blank
    should have the correct validationMessage state when the value is not required and it is blank
*/
describe('the state of the TextInput component', () => {

    const label = 'a label';
    const placeholder = 'a placeholder';
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
            component = shallow(<TextInput value={val.value}/>);

            expect(component.state().value).to.equal(val.expected);
        });
    });

    it('should have the correct hasValidated state', () => {
        const value = 'anchovies';

        const component = shallow(<TextInput value={value}/>);

        expect(component.state().hasValidated).to.equal(false);
    });

    it('should have the correct isValid state when the value is required and it is blank', () => {
        const required = true;
        const value = '';

        const component = shallow(<TextInput required={required} value={value}/>);

        expect(component.state().isValid).to.equal(false);
    });

    it('should have the correct isValid state when the value is required and it is not blank', () => {
        const required = true;
        const value = 'pizza';

        const component = shallow(<TextInput required={required} value={value}/>);

        expect(component.state().isValid).to.equal(true);
    });

    it('should have the correct isValid state when the value is not required and it is blank', () => {
        const required = false;
        const value = '';

        const component = shallow(<TextInput required={required} value={value}/>);

        expect(component.state().isValid).to.equal(true);
    });

    it('should have the correct validationMessage state when the value is required and it is blank', () => {
        const required = true;
        const value = '';
        const expectedMessage = `${description} is required`;

        const component = shallow(<TextInput required={required} description={description} value={value}/>);

        expect(component.state().validationMessage).to.equal(expectedMessage);
    });

    it('should have the correct validationMessage state when the value is required and it is not blank', () => {
        const required = true;
        const value = 'this is valid';

        const component = shallow(<TextInput required={required} description={description} value={value}/>);

        expect(component.state().validationMessage).to.equal(null);
    });

    it('should have the correct validationMessage state when the value is not required and it is blank', () => {
        const required = false;
        const value = '';

        const component = shallow(<TextInput required={required} description={description} value={value}/>);

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

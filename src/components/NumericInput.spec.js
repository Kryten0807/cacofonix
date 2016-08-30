// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import NumericInput from './NumericInput';

const expect = chai.expect;

// Tests to write:
// new props
// validation message

/* *****************************************************************************
on blur, the NumericInput component
    should format a numeric value as a plain number, if isCurrency=false and decimals=null
    should format a numeric value as a number with n decimal places, if isCurrency=false and decimals=n
    should format a numeric values as a $#.## if isCurrency=true
    should leave a blank value as-is
*/
describe('on blur, the NumericInput component', () => {

    it('should format a numeric value as a plain number, if isCurrency=false and decimals=null', () => {
        const isCurrency = false;
        const decimals = null;
        const value = 123.45678;

        const expectedValue = `${value}`;

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(expectedValue);

        component.find('input').simulate('focus', {
            target: { value: expectedValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);

        component.find('input').simulate('blur', {
            target: { value: expectedValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);

    });

    it('should format a numeric value as a number with n decimal places, if isCurrency=false and decimals=n', () => {
        const isCurrency = false;
        const decimals = 1;
        const value = 123.45678;

        const expectedValue = '123.5';

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(expectedValue, 'check 1');

        component.find('input').simulate('focus', {
            target: { value }
        });

        component.find('input').simulate('change', {
            target: { value }
        });

        expect(component.find('input').props().value).to.equal(`${value}`, 'check 2');

        component.find('input').simulate('blur', {
            target: { value: value }
        });

        expect(component.find('input').props().value).to.equal(expectedValue, 'check 3');

    });

    it('should format a numeric values as a $#.## if isCurrency=true', () => {
        const isCurrency = true;
        const decimals = null;
        const value = 123.45678;

        const expectedValue = '$ 123.46';

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(expectedValue, 'check 1');

        component.find('input').simulate('focus', {
            target: { value }
        });

        component.find('input').simulate('change', {
            target: { value }
        });

        expect(component.find('input').props().value).to.equal(`${value}`, 'check 2');

        component.find('input').simulate('blur', {
            target: { value: value }
        });

        expect(component.find('input').props().value).to.equal(expectedValue, 'check 3');

    });

    it('should leave a blank value as-is', () => {
        const isCurrency = true;
        const decimals = null;
        const value = '';

        const expectedValue = value;

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(expectedValue, 'check 1');

        component.find('input').simulate('focus', {
            target: { value }
        });

        component.find('input').simulate('change', {
            target: { value }
        });

        expect(component.find('input').props().value).to.equal(`${value}`, 'check 2');

        component.find('input').simulate('blur', {
            target: { value: value }
        });

        expect(component.find('input').props().value).to.equal(expectedValue, 'check 3');

    });

});

/* *****************************************************************************
on focus, the input element value
    should contain a currency value ("$ #.##") formatted as a plain number
    should contain a fixed decimal value formatted as a plain number
    should contain a blank if the value is a blank
*/
describe('on focus, the input element value', () => {

    it('should contain a currency value ("$ #.##") formatted as a plain number', () => {
        const isCurrency = true;
        const decimals = null;
        const value = 123.45678;

        const expectedValue = '$ 123.46';

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(expectedValue);

        component.find('input').simulate('focus', {
            target: { value: expectedValue }
        });

        expect(component.find('input').props().value).to.equal('123.46');

    });

    it('should contain a fixed decimal value formatted as a plain number', () => {
        const isCurrency = false;
        const decimals = 4;
        const value = 123.45678;

        const expectedValue = '123.4568';

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(expectedValue);

        component.find('input').simulate('focus', {
            target: { value: expectedValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);

    });

    it('should contain a blank if the value is a blank', () => {
        const isCurrency = false;
        const decimals = 4;
        const value = '';

        const expectedValue = '';

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(value);

        component.find('input').simulate('focus', {
            target: { value }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);

    });

});


/* *****************************************************************************
when the value is initialized, the NumericInput component
    should format a numeric value as a plain number, if isCurrency=false and decimals=null
    should format a numeric value as a number with n decimal places, if isCurrency=false and decimals=n
    should format a numeric values as a $#.## if isCurrency=true
    should leave a blank value as-is
*/
describe('when the value is initialized, the NumericInput component', () => {

    it('should format a numeric value as a plain number, if isCurrency=false and decimals=null', () => {
        const isCurrency = false;
        const decimals = null;
        const value = 123.45678;

        const expectedValue = `${value}`;

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(expectedValue);

    });

    it('should format a numeric value as a number with n decimal places, if isCurrency=false and decimals=n', () => {
        const isCurrency = false;
        const decimals = 3;
        const value = 123.45678;

        const expectedValue = '123.457';

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(expectedValue);

    });

    it('should format a numeric values as a $#.## if isCurrency=true', () => {
        const isCurrency = true;
        const decimals = 3;
        const value = 123.45678;

        const expectedValue = '$ 123.46';

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(expectedValue);

    });

    it('should leave a blank value as-is', () => {
        const isCurrency = true;
        const decimals = 3;
        const value = '';

        const expectedValue = '';

        const component = shallow(
            <NumericInput
                isCurrency={isCurrency}
                decimals={decimals}
                value={value}
            />
        );

        expect(component.find('input').props().value).to.equal(expectedValue);

    });

});

/* *****************************************************************************
the onChange handler for the NumericInput component
    should not be called on initialization
    should be called on edit when the value has changed
    should not be called on edit when the value has not changed
    should be called on blur when the value has changed
    should not be called on blur when the value has not changed
*/
describe('the onChange handler for the NumericInput component', () => {

    it('should not be called on initialization', () => {
        const onChange = sinon.spy();

        const required = true;
        const initialValue = 123.456;

        mount(
            <NumericInput
                required={required}
                value={initialValue}
                onChange={onChange}
            />
        );

        expect(onChange.callCount).to.equal(0);
    });

    it('should be called on edit when the value has changed', () => {
        const onChange = sinon.spy();

        const required = true;
        const initialValue = 123.456;
        const finalValue = '99.9999';

        const component = mount(
            <NumericInput
                required={required}
                value={initialValue}
                onChange={onChange}
            />
        );

        expect(onChange.callCount).to.equal(0);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(onChange.callCount).to.equal(1);
        expect(onChange.calledWith(finalValue)).to.equal(true);
    });

    it('should not be called on edit when the value has not changed', () => {
        const onChange = sinon.spy();

        const required = true;
        const initialValue = 123.456;
        const finalValue = initialValue;

        const component = mount(
            <NumericInput
                required={required}
                value={initialValue}
                onChange={onChange}
            />
        );

        expect(onChange.callCount).to.equal(0);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(onChange.callCount).to.equal(0);
    });

    it('should be called on blur when the value has changed', () => {
        const onChange = sinon.spy();

        const required = true;
        const initialValue = 123.456;
        const finalValue = '4213.21';

        const component = mount(
            <NumericInput
                required={required}
                value={initialValue}
                onChange={onChange}
            />
        );

        expect(onChange.callCount).to.equal(0);

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(onChange.callCount).to.equal(1);
        expect(onChange.calledWith(finalValue)).to.equal(true);
    });

    it('should not be called on blur when the value has not changed', () => {
        const onChange = sinon.spy();

        const required = true;
        const initialValue = 123.456;
        const finalValue = initialValue;

        const component = mount(
            <NumericInput
                required={required}
                value={initialValue}
                onChange={onChange}
            />
        );

        expect(onChange.callCount).to.equal(0);

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(onChange.callCount).to.equal(0);
    });
});

/* *****************************************************************************
the onValidation handler for the NumericInput component
    should be called on initialization with required=true, value=valid
    should be called on initialization with required=true, value=invalid
    should be called on initialization with required=true, value=blank
    should be called on initialization with required=false, value=valid
    should be called on initialization with required=false, value=invalid
    should be called on initialization with required=false, value=blank
    should not be called after change without prior blur event
    should be called on blur event
    should be called after change following a previous blur event
*/
describe('the onValidation handler for the NumericInput component', () => {

    const description = 'a numeric input';
    const expectedMessage = `${description} is required`;

    it('should be called on initialization with required=true, value=valid', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = 123.456;

        mount(
            <NumericInput
                required={required}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(true, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(null, 'args[0][2]');
    });

    it('should be called on initialization with required=true, value=invalid', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = 'this is not a number';

        mount(
            <NumericInput
                required={required}
                description={description}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(false, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(expectedMessage, 'args[0][2]');
    });

    it('should be called on initialization with required=true, value=blank', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '';

        mount(
            <NumericInput
                required={required}
                description={description}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(false, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(expectedMessage, 'args[0][2]');
    });

    it('should be called on initialization with required=false, value=valid', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '101.9';

        mount(
            <NumericInput
                required={required}
                description={description}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(true, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(null, 'args[0][2]');
    });

    it('should be called on initialization with required=false, value=invalid', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = 'woohoo!';

        mount(
            <NumericInput
                required={required}
                description={description}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(true, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(null, 'args[0][2]');
    });

    it('should be called on initialization with required=false, value=blank', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '';

        mount(
            <NumericInput
                required={required}
                description={description}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(true, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(null, 'args[0][2]');
    });

    it('should not be called after change without prior blur event', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '';
        const newValue = '33.3';

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(1);
    });

    it('should be called on blur event', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '';
        const newValue = '33.3';

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2);
        expect(onValidation.args[1][0]).to.equal(true, 'args[1][0]');
        expect(onValidation.args[1][1]).to.equal(true, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(null, 'args[1][2]');
    });

    it('should be called after change following a previous blur event', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '';
        const newValue = '33.3';
        const finalValue = '';

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(onValidation.callCount).to.equal(3);

        expect(onValidation.args[2][0]).to.equal(true, 'args[2][0]');
        expect(onValidation.args[2][1]).to.equal(false, 'args[2][1]');
        expect(onValidation.args[2][2]).to.equal(expectedMessage, 'args[2][2]');
    });

});

/* *****************************************************************************
in terms of basic markup, the NumericInput component
    should be a div.form-group
    should include an input[type="text"]
    should include an input.form-control
    should include a label with the appropriate text if a label is specified
    should include a placeholder if a placeholder is specified
    should include a label with the the required flag if a label is specified & required is set
    should not include a label with the the required flag if a label is
        specified & required is not set
    should not include a label with the the required flag if a label is not
        specified & required is set
*/
describe('in terms of basic markup, the NumericInput component', () => {

    it('should be a div.form-group', () => {
        const component = shallow(<NumericInput />);

        expect(component.is('div.form-group')).to.equal(true);
    });

    it('should include an input[type="text"]', () => {
        const component = shallow(<NumericInput />);

        expect(component.find('input').length).to.equal(1);
        expect(component.find('input[type="text"]').length).to.equal(1);
    });

    it('should include an input.form-control', () => {
        const component = shallow(<NumericInput />);

        expect(component.find('input').length).to.equal(1);
        expect(component.find('input.form-control').length).to.equal(1);
    });

    it('should include a label with the appropriate text if a label is specified', () => {
        const label = 'some label';

        const component = shallow(<NumericInput label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().label).to.equal(label);
    });

    it('should include a placeholder if a placeholder is specified', () => {
        const placeholder = 'a number goes here';

        const component = shallow(<NumericInput placeholder={placeholder} />);

        expect(component.find('input').length).to.equal(1);
        expect(component.find('input').props().placeholder).to.equal(placeholder);
    });

    it('should include a label with the the required flag if a label is ' +
        'specified & required is set', () => {
        const label = 'some label';
        const required = true;

        const component = shallow(<NumericInput required={required} label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().required).to.equal(required);
    });

    it('should not include a label with the the required flag if a label is ' +
        'specified & required is not set', () => {
        const label = 'some label';
        const required = false;

        const component = shallow(<NumericInput required={required} label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().required).to.equal(required);
    });

    it('should not include a label with the the required flag if a label is ' +
        'not specified & required is set', () => {
        const required = false;

        const component = shallow(<NumericInput required={required} />);

        expect(component.find('Label').length).to.equal(0);
    });
});

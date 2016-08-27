// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render, mount } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import Dropdown from './Dropdown';

const expect = chai.expect;

/*
Dropdown Behaviour

+ when the component is initialized
    + no validation error message is displayed (`hasValidated` = false,
        `isValid` = true or false, depending)
    + the onValidation handler is called with `hasValidated` = false,
        `isValid` = true or false, `validationMessage` = whatever

+ when the user selects an item from the Dropdown
    + `hasValidated` is set to true
    + the validation error message is display as necessary
    + the onValidation callback is called
    + the onChange callback is called

+ when the user tabs or clicks out of the control
    + `hasValidated` is set to true
    + the validation error message is display as necessary
    + the onValidation callback is called
    + the onChange callback is called
*/

/*
the onValidation handler for the component
    should be called when the component is first initialized with `required`=true, `value`=null
    should be called when the component is first initialized with `required`=false, `value`=null
    should be called when the component is first initialized with `required`=true, `value`=valid
    should be called when the component is first initialized with `required`=false, `value`=valid

    should be called when the component is first initialized with `required`=true, `value`=not valid
    should be called when the component is first initialized with `required`=false, `value`=not valid

    should be called when `required`=true and the component value is changed to the `null` option`
    should be called when `required`=true and the component value is changed to a valid option`
    should be called when `required`=false and the component value is changed to the `null` option`
    should be called when `required`=false and the component value is changed to a valid option`
    should be called when `required`=true, `value`=null and the user tabs away from the component
    should be called when `required`=true, `value`=valid option and the user tabs away from the component
    should be called when `required`=false, `value`=null and the user tabs away from the component
    should be called when `required`=false, `value`=valid option and the user tabs away from the component
*/
describe('the onValidation handler for the component', () => {

    const description = 'this silly thing';

    const options = [
        { value: '1', name: 'one' },
        { value: '2', name: 'two' },
    ];

    const expectedMessage = `${description} is required`;

    it('should be called when the component is first initialized with `required`=true, `value`=null', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = null;

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        const call = onValidation.getCall(0);
        expect(call.args[0]).to.equal(false, 'arg 0');
        expect(call.args[1]).to.equal(false, 'arg 1');
        expect(call.args[2]).to.equal(expectedMessage, 'arg 2');
    });

    it('should be called when the component is first initialized with `required`=false, `value`=null', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = null;

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        const call = onValidation.getCall(0);
        expect(call.args[0]).to.equal(false, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when the component is first initialized with `required`=true, `value`=valid', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '1';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        const call = onValidation.getCall(0);
        expect(call.args[0]).to.equal(false, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when the component is first initialized with `required`=false, `value`=valid', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '2';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        const call = onValidation.getCall(0);
        expect(call.args[0]).to.equal(false, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when the component is first initialized with `required`=true, `value`=not valid', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = 'not an option value';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        const call = onValidation.getCall(0);
        expect(call.args[0]).to.equal(false, 'arg 0');
        expect(call.args[1]).to.equal(false, 'arg 1');
        expect(call.args[2]).to.equal(expectedMessage, 'arg 2');
    });

    it('should be called when the component is first initialized with `required`=false, `value`=not valid', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = 'STILL not an option value';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        const call = onValidation.getCall(0);
        expect(call.args[0]).to.equal(false, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when `required`=true and the component value is changed to the `null` option`', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '1';
        const newValue = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(false, 'arg 1');
        expect(call.args[2]).to.equal(expectedMessage, 'arg 2');
    });

    it('should be called when `required`=true and the component value is changed to a valid option`', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '1';
        const newValue = '2';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when `required`=false and the component value is changed to the `null` option`', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '1';
        const newValue = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when `required`=false and the component value is changed to a valid option`', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '1';
        const newValue = '2';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when `required`=true, `value`=null and the user tabs away from the component', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        // select a new value
        //
        component.find('select').simulate('blur', {
            target: { value: value }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(false, 'arg 1');
        expect(call.args[2]).to.equal(expectedMessage, 'arg 2');
    });

    it('should be called when `required`=true, `value`=valid option and the user tabs away from the component', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '1';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        // select a new value
        //
        component.find('select').simulate('blur', {
            target: { value: value }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when `required`=false, `value`=null and the user tabs away from the component', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        // select a new value
        //
        component.find('select').simulate('blur', {
            target: { value: value }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when `required`=false, `value`=valid option and the user tabs away from the component', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '1';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        // select a new value
        //
        component.find('select').simulate('blur', {
            target: { value: value }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

});


/*
on initialization, the Dropdown component
    should be a div.form-group
    should have a label, if label is set
    should not have a label, if label is not set
    should have a select.form-control
    should have the correct number of option elements (n+1) if includeNull=true
    should have the correct number of option elements (n) if includeNull=false
    should have a null option with the correct text when includeNull=true and nullName is set
    should have the correct option text for each option
*/
describe('on initialization, the Dropdown component', () => {

    const options = [
        { value: '1', name: 'one' },
        { value: '2', name: 'two' },
    ];

    it('should be a div.form-group', () => {
        const component = shallow(<Dropdown options={options} />);

        expect(component.is('div.form-group')).to.equal(true);
    });

    it('should have a label, if label is set', () => {
        const label = 'wtf?';

        const component = render(<Dropdown options={options} label={label} />);

        expect(component.find('label').length).to.equal(1);
        expect(component.find('label').text()).to.equal(label);
    });

    it('should not have a label, if label is not set', () => {

        const component = render(<Dropdown options={options} />);

        expect(component.find('label').length).to.equal(0);
    });

    it('should have a select.form-control', () => {

        const component = render(<Dropdown options={options} />);

        expect(component.find('select.form-control').length).to.equal(1);
    });

    it('should have the correct number of option elements (n+1) if includeNull=true', () => {

        const includeNull = true;

        const component = render(<Dropdown options={options} includeNull={includeNull} />);

        expect(component.find('select.form-control option').length).to.equal(options.length + 1);
    });

    it('should have the correct number of option elements (n) if includeNull=false', () => {

        const includeNull = false;

        const component = render(<Dropdown options={options} includeNull={includeNull} />);

        expect(component.find('select.form-control option').length).to.equal(options.length);
    });

    it('should have a null option with the correct text when includeNull=true ' +
        'and nullName is set', () => {

        const includeNull = true;

        const nullName = 'Select something, dammit!';

        const component = render(
            <Dropdown options={options} includeNull={includeNull} nullName={nullName} />
        );

        expect(component.find('select.form-control option').length).to.equal(options.length + 1);
        expect(component.find('select.form-control option[value=""]').text()).to.equal(nullName);
    });

    it('should have a null option with the default text when includeNull=true ' +
        'and nullName is not set', () => {

        const includeNull = true;

        const expectedName = 'Please select one';

        const component = render(<Dropdown options={options} includeNull={includeNull} />);

        expect(component.find('select.form-control option').length).to.equal(options.length + 1);
        expect(component.find('select.form-control option[value=""]').text())
            .to.equal(expectedName);
    });

    it('should have the correct option text for each option', () => {

        const includeNull = true;

        const expectedName = 'Please select one';

        const component = render(<Dropdown options={options} includeNull={includeNull} />);

        expect(component.find('option').length).to.equal(options.length + 1);
        expect(component.find('select option[value=""]').text()).to.equal(expectedName, '0');
        expect(component.find('select option[value="1"]').text()).to.equal(options[0].name, '1');
        expect(component.find('select option[value="2"]').text()).to.equal(options[1].name, '2');
    });


});

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

/* *****************************************************************************
when the parent component sends new value prop, a non-required Dropdown component
    should call the onValidation handler when value=valid
    should call the onValidation handler when value=blank
    should call the onChange handler when value=valid
    should call the onChange handler when value=blank
    should not show the validation message when value=valid
    should not show the validation message when value=blank
    should not call the onValidation handler when value has not changed
    should not call the onChange handler when value has not changed
*/
describe('when the parent component sends new value prop, a non-required ' +
    'Dropdown component', () => {

    const required = false;
    const description = 'nonsense';

    const options = [
        { value: '1', name: 'one' },
        { value: '2', name: 'two' },
    ];

    class TestParentBeta extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                testValue: props.testValue || '',
            };
        }

        render() {
            return (<Dropdown
                ref="testComponent"
                required={required}
                description={description}
                value={this.state.testValue}
                options={options}
                onValidation={this.props.onValidation}
                onChange={this.props.onChange}
            />);
        }
    }

    TestParentBeta.propTypes = {
        testValue:    React.PropTypes.string,
        onChange:     React.PropTypes.func,
        onValidation: React.PropTypes.func,
    };

    it('should call the onValidation handler when value=valid', () => {

        const onValidation = sinon.spy();

        const testValue = '1';

        const parent = mount(<TestParentBeta onValidation={onValidation} />);

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

        const initialValue = '1';

        const testValue = '';

        const parent = mount(
            <TestParentBeta
                testValue={initialValue}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onValidation.callCount).to.equal(2);

        expect(onValidation.args[1][0]).to.equal(false, 'args[1][0]');
        expect(onValidation.args[1][1]).to.equal(true, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(null, 'args[1][2]');
    });

    it('should call the onChange handler when value=valid', () => {

        const onChange = sinon.spy();

        const testValue = '1';

        const parent = mount(<TestParentBeta onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });

    it('should call the onChange handler when value=blank', () => {

        const onChange = sinon.spy();

        const initialValue = '2';
        const testValue = '';

        const parent = mount(<TestParentBeta testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });

    it('should not show the validation message when value=valid', () => {

        const testValue = '2';

        const parent = mount(<TestParentBeta />);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('span.help-block').length).to.equal(0);
    });

    it('should not show the validation message when value=blank', () => {

        const initialValue = '1';

        const testValue = '';

        const parent = mount(<TestParentBeta testValue={initialValue} />);

        // send a change event to ensure hasValidated is set
        //
        parent.find('select').simulate('change', {
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

        const testValue = '1';

        const parent = mount(<TestParentBeta testValue={testValue} onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onValidation.callCount).to.equal(1);
    });

    it('should not call the onChange handler when value has not changed', () => {

        const onChange = sinon.spy();

        const testValue = '2';

        const parent = mount(<TestParentBeta testValue={testValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(0);
    });
});

/* *****************************************************************************
when the parent component sends new value prop, a required Dropdown component
    should call the onValidation handler when value=valid
    should call the onValidation handler when value=blank
    should call the onChange handler when value=valid
    should call the onChange handler when value=blank
    should not show the validation message when value=valid
    should show the validation message when value=blank
    should not call the onValidation handler when value has not changed
    should not call the onChange handler when value has not changed
*/
describe('when the parent component sends new value prop, a required Dropdown component', () => {

    const required = true;
    const description = 'nonsense';
    const expectedMessage = `${description} is required`;

    const options = [
        { value: '1', name: 'one' },
        { value: '2', name: 'two' },
    ];

    class TestParentAlpha extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                testValue: props.testValue || '',
            };
        }

        render() {
            return (<Dropdown
                ref="testComponent"
                required={required}
                description={description}
                value={this.state.testValue}
                options={options}
                onValidation={this.props.onValidation}
                onChange={this.props.onChange}
            />);
        }
    }

    TestParentAlpha.propTypes = {
        testValue:    React.PropTypes.string,
        onChange:     React.PropTypes.func,
        onValidation: React.PropTypes.func,
    };

    it('should call the onValidation handler when value=valid', () => {

        const onValidation = sinon.spy();

        const testValue = '1';

        const parent = mount(<TestParentAlpha onValidation={onValidation} />);

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

        const initialValue = '1';

        const testValue = '';

        const parent = mount(
            <TestParentAlpha
                testValue={initialValue}
                onValidation={onValidation}
            />
        );

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

        const testValue = '1';

        const parent = mount(<TestParentAlpha onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });

    it('should call the onChange handler when value=blank', () => {

        const onChange = sinon.spy();

        const initialValue = '2';
        const testValue = '';

        const parent = mount(<TestParentAlpha testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });

    it('should not show the validation message when value=valid', () => {

        const testValue = '2';

        const parent = mount(<TestParentAlpha />);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('span.help-block').length).to.equal(0);
    });

    it('should show the validation message when value=blank', () => {

        const initialValue = '1';

        const testValue = '';

        const parent = mount(<TestParentAlpha testValue={initialValue} />);

        // send a change event to ensure hasValidated is set
        //
        parent.find('select').simulate('change', {
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

        const testValue = '1';

        const parent = mount(<TestParentAlpha testValue={testValue} onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onValidation.callCount).to.equal(1);
    });

    it('should not call the onChange handler when value has not changed', () => {

        const onChange = sinon.spy();

        const testValue = '2';

        const parent = mount(<TestParentAlpha testValue={testValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(0);
    });
});

/*
the validation error message for the component
    should not be displayed when initialized with `required`=true, `value`=valid
    should not be displayed when initialized with `required`=true, `value`=null option
    should not be displayed when initialized with `required`=false, `value`=valid
    should not be displayed when initialized with `required`=false, `value`=null option
    should not be displayed when `required`=true and `value` changes to valid
    should be displayed when `required`=true and `value` changes to null option
    should not be displayed when `required`=false and `value` changes to null option
    should be displayed with a custom message when `validationMessage` is set,
        `required`=true and `value` changes to null option
*/
describe('the validation error message for the component', () => {

    const description = 'this silly thing';

    const options = [
        { value: '1', name: 'one' },
        { value: '2', name: 'two' },
    ];

    const expectedMessage = `${description} is required`;

    it('should not be displayed when initialized with `required`=true, `value`=valid', () => {
        const required = true;
        const value = '1';

        const component = render(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
            />
        );

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be displayed when initialized with `required`=true, ' +
        '`value`=null option', () => {
        const required = true;
        const value = '';

        const component = render(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
            />
        );

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be displayed when initialized with `required`=false, `value`=valid', () => {
        const required = false;
        const value = '1';

        const component = render(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
            />
        );

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be displayed when initialized with `required`=false, ' +
        '`value`=null option', () => {
        const required = false;
        const value = '';

        const component = render(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
            />
        );

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be displayed when `required`=true and `value` changes to valid', () => {
        const required = true;
        const value = '1';

        const newValue = '2';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
            />
        );

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should be displayed when `required`=true and `value` changes to null option', () => {
        const required = true;
        const value = '1';

        const newValue = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
            />
        );

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(1, 'has-error');
        expect(component.find('div.form-group.has-error span.help-block').length)
            .to.equal(1, 'span');
        expect(component.find('div.form-group.has-error span.help-block').text())
            .to.equal(expectedMessage, 'message');
    });

    it('should not be displayed when `required`=false and `value` changes to null option', () => {
        const required = false;
        const value = '1';

        const newValue = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
            />
        );

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should be displayed with a custom message when `validationMessage` is ' +
        'set, `required`=true and `value` changes to null option', () => {
        const validationMessage = 'This is my custom message';
        const required = true;
        const value = '1';

        const newValue = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                validationMessage={validationMessage}
                value={value}
                options={options}
            />
        );

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(1, 'has-error');
        expect(component.find('div.form-group.has-error span.help-block').length)
            .to.equal(1, 'span');
        expect(component.find('div.form-group.has-error span.help-block').text())
            .to.equal(validationMessage, 'message');
    });

});

/*
the onChangehandler for the component
    should not be called when the component is first initialized
    should not be called when something is selected, but the value has not changed
    should be called when `required`=true and the component value is changed to the `null` option
    should be called when `required`=true and the component value is changed to a valid option
    should be called when `required`=true and the component value is changed to an invalid option
    should be called when `required`=false and the component value is changed to the `null` option
    should be called when `required`=false and the component value is changed to a valid option
    should be called when `required`=false and the component value is changed to an invalid option
    should not be called when `required`=true, `value`=null and the user tabs
        away from the component
    should not be called when `required`=true, `value`=valid option and the
        user tabs away from the component
    should not be called when `required`=true, `value`=invalid option and the
        user tabs away from the component
    should not be called when `required`=false, `value`=null and the user tabs
        away from the component
    should not be called when `required`=false, `value`=valid option and the
        user tabs away from the component
    should not be called when `required`=false, `value`=invalid option and the
        user tabs away from the component
*/
describe('the onChangehandler for the component', () => {

    const description = 'this silly thing';

    const options = [
        { value: '1', name: 'one' },
        { value: '2', name: 'two' },
    ];

    it('should not be called when the component is first initialized', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = null;

        mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        expect(onChange.callCount).to.equal(0);
    });

    it('should not be called when something is selected, but the value has ' +
        'not changed', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '1';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value }
        });

        expect(onChange.callCount).to.equal(0);
    });

    it('should be called when `required`=true and the component value is ' +
        'changed to the `null` option', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '1';
        const newValue = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1);

        const call = onChange.getCall(0);
        expect(call.args[0]).to.equal(newValue, 'arg 0');
    });

    it('should be called when `required`=true and the component value is ' +
        'changed to a valid option', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '1';
        const newValue = '2';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1);

        const call = onChange.getCall(0);
        expect(call.args[0]).to.equal(newValue, 'arg 0');
    });

    it('should be called when `required`=true and the component value is ' +
        'changed to an invalid option', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '1';
        const newValue = 'this should never happen';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1);

        const call = onChange.getCall(0);
        expect(call.args[0]).to.equal('', 'arg 0');
    });

    it('should be called when `required`=false and the component value is ' +
        'changed to the `null` option', () => {
        const onChange = sinon.spy();

        const required = false;
        const value = '1';
        const newValue = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1);

        const call = onChange.getCall(0);
        expect(call.args[0]).to.equal(newValue, 'arg 0');
    });

    it('should be called when `required`=false and the component value is ' +
        'changed to a valid option', () => {
        const onChange = sinon.spy();

        const required = false;
        const value = '1';
        const newValue = '2';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1);

        const call = onChange.getCall(0);
        expect(call.args[0]).to.equal(newValue, 'arg 0');
    });

    it('should be called when `required`=false and the component value is ' +
        'changed to an invalid option', () => {
        const onChange = sinon.spy();

        const required = false;
        const value = '1';
        const newValue = 'this should not happen';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('change', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1);

        const call = onChange.getCall(0);
        expect(call.args[0]).to.equal('', 'arg 0');
    });

    it('should be not called when `required`=true, `value`=null and the user ' +
        'tabs away from the component', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('blur', {
            target: { value }
        });

        expect(onChange.callCount).to.equal(0);
    });

    it('should not be called when `required`=true, `value`=valid option and ' +
        'the user tabs away from the component', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '1';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('blur', {
            target: { value }
        });

        expect(onChange.callCount).to.equal(0);
    });

    it('should not be called when `required`=true, `value`=invalid option and ' +
        'the user tabs away from the component', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = 'something is wrong';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('blur', {
            target: { value }
        });

        expect(onChange.callCount).to.equal(0);
    });

    it('should not be called when `required`=false, `value`=null and the user ' +
        'tabs away from the component', () => {
        const onChange = sinon.spy();

        const required = false;
        const value = '';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('blur', {
            target: { value }
        });

        expect(onChange.callCount).to.equal(0);
    });

    it('should not be called when `required`=false, `value`=valid option and ' +
        'the user tabs away from the component', () => {
        const onChange = sinon.spy();

        const required = false;
        const value = '2';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('blur', {
            target: { value }
        });

        expect(onChange.callCount).to.equal(0);
    });

    it('should not be called when `required`=false, `value`=invalid option ' +
        'and the user tabs away from the component', () => {
        const onChange = sinon.spy();

        const required = false;
        const value = 'this is not right';

        const component = mount(
            <Dropdown
                description={description}
                required={required}
                value={value}
                options={options}
                onChange={onChange}
            />
        );

        // select a new value
        //
        component.find('select').simulate('blur', {
            target: { value }
        });

        expect(onChange.callCount).to.equal(0);
    });

});

/*
the onValidation handler for the component
    should be called when the component is first initialized with `required`=true, `value`=null
    should be called when the component is first initialized with `required`=false, `value`=null
    should be called when the component is first initialized with `required`=true, `value`=valid
    should be called when the component is first initialized with `required`=false, `value`=valid
    should be called when the component is first initialized with `required`=true, `value`=not valid
    should be called when the component is first initialized with
        `required`=false, `value`=not valid
    should be called when `required`=true and the component value is changed to the `null` option
    should be called when `required`=true and the component value is changed to a valid option
    should be called when `required`=false and the component value is changed to the `null` option
    should be called when `required`=false and the component value is changed to a valid option
    should be called when `required`=true, `value`=null and the user tabs away from the component
    should be called when `required`=true, `value`=valid option and the user
        tabs away from the component
    should be called when `required`=false, `value`=null and the user tabs away from the component
    should be called when `required`=false, `value`=valid option and the user
        tabs away from the component
*/
describe('the onValidation handler for the component', () => {

    const description = 'this silly thing';

    const options = [
        { value: '1', name: 'one' },
        { value: '2', name: 'two' },
    ];

    const expectedMessage = `${description} is required`;

    it('should be called when the component is first initialized with ' +
        '`required`=true, `value`=null', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = null;

        mount(
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

    it('should be called when the component is first initialized with ' +
        '`required`=false, `value`=null', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = null;

        mount(
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

    it('should be called when the component is first initialized with ' +
        '`required`=true, `value`=valid', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '1';

        mount(
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

    it('should be called when the component is first initialized with ' +
        '`required`=false, `value`=valid', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '2';

        mount(
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

    it('should be called when the component is first initialized with ' +
        '`required`=true, `value`=not valid', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = 'not an option value';

        mount(
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

    it('should be called when the component is first initialized with ' +
        '`required`=false, `value`=not valid', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = 'STILL not an option value';

        mount(
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

    it('should be called when `required`=true and the component value is ' +
        'changed to the `null` option`', () => {
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

    it('should be called when `required`=true and the component value is ' +
        'changed to a valid option`', () => {
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

    it('should be called when `required`=false and the component value is ' +
        'changed to the `null` option`', () => {
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

    it('should be called when `required`=false and the component value is ' +
        'changed to a valid option`', () => {
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

    it('should be called when `required`=true, `value`=null and the user tabs ' +
        'away from the component', () => {
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
            target: { value }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(false, 'arg 1');
        expect(call.args[2]).to.equal(expectedMessage, 'arg 2');
    });

    it('should be called when `required`=true, `value`=valid option and the ' +
        'user tabs away from the component', () => {
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
            target: { value }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when `required`=false, `value`=null and the user ' +
        'tabs away from the component', () => {
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
            target: { value }
        });

        expect(onValidation.callCount).to.equal(2);

        const call = onValidation.getCall(1);
        expect(call.args[0]).to.equal(true, 'arg 0');
        expect(call.args[1]).to.equal(true, 'arg 1');
        expect(call.args[2]).to.equal(null, 'arg 2');
    });

    it('should be called when `required`=false, `value`=valid option and the ' +
        'user tabs away from the component', () => {
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
            target: { value }
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
    should have the correct label widths when labelColumns is set
    should have the correct select widths when dropdownColumns is set
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

    it('should have the correct label widths when labelColumns is set', () => {
        const label = 'this sucks';
        const columns = { xs: 10, md: 8};
        const expectedClass = 'col-xs-10 col-md-8';

        const component = shallow(<Dropdown options={options} label={label} labelColumns={columns}/>);

        expect(component.find('Label').props().className).to.contain(expectedClass);
    });

    it('should have the correct select widths when dropdownColumns is set', () => {
        const label = 'this sucks';
        const columns = { xs: 10, md: 8};
        const expectedClass = '.col-xs-10.col-md-8';

        const component = shallow(<Dropdown options={options} label={label} dropdownColumns={columns}/>);

        expect(component.find(`div${expectedClass} select`).length).to.equal(1, expectedClass);
    });


});

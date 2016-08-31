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

// @TODO write tests to ensure new props do not interrupt user editing

/* *****************************************************************************
when editing, the NumericInput component
    should preserve the trailing decimal through multiple character steps
*/
describe('when editing, the NumericInput component', () => {

    it('should preserve the trailing decimal through multiple character steps', () => {
        const required = false;
        const description = 'blah blah';
        const initialValue = 42;

        // simulate a series of edits from empty to '100.99'
        const editingList = [
            '',
            '1',
            '10',
            '100',
            '100.',
            '100.9',
            '100.99',
        ];

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={initialValue}
            />
        );

        editingList.forEach((str) => {
            // simulate the change to the current string
            //
            component.find('input').simulate('change', {
                target: { value: str }
            });

            // check to make sure the input element correctly reflects the
            // change
            //
            expect(component.find('input').props().value).to.equal(str);
        });
    });
});

/* *****************************************************************************
when the parent component sends new value prop, a required NumericInput component
    should call the onValidation handler when required=true, value=valid
    should call the onValidation handler when required=true, value=blank
    should call the onChange handler when required=true, value=valid
    should call the onChange handler when required=true, value=blank
    should not show the validation message when required=true, value=valid
    should not show the validation message when required=true, value=blank
    should not call the onValidation handler when value has not changed
    should not call the onChange handler when value has not changed
    should show the validation message after blur then prop change when required=true, value=blank
    should update the input element value
*/
describe('when the parent component sends new value prop, a required ' +
    'NumericInput component', () => {

    const required = true;
    const description = 'this thing';
    const expectedMessage = `${description} is required`;

    class TestParentBeta extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                testValue: props.testValue || '',
            };
        }

        render() {
            return (<NumericInput
                ref="testComponent"
                required={required}
                description={description}
                value={this.state.testValue}
                onValidation={this.props.onValidation}
                onChange={this.props.onChange}
            />);
        }
    }

    TestParentBeta.propTypes = {
        testValue:    React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        onChange:     React.PropTypes.func,
        onValidation: React.PropTypes.func,
    };

    it('should call the onValidation handler when required=true, value=valid', () => {

        const onValidation = sinon.spy();

        const testValue = 42;

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

    it('should call the onValidation handler when required=true, value=blank', () => {

        const onValidation = sinon.spy();

        const initialValue = 88;
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
        expect(onValidation.args[1][1]).to.equal(false, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(expectedMessage, 'args[1][2]');
    });

    it('should call the onChange handler when required=true, value=valid', () => {

        const onChange = sinon.spy();

        const initialValue = 88;
        const testValue = 44;

        const parent = mount(<TestParentBeta testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });

    it('should call the onChange handler when required=true, value=blank', () => {

        const onChange = sinon.spy();

        const initialValue = 88;
        const testValue = '';

        const parent = mount(<TestParentBeta testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });

    it('should not show the validation message when required=true, value=valid', () => {

        const initialValue = 88;
        const testValue = 22;

        const parent = mount(<TestParentBeta testValue={initialValue} />);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('div.form-group.has-error').length).to.equal(0);
        expect(parent.find('span.help-block').length).to.equal(0);
    });

    it('should not show the validation message when required=true, value=blank', () => {

        const initialValue = 88;
        const testValue = '';

        const parent = mount(<TestParentBeta testValue={initialValue} />);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('div.form-group.has-error').length).to.equal(0);
        expect(parent.find('span.help-block').length).to.equal(0);
    });

    it('should not call the onValidation handler when value has not changed', () => {

        const onValidation = sinon.spy();

        const initialValue = 88;
        const testValue = initialValue;

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

        expect(onValidation.callCount).to.equal(1);
    });

    it('should not call the onChange handler when value has not changed', () => {

        const onChange = sinon.spy();

        const initialValue = 88;
        const testValue = initialValue;

        const parent = mount(<TestParentBeta testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(0);
    });

    it('should show the validation message after blur then prop change when ' +
        'required=true, value=blank', () => {

        const initialValue = 88;
        const secondValue = 99;
        const testValue = '';

        const parent = mount(<TestParentBeta testValue={initialValue} />);

        // blur the component, to ensure that hasValidated is set
        //
        parent.find('input').simulate('blur', {
            target: { value: secondValue }
        });

        expect(parent.find('div.form-group.has-error').length).to.equal(0, 'before change div');
        expect(parent.find('span.help-block').length).to.equal(0, 'before change span');

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('div.form-group.has-error').length).to.equal(1, 'after change div');
        expect(parent.find('span.help-block').length).to.equal(1, 'after change span');
        expect(parent.find('span.help-block').text()).to.equal(expectedMessage, 'after change msg');
    });

    it('should update the input element value', () => {

        const initialValue = 88;
        const testValue = 44;

        const parent = mount(<TestParentBeta testValue={initialValue} />);

        expect(parent.find('input').props().value).to.equal(`${initialValue}`);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('input').props().value).to.equal(`${testValue}`);
    });
});

/* *****************************************************************************
when the parent component sends new value prop, a non-required NumericInput component
    should call the onValidation handler when required=false, value=valid
    should call the onValidation handler when required=false, value=blank
    should call the onChange handler when required=false, value=valid
    should call the onChange handler when required=false, value=blank
    should not show the validation message when required=false, value=valid
    should not show the validation message when required=false, value=blank
    should not call the onValidation handler when value has not changed
    should not call the onChange handler when value has not changed
    should not show the validation message after blur then prop change when
        required=true, value=blank
*/
describe('when the parent component sends new value prop, a non-required ' +
    'NumericInput component', () => {

    const required = false;
    const description = 'gibberish';

    class TestParentAlpha extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                testValue: props.testValue || '',
            };
        }

        render() {
            return (<NumericInput
                ref="testComponent"
                required={required}
                description={description}
                value={this.state.testValue}
                onValidation={this.props.onValidation}
                onChange={this.props.onChange}
            />);
        }
    }

    TestParentAlpha.propTypes = {
        testValue:    React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        onChange:     React.PropTypes.func,
        onValidation: React.PropTypes.func,
    };


    it('should call the onValidation handler when required=false, value=valid', () => {

        const onValidation = sinon.spy();

        const testValue = 42;

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

    it('should call the onValidation handler when required=false, value=blank', () => {

        const onValidation = sinon.spy();

        const initialValue = 42;
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
        expect(onValidation.args[1][1]).to.equal(true, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(null, 'args[1][2]');
    });

    it('should call the onChange handler when required=false, value=valid', () => {

        const onChange = sinon.spy();

        const testValue = 421;

        const parent = mount(<TestParentAlpha onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });

    it('should call the onChange handler when required=false, value=blank', () => {

        const onChange = sinon.spy();

        const initialValue = 67;
        const testValue = '';

        const parent = mount(<TestParentAlpha testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(testValue, 'args[0][0]');
    });

    it('should not show the validation message when required=false, value=valid', () => {

        const testValue = 222222;

        const parent = mount(<TestParentAlpha />);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('div.form-group.has-error').length).to.equal(0);
        expect(parent.find('span.help-block').length).to.equal(0);
    });

    it('should not show the validation message when required=false, value=blank', () => {

        const testValue = '';

        const parent = mount(<TestParentAlpha />);

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('div.form-group.has-error').length).to.equal(0);
        expect(parent.find('span.help-block').length).to.equal(0);
    });

    it('should not call the onValidation handler when value has not changed', () => {

        const onValidation = sinon.spy();

        const initialValue = 8;
        const finalValue = initialValue;


        const parent = mount(
            <TestParentAlpha
                testValue={initialValue}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ finalValue });

        expect(onValidation.callCount).to.equal(1);
    });

    it('should not call the onChange handler when value has not changed', () => {

        const onChange = sinon.spy();

        const initialValue = 8;
        const finalValue = initialValue;


        const parent = mount(<TestParentAlpha testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ finalValue });

        expect(onChange.callCount).to.equal(0);
    });

    it('should not show the validation message after blur then prop change ' +
        'when required=false, value=blank', () => {

        const initialValue = 88;
        const secondValue = 99;
        const testValue = '';

        const parent = mount(<TestParentAlpha testValue={initialValue} />);

        // blur the component, to ensure that hasValidated is set
        //
        parent.find('input').simulate('blur', {
            target: { value: secondValue }
        });

        expect(parent.find('div.form-group.has-error').length).to.equal(0, 'before change div');
        expect(parent.find('span.help-block').length).to.equal(0, 'before change span');

        // change the state of the parent
        //
        parent.setState({ testValue });

        expect(parent.find('div.form-group.has-error').length).to.equal(0, 'after change div');
        expect(parent.find('span.help-block').length).to.equal(0, 'after change span');
    });

});

/* *****************************************************************************
the validation message for the NumericInput component
    should not be shown on initialization with required=true, value=valid
    should not be shown on initialization with required=true, value=blank
    should not be shown on initialization with required=false, value=blank
    should not be shown after editing with required=true, value=valid
    should not be shown after editing with required=true, value=blank
    should not be shown after editing with required=false, value=blank
    should not be shown after blur with required=true, value=valid
    should be shown after blur with required=true, value=blank
    should not be shown after blur with required=false, value=blank
    should not be shown after editing (following prior blur) with required=true, value=valid
    should be shown after editing (following prior blur) with required=true, value=blank
    should not be shown after editing (following prior blur) with required=false, value=blank
    should show a custom validation message after blur with required=true,
        value=blank, validationMessage=something

*/
describe('the validation message for the NumericInput component', () => {

    const description = 'my number';

    const expectedMessage = `${description} is required`;

    it('should not be shown on initialization with required=true, value=valid', () => {
        const required = true;
        const value = 8621.3;

        const component = shallow(
            <NumericInput
                required={required}
                description={description}
                value={value}
            />
        );

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be shown on initialization with required=true, value=blank', () => {
        const required = true;
        const value = '';

        const component = shallow(
            <NumericInput
                required={required}
                description={description}
                value={value}
            />
        );

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be shown on initialization with required=false, value=blank', () => {
        const required = false;
        const value = '';

        const component = shallow(
            <NumericInput
                required={required}
                description={description}
                value={value}
            />
        );

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be shown after editing with required=true, value=valid', () => {
        const required = true;
        const initialValue = 99;
        const finalValue = 42;

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={initialValue}
            />
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be shown after editing with required=true, value=blank', () => {
        const required = true;
        const initialValue = 42;
        const finalValue = '';

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={initialValue}
            />
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be shown after editing with required=false, value=blank', () => {
        const required = false;
        const initialValue = 42;
        const finalValue = '';

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={initialValue}
            />
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be shown after blur with required=true, value=valid', () => {
        const required = false;
        const initialValue = 42;
        const finalValue = 6;

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={initialValue}
            />
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should be shown after blur with required=true, value=blank', () => {
        const required = true;
        const initialValue = 42;
        const finalValue = '';

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={initialValue}
            />
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(1);
        expect(component.find('span.help-block').length).to.equal(1);
        expect(component.find('span.help-block').text()).to.equal(expectedMessage);
    });

    it('should not be shown after blur with required=false, value=blank', () => {
        const required = false;
        const initialValue = 42;
        const finalValue = '';

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={initialValue}
            />
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not be shown after editing (following prior blur) with ' +
        'required=true, value=valid', () => {
        const required = true;
        const initialValue = 42;
        const secondValue = '';
        const finalValue = 99;

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={initialValue}
            />
        );

        // make the first change & blur
        //
        component.find('input').simulate('change', {
            target: { value: secondValue }
        });

        component.find('input').simulate('blur', {
            target: { value: secondValue }
        });

        // make the second change
        //
        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should be shown after editing (following prior blur) with ' +
        'required=true, value=blank', () => {
        const required = true;
        const initialValue = 42;
        const secondValue = 55;
        const finalValue = '';

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={initialValue}
            />
        );

        // make the first change & blur
        //
        component.find('input').simulate('change', {
            target: { value: secondValue }
        });

        component.find('input').simulate('blur', {
            target: { value: secondValue }
        });

        // make the second change
        //
        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(1);
        expect(component.find('span.help-block').length).to.equal(1);
        expect(component.find('span.help-block').text()).to.equal(expectedMessage);
    });

    it('should not be shown after editing (following prior blur) with ' +
        'required=false, value=blank', () => {
        const required = false;
        const initialValue = 42;
        const secondValue = 1;
        const finalValue = '';

        const component = mount(
            <NumericInput
                required={required}
                description={description}
                value={initialValue}
            />
        );

        // make the first change & blur
        //
        component.find('input').simulate('change', {
            target: { value: secondValue }
        });

        component.find('input').simulate('blur', {
            target: { value: secondValue }
        });

        // make the second change
        //
        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should show a custom validation message after blur with ' +
        'required=true, value=blank, validationMessage=something', () => {
        const required = true;
        const validationMessage = 'No way, man!';
        const initialValue = 42;
        const finalValue = '';

        const component = mount(
            <NumericInput
                required={required}
                validationMessage={validationMessage}
                value={initialValue}
            />
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(1);
        expect(component.find('span.help-block').length).to.equal(1);
        expect(component.find('span.help-block').text()).to.equal(validationMessage);
    });

});

/* *****************************************************************************
on blur, the NumericInput component
    should format a numeric value as a plain number, if isCurrency=false and decimals=null
    should format a numeric value as a number with n decimal places, if
        isCurrency=false and decimals=n
    should format a numeric values as a $#.## if isCurrency=true
    should leave a blank value as-is
*/
describe('on blur, the NumericInput component', () => {

    it('should format a numeric value as a plain number, if isCurrency=false ' +
        'and decimals=null', () => {
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

    it('should format a numeric value as a number with n decimal places, if ' +
        'isCurrency=false and decimals=n', () => {
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
            target: { value }
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
            target: { value }
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
            target: { value }
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
    should format a numeric value as a number with n decimal places, if
        isCurrency=false and decimals=n
    should format a numeric values as a $#.## if isCurrency=true
    should leave a blank value as-is
*/
describe('when the value is initialized, the NumericInput component', () => {

    it('should format a numeric value as a plain number, if isCurrency=false ' +
        'and decimals=null', () => {
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

    it('should format a numeric value as a number with n decimal places, if ' +
        'isCurrency=false and decimals=n', () => {
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
        const finalValue = 99.9999;

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
        const finalValue = -4213.21;

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
    should be called with a custom message on blur event with validationMessage=something
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

    it('should be called with a custom message on blur event with ' +
        'validationMessage=something', () => {
        const onValidation = sinon.spy();

        const required = true;
        const validationMessage = 'Somthing is not right...';
        const value = 51.2;
        const newValue = '';

        const component = mount(
            <NumericInput
                required={required}
                validationMessage={validationMessage}
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
        expect(onValidation.args[1][1]).to.equal(false, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(validationMessage, 'args[1][2]');
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
    should have the readonly property on the input when readonly=true
    should not have the readonly property on the input when readonly=false
    should have the correct label widths when labelColumns is set
    should have the correct select widths when inputColumns is set
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

    it('should have the readOnly property on the input when readOnly=true', () => {
        const readOnly = true;

        const component = shallow(<NumericInput readOnly={readOnly} />);

        expect(component.find('input').props().readOnly).to.equal(true);
    });

    it('should not have the readOnly property on the input when readOnly=false', () => {
        const readOnly = false;

        const component = shallow(<NumericInput readOnly={readOnly} />);

        expect(component.find('input').props().readOnly).to.equal(false);
    });

    it('should have the correct label widths when labelColumns is set', () => {
        const label = 'my label';
        const columns = { xs: 10, md: 8 };
        const expectedClass = 'col-xs-10 col-md-8';

        const component = shallow(<NumericInput label={label} labelColumns={columns} />);

        expect(component.find('Label').props().className).to.equal(expectedClass);
    });

    it('should have the correct select widths when inputColumns is set', () => {
        const label = 'my label';
        const columns = { xs: 10, md: 8 };
        const expectedClass = '.col-xs-10.col-md-8';

        const component = shallow(<NumericInput label={label} inputColumns={columns} />);

        expect(component.find(`div${expectedClass} input`).length).to.equal(1);
    });


});

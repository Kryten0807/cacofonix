// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import DateInput from './DateInput';

const expect = chai.expect;


/* *****************************************************************************
when a value with a 2-digit year is entered, the DateInput component
    should call the onChange handler with the properly formatted value
    should call onValidation with the correct values
    should not show the validation error message without a prior blur event
    should not show the validation error message with a prior blur event
    should update the input element value on blur
*/
describe('when a value with a 2-digit year is entered, the DateInput component', () => {

    const description = 'xyz 123';
    const expectedMessage = `${description} is not a valid date`;

    it('should call the onChange handler with the properly formatted value', () => {

        const onChange = sinon.spy();

        const required = true;

        const value = '1/1/2016';
        const newValue = '03/06/14';
        const expectedValue = '3/6/2014';

        const component = mount(<DateInput required={required} value={value} onChange={onChange}/>);

        expect(onChange.callCount).to.equal(0);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1);
        expect(onChange.calledWith(expectedValue)).to.equal(true);
    });

    it('should call onValidation with the correct values', () => {

        const onValidation = sinon.spy();

        const required = true;

        const value = '1/1/2016';
        const newValue = '03/06/14';
        const expectedValue = '3/6/2014';

        const component = mount(<DateInput required={required} value={value} onValidation={onValidation}/>);

        expect(onValidation.callCount).to.equal(1, 'callCount before');
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(true, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(null, 'args[0][2]');

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onValidation.callCount).to.equal(2, 'callcount after');
        expect(onValidation.args[1][0]).to.equal(true, 'args[1][0]');
        expect(onValidation.args[1][1]).to.equal(true, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(null, 'args[1][2]');
    });

    it('should not show the validation error message without a prior blur event', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = '03/06/14';
        const expectedValue = '3/6/2014';

        const component = mount(<DateInput required={required} value={value}/>);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should not show the validation error message with a prior blur event', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = '03/06/14';
        const expectedValue = '3/6/2014';

        const component = mount(<DateInput required={required} value={value}/>);

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group').length).to.equal(1);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    // it('should update the input element value on blur', () => {});

});

/* *****************************************************************************
when new props are received, the DateInput component
    should call onChange if the value changes
    should not call onChange if the value does not change
    should call onValidation if the value changes
    should not call onValidation if the value does not change
    should update the input element value
    should maintain the edited value if the component is currently editing
*/
describe('when new props are received, the DateInput component', () => {

    const required = true;
    const description = 'mumble mumble';

    class TestParent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                testValue: props.testValue || '',
            };
        }

        render() {
            return (<DateInput
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
        testValue:    React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        onChange:     React.PropTypes.func,
        onValidation: React.PropTypes.func,
    };

    it('should call onChange if the value changes', () => {

        const onChange = sinon.spy();

        const initialValue = '6/9/2014';
        const finalValue = '11/9/2014';

        const parent = mount(<TestParent testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue: finalValue });

        expect(onChange.callCount).to.equal(1);

        expect(onChange.args[0][0]).to.equal(finalValue, 'args[0][0]');
    });

    it('should not call onChange if the value does not change', () => {

        const onChange = sinon.spy();

        const initialValue = '6/9/2014';
        const finalValue = initialValue;

        const parent = mount(<TestParent testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0);

        // change the state of the parent
        //
        parent.setState({ testValue: finalValue });

        expect(onChange.callCount).to.equal(0);
    });

    it('should call onValidation if the value changes', () => {

        const onValidation = sinon.spy();

        const initialValue = '6/9/2014';
        const finalValue = '11/9/2014';

        const parent = mount(<TestParent testValue={initialValue} onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue: finalValue });

        expect(onValidation.callCount).to.equal(2);

        expect(onValidation.args[1][0]).to.equal(false, 'args[1][0]');
        expect(onValidation.args[1][1]).to.equal(true, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(null, 'args[1][2]');
    });

    it('should not call onValidation if the value does not change', () => {

        const onValidation = sinon.spy();

        const initialValue = '6/9/2014';
        const finalValue = initialValue;

        const parent = mount(<TestParent testValue={initialValue} onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1);

        // change the state of the parent
        //
        parent.setState({ testValue: finalValue });

        expect(onValidation.callCount).to.equal(1);
    });

    it('should update the input element value', () => {

        const initialValue = '6/9/2014';
        const finalValue = '11/9/2014';

        const parent = mount(<TestParent testValue={initialValue} />);

        expect(parent.find('input').props().value).to.equal(initialValue);

        // change the state of the parent
        //
        parent.setState({ testValue: finalValue });

        expect(parent.find('input').props().value).to.equal(finalValue);
    });

    it('should maintain the edited value if the component is currently editing', () => {

        const onChange = sinon.spy();

        const initialValue = 'something that is not a date';

        const steps = [
            '',
            '1',
            '11',
            '11/',
            '11/9',
            '11/9/',
            '11/9/2',
            '11/9/20',
            '11/9/201',
            '11/9/2014',
        ];

        let callCount = 0;

        const parent = mount(<TestParent testValue={initialValue} onChange={onChange} />);

        expect(onChange.callCount).to.equal(callCount++, 'first callcount');

        // as set step through the edits, the component is going to be passing
        // values via the onChange handler up to its parent. The parent will
        // then be passing those values back to the component via props

        steps.forEach((step) => {
            // change the component
            parent.find('input').simulate('change', { target: { value: step } });

            // expect the onChange handler
            expect(onChange.callCount).to.equal(callCount++, `call count after '${step}'`);

            // update the parent (to simulate the app state changing & passing
            // the value back down)
            parent.setState({ testValue: step });

            // expect the input element to still have the same value
            expect(parent.find('input').props().value).to.equal(step, 'value = step');
        });
    });

});

/* *****************************************************************************
given an invalid value, the validation error message
    should not be displayed after initialization
    should not be displayed after focus
    should not be displayed after editing without prior blur
    should be displayed after blur
    should be displayed after editing with prior blur
*/
describe('given an invalid value, the validation error message', () => {

    const description = 'mumble mumble';
    const expectedMessage = `${description} is not a valid date`;

    it('should not be displayed after initialization', () => {

        const required = true;

        const value = 'something invalid';

        const component = mount(<DateInput required={required} value={value} />);

        expect(component.find('div.form-group.has-error').length).to.equal(0);
    });

    it('should not be displayed after focus', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = 'something invalid';

        const component = mount(<DateInput required={required} value={value} />);

        component.find('input').simulate('focus', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(0);
    });

    it('should not be displayed after editing without prior blur', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = 'something invalid';

        const component = mount(<DateInput required={required} value={value} />);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);
    });

    it('should be displayed after blur', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = 'something invalid';

        const component = mount(
            <DateInput description={description} required={required} value={value} />
        );

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(1);
        expect(component.find('span.help-block').length).to.equal(1);
        expect(component.find('span.help-block').text()).to.equal(expectedMessage);
    });

    it('should be displayed after editing with prior blur', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = 'something invalid';

        const component = mount(
            <DateInput description={description} required={required} value={value} />
        );

        component.find('input').simulate('blur', {
            target: { value }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(0);
        expect(component.find('span.help-block').length).to.equal(0);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('div.form-group.has-error').length).to.equal(1);
        expect(component.find('span.help-block').length).to.equal(1);
        expect(component.find('span.help-block').text()).to.equal(expectedMessage);
    });

});


/* *****************************************************************************
on focus, the DateInput component
    should format a valid value as a date for the input element
    should leave an invalid value as is for the input element
    should leave a blank value as is for the input element
*/
describe('on focus, the DateInput component', () => {

    it('should format a valid value as a date for the input element', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = '3/6/2014';
        const expectedValue = newValue;

        const component = mount(<DateInput required={required} value={value} />);

        component.find('input').simulate('focus', {
            target: { value: newValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('should leave an invalid value as is for the input element', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = 'a word';
        const expectedValue = newValue;

        const component = mount(<DateInput required={required} value={value} />);

        component.find('input').simulate('focus', {
            target: { value: newValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('should leave a blank value as is for the input element', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = '';
        const expectedValue = newValue;

        const component = mount(<DateInput required={required} value={value} />);

        component.find('input').simulate('focus', {
            target: { value: newValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

});

/* *****************************************************************************
on blur, the DateInput component
    should reformat a valid value as a date
    should leave an invalid value as is
    should leave a blank value as is
    should call onValidation with hasValidated=true
    should call onChange with the formatted value for a valid value
    should call onChange with null for an invalid value
*/
describe('on blur, the DateInput component', () => {

    const description = 'xyz 123';
    const expectedMessage = `${description} is not a valid date`;

    it('should reformat a valid value as a date', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = '03/06/2014';
        const expectedValue = '3/6/2014';

        const component = mount(<DateInput required={required} value={value} />);

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('should leave an invalid value as is', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = 'no no no no no!';
        const expectedValue = newValue;

        const component = mount(<DateInput required={required} value={value} />);

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('should leave a blank value as is', () => {

        const required = true;

        const value = '1/1/2016';
        const newValue = '';
        const expectedValue = newValue;

        const component = mount(<DateInput required={required} value={value} />);

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('should call onValidation with hasValidated=true', () => {

        const onValidation = sinon.spy();

        const required = true;

        const value = '1/1/2016';
        const newValue = 'no no no no no!';

        const component = mount(
            <DateInput
                description={description}
                required={required}
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
        expect(onValidation.args[1][2]).to.equal(expectedMessage, 'args[1][2]');
    });

    it('should call onChange with the formatted value for a valid value', () => {

        const onChange = sinon.spy();

        const required = true;

        const value = '1/1/2016';
        const newValue = '03/06/2014';
        const expectedValue = '3/6/2014';

        const component = mount(
            <DateInput required={required} value={value} onChange={onChange} />
        );

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1);
        expect(onChange.calledWith(expectedValue)).to.equal(true);
    });

    it('should call onChange with null for an invalid value', () => {

        const onChange = sinon.spy();

        const required = true;

        const value = '1/1/2016';
        const newValue = 'this is not valid';
        const expectedValue = null;

        const component = mount(
            <DateInput required={required} value={value} onChange={onChange} />
        );

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1);
        expect(onChange.calledWith(expectedValue)).to.equal(true);
    });
});

/* *****************************************************************************
during editing, the DateInput component
    should maintain the correct value at each step when entering a valid date
    should maintain the correct value at each step when entering an invalid date
    should maintain the correct value at each step when deleting the current value
*/
describe('during editing, the DateInput component', () => {

    it('should maintain the correct value at each step when entering a valid date', () => {
        const steps = [
            '',
            '6',
            '6/',
            '6/2',
            '6/24',
            '6/24/',
            '6/24/2',
            '6/24/20',
            '6/24/201',
            '6/24/2016',
        ];

        const required = true;
        const value = '1/1/2016';

        const component = mount(<DateInput required={required} value={value} />);

        steps.forEach((step) => {
            component.find('input').simulate('change', {
                target: { value: step }
            });

            expect(component.find('input').props().value).to.equal(step, step);
        });
    });

    it('should maintain the correct value at each step when entering an invalid date', () => {
        const steps = [
            '',
            'a',
            'a ',
            'a b',
            'a bi',
            'a big',
            'a big ',
            'a big r',
            'a big re',
            'a big red',
            'a big red ',
            'a big red t',
            'a big red tr',
            'a big red tru',
            'a big red truc',
            'a big red truck',
        ];

        const required = true;
        const value = '1/1/2016';

        const component = mount(<DateInput required={required} value={value} />);

        steps.forEach((step) => {
            component.find('input').simulate('change', {
                target: { value: step }
            });

            expect(component.find('input').props().value).to.equal(step, step);
        });
    });

    it('should maintain the correct value at each step when deleting the current value', () => {
        const steps = [
            '6/24/2016',
            '6/24/201',
            '6/24/20',
            '6/24/2',
            '6/24/',
            '6/24',
            '6/2',
            '6/',
            '6',
            '',
        ];

        const required = true;
        const value = '6/24/2016';

        const component = mount(<DateInput required={required} value={value} />);

        steps.forEach((step) => {
            component.find('input').simulate('change', {
                target: { value: step }
            });

            expect(component.find('input').props().value).to.equal(step, step);
        });
    });

});

/* *****************************************************************************
the onChange handler for the DateInput component
    should not be called on initialization
    should be called on edit when the value has changed
    should not be called on edit when the value has not changed
    should be called on blur when the value has changed
    should not be called on blur when the value has not changed
*/
describe('the onChange handler for the DateInput component', () => {

    it('should not be called on initialization', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '6/24/2016';

        mount(<DateInput required={required} value={value} onChange={onChange} />);

        expect(onChange.callCount).to.equal(0, 'callcount');
    });

    it('should be called on edit when the value has changed', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '6/24/2016';

        const newValue = '6/25/2016';

        const component = mount(
            <DateInput required={required} value={value} onChange={onChange} />
        );

        expect(onChange.callCount).to.equal(0, 'callcount');

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1, 'callcount');
        expect(onChange.calledWith(newValue)).to.equal(true, 'called with');
    });

    it('should not be called on edit when the value has not changed', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '6/24/2016';

        const newValue = value;

        const component = mount(
            <DateInput required={required} value={value} onChange={onChange} />
        );

        expect(onChange.callCount).to.equal(0, 'callcount');

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(0, 'callcount');
    });

    it('should be called on blur when the value has changed', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '6/24/2016';

        const newValue = '6/25/2016';

        const component = mount(
            <DateInput required={required} value={value} onChange={onChange} />
        );

        expect(onChange.callCount).to.equal(0, 'callcount');

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(1, 'callcount');
        expect(onChange.calledWith(newValue)).to.equal(true, 'called with');
    });

    it('should not be called on blur when the value has not changed', () => {
        const onChange = sinon.spy();

        const required = true;
        const value = '6/24/2016';

        const newValue = value;

        const component = mount(
            <DateInput required={required} value={value} onChange={onChange} />
        );

        expect(onChange.callCount).to.equal(0, 'callcount');

        component.find('input').simulate('blur', {
            target: { value: newValue }
        });

        expect(onChange.callCount).to.equal(0, 'callcount');
    });

});

/* *****************************************************************************
the onValidation handler for the DateInput component
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
describe('the onValidation handler for the DateInput component', () => {

    const description = 'a component';
    const expectedMessage = `${description} is not a valid date`;

    it('should be called on initialization with required=true, value=valid', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '6/24/2016';

        mount(<DateInput required={required} value={value} onValidation={onValidation} />);

        expect(onValidation.callCount).to.equal(1, 'callcount');
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(true, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(null, 'args[0][2]');
    });

    it('should be called on initialization with required=true, value=invalid', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = 'not a date';

        mount(
            <DateInput
                description={description}
                required={required}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1, 'callcount');
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(false, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(expectedMessage, 'args[0][2]');
    });

    it('should be called on initialization with required=true, value=blank', () => {
        const onValidation = sinon.spy();

        const required = true;
        const value = '';

        mount(
            <DateInput
                description={description}
                required={required}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1, 'callcount');
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(false, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(expectedMessage, 'args[0][2]');
    });

    it('should be called on initialization with required=false, value=valid', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '11/3/2014';

        mount(
            <DateInput
                description={description}
                required={required}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1, 'callcount');
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(true, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(null, 'args[0][2]');
    });

    it('should be called on initialization with required=false, value=invalid', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = 'another non-date';

        mount(
            <DateInput
                description={description}
                required={required}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1, 'callcount');
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(false, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(expectedMessage, 'args[0][2]');
    });

    it('should be called on initialization with required=false, value=blank', () => {
        const onValidation = sinon.spy();

        const required = false;
        const value = '';

        mount(
            <DateInput
                description={description}
                required={required}
                value={value}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1, 'callcount');
        expect(onValidation.args[0][0]).to.equal(false, 'args[0][0]');
        expect(onValidation.args[0][1]).to.equal(true, 'args[0][1]');
        expect(onValidation.args[0][2]).to.equal(null, 'args[0][2]');
    });

    it('should not be called after change without prior blur event', () => {
        const onValidation = sinon.spy();

        const required = true;
        const initialValue = '3/6/2016';
        const finalValue = '6/8/2019';

        const component = mount(
            <DateInput
                description={description}
                required={required}
                value={initialValue}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1, 'callcount');

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(onValidation.callCount).to.equal(1, 'callcount');
    });

    it('should be called on blur event', () => {
        const onValidation = sinon.spy();

        const required = true;
        const initialValue = '3/6/2016';
        const finalValue = '6/8/2019';

        const component = mount(
            <DateInput
                description={description}
                required={required}
                value={initialValue}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1, 'callcount');

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(onValidation.callCount).to.equal(2, 'callcount');
        expect(onValidation.args[1][0]).to.equal(true, 'args[1][0]');
        expect(onValidation.args[1][1]).to.equal(true, 'args[1][1]');
        expect(onValidation.args[1][2]).to.equal(null, 'args[1][2]');
    });

    it('should be called after change following a previous blur event', () => {
        const onValidation = sinon.spy();

        const required = true;
        const initialValue = '3/6/2016';
        const secondValue = '2/27/2011';
        const finalValue = 'whoops!';

        const component = mount(
            <DateInput
                description={description}
                required={required}
                value={initialValue}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1, 'callcount 1');

        component.find('input').simulate('blur', {
            target: { value: secondValue }
        });

        expect(onValidation.callCount).to.equal(2, 'callcount 2');

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(onValidation.callCount).to.equal(3, 'callcount 3');
        expect(onValidation.args[2][0]).to.equal(true, 'args[2][0]');
        expect(onValidation.args[2][1]).to.equal(false, 'args[2][1]');
        expect(onValidation.args[2][2]).to.equal(expectedMessage, 'args[2][2]');
    });

    it('should be called with a custom message on blur event with ' +
        'validationMessage=something', () => {
        const onValidation = sinon.spy();

        const required = true;
        const validationMessage = 'this is my custom message';
        const initialValue = '3/6/2016';
        const secondValue = '2/27/2011';
        const finalValue = 'whoops!';

        const component = mount(
            <DateInput
                description={description}
                required={required}
                validationMessage={validationMessage}
                value={initialValue}
                onValidation={onValidation}
            />
        );

        expect(onValidation.callCount).to.equal(1, 'callcount 1');

        component.find('input').simulate('blur', {
            target: { value: secondValue }
        });

        expect(onValidation.callCount).to.equal(2, 'callcount 2');

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(onValidation.callCount).to.equal(3, 'callcount 3');
        expect(onValidation.args[2][0]).to.equal(true, 'args[2][0]');
        expect(onValidation.args[2][1]).to.equal(false, 'args[2][1]');
        expect(onValidation.args[2][2]).to.equal(validationMessage, 'args[2][2]');
    });

});

/* *****************************************************************************
the basic markup of the DateInput component
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
    should have the readOnly property on the input when readOnly=true
    should not have the readOnly property on the input when readOnly=false
    should have the correct label widths when labelColumns is set
    should have the correct select widths when inputColumns is set
*/
describe('the basic markup of the DateInput component', () => {

    it('should be a div.form-group', () => {
        const component = shallow(<DateInput />);

        expect(component.is('div.form-group')).to.equal(true);
    });

    it('should include an input[type="text"]', () => {
        const component = shallow(<DateInput />);

        expect(component.find('input[type="text"]').length).to.equal(1);
    });

    it('should include an input.form-control', () => {
        const component = shallow(<DateInput />);

        expect(component.find('input.form-control').length).to.equal(1);
    });

    it('should include a label with the appropriate text if a label is specified', () => {
        const label = 'this is silly';

        const component = shallow(<DateInput label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().label).to.equal(label);
    });

    it('should include a placeholder if a placeholder is specified', () => {
        const placeholder = 'this is silly';

        const component = shallow(<DateInput placeholder={placeholder} />);

        expect(component.find('input').props().placeholder).to.equal(placeholder);
    });

    it('should include a label with the the required flag if a label is ' +
        'specified & required is set', () => {
        const required = true;
        const label = 'this is silly';

        const component = shallow(<DateInput required={required} label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().required).to.equal(required);

    });

    it('should not include a label with the the required flag if a label is ' +
        'specified & required is not set', () => {
        const required = false;
        const label = 'this is silly';

        const component = shallow(<DateInput required={required} label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().required).to.equal(required);
    });

    it('should not include a label with the the required flag if a label is ' +
        'not specified & required is set', () => {
        const required = true;

        const component = shallow(<DateInput required={required} />);

        expect(component.find('Label').length).to.equal(0);
    });

    it('should have the readOnly property on the input when readOnly=true', () => {
        const readOnly = true;

        const component = shallow(<DateInput readOnly={readOnly} />);

        expect(component.find('input').props().readOnly).to.equal(readOnly);
    });

    it('should not have the readOnly property on the input when readOnly=false', () => {
        const readOnly = false;

        const component = shallow(<DateInput readOnly={readOnly} />);

        expect(component.find('input').props().readOnly).to.equal(readOnly);
    });

    it('should have the correct label widths when labelColumns is set', () => {
        const label = 'my label';
        const columns = { xs: 10, md: 8 };
        const expectedClass = 'col-xs-10 col-md-8';

        const component = shallow(<DateInput label={label} labelColumns={columns} />);

        expect(component.find('Label').props().className).to.equal(expectedClass);
    });

    it('should have the correct select widths when inputColumns is set', () => {
        const label = 'my label';
        const columns = { xs: 10, md: 8 };
        const expectedClass = '.col-xs-10.col-md-8';

        const component = shallow(<DateInput label={label} inputColumns={columns} />);

        expect(component.find(`div${expectedClass} input`).length).to.equal(1);
    });

});

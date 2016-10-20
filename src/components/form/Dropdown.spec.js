// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render, mount } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';

import Form from '../Form';

const expect = chai.expect;

/* eslint-disable no-unused-vars */
const debug = (component) => {
    console.info('------------------------------------------------------------');
    console.info(component.debug());
    console.info('------------------------------------------------------------');
};
/* eslint-enable no-unused-vars */

/* *****************************************************************************
a Form component containing a Dropdown
    should include a <Form.Dropdown> as a child
    should be a select.form-control
    should have the options specified in the `options` prop
    should have an empty set of options if options=[]
    should not include a label if none was specified
    should include a label if one was specified
    should select a specific value when value is set
    should select the first item when value is not set
    should select the first item when value is set to an invalid value
    should have a label.col-xs-3 when form is horizontal and labelColumns=3
    should have a div.col-xs-9 when form is horizontal and labelColumns=3
    should have the appropriate optgroups when options is an object
    should be disabled when disabled flag set
    should not be disabled when disabled flag no set
*/
describe('a Form component containing a Dropdown', () => {

    it('should include a <Form.Dropdown> as a child', () => {
        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
        ];

        const component = shallow(
            <Form>
                <Form.Dropdown options={options} />
            </Form>
        );

        expect(component.find(Form.Dropdown)).to.have.length(1);
    });

    it('should be a select.form-control', () => {
        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
        ];

        const component = render(
            <Form>
                <Form.Dropdown options={options} />
            </Form>
        );

        expect(component.find('select.form-control')).to.have.length(1);
    });

    it('should have the options specified in the `options` prop', () => {

        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
        ];

        const component = render(
            <Form>
                <Form.Dropdown options={options} />
            </Form>
        );

        expect(component.find('option')).to.have.length(options.length, 'options count');

        options.forEach((opt) => {
            expect(component.find(`option[value="${opt.value}"]`))
                .to.have.length(1, `value=${opt.value}`);
            expect(component.find(`option[value="${opt.value}"]`).text())
                .to.equal(opt.name, `name=${opt.name}`);

        });
    });

    it('should have an empty set of options if options=[]', () => {

        const options = [];

        const component = render(
            <Form>
                <Form.Dropdown options={options} />
            </Form>
        );

        expect(component.find('option')).to.have.length(options.length, 'options count');
    });

    it('should not include a label if none was specified', () => {
        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
        ];

        const component = render(
            <Form>
                <Form.Dropdown options={options} />
            </Form>
        );

        expect(component.find('label')).to.have.length(0);
    });

    it('should include a label if one was specified', () => {
        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
        ];

        const label = 'some label';

        const component = render(
            <Form>
                <Form.Dropdown options={options} label={label} />
            </Form>
        );

        expect(component.find('label')).to.have.length(1);
        expect(component.find('label').text()).to.equal(label);
    });

    it('should select a specific value when value is set', () => {
        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
            { value: '3', name: 'three' },
        ];

        const value = '2';

        const component = mount(
            <Form>
                <Form.Dropdown options={options} value={value} />
            </Form>
        );

        expect(component.find('select').props().value).to.equal(value);
    });

    it('should select the first item when value is not set', () => {
        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
            { value: '3', name: 'three' },
        ];

        const component = mount(
            <Form>
                <Form.Dropdown options={options} />
            </Form>
        );

        expect(component.find('select').props().value).to.equal(options[0].value);
    });

    it('should select the first item when value is set to an invalid value', () => {
        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
            { value: '3', name: 'three' },
        ];

        const value = '9';

        const component = mount(
            <Form>
                <Form.Dropdown options={options} value={value} />
            </Form>
        );

        expect(component.find('select').props().value).to.equal(options[0].value);
    });

    it('should have a label.col-xs-3 when form is horizontal and labelColumns=3', () => {

        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
            { value: '3', name: 'three' },
        ];

        const label = 'peter piper';
        const columns = 3;

        const value = 2;

        const component = mount(
            <Form horizontal labelColumns={columns}>
                <Form.Dropdown label={label} options={options} value={value} />
            </Form>
        );

        expect(component.find('div.form-horizontal')).to.have.length(1, 'form-horizontal');
        expect(component.find('label.control-label').props().className)
            .to.contain('col-xs-3', 'col-xs-3');
    });

    it('should have a div.col-xs-9 when form is horizontal and labelColumns=3', () => {

        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
            { value: '3', name: 'three' },
        ];

        const label = 'peter piper';
        const columns = 3;

        const value = 2;

        const component = mount(
            <Form horizontal labelColumns={columns}>
                <Form.Dropdown label={label} options={options} value={value} />
            </Form>
        );

        expect(component.find('div.form-horizontal')).to.have.length(1, 'form-horizontal');
        expect(component.find('div.form-dropdown-columns').props().className)
            .to.contain('col-xs-9', 'col-xs-9');
    });

    it('should have the appropriate optgroups when options is an object', () => {

        const options = {
            'Group 1': [
                { value: '1', name: 'one' },
                { value: '2', name: 'two' },
            ],
            'Group 2': [
                { value: '3', name: 'three' },
            ],
        };

        const label = 'peter piper';
        const value = 2;

        const component = mount(
            <Form>
                <Form.Dropdown label={label} options={options} value={value} />
            </Form>
        );

        expect(component.find('select optgroup')).to.have.length(2, 'optgroup');
        expect(component.find('select optgroup').at(0).props().label)
            .to.equal('Group 1', 'optgroup 1 text');
        expect(component.find('select optgroup').at(1).props().label)
            .to.equal('Group 2', 'optgroup 2 text');
        expect(component.find('select optgroup').at(0).find('option'))
            .to.have.length(2, 'optgroup 1 options');
        expect(component.find('select optgroup').at(1).find('option'))
            .to.have.length(1, 'optgroup 1 options');
    });
});

/* *****************************************************************************
the Dropdown element
    should call onChange with the correct value on value change to a valid value
    should call onChange with the first option on value change to a invalid value
    should call onChange with the correct value on value change to a valid value
        from an optgroup
    should call onChange ON INITIALIZATION with the first option (options=array)
        when value is undefined
    should call onChange ON INITIALIZATION with the first option
        (options=object) when value is undefined
*/
describe('the Dropdown element', () => {

    it('should call onChange with the correct value on value change to a valid value', () => {

        const onChange = sinon.spy();

        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
            { value: '3', name: 'three' },
        ];

        const initialValue = '2';

        const finalValue = '3';

        const component = mount(
            <Form>
                <Form.Dropdown options={options} value={initialValue} onChange={onChange} />
            </Form>
        );

        component.find('select').simulate('change', {
            target: { value: finalValue }
        });

        expect(onChange.callCount).to.equal(1);
        expect(onChange.calledWith(finalValue));
    });

    it('should call onChange with the first option on value change to a invalid value', () => {

        const onChange = sinon.spy();

        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
            { value: '3', name: 'three' },
        ];

        const initialValue = '2';

        const finalValue = '9';

        const component = mount(
            <Form>
                <Form.Dropdown options={options} value={initialValue} onChange={onChange} />
            </Form>
        );

        component.find('select').simulate('change', {
            target: { value: finalValue }
        });

        expect(onChange.callCount).to.equal(1);
        expect(onChange.args[0][0]).to.equal(options[0].value);
    });

    it('should call onChange with the correct value on value change to a ' +
        'valid value from an optgroup', () => {

        const onChange = sinon.spy();

        const options = {
            'Group 1': [
                { value: '1', name: 'one' },
                { value: '2', name: 'two' },
            ],
            'Group 2': [
                { value: '3', name: 'three' },
            ],
        };

        const initialValue = '2';

        const finalValue = '3';

        const component = mount(
            <Form>
                <Form.Dropdown options={options} value={initialValue} onChange={onChange} />
            </Form>
        );

        component.find('select').simulate('change', {
            target: { value: finalValue }
        });

        expect(onChange.callCount).to.equal(1);
        expect(onChange.args[0][0]).to.equal(options['Group 2'][0].value);
    });

    it('should call onChange ON INITIALIZATION with the first option ' +
        '(options=array) when value is undefined', () => {

        const onChange = sinon.spy();

        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
            { value: '3', name: 'three' },
        ];

        mount(
            <Form>
                <Form.Dropdown options={options} onChange={onChange} />
            </Form>
        );

        expect(onChange.callCount).to.equal(1);
        expect(onChange.args[0][0]).to.equal(options[0].value);
    });

    it('should call onChange ON INITIALIZATION with the first option ' +
        '(options=object) when value is undefined', () => {

        const onChange = sinon.spy();

        const options = {
            'Group 1': [
                { value: '1', name: 'one' },
                { value: '2', name: 'two' },
            ],
            'Group 2': [
                { value: '3', name: 'three' },
            ],
        };

        mount(
            <Form>
                <Form.Dropdown options={options} onChange={onChange} />
            </Form>
        );

        expect(onChange.callCount).to.equal(1);
        expect(onChange.args[0][0]).to.equal(options['Group 1'][0].value);
    });

});

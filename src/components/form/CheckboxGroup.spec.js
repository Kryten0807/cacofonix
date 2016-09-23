// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
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
a Form component containing a CheckboxGroup
    should include a <Form.CheckboxGroup> as a child
    should contain a div.form-group
    should contain a label if the label prop is set
    should not contain a label if the label prop is not set
    should contain a div.checkbox for each option
    should contain a label for each option
    should contain an input[type="checkbox"] for each option
    should contain a span with the option name for each option
*/
describe('a Form component containing a CheckboxGroup', () => {

    const options = [
        { value: '1', name: 'One' },
        { value: '2', name: 'Two' },
        { value: '3', name: 'Three' },
    ];

    it('should include a <Form.CheckboxGroup> as a child', () => {
        const component = shallow(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find(Form.CheckboxGroup)).to.have.length(1);
    });

    it('should contain a div.form-group', () => {
        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.form-group')).to.have.length(1);
    });

    it('should contain a label if the label prop is set', () => {

        const label = 'humpty dumpty';

        const component = mount(
            <Form>
                <Form.CheckboxGroup label={label} options={options} />
            </Form>
        );

        expect(component.find('label.checkboxgroup')).to.have.length(1);
        expect(component.find('label.checkboxgroup').text()).to.equal(label);
    });

    it('should not contain a label if the label prop is not set', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('label.checkboxgroup')).to.have.length(0);
    });

    it('should contain a div.checkbox for each option', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.checkbox')).to.have.length(options.length);
    });

    it('should contain a label for each option', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.checkbox label')).to.have.length(options.length);
    });

    it('should contain an input[type="checkbox"] for each option', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.checkbox input[type="checkbox"]'))
            .to.have.length(options.length);
        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().value)
            .to.equal(options[0].value);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().value)
            .to.equal(options[1].value);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().value)
            .to.equal(options[2].value);
    });

    it('should contain a span with the option name for each option', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.checkbox span')).to.have.length(options.length);
        expect(component.find('div.checkbox span').at(0).text()).to.equal(options[0].name);
        expect(component.find('div.checkbox span').at(1).text()).to.equal(options[1].name);
        expect(component.find('div.checkbox span').at(2).text()).to.equal(options[2].name);

    });

});

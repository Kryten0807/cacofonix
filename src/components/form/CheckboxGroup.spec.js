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

        expect(component.find('label')).to.have.length(1);
        expect(component.find('label').text()).to.equal(label);
    });

    // it('should not contain a label if the label prop is not set', () => {});

    // it('should contain a div.checkbox for each option', () => {});

    // it('should contain a label for each option', () => {});

    // it('should contain an input[type="checkbox"] for each option', () => {});

    // it('should contain a span with the option name for each option', () => {});

});

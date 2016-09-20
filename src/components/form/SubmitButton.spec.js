// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render, mount } from 'enzyme';
import chai from 'chai';
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
a Form component containing a SubmitButton
    should include a <Form.SubmitButton> as a child
    should be a button.btn.btn-default
    should have the label specified by the `label` property
    should have the default label if no `label` property specified
*/
describe('a Form component containing a SubmitButton', () => {

    it('should include a <Form.SubmitButton> as a child', () => {
        const component = shallow(
            <Form>
                <Form.SubmitButton />
            </Form>
        );

        expect(component.find(Form.SubmitButton)).to.have.length(1);
    });

    it('should be a button.btn.btn-default', () => {
        const component = render(
            <Form>
                <Form.SubmitButton />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn-default')).to.have.length(1, 'button.btn.btn-default');
    });

    it('should have the label specified by the `label` property', () => {
        const label = 'my label';

        const component = render(
            <Form>
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn-default').text()).to.equal(label);
    });

    it('should have the default label if no `label` property specified', () => {
        const component = render(
            <Form>
                <Form.SubmitButton />
            </Form>
        );

        expect(component.find('button.btn-default').text()).to.equal('Submit');
    });

});

/* *****************************************************************************
given a Form containing a required TextInput and a SubmitButton
    after initialization with a valid value, the SubmitButton should be enabled
    after initialization with an invalid value, the SubmitButton should be disabled
    after changing from invalid to valid, the SubmitButton should be enabled
    after changing from valid to invalid, the SubmitButton should be disabled
*/
describe('given a Form containing a required TextInput and a SubmitButton', () => {

    it('after initialization with a valid value, the SubmitButton should be enabled', () => {
        const label = 'my label';

        const value = 'a valid value';

        const component = mount(
            <Form>
                <Form.TextInput required value={value} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn-default').props().disabled).to.equal(false);
    });

    it('after initialization with an invalid value, the SubmitButton should be disabled', () => {
        const label = 'my label';

        const value = '';

        const component = mount(
            <Form>
                <Form.TextInput required value={value} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn-default').props().disabled).to.equal(true);
    });

    it('after changing from invalid to valid, the SubmitButton should be enabled', () => {
        const label = 'my label';

        const initialValue = '';

        const finalValue = 'I wish I were an Oscar Meyer weiner';

        const component = mount(
            <Form>
                <Form.TextInput required value={initialValue} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn-default').props().disabled).to.equal(true);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur');

        expect(component.find('button.btn-default').props().disabled).to.equal(false);
    });

    it('after changing from valid to invalid, the SubmitButton should be disabled', () => {
        const label = 'my label';

        const initialValue = 'I wish I were an Oscar Meyer weiner';

        const finalValue = '';

        const component = mount(
            <Form>
                <Form.TextInput required value={initialValue} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn-default').props().disabled).to.equal(false);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur');

        expect(component.find('button.btn-default').props().disabled).to.equal(true);
    });

});

/* *****************************************************************************
a SubmitButton
    should call onClick when the button in a form is clicked
*/

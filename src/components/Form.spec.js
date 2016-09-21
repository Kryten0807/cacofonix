// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import Form from './Form';

const expect = chai.expect;

/* eslint-disable no-unused-vars */
const debug = (component) => {
    console.info('------------------------------------------------------------');
    console.info(component.debug());
    console.info('------------------------------------------------------------');
};
/* eslint-enable no-unused-vars */

/* *****************************************************************************
the Form component
    should be a form element
    should be a form.form-inline element when inline=true
    should be a form.form-horizontal element when horizontal=true
*/
describe('the Form component', () => {

    it('should be a form element', () => {
        const component = shallow(<Form />);

        expect(component.is('form')).to.equal(true);
        expect(component.is('form.form-inline')).to.equal(false);
        expect(component.is('form.form-horizontal')).to.equal(false);
    });

    it('should be a form.form-inline element', () => {
        const component = shallow(<Form inline />);

        expect(component.is('form.form-inline')).to.equal(true);
        expect(component.is('form.form-horizontal')).to.equal(false);
    });

    it('should be a form.form-horizontal element', () => {
        const component = shallow(<Form horizontal />);

        expect(component.is('form.form-inline')).to.equal(false);
        expect(component.is('form.form-horizontal')).to.equal(true);
    });

});

/* *****************************************************************************
the Form component
    should not show the alert message if initialized with a mix of valid & invalid values
    should not show the alert message if initialized with all valid values
    should not show the alert message if initialized with all invalid values
*/
describe('the Form component', () => {

    it('should not show the alert message if initialized with a mix of valid & invalid values', () => {
        const label = 'my label';

        const invalid = '';

        const valid = 'triceratops';

        const component = mount(
            <Form>
                <Form.TextInput required value={invalid} />
                <Form.TextInput required value={invalid} />
                <Form.TextInput required value={valid} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        debug(component);

        expect(component.find('Alert')).to.have.length(0);
    });
});

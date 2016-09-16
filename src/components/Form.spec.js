// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render } from 'enzyme';
import chai from 'chai';
import Form from './Form';

const expect = chai.expect;

/* *****************************************************************************
the Form component
    should be a <form> element
*/
describe('the Form component', () => {

    it('should be a <form> element', () => {
        const component = shallow(<Form />);

        expect(component.is('form')).to.equal(true);
    });

});

/* *****************************************************************************
a Form component with a TextInput element
    should include a <Form.TextInput> as a child
*/
describe('a Form component with a TextInput element', () => {

    it('should include a <Form.TextInput> as a child', () => {
        const component = shallow(
            <Form>
                <Form.TextInput />
            </Form>
        );

        expect(component.find(Form.TextInput)).to.have.length(1);
    });
});

/* *****************************************************************************
when initializing a Form with a required TextInput
    the global validation message should not be displayed with a valid value
    the component validation message should not be displayed with a valid value
    the global validation message should not be displayed with an invalid value
    the component validation message should not be displayed with an invalid value
*/
describe('when initializing a Form with a required TextInput', () => {

    // it('the validation message should not be displayed with a valid value', () => {});

    // it('the component validation message should not be displayed with a valid value', () => {});

    // it('the validation message should not be displayed with an invalid value', () => {});

    // it('the component validation message should not be displayed with an invalid value', () => {});

});

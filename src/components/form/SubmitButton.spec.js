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

/* *****************************************************************************
a Form component containing a SubmitButton
    should include a <Form.SubmitButton> as a child
    should be a button.btn.btn-default
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

});

/* *****************************************************************************
given a Form containing a required TextInput and a SubmitButton
    after initialization with a valid value, the SubmitButton should be enabled
    after initialization with an invalid value, the SubmitButton should be disabled
    after changing from invalid to valid, the SubmitButton should be enabled
    after changing from valid to invalid, the SubmitButton should be disabled
*/

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

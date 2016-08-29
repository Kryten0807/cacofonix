// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render } from 'enzyme';
import chai from 'chai';
import NumericInput from './NumericInput';

const expect = chai.expect;

/* *****************************************************************************
in terms of basic markup, the NumericInput component
    should be a div.form-group
    should include an input[type="text"]
    should include an input.form-control
    should include a label with the appropriate text if a label is specified
    should include a placeholder if a placeholder is specified
*/
describe('in terms of basic markup, the NumericInput component', () => {

    it('should be a div.form-group', () => {
        const component = shallow(<NumericInput />);

        expect(component.is('div.form-group')).to.equal(true);
    });

    it('should include an input[type="text"]', () => {
        const component = render(<NumericInput />);

        expect(component.find('input').length).to.equal(1);
        expect(component.find('input[type="text"]').length).to.equal(1);
    });

    // it('should include an input.form-control', () => {});

    // it('should include a label with the appropriate text if a label is specified', () => {});

    // it('should include a placeholder if a placeholder is specified', () => {});

});

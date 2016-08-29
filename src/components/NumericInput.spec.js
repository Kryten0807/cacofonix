// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
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
        const component = shallow(<NumericInput />);

        expect(component.find('input').length).to.equal(1);
        expect(component.find('input[type="text"]').length).to.equal(1);
    });

    it('should include an input.form-control', () => {
        const component = shallow(<NumericInput />);

        expect(component.find('input').length).to.equal(1);
        expect(component.find('input.form-control').length).to.equal(1);
    });

    it('should include a label with the appropriate text if a label is specified', () => {
        const label = 'some label';

        const component = shallow(<NumericInput label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().label).to.equal(label);
    });

    it('should include a placeholder if a placeholder is specified', () => {
        const placeholder = 'a number goes here';

        const component = shallow(<NumericInput placeholder={placeholder} />);

        expect(component.find('input').length).to.equal(1);
        expect(component.find('input').props().placeholder).to.equal(placeholder);
    });

});

import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import Label from './Label';

const expect = chai.expect;

// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

/* *****************************************************************************
the Label component
    should have a <label> element with the correct classes
    should contain the correct text
    should include the "required" markup when required=true
    should not include the "required" markup when required=false
    should not include the "required" markup when required is not set
*/
describe('the Label component', () => {

    const label = 'some label';

    it('should have a <label> element with the correct classes', () => {
        const component = shallow(<Label />);

        expect(component.is('label.control-label')).to.equal(true);
    });

    it('should contain the correct text', () => {
        const component = shallow(<Label label={label} />);

        expect(component.find('label').text()).to.equal(label);
    });

    it('should include the "required" markup when required=true', () => {
        const required = true;

        const component = shallow(<Label required={required} label={label} />);

        expect(component.find('sup').length).to.equal(1);
        expect(component.find('i.glyphicon').length).to.equal(1);
    });

    it('should not include the "required" markup when required=false', () => {
        const required = false;

        const component = shallow(<Label required={required} label={label} />);

        expect(component.find('sup').length).to.equal(0);
        expect(component.find('i.glyphicon').length).to.equal(0);
    });

    it('should not include the "required" markup when required is not set', () => {
        const component = shallow(<Label label={label} />);

        expect(component.find('sup').length).to.equal(0);
        expect(component.find('i.glyphicon').length).to.equal(0);
    });

});

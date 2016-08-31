// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import DateInput from './DateInput';

const expect = chai.expect;

/* *****************************************************************************
the onValidation handler for the DateInput component
    should be called on initialization with required=true, value=valid
    should be called on initialization with required=true, value=invalid
    should be called on initialization with required=true, value=blank
    should be called on initialization with required=false, value=valid
    should be called on initialization with required=false, value=invalid
    should be called on initialization with required=false, value=blank
    should not be called after change without prior blur event
    should be called on blur event
    should be called after change following a previous blur event
    should be called with a custom message on blur event with validationMessage=something
*/

/* *****************************************************************************
the basic markup of the DateInput component
    should be a div.form-group
    should include an input[type="text"]
    should include an input.form-control
    should include a label with the appropriate text if a label is specified
    should include a placeholder if a placeholder is specified
    should include a label with the the required flag if a label is specified & required is set
    should not include a label with the the required flag if a label is
        specified & required is not set
    should not include a label with the the required flag if a label is not
        specified & required is set
    should have the readOnly property on the input when readOnly=true
    should not have the readOnly property on the input when readOnly=false
    should have the correct label widths when labelColumns is set
    should have the correct select widths when inputColumns is set
*/
describe('the basic markup of the DateInput component', () => {

    it('should be a div.form-group', () => {
        const component = shallow(<DateInput />);

        expect(component.is('div.form-group')).to.equal(true);
    });

    it('should include an input[type="text"]', () => {
        const component = shallow(<DateInput />);

        expect(component.find('input[type="text"]').length).to.equal(1);
    });

    it('should include an input.form-control', () => {
        const component = shallow(<DateInput />);

        expect(component.find('input.form-control').length).to.equal(1);
    });

    it('should include a label with the appropriate text if a label is specified', () => {
        const label = 'this is silly';

        const component = shallow(<DateInput label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().label).to.equal(label);
    });

    it('should include a placeholder if a placeholder is specified', () => {
        const placeholder = 'this is silly';

        const component = shallow(<DateInput placeholder={placeholder} />);

        expect(component.find('input').props().placeholder).to.equal(placeholder);
    });

    it('should include a label with the the required flag if a label is specified & required is set', () => {
        const required = true;
        const label = 'this is silly';

        const component = shallow(<DateInput required={required} label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().required).to.equal(required);

    });

    it('should not include a label with the the required flag if a label is specified & required is not set', () => {
        const required = false;
        const label = 'this is silly';

        const component = shallow(<DateInput required={required} label={label} />);

        expect(component.find('Label').length).to.equal(1);
        expect(component.find('Label').props().required).to.equal(required);
    });

    it('should not include a label with the the required flag if a label is not specified & required is set', () => {
        const required = true;

        const component = shallow(<DateInput required={required} />);

        expect(component.find('Label').length).to.equal(0);
    });

    it('should have the readOnly property on the input when readOnly=true', () => {
        const readOnly = true;

        const component = shallow(<DateInput readOnly={readOnly} />);

        expect(component.find('input').props().readOnly).to.equal(readOnly);
    });

    it('should not have the readOnly property on the input when readOnly=false', () => {
        const readOnly = false;

        const component = shallow(<DateInput readOnly={readOnly} />);

        expect(component.find('input').props().readOnly).to.equal(readOnly);
    });

    it('should have the correct label widths when labelColumns is set', () => {
        const label = 'my label';
        const columns = { xs: 10, md: 8 };
        const expectedClass = 'col-xs-10 col-md-8';

        const component = shallow(<DateInput label={label} labelColumns={columns} />);

        expect(component.find('Label').props().className).to.equal(expectedClass);
    });

    it('should have the correct select widths when inputColumns is set', () => {
        const label = 'my label';
        const columns = { xs: 10, md: 8 };
        const expectedClass = '.col-xs-10.col-md-8';

        const component = shallow(<DateInput label={label} inputColumns={columns} />);

        expect(component.find(`div${expectedClass} input`).length).to.equal(1);
    });

});

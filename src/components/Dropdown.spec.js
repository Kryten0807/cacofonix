// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render } from 'enzyme';
import chai from 'chai';
import Dropdown from './Dropdown';

const expect = chai.expect;

/*
Dropdown Behaviour

+ when the component is initialized
    + no validation error message is displayed (`hasValidated` = false,
        `isValid` = true or false, depending)
    + the onValidation handler is called with `hasValidated` = false,
        `isValid` = true or false, `validationMessage` = whatever

+ when the user selects an item from the Dropdown
    + `hasValidated` is set to true
    + the validation error message is display as necessary
    + the onValidation callback is called
    + the onChange callback is called

+ when the user tabs or clicks out of the control
    + `hasValidated` is set to true
    + the validation error message is display as necessary
    + the onValidation callback is called
    + the onChange callback is called
*/

/*
on initialization, the Dropdown component
    should be a div.form-group
    should have a label, if label is set
    should not have a label, if label is not set
    should have a select.form-control
    should have the correct number of option elements (n+1) if includeNull=true
    should have the correct number of option elements (n) if includeNull=false
    should have a null option with the correct text when includeNull=true and nullName is set
    should have the correct option text for each option
*/
describe('on initialization, the Dropdown component', () => {

    const options = [
        { value: '1', name: 'one' },
        { value: '2', name: 'two' },
    ];

    it('should be a div.form-group', () => {
        const component = shallow(<Dropdown options={options} />);

        expect(component.is('div.form-group')).to.equal(true);
    });

    it('should have a label, if label is set', () => {
        const label = 'wtf?';

        const component = render(<Dropdown options={options} label={label} />);

        expect(component.find('label').length).to.equal(1);
        expect(component.find('label').text()).to.equal(label);
    });

    it('should not have a label, if label is not set', () => {

        const component = render(<Dropdown options={options} />);

        expect(component.find('label').length).to.equal(0);
    });

    it('should have a select.form-control', () => {

        const component = render(<Dropdown options={options} />);

        expect(component.find('select.form-control').length).to.equal(1);
    });

    it('should have the correct number of option elements (n+1) if includeNull=true', () => {

        const includeNull = true;

        const component = render(<Dropdown options={options} includeNull={includeNull} />);

        expect(component.find('select.form-control option').length).to.equal(options.length + 1);
    });

    it('should have the correct number of option elements (n) if includeNull=false', () => {

        const includeNull = false;

        const component = render(<Dropdown options={options} includeNull={includeNull} />);

        expect(component.find('select.form-control option').length).to.equal(options.length);
    });

    it('should have a null option with the correct text when includeNull=true ' +
        'and nullName is set', () => {

        const includeNull = true;

        const nullName = 'Select something, dammit!';

        const component = render(
            <Dropdown options={options} includeNull={includeNull} nullName={nullName} />
        );

        expect(component.find('select.form-control option').length).to.equal(options.length + 1);
        expect(component.find('select.form-control option[value=""]').text()).to.equal(nullName);
    });

    it('should have a null option with the default text when includeNull=true ' +
        'and nullName is not set', () => {

        const includeNull = true;

        const expectedName = 'Please select one';

        const component = render(<Dropdown options={options} includeNull={includeNull} />);

        expect(component.find('select.form-control option').length).to.equal(options.length + 1);
        expect(component.find('select.form-control option[value=""]').text())
            .to.equal(expectedName);
    });

    it('should have the correct option text for each option', () => {

        const includeNull = true;

        const expectedName = 'Please select one';

        const component = render(<Dropdown options={options} includeNull={includeNull} />);

        expect(component.find('option').length).to.equal(options.length + 1);
        expect(component.find('select option[value=""]').text()).to.equal(expectedName, '0');
        expect(component.find('select option[value="1"]').text()).to.equal(options[0].name, '1');
        expect(component.find('select option[value="2"]').text()).to.equal(options[1].name, '2');
    });


});

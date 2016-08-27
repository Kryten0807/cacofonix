// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import Dropdown from './Dropdown';

/*
Dropdown Behaviour

+ when the component is initialized
    + no validation error message is displayed (`hasValidated` = false, `isValid` = true or false, depending)
    + the onValidation handler is called with `hasValidated` = false, `isValid` = true or false, `validationMessage` = whatever

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
*/
describe('on initialization, the Dropdown component', () => {

    // it('should be a div.form-group', () => {});

    // it('should have a label, if label is set', () => {});

    // it('should not have a label, if label is not set', () => {});

    // it('should have a select.form-control', () => {});

    // it('should have the correct number of option elements (n+1) if includeNull=true', () => {});

    // it('should have the correct number of option elements (n) if includeNull=false', () => {});

});

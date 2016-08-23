import React from 'react';
import { mount } from 'enzyme';
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

    it('should have a <label> element with the correct classes', () => {});

    it('should contain the correct text', () => {});

    it('should include the "required" markup when required=true', () => {});

    it('should not include the "required" markup when required=false', () => {});

    it('should not include the "required" markup when required is not set', () => {});

});

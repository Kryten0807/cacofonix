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

    // it('should be a div.form-group', () => {});
    
    // it('should include an input[type="text"]', () => {});
    
    // it('should include an input.form-control', () => {});
    
    // it('should include a label with the appropriate text if a label is specified', () => {});
    
    // it('should include a placeholder if a placeholder is specified', () => {});
    
    // it('should include a label with the the required flag if a label is specified & required is set', () => {});
    
    // it('should not include a label with the the required flag if a label is specified & required is not set', () => {});
    
    // it('should not include a label with the the required flag if a label is not specified & required is set', () => {});
    
    // it('should have the readonly property on the input when readonly=true', () => {});
    
    // it('should not have the readonly property on the input when readonly=false', () => {});
    
    // it('should have the correct label widths when labelColumns is set', () => {});
    
    // it('should have the correct select widths when inputColumns is set', () => {});
    
});

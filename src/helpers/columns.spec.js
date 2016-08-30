// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import chai from 'chai';

import columns from './columns';

const expect = chai.expect;

/* *****************************************************************************
the columns function
    should return null when called with a null
    should return null when called with an empty string
    should return null when called with an empty array
    should return null when called with a non-empty array
    should return null when called with an empty object
    should return null when called with an object containing invalid keys
    should return the correct string for key = xs
    should return the correct string for key = sm
    should return the correct string for key = md
    should return the correct string for key = lg
    should return the correct string for a collection of keys
*/
describe('the columns function', () => {
    
    // it('should return null when called with a null', () => {});

    // it('should return null when called with an empty string', () => {});

    // it('should return null when called with an empty array', () => {});

    // it('should return null when called with a non-empty array', () => {});

    // it('should return null when called with an empty object', () => {});

    // it('should return null when called with an object containing invalid keys', () => {});

    // it('should return the correct string for key = xs', () => {});

    // it('should return the correct string for key = sm', () => {});

    // it('should return the correct string for key = md', () => {});

    // it('should return the correct string for key = lg', () => {});

    // it('should return the correct string for a collection of keys', () => {});

});

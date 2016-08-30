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
    should return empty string when called with a null
    should return empty string when called with an empty string
    should return empty string when called with an empty array
    should return empty string when called with a non-empty array
    should return empty string when called with an empty object
    should return empty string when called with an object containing invalid keys
    should return the correct string for key = xs
    should return the correct string for key = sm
    should return the correct string for key = md
    should return the correct string for key = lg
    should return the correct string for a collection of keys
*/
describe('the columns function', () => {

    it('should return empty string when called with a null', () => {
        expect(columns(null)).to.equal('');
    });

    it('should return empty string when called with an empty string', () => {
        expect(columns('')).to.equal('');
    });

    it('should return empty string when called with an empty array', () => {
        expect(columns([])).to.equal('');
    });

    it('should return empty string when called with a non-empty array', () => {
        expect(columns([1, 2, 3])).to.equal('');
    });

    it('should return empty string when called with an empty object', () => {
        expect(columns({})).to.equal('');
    });

    it('should return empty string when called with an object containing invalid keys', () => {
        expect(columns({
            this:  1,
            is:    2,
            not:   3,
            valid: 4,
        })).to.equal('');
    });

    it('should return the correct string for key = xs', () => {
        expect(columns({ xs: 1 })).to.equal('col-xs-1');
    });

    it('should return the correct string for key = sm', () => {
        expect(columns({ sm: 2 })).to.equal('col-sm-2');
    });

    it('should return the correct string for key = md', () => {
        expect(columns({ md: 3 })).to.equal('col-md-3');
    });

    it('should return the correct string for key = lg', () => {
        expect(columns({ lg: 4 })).to.equal('col-lg-4');
    });

    it('should return the correct string for a collection of keys', () => {
        expect(columns({
            xs: 12,
            md: 8,
            sm: 10,
            lg: 6,
        })).to.equal('col-xs-12 col-sm-10 col-md-8 col-lg-6');
    });

});

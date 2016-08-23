import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import Panel from './Panel';

const expect = chai.expect;

// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

/* *****************************************************************************
the Panel component
    should be a div.panel
    should contain a div.panel-heading if header is set
    should not contain a div.panel-heading if header is not set
    should contain a div.panel-body
    should include child elements inside the div.panel-body
*/

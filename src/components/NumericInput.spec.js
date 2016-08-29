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

// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import Alert from './Alert';

const expect = chai.expect;

/* *****************************************************************************
the Alert component
    should be a div.alert
    should be a div.alert.alert-danger when style="danger"
    should be a div.alert.alert-danger when style="error"
    should be a div.alert.alert-warning when style="warning"
    should be a div.alert.alert-warning when style="warn"
    should be a div.alert.alert-info when style="info"
    should be a div.alert.alert-success when style="success"
    should be a div.alert.alert-ok when style="ok"
    should be a div.alert-dismissible when dismissible=true
    should contain a button.close when dismissible=true
    should contain the appropriate child when included
    should contain the appropriate children when included
*/

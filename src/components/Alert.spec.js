// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render } from 'enzyme';
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
    should be a div.alert.alert-success when style="ok"
    should be a div.alert.alert-success when style is not set
    should not be a div.alert-dismissible when dismissible=false
    should be a div.alert-dismissible when dismissible=true
    should contain a button.close when dismissible=true
    should contain the appropriate child when included
    should contain the appropriate children when included
*/

describe('the Alert component', () => {

    it('should be a div.alert', () => {
        const component = shallow(<Alert />);

        expect(component.is('div.alert')).to.equal(true);
    });

    it('should be a div.alert.alert-danger when style="danger"', () => {
        const style = 'danger';

        const component = shallow(<Alert style={style} />);

        expect(component.is('div.alert.alert-danger')).to.equal(true);
    });

    it('should be a div.alert.alert-danger when style="error"', () => {
        const style = 'error';

        const component = shallow(<Alert style={style} />);

        expect(component.is('div.alert.alert-danger')).to.equal(true);
    });

    it('should be a div.alert.alert-warning when style="warning"', () => {
        const style = 'warning';

        const component = shallow(<Alert style={style} />);

        expect(component.is('div.alert.alert-warning')).to.equal(true);
    });

    it('should be a div.alert.alert-warning when style="warn"', () => {
        const style = 'warn';

        const component = shallow(<Alert style={style} />);

        expect(component.is('div.alert.alert-warning')).to.equal(true);
    });

    it('should be a div.alert.alert-info when style="info"', () => {
        const style = 'info';

        const component = shallow(<Alert style={style} />);

        expect(component.is('div.alert.alert-info')).to.equal(true);
    });

    it('should be a div.alert.alert-success when style="success"', () => {
        const style = 'success';

        const component = shallow(<Alert style={style} />);

        expect(component.is('div.alert.alert-success')).to.equal(true);
    });

    it('should be a div.alert.alert-success when style="ok"', () => {
        const style = 'ok';

        const component = shallow(<Alert style={style} />);

        expect(component.is('div.alert.alert-success')).to.equal(true);
    });

    it('should be a div.alert.alert-success when style is not set', () => {
        const component = shallow(<Alert />);

        expect(component.is('div.alert.alert-success')).to.equal(true);
    });

    it('should not be a div.alert-dismissible when dismissible=false', () => {
        const dismissible = false;

        const component = shallow(<Alert dismissible={dismissible} />);

        expect(component.is('div.alert.alert-dismissible')).to.equal(false);
    });

    it('should be a div.alert-dismissible when dismissible=true', () => {
        const dismissible = true;

        const component = shallow(<Alert dismissible={dismissible} />);

        expect(component.is('div.alert.alert-dismissible')).to.equal(true);
    });

    it('should contain a button.close when dismissible=true', () => {
        const dismissible = true;

        const component = render(<Alert dismissible={dismissible} />);

        expect(component.find('button.close').length).to.equal(1);
    });

    it('should contain the appropriate child when included', () => {
        const child = (<div className="child-1" />);

        const component = render(<Alert>{child}</Alert>);

        expect(component.find('div.alert div.child-1').length).to.equal(1);
    });

    it('should contain the appropriate children when included', () => {
        const children = [
            <div key="1" className="child-1" />,
            <div key="2" className="child-2" />,
            <div key="3" className="child-3" />,
        ];

        const component = render(<Alert>{children}</Alert>);

        expect(component.find('div.alert div.child-1').length).to.equal(1);
        expect(component.find('div.alert div.child-2').length).to.equal(1);
        expect(component.find('div.alert div.child-3').length).to.equal(1);
    });

});

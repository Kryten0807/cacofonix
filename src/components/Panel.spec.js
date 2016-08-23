import React from 'react';
import { shallow, render } from 'enzyme';
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
    should be a div.panel.panel-default
    should contain a div.panel-heading if header is set
    should not contain a div.panel-heading if header is not set
    should contain a div.panel-body
    should include child elements inside the div.panel-body
*/
describe('the Panel component', () => {

    it('should be a div.panel.panel-default', () => {
        const component = shallow(<Panel />);

        expect(component.is('div.panel.panel-default')).to.equal(true);
    });

    it('should contain a div.panel-heading if header is set', () => {
        const header = 'this is a header';

        const component = render(<Panel header={header} />);

        expect(component.find('div.panel div.panel-heading').length).to.equal(1, 'div.panel-heading');
        expect(component.find('div.panel div.panel-heading h3.panel-title').length).to.equal(1, 'h3.panel-title');
        expect(component.find('div.panel div.panel-heading h3.panel-title').text()).to.equal(header, 'h3.panel-title text');
    });

    it('should not contain a div.panel-heading if header is not set', () => {
        const component = render(<Panel />);

        expect(component.find('div.panel div.panel-heading').length).to.equal(0, 'div.panel-heading');
        expect(component.find('div.panel div.panel-heading h3.panel-title').length).to.equal(0, 'h3.panel-title');
    });

    it('should contain a div.panel-body', () => {
        const component = render(<Panel />);

        expect(component.find('div.panel div.panel-body').length).to.equal(1, 'div.panel-body');
    });

    it('should include child elements inside the div.panel-body', () => {
        const children = [
            <div key={1} className="child-1" />,
            <div key={2} className="child-2" />,
            <div key={3} className="child-3" />,
        ];

        const component = render(<Panel>{children}</Panel>);

        expect(component.find('div.panel div.panel-body div.child-1').length).to.equal(1);
        expect(component.find('div.panel div.panel-body div.child-2').length).to.equal(1);
        expect(component.find('div.panel div.panel-body div.child-3').length).to.equal(1);
    });

});

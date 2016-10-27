// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render, mount } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';

import Form from '../Form';

const expect = chai.expect;

/* eslint-disable no-unused-vars */
const debug = (component) => {
    console.info('------------------------------------------------------------');
    console.info(component.debug());
    console.info('------------------------------------------------------------');
};
/* eslint-enable no-unused-vars */

/* *****************************************************************************
a Form component containing a Button
    should include a <Form.Button> as a child
    should be a button.btn
    should have the text specified
    should have the child elements specified
    should be button.btn.btn-default when no style is provided
    should be button.btn.btn-danger when style=danger
    should be button.btn.btn-danger when style=error
    should be button.btn.btn-warning when style=warning
    should be button.btn.btn-warning when style=warn
    should be button.btn.btn-info when style=info
    should be button.btn.btn-success when style=success
    should be button.btn.btn-success when style=ok
    should be disabled if disabled=true
    should not be disabled if disabled=false
    should not be disabled if disabled is not set
    should not have a name if the name prop is not set
    should have the appropriate name if the name prop is set
*/
describe('a Form component containing a Button', () => {

    it('should include a <Form.Button> as a child', () => {
        const component = shallow(
            <Form>
                <Form.Button />
            </Form>
        );

        expect(component.find(Form.Button)).to.have.length(1);
    });

    it('should be a button.btn', () => {
        const component = render(
            <Form>
                <Form.Button />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn')).to.have.length(1, 'button.btn.btn-default');
    });

    it('should have the text specified', () => {

        const buttonText = 'this is my button text';

        const component = render(
            <Form>
                <Form.Button>{buttonText}</Form.Button>
            </Form>
        );

        expect(component.find('button.btn').text()).to.equal(buttonText);
    });

    it('should have the child elements specified', () => {

        const icon = <i className="fa fa-some-icon" />;

        const component = render(
            <Form>
                <Form.Button>{icon}</Form.Button>
            </Form>
        );

        expect(component.find('button.btn i.fa.fa-some-icon')).to.have.length(1);
    });


    it('should be button.btn.btn-default when no style is provided', () => {
        const component = render(
            <Form>
                <Form.Button />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-default'))
            .to.have.length(1, 'button.btn.btn-default');
    });

    it('should be button.btn.btn-danger when style=danger', () => {

        const style = 'danger';

        const component = render(
            <Form>
                <Form.Button style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-danger')).to.have.length(1, 'button.btn.btn-danger');
    });

    it('should be button.btn.btn-danger when style=error', () => {

        const style = 'error';

        const component = render(
            <Form>
                <Form.Button style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-danger')).to.have.length(1, 'button.btn.btn-danger');
    });

    it('should be button.btn.btn-warning when style=warning', () => {

        const style = 'warning';

        const component = render(
            <Form>
                <Form.Button style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-warning'))
            .to.have.length(1, 'button.btn.btn-warning');
    });

    it('should be button.btn.btn-warning when style=warn', () => {

        const style = 'warn';

        const component = render(
            <Form>
                <Form.Button style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-warning'))
            .to.have.length(1, 'button.btn.btn-warning');
    });

    it('should be button.btn.btn-info when style=info', () => {

        const style = 'info';

        const component = render(
            <Form>
                <Form.Button style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-info')).to.have.length(1, 'button.btn.btn-info');
    });

    it('should be button.btn.btn-success when style=success', () => {

        const style = 'success';

        const component = render(
            <Form>
                <Form.Button style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-success'))
            .to.have.length(1, 'button.btn.btn-success');
    });

    it('should be button.btn.btn-success when style=ok', () => {

        const style = 'ok';

        const component = render(
            <Form>
                <Form.Button style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-success'))
            .to.have.length(1, 'button.btn.btn-success');
    });

    it('should be disabled if disabled=true', () => {

        const disabled = true;

        const component = mount(
            <Form>
                <Form.Button disabled={disabled} />
            </Form>
        );

        expect(component.find('button').props().disabled).to.equal(true);
    });

    it('should not be disabled if disabled=false', () => {

        const disabled = false;

        const component = mount(
            <Form>
                <Form.Button disabled={disabled} />
            </Form>
        );

        expect(component.find('button').props().disabled).to.equal(false);
    });

    it('should not be disabled if disabled is not set', () => {

        const component = mount(
            <Form>
                <Form.Button />
            </Form>
        );

        expect(component.find('button').props().disabled).to.equal(false);
    });

    it('should not have a name if the name prop is not set', () => {

        const component = mount(
            <Form>
                <Form.Button />
            </Form>
        );

        expect(component.find('button').props().name).to.equal(undefined);
    });

    it('should have the appropriate name if the name prop is set', () => {

        const name = 'something';

        const component = mount(
            <Form>
                <Form.Button name={name} />
            </Form>
        );

        expect(component.find('button').props().name).to.equal(name);
    });

});

/* *****************************************************************************
a Button
    should call onClick when the button in a form is clicked
*/
describe('a Button', () => {

    it('should call onClick when the button in a form is clicked', () => {

        const onClick = sinon.spy();

        const component = mount(
            <Form>
                <Form.Button onClick={onClick} />
            </Form>
        );

        component.find('button').simulate('click');

        expect(onClick.callCount).to.equal(1);
    });
});

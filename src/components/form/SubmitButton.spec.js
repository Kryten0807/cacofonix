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
a Form component containing a SubmitButton
    should include a <Form.SubmitButton> as a child
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
*/
describe('a Form component containing a SubmitButton', () => {

    it('should include a <Form.SubmitButton> as a child', () => {
        const component = shallow(
            <Form>
                <Form.SubmitButton />
            </Form>
        );

        expect(component.find(Form.SubmitButton)).to.have.length(1);
    });

    it('should be a button.btn', () => {
        const component = render(
            <Form>
                <Form.SubmitButton />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn')).to.have.length(1, 'button.btn.btn-default');
    });

    it('should have the text specified', () => {

        const buttonText = 'this is my button text';

        const component = render(
            <Form>
                <Form.SubmitButton>{buttonText}</Form.SubmitButton>
            </Form>
        );

        expect(component.find('button.btn').text()).to.equal(buttonText);
    });

    it('should have the child elements specified', () => {

        const icon = <i className="fa fa-some-icon" />;

        const component = render(
            <Form>
                <Form.SubmitButton>{icon}</Form.SubmitButton>
            </Form>
        );

        expect(component.find('button.btn i.fa.fa-some-icon')).to.have.length(1);
    });


    it('should be button.btn.btn-default when no style is provided', () => {
        const component = render(
            <Form>
                <Form.SubmitButton />
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
                <Form.SubmitButton style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-danger')).to.have.length(1, 'button.btn.btn-danger');
    });

    it('should be button.btn.btn-danger when style=error', () => {

        const style = 'error';

        const component = render(
            <Form>
                <Form.SubmitButton style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-danger')).to.have.length(1, 'button.btn.btn-danger');
    });

    it('should be button.btn.btn-warning when style=warning', () => {

        const style = 'warning';

        const component = render(
            <Form>
                <Form.SubmitButton style={style} />
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
                <Form.SubmitButton style={style} />
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
                <Form.SubmitButton style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-info')).to.have.length(1, 'button.btn.btn-info');
    });

    it('should be button.btn.btn-success when style=success', () => {

        const style = 'success';

        const component = render(
            <Form>
                <Form.SubmitButton style={style} />
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
                <Form.SubmitButton style={style} />
            </Form>
        );

        expect(component.find('button')).to.have.length(1, 'button');
        expect(component.find('button.btn.btn-success'))
            .to.have.length(1, 'button.btn.btn-success');
    });
});

/* *****************************************************************************
given a Form containing a required TextInput and a SubmitButton
    after initialization with a valid value, the SubmitButton should be enabled
    after initialization with several valid values, the SubmitButton should be enabled
    after initialization with multiple invalid values, the SubmitButton should be disabled
    after initialization with a mix of valid & invalid values, the SubmitButton should be disabled
    after changing from invalid to valid, the SubmitButton should be enabled
    after changing from valid to invalid, the SubmitButton should be disabled
*/
describe('given a Form containing a required TextInput and a SubmitButton', () => {

    it('after initialization with a valid value, the SubmitButton should be enabled', () => {
        const label = 'my label';

        const value = 'a valid value';

        const component = mount(
            <Form>
                <Form.TextInput required value={value} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn').props().disabled).to.equal(false);
    });

    it('after initialization with several valid values, the SubmitButton should be enabled', () => {
        const label = 'my label';

        const value = 'a valid value';

        const component = mount(
            <Form>
                <Form.TextInput required value={value} />
                <Form.TextInput required value={value} />
                <Form.TextInput required value={value} />
                <Form.TextInput required value={value} />
                <Form.TextInput required value={value} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn').props().disabled).to.equal(false);
    });

    it('after initialization with multiple invalid values, the SubmitButton ' +
        'should be disabled', () => {
        const label = 'my label';

        const value = '';

        const component = mount(
            <Form>
                <Form.TextInput required value={value} />
                <Form.TextInput required value={value} />
                <Form.TextInput required value={value} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn').props().disabled).to.equal(true);
    });

    it('after initialization with a mix of valid & invalid values, the ' +
        'SubmitButton should be disabled', () => {
        const label = 'my label';

        const invalid = '';

        const valid = 'triceratops';

        const component = mount(
            <Form>
                <Form.TextInput required value={invalid} />
                <Form.TextInput required value={invalid} />
                <Form.TextInput required value={valid} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn').props().disabled).to.equal(true);
    });

    it('after changing from invalid to valid, the SubmitButton should be enabled', () => {
        const label = 'my label';

        const initialValue = '';

        const finalValue = 'I wish I were an Oscar Meyer weiner';

        const component = mount(
            <Form>
                <Form.TextInput required value={initialValue} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn').props().disabled).to.equal(true);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur');

        expect(component.find('button.btn').props().disabled).to.equal(false);
    });

    it('after changing from valid to invalid, the SubmitButton should be disabled', () => {
        const label = 'my label';

        const initialValue = 'I wish I were an Oscar Meyer weiner';

        const finalValue = '';

        const component = mount(
            <Form>
                <Form.TextInput required value={initialValue} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('button.btn').props().disabled).to.equal(false);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur');

        expect(component.find('button.btn').props().disabled).to.equal(true);
    });

});

/* *****************************************************************************
a SubmitButton
    should call onClick when the button in a form is clicked
*/
describe('a SubmitButton', () => {

    it('should call onClick when the button in a form is clicked', () => {

        const onClick = sinon.spy();

        const label = 'my label';

        const component = mount(
            <Form>
                <Form.SubmitButton label={label} onClick={onClick} />
            </Form>
        );

        component.find('button').simulate('click');

        expect(onClick.callCount).to.equal(1);
    });
});

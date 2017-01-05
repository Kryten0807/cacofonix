// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import Form from './Form';

const expect = chai.expect;

/* eslint-disable no-unused-vars */
const debug = (component, identifier = '') => {
    console.info(`-----${identifier}--------------------------------------------`);
    console.info(component.debug());
    console.info(`-----${identifier}--------------------------------------------`);
};
/* eslint-enable no-unused-vars */

describe('the Form component', () => {

    it('should be a form element', () => {
        const component = shallow(<Form>a child</Form>);

        expect(component.is('div')).to.equal(true);
        expect(component.is('div.form-inline')).to.equal(false);
        expect(component.is('div.form-horizontal')).to.equal(false);
    });

    it('should be a form.form-inline element', () => {
        const component = shallow(<Form inline>a child</Form>);

        expect(component.is('div.form-inline')).to.equal(true);
        expect(component.is('div.form-horizontal')).to.equal(false);
    });

    it('should be a form.form-horizontal element', () => {
        const component = shallow(<Form horizontal>a child</Form>);

        expect(component.is('div.form-inline')).to.equal(false);
        expect(component.is('div.form-horizontal')).to.equal(true);
    });

});

describe('the Form component', () => {

    it('should not show the alert message if initialized with a mix of valid ' +
        '& invalid values', () => {
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

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should not show the alert message if initialized with all valid values', () => {
        const label = 'my label';

        const valid = 'triceratops';

        const component = mount(
            <Form>
                <Form.TextInput required value={valid} />
                <Form.TextInput required value={valid} />
                <Form.TextInput required value={valid} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should not show the alert message if initialized with all invalid values', () => {
        const label = 'my label';

        const invalid = '';

        const component = mount(
            <Form>
                <Form.TextInput required value={invalid} />
                <Form.TextInput required value={invalid} />
                <Form.TextInput required value={invalid} />
                <Form.SubmitButton label={label} />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should show an alert with a single error message when one child is ' +
        'blurred (1 invalid child)', () => {

        const label = 'my label';

        const descriptionForValid = 'this should not appear';
        const descriptionForInvalid = 'should see this';

        const initialValue = 'this is valid';

        const newValue = '';

        class TestComponent extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    values: [initialValue, initialValue, initialValue],
                };

                this.onChange = this.onChange.bind(this);
            }

            onChange(idx, val) {
                const newState = {
                    values: [this.state.values[0], this.state.values[1], this.state.values[2]],
                };
                newState.values[idx] = val;
                this.setState(newState);
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required
                            name="textinput-1"
                            description={descriptionForValid}
                            value={this.state.values[0]}
                            onChange={(val) => this.onChange(0, val)}
                        />
                        <Form.TextInput
                            required
                            name="textinput-2"
                            description={descriptionForInvalid}
                            value={this.state.values[1]}
                            onChange={(val) => this.onChange(1, val)}
                        />
                        <Form.TextInput
                            required
                            name="textinput-3"
                            description={descriptionForValid}
                            value={this.state.values[2]}
                            onChange={(val) => this.onChange(2, val)}
                        />
                        <Form.SubmitButton label={label} />
                    </Form>
                );
            }
        }

        const component = mount(<TestComponent />);


        expect(component.find('Alert')).to.have.length(0);

        component.find('input[name="textinput-2"]').simulate('change', {
            target: { value: newValue }
        });

        component.find('input[name="textinput-2"]').simulate('blur');


        expect(component.find('Alert')).to.have.length(1);
        expect(component.find('Alert').text()).to.not.contain(descriptionForValid);
        expect(component.find('Alert').text()).to.contain(descriptionForInvalid);

    });

    it('should show an alert with a single error message when one child is ' +
    'blurred (2 invalid children)', () => {

        const label = 'my label';

        const descriptionForValid = 'this should not appear';
        const descriptionForInvalid = 'should see this';

        const initialValue = 'this is valid';
        const invalidValue = '';

        const newValue = '';

        class TestComponent extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    values: [initialValue, initialValue, invalidValue],
                };

                this.onChange = this.onChange.bind(this);
            }

            onChange(idx, val) {
                const newState = {
                    values: [this.state.values[0], this.state.values[1], this.state.values[2]],
                };
                newState.values[idx] = val;
                this.setState(newState);
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required
                            name="textinput-1"
                            description={descriptionForValid}
                            value={this.state.values[0]}
                            onChange={(val) => this.onChange(0, val)}
                        />
                        <Form.TextInput
                            required
                            name="textinput-2"
                            description={descriptionForInvalid}
                            value={this.state.values[1]}
                            onChange={(val) => this.onChange(1, val)}
                        />
                        <Form.TextInput
                            required
                            name="textinput-3"
                            description={descriptionForValid}
                            value={this.state.values[2]}
                            onChange={(val) => this.onChange(2, val)}
                        />
                        <Form.SubmitButton label={label} />
                    </Form>
                );
            }
        }

        const component = mount(<TestComponent />);

        component.find('input[name="textinput-2"]').simulate('change', {
            target: { value: newValue }
        });

        component.find('input[name="textinput-2"]').simulate('blur');

        expect(component.find('Alert')).to.have.length(1);
        expect(component.find('Alert').text()).to.not.contain(descriptionForValid);
        expect(component.find('Alert').text()).to.contain(descriptionForInvalid);

    });

    it('should update the validation alert if a TextInput changes to not required', () => {

        const initialValue = 'something';

        class TestComponent extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    required: true,
                    value:    initialValue,
                };
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            description="hello"
                            name="textinput"
                            required={this.state.required}
                            label="hello"
                            value={this.state.value}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TestComponent />);

        // blur the text input to ensure that we're displaying validation
        // changes
        component.find('input[name="textinput"]').simulate('blur');

        // initial state - no Alert
        expect(component.find('Alert')).to.have.length(0);

        // change the value - should see Alert
        component.setState({ required: true, value: '' });
        expect(component.find('Alert')).to.have.length(1);

        // now change the "required" state - should no longer see Alert
        component.setState({ required: false, value: '' });
        expect(component.find('Alert')).to.have.length(0);

    });

});

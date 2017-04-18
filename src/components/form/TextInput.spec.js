// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

// npm dependencies
//
import React from 'react';
import PropTypes from 'prop-types';

// testing dependencies
//
import { shallow, render, mount } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';

// the system under test
//
import Form from '../Form';

const expect = chai.expect;

/* eslint-disable no-unused-vars */
const debug = (component) => {
    console.info('-----------------------------------------------------------');
    console.info(component.debug());
    console.info('-----------------------------------------------------------');
};

const dump = (value, title = '') => {
    console.info(`---${title}------------------------------------------------`);
    console.info(value);
    console.info(`---${title}------------------------------------------------`);
};
/* eslint-enable no-unused-vars */

const toFloat = (value) => parseFloat(`${value}`.replace(/[^\d.-]/g, ''));

const parseCurrency = (value) => {
    // strip the value of all non-numeric characters & attempt to parse it as a
    // number
    //
    const val = toFloat(value);

    // if it's not a number, return an empty string; otherwise return a numeric
    // string
    //
    return Number.isNaN(val) ? '' : `${val.toFixed(2)}`;
};

const formatCurrency = (value) => {
    // attempt to parse the value as a floating point number
    //
    const val = toFloat(value);

    // if it's not a number, return the empty string; otherwise format it
    //
    return Number.isNaN(val) ? '' : `$ ${val.toFixed(2)}`;
};

// @TODO add test to handle moving cursors during editing
// I think there's a problem with editing in the middle of the value in the
// TextInput. For example, when the TextInput value = "hello" with the cursor
// between the to "l" characters, typing "xxx" should result in "helxxxlo". I
// don't think that is working in the browser
//
// 1/5/17 - nope, not doing it in other places - this needs more observation
//

describe('TextInput markup', () => {

    it('should include a <Form.TextInput> as a child', () => {
        const component = shallow(
            <Form>
                <Form.TextInput />
            </Form>
        );

        expect(component.find(Form.TextInput)).to.have.length(1);
    });

    it('should not include a label if label is omitted', () => {
        const component = render(
            <Form>
                <Form.TextInput />
            </Form>
        );

        expect(component.find('label')).to.have.length(0);
    });

    it('should include a label if the label is set', () => {
        const label = 'about this control';

        const component = render(
            <Form>
                <Form.TextInput label={label} />
            </Form>
        );

        expect(component.find('label')).to.have.length(1);
        expect(component.find('label').text()).to.equal(label);
    });

    it('should include a placeholder if the placeholder is set', () => {
        const placeholder = 'this is my placeholder';

        const component = mount(
            <Form>
                <Form.TextInput placeholder={placeholder} />
            </Form>
        );

        expect(component.find('input')).to.have.length(1);
        expect(component.find('input').props().placeholder).to.equal(placeholder);
    });

    it('should include the readonly flag when readonly is set', () => {
        const readOnly = true;

        const component = mount(
            <Form>
                <Form.TextInput readOnly={readOnly} />
            </Form>
        );

        expect(component.find('input')).to.have.length(1);
        expect(component.find('input').props().readOnly).to.equal(true);
    });

    it('should not be visible when hidden is set', () => {
        const hidden = true;

        const component = mount(
            <Form>
                <Form.TextInput hidden={hidden} />
            </Form>
        );

        expect(component.find('input')).to.have.length(0);
    });

    it('should have a label.col-xs-3 when form is horizontal and labelColumns=3', () => {

        const columns = 3;

        const label = 'something';

        const component = mount(
            <Form horizontal labelColumns={columns}>
                <Form.TextInput label={label} />
            </Form>
        );

        expect(component.find('div.form-horizontal')).to.have.length(1, 'form-horizontal');
        expect(component.find('div.form-horizontal div.form-group label').props().className)
            .to.contain('col-xs-3', 'col-xs-3');
    });

    it('should have a div.col-xs-9 when form is horizontal and labelColumns=3', () => {

        const columns = 3;

        const label = 'something';

        const component = mount(
            <Form horizontal labelColumns={columns}>
                <Form.TextInput label={label} />
            </Form>
        );

        expect(component.find('div.form-horizontal')).to.have.length(1, 'form-horizontal');
        expect(component.find('div.form-textinput-input-columns').props().className)
            .to.contain('col-xs-9', 'col-xs-9');
    });
    it('should have the correct markup when the inline prop is set', () => {

        const label = 'something';

        const component = mount(
            <Form>
                <Form.TextInput inline label={label} />
            </Form>
        );

        expect(component.find('div.form-inline')).to.have.length(1, 'form-group');
        expect(component.find('div.form-group')).to.have.length(1, 'form-group');
        expect(component.find('label').props().className).to.equal('');
        expect(component.find('div.form-textinput-input-columns')).to.have.length(0);
    });

    it('should have the correct markup when inline=true and inlineWidth is set', () => {

        const label = 'something';

        const width = '6em';

        const component = mount(
            <Form>
                <Form.TextInput inline inlineWidth={width} label={label} />
            </Form>
        );

        expect(component.find('input').props().style.width).to.equal(width);
    });

    it('should not have a column specified when form is horizontal and inline is true', () => {

        const columns = 3;

        const label = 'something';

        const width = '6em';

        const component = mount(
            <Form horizontal labelColumns={columns}>
                <Form.TextInput inline inlineWidth={width} label={label} />
            </Form>
        );

        expect(component.find('div.form-inline')).to.have.length(1, 'form-group');
        expect(component.find('div.form-group')).to.have.length(1, 'form-group');
        expect(component.find('label').props().className).to.not.contain(`col-xs-${columns}`);
    });

    it('should include an asterisk in the label when the required flag is set', () => {

        const label = 'spongebob';

        const required = true;

        const component = mount(
            <Form>
                <Form.TextInput required={required} label={label} />
            </Form>
        );

        expect(component.find('label')).to.have.length(1);
        expect(component.find('label').find('i.fa.fa-star')).to.have.length(1);
    });

    it('should not include an asterisk in the label when the required flag is not set', () => {

        const label = 'squarepants';

        const required = false;

        const component = mount(
            <Form>
                <Form.TextInput required={required} label={label} />
            </Form>
        );

        expect(component.find('label')).to.have.length(1);
        expect(component.find('label').find('i.fa.fa-star')).to.have.length(0);
    });

    it('should not have a name if the name prop is not set', () => {

        const component = mount(
            <Form>
                <Form.TextInput />
            </Form>
        );

        expect(component.find('input').props().name).to.equal(undefined);
    });

    it('should have the appropriate name if the name prop is set', () => {

        const name = 'meatball';

        const component = mount(
            <Form>
                <Form.TextInput name={name} />
            </Form>
        );

        expect(component.find('input').props().name).to.equal(name);
    });

    it('should have type=text when password=false', () => {

        const component = mount(
            <Form>
                <Form.TextInput />
            </Form>
        );

        expect(component.find('input').props().type).to.equal('text');
    });

    it('should have type=password when password=true', () => {

        const component = mount(
            <Form>
                <Form.TextInput password />
            </Form>
        );

        expect(component.find('input').props().type).to.equal('password');
    });

    it('should have an ID value when one is provided', () => {

        const id = 'some-id-value';

        const component = mount(
            <Form>
                <Form.TextInput id={id} />
            </Form>
        );

        expect(component.find('input').props().id).to.equal(id);
    });

    it('should have a random ID value when one is not provided', () => {

        const component = mount(
            <Form>
                <Form.TextInput />
            </Form>
        );

        expect(component.find('input').props().id).to.match(/^form-textinput-[0-9]+$/);
    });


});

describe('when initializing a Form with a required/pattern TextInput', () => {

    const required = true;

    it('the validation message should not be displayed with a valid value (required)', () => {
        const initialValue = 'something';

        const component = render(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with a valid '
        + 'value (required)', () => {
        const initialValue = 'something';

        const component = render(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

    it('the validation message should not be displayed with an invalid value (required)', () => {
        const initialValue = '';

        const component = render(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with an '
        + 'invalid value (required)', () => {
        const initialValue = '';

        const component = render(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

    it('the validation message should not be displayed with a valid value (email)', () => {
        const initialValue = 'test@test.com';

        const component = render(
            <Form>
                <Form.TextInput
                    required
                    description="The email address"
                    id="form-login-email"
                    placeholder="Email"
                    value={initialValue}
                    pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with a valid '
        + 'value (email)', () => {
        const initialValue = 'joe@somewhere.com';

        const component = render(
            <Form>
                <Form.TextInput
                    required
                    description="The email address"
                    id="form-login-email"
                    placeholder="Email"
                    value={initialValue}
                    pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                />
            </Form>
        );

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

    it('the validation message should not be displayed with an invalid value (email)', () => {
        const initialValue = 'not an email';

        const component = render(
            <Form>
                <Form.TextInput
                    required
                    description="The email address"
                    id="form-login-email"
                    placeholder="Email"
                    value={initialValue}
                    pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with an '
        + 'invalid value (email)', () => {
        const initialValue = 'still not an email';

        const component = render(
            <Form>
                <Form.TextInput
                    required
                    description="The email address"
                    id="form-login-email"
                    placeholder="Email"
                    value={initialValue}
                    pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                />
            </Form>
        );

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

});

describe('when initializing a Form with a non-required TextInput', () => {

    const required = false;

    it('the validation message should not be displayed with a valid value', () => {
        const initialValue = 'something';

        const component = render(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with a valid value', () => {
        const initialValue = 'something';

        const component = render(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

    it('the validation message should not be displayed with an invalid value', () => {
        const initialValue = '';

        const component = render(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with an invalid value', () => {
        const initialValue = '';

        const component = render(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

});

describe('when changing the value of a required TextInput (but not blurring)', () => {

    const required = true;

    it('the validation message should not be displayed with a valid value', () => {
        const initialValue = 'something';
        const finalValue = 'something else';

        const component = mount(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with a valid value', () => {
        const initialValue = 'something';
        const finalValue = 'something else';

        const component = mount(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

    it('the validation message should not be displayed with an invalid value', () => {
        const initialValue = 'something';
        const finalValue = '';

        const component = mount(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with an invalid value', () => {
        const initialValue = 'something';
        const finalValue = '';

        const component = mount(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

    class TestParent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                testValue: props.testValue || '',
                hidden:    !!props.hidden,
            };

            this.onChange = this.onChange.bind(this);
        }

        onChange(testValue) {
            this.setState({ testValue });
        }

        render() {
            return (
                <Form>
                    <Form.TextInput
                        required
                        description="The email address"
                        id="form-login-email"
                        placeholder="Email"
                        value={this.state.testValue}
                        pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                        onChange={this.onChange}
                    />
                </Form>
            );
        }
    }

    TestParent.propTypes = {
        hidden:       PropTypes.bool,
        testValue:    PropTypes.string,
        onChange:     PropTypes.func,
        onValidation: PropTypes.func,
    };

    it('the validation message should not be displayed with a valid value', () => {
        const initialValue = '';
        const finalValue = 'test@test.com';

        const component = mount(<TestParent testValue={initialValue} />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the validation message should not be displayed with an invalid value', () => {
        const initialValue = '';
        const finalValue = 't'; // imagine the user is starting to type an email...

        const component = mount(<TestParent testValue={initialValue} />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

});

describe('when changing the value of a non-required TextInput (but not blurring)', () => {

    const required = false;

    it('the validation message should not be displayed with a valid value', () => {
        const initialValue = 'something';
        const finalValue = 'something else';

        const component = mount(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with a valid value', () => {
        const initialValue = 'something';
        const finalValue = 'something else';

        const component = mount(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

    it('the validation message should not be displayed with an invalid value', () => {
        const initialValue = 'something';
        const finalValue = '';

        const component = mount(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with an invalid value', () => {
        const initialValue = 'something';
        const finalValue = '';

        const component = mount(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

});

describe('when changing (and blurring) the value of a required TextInput', () => {

    const required = true;

    it('should set the correct value in the parent state', () => {

        const initialValue = 'something';
        const finalValue = 'some other thing';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.state().value).to.equal(finalValue);
        expect(component.find('Alert')).to.have.length(0);
    });

    it('the global validation message should not be displayed with a valid value', () => {
        const initialValue = 'something';
        const finalValue = 'valid';

        const component = mount(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('the component validation message should not be displayed with a valid value', () => {
        const initialValue = 'something';
        const finalValue = 'valid';

        const component = mount(
            <Form>
                <Form.TextInput required={required} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(0);
        expect(component.find('.help-block')).to.have.length(0);
    });

    it('the global validation message SHOULD be displayed with an empty value', () => {

        const initialValue = 'something';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1, 'Alert');

    });

    it('the component validation message SHOULD be displayed with an empty value', () => {

        const initialValue = 'something';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(1, 'has-error');
        expect(component.find('.help-block')).to.have.length(1, 'help-block');

    });

    it('the component validation message SHOULD be displayed with an empty ' +
        'value and an inline TextInput', () => {

        const initialValue = 'something';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            inline
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(1, 'has-error');
        expect(component.find('.help-block')).to.have.length(1, 'help-block');

    });
});

describe('when changing (and blurring) the value of a TextInput with a pattern function', () => {

    const pattern = (value) => value === 'the only valid value';

    it('the global validation message should not be displayed with a valid value', () => {
        const initialValue = 'the only valid value';
        const finalValue = initialValue;

        const component = mount(
            <Form>
                <Form.TextInput pattern={pattern} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0, 'Alert');
    });

    it('the component validation message should not be displayed with a valid value', () => {
        const initialValue = 'the only valid value';
        const finalValue = initialValue;

        const component = mount(
            <Form>
                <Form.TextInput pattern={pattern} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(0, 'has-error');
        expect(component.find('.help-block')).to.have.length(0, 'help-block');
    });

    it('the global validation message SHOULD be displayed with an invalid value', () => {

        const initialValue = 'the only valid value';
        const finalValue = 'this does not match';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            pattern={pattern}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1, 'Alert');

    });

    it('the component validation message SHOULD be displayed with an invalid value', () => {

        const initialValue = 'the only valid value';
        const finalValue = 'not the right value';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            pattern={pattern}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(1, 'has-error');
        expect(component.find('.help-block')).to.have.length(1, 'help-block');

    });

});

describe('when changing (and blurring) the value of a TextInput with a pattern regex', () => {

    // a simple zip code pattern
    //
    const pattern = /^[0-9]{5}$/;

    it('the global validation message should not be displayed with a valid value', () => {
        const initialValue = '12345';
        const finalValue = '54321';

        const component = mount(
            <Form>
                <Form.TextInput pattern={pattern} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0, 'Alert');
    });

    it('the component validation message should not be displayed with a valid value', () => {
        const initialValue = '12345';
        const finalValue = '54321';

        const component = mount(
            <Form>
                <Form.TextInput pattern={pattern} value={initialValue} />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(0, 'has-error');
        expect(component.find('.help-block')).to.have.length(0, 'help-block');
    });

    it('the global validation message SHOULD be displayed with an invalid value', () => {

        const initialValue = '12345';
        const finalValue = '999';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            pattern={pattern}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1, 'Alert');

    });

    it('the component validation message SHOULD be displayed with an invalid value', () => {

        const initialValue = '12345';
        const finalValue = '999';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            pattern={pattern}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(1, 'has-error');
        expect(component.find('.help-block')).to.have.length(1, 'help-block');

    });

});

describe('when changing (and blurring) the value of a TextInput', () => {

    it('should display validation error when required=true and value=blank', () => {

        const required = true;
        const initialValue = 'something';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1);

    });

    it('should not display validation error when required=true and value=something', () => {
        const required = true;
        const initialValue = 'something';
        const finalValue = 'a new something';

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should not display validation error when required=false and value=blank', () => {
        const required = false;
        const initialValue = 'something';
        const finalValue = '';

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should not display validation error when required=false and value=something', () => {
        const required = false;
        const initialValue = 'something';
        const finalValue = 'nothing';

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should display validation error when required=true, pattern=regex, ' +
        'and value=blank', () => {

        const required = true;
        const pattern = /^[0-9]{3}$/;

        const initialValue = '123';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            pattern={pattern}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1);

    });

    it('should display validation error when required=true, pattern=regex, ' +
        'and value=non-match', () => {

        const required = true;
        const pattern = /^[0-9]{3}$/;

        const initialValue = '123';
        const finalValue = 'does not match';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            pattern={pattern}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1);

    });

    it('should not display validation error when required=true, ' +
        'pattern=regex, and value=match', () => {
        const required = true;
        const pattern = /^[0-9]{3}$/;

        const initialValue = '123';
        const finalValue = '456';

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    pattern={pattern}
                    value={initialValue}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should not display validation error when required=false, ' +
        'pattern=regex, and value=blank', () => {
        const required = false;
        const pattern = /^[0-9]{3}$/;

        const initialValue = '123';
        const finalValue = '';

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    pattern={pattern}
                    value={initialValue}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should display validation error when required=false, pattern=regex, ' +
        'and value=non-match', () => {

        const required = false;
        const pattern = /^[0-9]{3}$/;

        const initialValue = '123';
        const finalValue = 'woooo';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            pattern={pattern}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1);

    });

    it('should not display validation error when required=false, ' +
        'pattern=regex, and value=match', () => {
        const required = false;
        const pattern = /^[0-9]{3}$/;

        const initialValue = '123';
        const finalValue = '987';

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    pattern={pattern}
                    value={initialValue}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should display validation error when required=true, pattern=function, ' +
        'and value=blank', () => {
        const required = true;
        const pattern = (val) => val === 'xyz';

        const initialValue = '123';
        const finalValue = '';

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    pattern={pattern}
                    value={initialValue}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1);
    });

    it('should display validation error when required=true, ' +
        'pattern=function, and value=non-match', () => {
        const required = true;
        const pattern = (val) => val === 'xyz';

        const initialValue = '123';
        const finalValue = 'abc';

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    pattern={pattern}
                    value={initialValue}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1);
    });

    it('should not display validation error when required=true, ' +
        'pattern=function, and value=match', () => {

        const required = false;
        const pattern = (val) => val === 'xyz';

        const initialValue = '123';
        const finalValue = 'xyz';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            pattern={pattern}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);

    });

    it('should not display validation error when required=false, ' +
        'pattern=function, and value=blank', () => {

        const required = false;
        const pattern = (val) => val === 'xyz';

        const initialValue = '123';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            pattern={pattern}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);

    });

    it('should display validation error when required=false, ' +
        'pattern=function, and value=non-match', () => {
        const required = false;
        const pattern = (val) => val === 'xyz';

        const initialValue = '123';
        const finalValue = 'abcdef';

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    pattern={pattern}
                    value={initialValue}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1);
    });

    it('should not display validation error when required=false, ' +
        'pattern=function, and value=match', () => {

        const required = false;
        const pattern = (val) => val === 'xyz';

        const initialValue = '123';
        const finalValue = 'xyz';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            pattern={pattern}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(0);

    });

});

describe('when changing (and blurring) the value of a required TextInput ' +
    'with an empty value', () => {

    const required = true;
    const description = 'My awesome component';

    const customMessage = 'This is my custom validation error message';

    const expectedMessage = `${description} is required`;

    it('the error message displayed in the form should be the default value ' +
        'when validationMessage is not set', () => {

        const initialValue = 'something';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            description={description}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert ul li').text()).to.contain(expectedMessage);

    });

    it('the error message displayed in the form should be the custom value ' +
        'when validationMessage is set', () => {

        const initialValue = 'something';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            validationMessage={customMessage}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert ul li').text()).to.contain(customMessage);

    });

    it('the error message displayed in the component should be the default ' +
        'value when validationMessage is not set', () => {

        const initialValue = 'something';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required={required}
                            value={this.state.value}
                            description={description}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.help-block').text()).to.contain(expectedMessage);

    });

    it('the error message displayed in the component should be the custom ' +
        'value when validationMessage is set', () => {

        const initialValue = 'something';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            validationMessage={customMessage}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.help-block').text()).to.contain(customMessage);

    });

});

describe('when changing (and blurring) the value of a required TextInput ' +
    'with an INVALID value', () => {

    const required = true;
    const description = 'My awesome component';

    const customMessage = 'This is my custom validation error message';

    const expectedMessage = `${description} is not valid`;

    const pattern = /^[0-9]{3}$/;

    it('the error message displayed in the form should be the default value ' +
        'when validationMessage is not set', () => {

        const initialValue = '123';
        const finalValue = 'abc';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            pattern={pattern}
                            description={description}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert ul li').text()).to.contain(expectedMessage);

    });

    it('the error message displayed in the form should be the custom value ' +
        'when validationMessage is set (distinct messages)', () => {

        const initialValue = '123';
        const finalValue = 'dsss';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            onChange={this.onChange}
                            value={this.state.value}
                            required={required}
                            pattern={pattern}
                            validationMessage={{
                                required: 'something else',
                                valid:    customMessage
                            }}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert ul li').text()).to.contain(customMessage);
    });

    it('the error message displayed in the form should be the custom value ' +
        'when validationMessage is set (single message)', () => {

        const initialValue = '123';
        const finalValue = 'dsss';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required={required}
                            pattern={pattern}
                            value={this.state.value}
                            validationMessage={customMessage}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }


        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.help-block').text()).to.contain(customMessage);
    });

    it('the error message displayed in the component should be the default ' +
        'value when validationMessage is not set', () => {

        const initialValue = '123';
        const finalValue = 'xyz';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required={required}
                            pattern={pattern}
                            value={this.state.value}
                            validationMessage={customMessage}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }


        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.help-block').text()).to.contain(customMessage);

    });

    it('the error message displayed in the component should be the custom ' +
        'value when validationMessage is set (single message)', () => {

        const initialValue = 'something';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState({ value });
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required={required}
                            value={this.state.value}
                            validationMessage={customMessage}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.help-block').text()).to.contain(customMessage);

    });

    it('the error message displayed in the component should be the custom ' +
        'value when validationMessage is set (distinct messages)', () => {

        const initialValue = 'something';
        const finalValue = '';

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) { this.setState({ value }); }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required={required}
                            value={this.state.value}
                            validationMessage={{
                                required: customMessage,
                                valid:    'something',
                            }}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }


        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.help-block').text()).to.contain(customMessage);
    });
});

describe('when changing (and blurring) the value of a TextInput with parent component', () => {

    it('should maintain the correct value in the input element', () => {

        const required = true;
        const description = 'mumble mumble';

        class TestParent extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    testValue: props.testValue || '',
                };

                this.onChange = this.onChange.bind(this);
            }

            onChange(testValue) {
                this.setState(() => ({ testValue }));
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required={required}
                            value={this.state.testValue}
                            description={description}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }

        TestParent.propTypes = {
            testValue:    PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            onChange:     PropTypes.func,
            onValidation: PropTypes.func,
        };

        const initialValue = 'this is first';
        const finalValue = 'this is second';

        const component = mount(
            <TestParent testValue={initialValue} />
        );

        expect(component.find('input').props().value)
            .to.equal(initialValue, 'input - initialValue');
        expect(component.state().testValue).to.equal(initialValue, 'state - initialValue');

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur');

        expect(component.find('input').props().value).to.equal(finalValue, 'finalValue');
        expect(component.state().testValue).to.equal(finalValue, 'state - finalValue');
    });

    it('should have the correct value in the input element throughout the editing process', () => {

        const required = true;
        const description = 'mumble mumble';

        class TestParent extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    testValue: formatCurrency(props.testValue || ''),
                };

                this.onChange = this.onChange.bind(this);
            }

            onChange(testValue) {
                this.setState(() => ({ testValue }));
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required={required}
                            value={this.state.testValue}
                            description={description}
                            format={formatCurrency}
                            parse={parseCurrency}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }

        TestParent.propTypes = {
            testValue:    PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            onChange:     PropTypes.func,
            onValidation: PropTypes.func,
        };

        const initialValue = '10.00';

        const edits = [
            '',
            '9',
            '99',
            '999',
            '999.',
            '999.1',
            '999.10',
        ];

        const finalValue = '999.10';

        const component = mount(<TestParent testValue={initialValue} />);

        expect(component.find('input').props().value)
            .to.equal(formatCurrency(initialValue), 'input - initialValue');

        edits.forEach((edit) => {
            component.find('input').simulate('change', {
                target: { value: edit }
            });

            expect(component.find('input').props().value).to.equal(edit, `edit ${edit}`);
        });

        component.find('input').simulate('blur');

        expect(component.find('input').props().value)
            .to.equal(formatCurrency(finalValue), 'input - final value');

        component.find('input').simulate('focus');

        expect(component.find('input').props().value).to.equal(finalValue, 'state - finalValue');
    });
});

describe('when the TextInput has a format prop', () => {

    it('the value is formatted on initialization', () => {
        const required = true;
        const format = (value) => `${value}-${value}`;
        const initialValue = 'something';

        const expectedValue = format(initialValue);

        class TstCmp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: format(initialValue) };
            }

            onChange(value) { this.setState({ value }); }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required={required}
                            value={this.state.value}
                            format={format}
                            onChange={(val) => this.onChange(val)}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstCmp />);

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('the value is untouched after focus', () => {

        const required = true;
        const format = (value) => `${value}-${value}`;
        const initialValue = 'something';
        const expectedValue = format(initialValue);

        class TstCmp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: format(initialValue) };
            }

            onChange(value) { this.setState({ value }); }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required={required}
                            value={this.state.value}
                            format={format}
                            onChange={(val) => this.onChange(val)}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstCmp />);

        component.find('input').simulate('focus');

        expect(component.find('input').props().value).to.equal(expectedValue, 'after focus');
    });

    it('the value is untouched after change', () => {
        const required = true;
        const format = (value) => `${value}-${value}`;
        const initialValue = 'something';

        const newValue = 'blue';

        const expectedValue = newValue;

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                    format={format}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('the value is formatted after blur', () => {
        const required = true;
        const format = (value) => `${value}-${value}`;
        const initialValue = 'something';

        const newValue = 'red';

        const expectedValue = format(newValue);

        const component = mount(
            <Form.TextInput
                required={required}
                value={initialValue}
                format={format}
            />
        );

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        component.find('input').simulate('blur');

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('the value returned by onChange is formatted after blur', () => {

        const onChangeSpy = sinon.spy();

        const required = true;
        const format = (value) => `${value}-${value}`;
        const initialValue = 'something';

        const newValue = 'red';

        const expectedValue = format(newValue);

        class TstComp extends React.Component {
            constructor(props) {
                super(props);
                this.state = { value: initialValue };
                this.onChange = this.onChange.bind(this);
            }

            onChange(value) {
                this.setState(
                    { value },
                    () => onChangeSpy(this.state.value)
                );
            }

            render() {
                return (
                    <Form>
                        <Form.TextInput
                            required={required}
                            value={this.state.value}
                            format={format}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }

        const component = mount(<TstComp />);

        component.find('input').simulate('change', {
            target: { value: newValue }
        });
        expect(onChangeSpy.callCount).to.equal(1);
        expect(onChangeSpy.args[0][0]).to.equal(newValue, 'after change');

        component.find('input').simulate('blur');

        expect(onChangeSpy.callCount).to.equal(2);
        expect(onChangeSpy.args[1][0]).to.equal(expectedValue, 'after blur');
    });

    it('the TextInput should validate correctly when an invalid value can be ' +
        'formatted to a valid value', () => {

        const required = true;

        // a pattern for validation - one digit, hyphen, one digit
        const pattern = /^[0-9]-[0-9]$/;

        // the format function - takes a two digit string & converts it to "#-#"
        const format = (value) => {
            const val = value.replace(/[^\d]/g, '');
            return `${val[0]}-${val[1]}`;
        };

        const initialValue = '1-1';

        const newValue = '2 2';

        const expectedValue = format(newValue);

        const component = mount(
            <Form.TextInput
                required={required}
                value={initialValue}
                pattern={pattern}
                format={format}
            />
        );

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        component.find('input').simulate('blur');

        expect(component.state().isValid).to.equal(true, 'isValid');
        expect(component.state().value).to.equal(expectedValue, 'expected value');
    });
});

describe('when the TextInput has a parse prop', () => {

    it('should not parse the value on initialization', () => {
        const required = true;
        const parse = (value) => value.split('-')[0];

        const initialValue = 'aaa-aaa';

        const expectedValue = initialValue;

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                    parse={parse}
                />
            </Form>
        );

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('should parse the value after focus', () => {
        const required = true;
        const parse = (value) => value.split('-')[0];

        const initialValue = 'aaa-aaa';

        const expectedValue = parse(initialValue);

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                    parse={parse}
                />
            </Form>
        );

        component.find('input').simulate('focus');

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('should not parse the value after change', () => {
        const required = true;
        const parse = (value) => value.split('-')[0];

        const initialValue = 'aaa-aaa';

        const newValue = 'bbb-bbb';

        const expectedValue = newValue;

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                    parse={parse}
                />
            </Form>
        );

        component.find('input').simulate('focus');

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('should not parse the value after blur', () => {
        const required = true;
        const parse = (value) => value.split('-')[0];

        const initialValue = 'aaa-aaa';

        const newValue = 'bbb-bbb';

        const expectedValue = newValue;

        const component = mount(
            <Form.TextInput
                required={required}
                value={initialValue}
                parse={parse}
            />
        );

        component.find('input').simulate('focus');

        component.find('input').simulate('change', {
            target: { value: newValue }
        });

        component.find('input').simulate('blur');

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

});

describe('when a TextInput with a calculated value is updated', () => {

    const required = false;
    const description = 'gibberish';

    class TestParent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                testValue: props.testValue || '',
            };

            this.onChange = this.onChange.bind(this);
        }

        onChange(testValue) {
            this.setState({ testValue });
        }

        render() {
            return (
                <Form>
                    <Form.TextInput
                        required={required}
                        description={description}
                        value={this.state.testValue}
                        onChange={this.onChange}
                    />
                </Form>
            );
        }
    }

    TestParent.propTypes = {
        testValue:    PropTypes.string,
        onChange:     PropTypes.func,
        onValidation: PropTypes.func,
    };

    it('the value in the input element should change', () => {

        const initialValue = 'before';
        const newValue = 'after';

        const parent = mount(<TestParent testValue={initialValue} />);

        expect(parent.find('input').props().value).to.equal(initialValue, 'initial value');

        // change the state of the parent
        //
        parent.setState({ testValue: newValue });

        expect(parent.find('input').props().value).to.equal(newValue, 'new value');
    });
});

describe('when a TextInput with a parent component is hidden or shown', () => {

    const required = false;
    const description = 'gibberish';

    class TestParent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                testValue: props.testValue || '',
                hidden:    !!props.hidden,
            };

            this.onChange = this.onChange.bind(this);
        }

        onChange(testValue) {
            this.setState({ testValue });
        }

        render() {
            return (
                <Form>
                    <Form.TextInput
                        hidden={this.state.hidden}
                        required={required}
                        description={description}
                        value={this.state.testValue}
                        onChange={this.onChange}
                    />
                </Form>
            );
        }
    }

    TestParent.propTypes = {
        hidden:       PropTypes.bool,
        testValue:    PropTypes.string,
        onChange:     PropTypes.func,
        onValidation: PropTypes.func,
    };

    it('should hide the component when the hidden prop is changed to true', () => {

        const testValue = 'whatever';

        const hidden = false;

        const parent = mount(<TestParent testValue={testValue} hidden={hidden} />);

        expect(parent.find('input')).to.have.length(1);

        // change the state of the parent
        //
        parent.setState({ hidden: true });

        expect(parent.find('input')).to.have.length(0);
    });

    it('should show the component when the hidden prop is changed to false', () => {

        const testValue = 'whatever';

        const hidden = true;

        const parent = mount(<TestParent testValue={testValue} hidden={hidden} />);

        expect(parent.find('input')).to.have.length(0);

        // change the state of the parent
        //
        parent.setState({ hidden: false });

        expect(parent.find('input')).to.have.length(1);
    });

});

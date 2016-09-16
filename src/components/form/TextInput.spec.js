// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, render, mount } from 'enzyme';
import chai from 'chai';
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
a Form component with a TextInput element
    should include a <Form.TextInput> as a child
*/
describe('a Form component with a TextInput element', () => {

    it('should include a <Form.TextInput> as a child', () => {
        const component = shallow(
            <Form>
                <Form.TextInput />
            </Form>
        );

        expect(component.find(Form.TextInput)).to.have.length(1);
    });
});

/* *****************************************************************************
when initializing a Form with a required TextInput
    the global validation message should not be displayed with a valid value
    the component validation message should not be displayed with a valid value
    the global validation message should not be displayed with an invalid value
    the component validation message should not be displayed with an invalid value
*/
describe('when initializing a Form with a required TextInput', () => {

    const required = true;

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

/* *****************************************************************************
when initializing a Form with a non-required TextInput
    the global validation message should not be displayed with a valid value
    the component validation message should not be displayed with a valid value
    the global validation message should not be displayed with an invalid value
    the component validation message should not be displayed with an invalid value
*/
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

/* *****************************************************************************
when changing the value of a required TextInput (but not blurring)
    the global validation message should not be displayed with a valid value
    the component validation message should not be displayed with a valid value
    the global validation message should not be displayed with an invalid value
    the component validation message should not be displayed with an invalid value
*/
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

});

/* *****************************************************************************
when changing the value of a non-required TextInput (but not blurring)
    the global validation message should not be displayed with a valid value
    the component validation message should not be displayed with a valid value
    the global validation message should not be displayed with an invalid value
    the component validation message should not be displayed with an invalid value
*/
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

/* *****************************************************************************
when changing (and blurring) the value of a required TextInput
    the global validation message should not be displayed with a valid value
    the component validation message should not be displayed with a valid value
    the global validation message SHOULD be displayed with an invalid value
    the component validation message SHOULD be displayed with an invalid value
*/
describe('when changing (and blurring) the value of a required TextInput', () => {

    const required = true;

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

    it('the global validation message SHOULD be displayed with an invalid value', () => {
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

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('Alert')).to.have.length(1, 'Alert');
    });

    it('the component validation message SHOULD be displayed with an invalid value', () => {
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

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.has-error')).to.have.length(1, 'has-error');
        expect(component.find('.help-block')).to.have.length(1, 'help-block');
    });
});

/* *****************************************************************************
when changing (and blurring) the value of a required TextInput with an invalid value
    the error message displayed in the form should be the default value when
        validationMessage is not set
    the error message displayed in the form should be the custom value when
        validationMessage is set
    the error message displayed in the component should be the default value
        when validationMessage is not set
    the error message displayed in the component should be the custom value when
        validationMessage is set
*/
describe('when changing (and blurring) the value of a required TextInput ' +
    'with an invalid value', () => {

    const required = true;
    const description = 'My awesome component';

    const customMessage = 'This is my custom validation error message';

    const expectedMessage = `${description} is required`;

    it('the error message displayed in the form should be the default value ' +
        'when validationMessage is not set', () => {
        const initialValue = 'something';
        const finalValue = '';

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                    description={description}
                />
            </Form>
        );

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

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                    validationMessage={customMessage}
                />
            </Form>
        );

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

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                    description={description}
                />
            </Form>
        );

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

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                    validationMessage={customMessage}
                />
            </Form>
        );

        component.find('input').simulate('change', {
            target: { value: finalValue }
        });

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('.help-block').text()).to.contain(customMessage);
    });

});

/* *****************************************************************************
when changing (and blurring) the value of a TextInput with parent component
    should maintain the correct value in the input element
*/
describe('when changing (and blurring) the value of a TextInput with parent component', () => {

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
            this.setState({ testValue });
        }

        render() {
            return (
                <Form>
                    <Form.TextInput
                        required={required}
                        value={this.props.testValue}
                        description={description}
                        onChange={this.onChange}
                    />
                </Form>
            );
        }
    }

    TestParent.propTypes = {
        testValue:    React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        onChange:     React.PropTypes.func,
        onValidation: React.PropTypes.func,
    };

    it('should maintain the correct value in the input element', () => {
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

        component.find('input').simulate('blur', {
            target: { value: finalValue }
        });

        expect(component.find('input').props().value).to.equal(finalValue, 'finalValue');
        expect(component.state().testValue).to.equal(finalValue, 'state - finalValue');
    });

});

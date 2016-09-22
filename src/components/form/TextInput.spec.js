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

const dump = (value, title = null) => {
    console.info(`---${title || ''}---------------------------------------------------------`);
    console.info(value);
    console.info('------------------------------------------------------------');
};
/* eslint-enable no-unused-vars */

/* *****************************************************************************
a Form component with a TextInput element
    should include a <Form.TextInput> as a child
    should not include a label if label is omitted
    should include a label if the label is set
    should include a placeholder if the placeholder is set
    should include the readonly flag when readonly is set
    should not be visible when hidden is set
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
when changing (and blurring) the value of a TextInput with a pattern function
    the global validation message should not be displayed with a valid value
    the component validation message should not be displayed with a valid value
    the global validation message SHOULD be displayed with an invalid value
    the component validation message SHOULD be displayed with an invalid value
*/
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

        expect(component.find('Alert')).to.have.length(1, 'Alert');
    });

    it('the component validation message SHOULD be displayed with an invalid value', () => {
        const initialValue = 'the only valid value';
        const finalValue = 'not the right value';

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

        expect(component.find('.has-error')).to.have.length(1, 'has-error');
        expect(component.find('.help-block')).to.have.length(1, 'help-block');
    });

});

/* *****************************************************************************
when changing (and blurring) the value of a TextInput with a pattern regex
    the global validation message should not be displayed with a valid value
    the component validation message should not be displayed with a valid value
    the global validation message SHOULD be displayed with an invalid value
    the component validation message SHOULD be displayed with an invalid value
*/
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

        expect(component.find('Alert')).to.have.length(1, 'Alert');
    });

    it('the component validation message SHOULD be displayed with an invalid value', () => {
        const initialValue = '12345';
        const finalValue = '999';

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

        expect(component.find('.has-error')).to.have.length(1, 'has-error');
        expect(component.find('.help-block')).to.have.length(1, 'help-block');
    });

});


/* *****************************************************************************
when changing (and blurring) the value of a TextInput
    should display validation error when required=true and value=blank
    should not display validation error when required=true and value=something
    should not display validation error when required=false and value=blank
    should not display validation error when required=false and value=something

    should display validation error when required=true, pattern=regex, and value=blank
    should display validation error when required=true, pattern=regex, and value=non-match
    should not display validation error when required=true, pattern=regex, and value=match
    should not display validation error when required=false, pattern=regex, and value=blank
    should display validation error when required=false, pattern=regex, and value=non-match
    should not display validation error when required=false, pattern=regex, and value=match

    should display validation error when required=true, pattern=function, and value=blank
    should display validation error when required=true, pattern=function, and value=non-match
    should not display validation error when required=true, pattern=function, and value=match
    should not display validation error when required=false, pattern=function, and value=blank
    should display validation error when required=false, pattern=function, and value=non-match
    should not display validation error when required=false, pattern=function, and value=match
*/
describe('when changing (and blurring) the value of a TextInput', () => {

    it('should display validation error when required=true and value=blank', () => {
        const required = true;
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

    it('should display validation error when required=true, pattern=regex, ' +
        'and value=non-match', () => {
        const required = true;
        const pattern = /^[0-9]{3}$/;

        const initialValue = '123';
        const finalValue = 'does not match';

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
        const required = true;
        const pattern = (val) => val === 'xyz';

        const initialValue = '123';
        const finalValue = 'xyz';

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
        'pattern=function, and value=blank', () => {
        const required = false;
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
    should have the correct value in the input element throughout the editing process
*/
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
            testValue:    React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number,
            ]),
            onChange:     React.PropTypes.func,
            onValidation: React.PropTypes.func,
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

        const formatCurrency = (value) => {
            const val = parseFloat(`${value}`);

            return Number.isNaN(val) ? '' : `$ ${val.toFixed(2)}`;
        };

        const parseCurrency = (value) => {
            const val = parseFloat(`${value}`.replace(/[^\d.-]/g, ''));

            return Number.isNaN(val) ? '' : `${val.toFixed(2)}`;
        };

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
                            format={formatCurrency}
                            parse={parseCurrency}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }

        TestParent.propTypes = {
            testValue:    React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number,
            ]),
            onChange:     React.PropTypes.func,
            onValidation: React.PropTypes.func,
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

/* *****************************************************************************
when the TextInput has a format prop
    the value is formatted on initialization
    the value is untouched after focus
    the value is untouched after change
    the value is formatted after blur
*/
describe('when the TextInput has a format prop', () => {

    it('the value is formatted on initialization', () => {
        const required = true;
        const format = (value) => `${value}-${value}`;
        const initialValue = 'something';

        const expectedValue = format(initialValue);

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                    format={format}
                />
            </Form>
        );

        expect(component.find('input').props().value).to.equal(expectedValue);
    });

    it('the value is untouched after focus', () => {
        const required = true;
        const format = (value) => `${value}-${value}`;
        const initialValue = 'something';

        const expectedValue = format(initialValue);

        const component = mount(
            <Form>
                <Form.TextInput
                    required={required}
                    value={initialValue}
                    format={format}
                />
            </Form>
        );

        component.find('input').simulate('focus');

        expect(component.find('input').props().value).to.equal(expectedValue);
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

});

/* *****************************************************************************
when the TextInput has a parse prop
    should not parse the value on initialization
    should parse the value after focus
    should not parse the value after change
    should not parse the value after blur
*/
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

/* *****************************************************************************
when a TextInput with a calculated value is updated
    the value in the input element should change
*/
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
        testValue:    React.PropTypes.string,
        onChange:     React.PropTypes.func,
        onValidation: React.PropTypes.func,
    };

    it('the value in the input element should change', () => {

        const initialValue = 'before';
        const newValue = 'after';

        const parent = mount(<TestParent testValue={initialValue} />);

        expect(parent.find('input').props().value).to.equal(initialValue);

        // change the state of the parent
        //
        parent.setState({ testValue: newValue });

        expect(parent.find('input').props().value).to.equal(newValue);
    });
});

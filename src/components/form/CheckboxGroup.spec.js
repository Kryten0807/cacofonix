// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import isEqual from 'lodash/isEqual';

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
a Form component containing a CheckboxGroup
    should include a <Form.CheckboxGroup> as a child
    should contain a div.form-group
    should contain a label if the label prop is set
    should not contain a label if the label prop is not set
    should contain a div.checkbox for each option
    should contain a label for each option
    should contain an input[type="checkbox"] for each option
    should contain a span with the option name for each option
    should have the correct options checked when multiple values are provided
    should have the correct options checked when a single value is provided
    should have the correct options checked when null value is provided
    should have the correct options checked when no value is provided
    should have the correct options checked when empty array value is provided
    should have a label.col-xs-3 when form is horizontal and labelColumns=3
    should have a div.col-xs-9 when form is horizontal and labelColumns=3
    should include appropriate components in place of <label> when label=components
*/
describe('a Form component containing a CheckboxGroup', () => {

    const options = [
        { value: '1', name: 'One' },
        { value: '2', name: 'Two' },
        { value: '3', name: 'Three' },
    ];

    it('should include a <Form.CheckboxGroup> as a child', () => {
        const component = shallow(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find(Form.CheckboxGroup)).to.have.length(1);
    });

    it('should contain a div.form-group', () => {
        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.form-group')).to.have.length(1);
    });

    it('should contain a label if the label prop is set', () => {

        const label = 'humpty dumpty';

        const component = mount(
            <Form>
                <Form.CheckboxGroup label={label} options={options} />
            </Form>
        );

        expect(component.find('label.control-label')).to.have.length(1);
        expect(component.find('label.control-label').text()).to.equal(label);
    });

    it('should not contain a label if the label prop is not set', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('label.control-label')).to.have.length(0);
    });

    it('should contain a div.checkbox for each option', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.checkbox')).to.have.length(options.length);
    });

    it('should contain a label for each option', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.checkbox label')).to.have.length(options.length);
    });

    it('should contain an input[type="checkbox"] for each option', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.checkbox input[type="checkbox"]'))
            .to.have.length(options.length);
        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().value)
            .to.equal(options[0].value);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().value)
            .to.equal(options[1].value);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().value)
            .to.equal(options[2].value);
    });

    it('should contain a span with the option name for each option', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.checkbox span')).to.have.length(options.length);
        expect(component.find('div.checkbox span').at(0).text()).to.equal(options[0].name);
        expect(component.find('div.checkbox span').at(1).text()).to.equal(options[1].name);
        expect(component.find('div.checkbox span').at(2).text()).to.equal(options[2].name);

    });

    it('should have the correct options checked when multiple values are provided', () => {

        const value = ['1', '2'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup value={value} options={options} />
            </Form>
        );

        expect(component.find('div.checkbox input[type="checkbox"]'))
            .to.have.length(options.length);
        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().checked)
            .to.equal(true);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().checked)
            .to.equal(true);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().checked)
            .to.equal(false);
    });

    it('should have the correct options checked when a single value is provided', () => {

        const value = '2';

        const component = mount(
            <Form>
                <Form.CheckboxGroup value={value} options={options} />
            </Form>
        );

        expect(component.find('div.checkbox input[type="checkbox"]'))
            .to.have.length(options.length);
        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().checked)
            .to.equal(false);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().checked)
            .to.equal(true);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().checked)
            .to.equal(false);
    });

    it('should have the correct options checked when null value is provided', () => {

        const value = null;

        const component = mount(
            <Form>
                <Form.CheckboxGroup value={value} options={options} />
            </Form>
        );

        expect(component.find('div.checkbox input[type="checkbox"]'))
            .to.have.length(options.length);
        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().checked)
            .to.equal(false);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().checked)
            .to.equal(false);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().checked)
            .to.equal(false);
    });

    it('should have the correct options checked when no value is provided', () => {

        const component = mount(
            <Form>
                <Form.CheckboxGroup options={options} />
            </Form>
        );

        expect(component.find('div.checkbox input[type="checkbox"]'))
            .to.have.length(options.length);
        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().checked)
            .to.equal(false);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().checked)
            .to.equal(false);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().checked)
            .to.equal(false);
    });

    it('should have the correct options checked when empty array value is provided', () => {

        const value = [];

        const component = mount(
            <Form>
                <Form.CheckboxGroup value={value} options={options} />
            </Form>
        );

        expect(component.find('div.checkbox input[type="checkbox"]'))
            .to.have.length(options.length);
        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().checked)
            .to.equal(false);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().checked)
            .to.equal(false);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().checked)
            .to.equal(false);
    });

    it('should have a label.col-xs-3 when form is horizontal and labelColumns=3', () => {

        const label = 'peter piper';
        const columns = 3;

        const value = 2;

        const component = mount(
            <Form horizontal labelColumns={columns}>
                <Form.CheckboxGroup label={label} options={options} value={value} />
            </Form>
        );

        expect(component.find('div.form-horizontal')).to.have.length(1, 'form-horizontal');
        expect(component.find('label.control-label').props().className)
            .to.contain('col-xs-3', 'col-xs-3');
    });

    it('should have a div.col-xs-9 when form is horizontal and labelColumns=3', () => {

        const label = 'peter piper';
        const columns = 3;

        const value = 2;

        const component = mount(
            <Form horizontal labelColumns={columns}>
                <Form.CheckboxGroup label={label} options={options} value={value} />
            </Form>
        );

        expect(component.find('div.form-horizontal')).to.have.length(1, 'form-horizontal');
        expect(component.find('div.form-checkboxgroup-inputs').props().className)
            .to.contain('col-xs-9', 'col-xs-9');
    });

    it('should include appropriate components in place of <label> when label=components', () => {

        const labelOptions = [
            {
                value: '1',
                name:  (
                    <div>
                        <div className="label-div option-1">a component</div>
                        <div className="label-div option-1a">as a label</div>
                    </div>
                ),
            },
            {
                value: '2',
                name:  (
                    <div>
                        <div className="label-div option-2">a component</div>
                        <div className="label-div option-2a">as a label</div>
                    </div>
                ),
            },
            {
                value: '3',
                name:  (
                    <div>
                        <div className="label-div option-3">a component</div>
                        <div className="label-div option-3a">as a label</div>
                    </div>
                ),
            },
        ];

        const label = 'my component label';

        const value = 2;

        const component = mount(
            <Form horizontal>
                <Form.CheckboxGroup label={label} options={labelOptions} value={value} />
            </Form>
        );

        expect(component.find('label')).to.have.length(4, 'label');
        expect(component.find('div.label-div')).to.have.length(6, 'label div');
        expect(component.find('div.option-1')).to.have.length(1, 'option-1');
        expect(component.find('div.option-1a')).to.have.length(1, 'option-1a');
        expect(component.find('div.option-2')).to.have.length(1, 'option-2');
        expect(component.find('div.option-2a')).to.have.length(1, 'option-2a');
        expect(component.find('div.option-3')).to.have.length(1, 'option-3');
        expect(component.find('div.option-3a')).to.have.length(1, 'option-3a');

    });

});

/* *****************************************************************************
the CheckboxGroup component
    should call onChange with the correct value(s) when a new item is toggled on
    should call onChange with the correct value(s) when a new item is toggled off
*/
describe('the CheckboxGroup component', () => {

    const options = [
        { value: '1', name: 'One' },
        { value: '2', name: 'Two' },
        { value: '3', name: 'Three' },
    ];

    it('should call onChange with the correct value(s) when a new item is toggled on', () => {

        const onChange = sinon.spy();

        const value = '2';

        const component = mount(
            <Form>
                <Form.CheckboxGroup value={value} options={options} onChange={onChange} />
            </Form>
        );

        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().checked)
            .to.equal(false);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().checked)
            .to.equal(true);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().checked)
            .to.equal(false);

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(0).simulate('change');

        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().checked)
            .to.equal(true);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().checked)
            .to.equal(true);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().checked)
            .to.equal(false);

        expect(onChange.callCount).to.equal(1, 'callCount');
        expect(onChange.calledWith(['2', '1'])).to.equal(true, 'args');

    });

    it('should call onChange with the correct value(s) when a new item is toggled off', () => {

        const onChange = sinon.spy();

        const value = ['1', '2'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup value={value} options={options} onChange={onChange} />
            </Form>
        );

        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().checked)
            .to.equal(true);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().checked)
            .to.equal(true);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().checked)
            .to.equal(false);

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(0).simulate('change');

        expect(component.find('div.checkbox input[type="checkbox"]').at(0).props().checked)
            .to.equal(false);
        expect(component.find('div.checkbox input[type="checkbox"]').at(1).props().checked)
            .to.equal(true);
        expect(component.find('div.checkbox input[type="checkbox"]').at(2).props().checked)
            .to.equal(false);

        expect(onChange.callCount).to.equal(1, 'callCount');
        expect(onChange.calledWith(['2'])).to.equal(true, 'args');

    });

});

/* *****************************************************************************
on initialization, the CheckboxGroup component
    should not show the validation message when required=false and some items are checked
    should not show the validation message when required=false and no items are checked
    should not show the validation message when required=true and some items are checked
    should not show the validation message when required=true and no items are checked
*/
describe('on initialization, the CheckboxGroup component', () => {

    const options = [
        { value: '1', name: 'One' },
        { value: '2', name: 'Two' },
        { value: '3', name: 'Three' },
    ];

    it('should not show the validation message when required=false and some ' +
        'items are checked', () => {

        const required = false;

        const value = ['2'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup required={required} value={value} options={options} />
            </Form>
        );

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

    it('should not show the validation message when required=false and no ' +
        'items are checked', () => {

        const required = false;

        const value = [];

        const component = mount(
            <Form>
                <Form.CheckboxGroup required={required} value={value} options={options} />
            </Form>
        );

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

    it('should not show the validation message when required=true and some ' +
        'items are checked', () => {

        const required = true;

        const value = ['1'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup required={required} value={value} options={options} />
            </Form>
        );

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

    it('should not show the validation message when required=true and no items are checked', () => {

        const required = true;

        const value = [];

        const component = mount(
            <Form>
                <Form.CheckboxGroup required={required} value={value} options={options} />
            </Form>
        );

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

});

/* *****************************************************************************
on initialization, the parent Form component
    should not show the validation message when required=false and some items are checked
    should not show the validation message when required=false and no items are checked
    should not show the validation message when required=true and some items are checked
    should not show the validation message when required=true and no items are checked
*/
describe('on initialization, the parent Form component', () => {

    const options = [
        { value: '1', name: 'One' },
        { value: '2', name: 'Two' },
        { value: '3', name: 'Three' },
    ];

    it('should not show the validation message when required=false and some ' +
        'items are checked', () => {

        const required = false;

        const value = ['2'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup required={required} value={value} options={options} />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should not show the validation message when required=false and no ' +
        'items are checked', () => {

        const required = false;

        const value = [];

        const component = mount(
            <Form>
                <Form.CheckboxGroup required={required} value={value} options={options} />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should not show the validation message when required=true and some ' +
        'items are checked', () => {

        const required = true;

        const value = ['1'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup required={required} value={value} options={options} />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should not show the validation message when required=true and no items are checked', () => {

        const required = true;

        const value = [];

        const component = mount(
            <Form>
                <Form.CheckboxGroup required={required} value={value} options={options} />
            </Form>
        );

        expect(component.find('Alert')).to.have.length(0);
    });

});

/* *****************************************************************************
after the user clicks something, the CheckboxGroup component
    should not show the validation message when required=false and some items are checked
    should not show the validation message when required=false and no items are checked
    should not show the validation message when required=true and some items are checked
    should show the validation message when required=true and no items are checked
*/
describe('after the user clicks something, the CheckboxGroup component', () => {

    const options = [
        { value: '1', name: 'One' },
        { value: '2', name: 'Two' },
        { value: '3', name: 'Three' },
    ];

    it('should not show the validation message when required=false and some ' +
        'items are checked', () => {

        const onChange = sinon.spy();

        const required = false;

        const value = [];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(0).simulate('change');

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

    it('should not show the validation message when required=false and no ' +
        'items are checked', () => {

        const onChange = sinon.spy();

        const required = false;

        const value = ['3'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(2).simulate('change');

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

    it('should not show the validation message when required=true and some ' +
        'items are checked', () => {

        const onChange = sinon.spy();

        const required = true;

        const value = [];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(0).simulate('change');

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(0, 'has-error');
        expect(component.find('span.help-block').length).to.equal(0, 'help-block');
    });

    it('should show the validation message when required=true and no items are checked', () => {

        const onChange = sinon.spy();

        const required = true;

        const value = ['2'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(1).simulate('change');

        expect(component.find('div.form-group').length).to.equal(1, 'form-group');
        expect(component.find('div.form-group.has-error').length).to.equal(1, 'has-error');
        expect(component.find('span.help-block').length).to.equal(1, 'help-block');
    });

});

/* *****************************************************************************
after the user clicks something, the parent Form component
    should not show the validation message when required=false and some items are checked
    should not show the validation message when required=false and no items are checked
    should not show the validation message when required=true and some items are checked
    should show the validation message when required=true and no items are checked
*/
describe('after the user clicks something, the CheckboxGroup component', () => {

    const options = [
        { value: '1', name: 'One' },
        { value: '2', name: 'Two' },
        { value: '3', name: 'Three' },
    ];

    it('should not show the validation message when required=false and some ' +
        'items are checked', () => {

        const onChange = sinon.spy();

        const required = false;

        const value = [];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(0).simulate('change');

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should not show the validation message when required=false and no ' +
        'items are checked', () => {

        const onChange = sinon.spy();

        const required = false;

        const value = ['3'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(2).simulate('change');

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should not show the validation message when required=true and some ' +
        'items are checked', () => {

        const onChange = sinon.spy();

        const required = true;

        const value = [];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(0).simulate('change');

        expect(component.find('Alert')).to.have.length(0);
    });

    it('should show the validation message when required=true and no items are checked', () => {

        const onChange = sinon.spy();

        const required = true;

        const value = ['2'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(1).simulate('change');

        expect(component.find('Alert')).to.have.length(1);
    });

});

/* *****************************************************************************
after the user clicks something, the parent Form component
    should locally show the standard validation message when required=true and no items are checked
    should globally show the standard validation message when required=true and no items are checked

    should locally show the custom validation message when a custom message is
        specified, required=true, and no items are checked
    should globally show the custom validation message when a custom message is
        specified, required=true, and no items are checked
*/
describe('after the user clicks something, the CheckboxGroup component', () => {

    const options = [
        { value: '1', name: 'One' },
        { value: '2', name: 'Two' },
        { value: '3', name: 'Three' },
    ];

    it('should locally show the standard validation message when ' +
        'required=true and no items are checked', () => {

        const description = 'this component';

        const expectedMessage = `At least one item in ${description} must be selected`;

        const required = true;

        const value = ['2'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    description={description}
                    value={value}
                    options={options}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(1).simulate('change');

        expect(component.find('span.help-block').text()).to.contain(expectedMessage, 'help-block');
    });

    it('should globally show the standard validation message when ' +
        'required=true and no items are checked', () => {

        const description = 'this component';

        const expectedMessage = `At least one item in ${description} must be selected`;

        const required = true;

        const value = ['2'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    description={description}
                    value={value}
                    options={options}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(1).simulate('change');


        expect(component.find('Alert')).to.have.length(1, 'alert');
        expect(component.find('Alert').text()).to.contain(expectedMessage, 'contains message');
    });


    it('should locally show the custom validation message when a custom ' +
        'message is specified, required=true, and no items are checked', () => {

        const message = 'some silly error message';

        const required = true;

        const value = ['2'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    validationMessage={message}
                    value={value}
                    options={options}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(1).simulate('change');

        expect(component.find('span.help-block').text()).to.contain(message, 'help-block');
    });

    it('should globally show the custom validation message when a custom ' +
        'message is specified, required=true, and no items are checked', () => {

        const message = 'some silly error message';

        const required = true;

        const value = ['2'];

        const component = mount(
            <Form>
                <Form.CheckboxGroup
                    required={required}
                    validationMessage={message}
                    value={value}
                    options={options}
                />
            </Form>
        );

        // click the first item
        //
        component.find('div.checkbox input[type="checkbox"]').at(1).simulate('change');

        expect(component.find('Alert')).to.have.length(1, 'alert');
        expect(component.find('Alert').text()).to.contain(message, 'contains message');
    });

});

/* *****************************************************************************
when the user clicks something, the parent component
    should receive the correct value from the onChange handler
    should revise the list of values when the options change
*/
describe('when the user clicks something, the parent component', () => {

    it('should receive the correct value from the onChange handler', () => {

        const options = [
            { value: '1', name: 'One' },
            { value: '2', name: 'Two' },
            { value: '3', name: 'Three' },
        ];

        const required = true;

        const description = 'gibberish';

        class TestParent extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    testValue: props.testValue || [],
                };

                this.onChange = this.onChange.bind(this);
            }

            onChange(testValue) {
                this.setState({ testValue });
            }

            render() {
                return (
                    <Form>
                        <Form.CheckboxGroup
                            required={required}
                            description={description}
                            options={options}
                            value={this.state.testValue}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }

        TestParent.propTypes = {
            testValue:    React.PropTypes.array,
            onChange:     React.PropTypes.func,
        };

        const testValue = ['1'];

        const parent = mount(<TestParent testValue={testValue} />);

        // click an item
        //
        parent.find('div.checkbox input[type="checkbox"]').at(1).simulate('change');

        // test the parent state to ensure the correct values are reflected
        // there
        //
        expect(parent.state().testValue).to.have.length(2);
        expect(parent.state().testValue[0]).to.equal('1', 'item 0');
        expect(parent.state().testValue[1]).to.equal('2', 'item 1');
    });

    it('should revise the list of values when the options change', () => {

        const initialOptions = [
            { value: '1', name: 'One' },
            { value: '2', name: 'Two' },
            { value: '3', name: 'Three' },
        ];

        const newOptions = [
            { value: '2', name: 'Two' },
            { value: '3', name: 'Three' },
            { value: '4', name: 'Four' },
        ];

        const required = true;

        const description = 'gibberish';

        class TestParent extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    testValue:   props.testValue || [],
                    testOptions: props.testOptions || [],
                };

                this.onChange = this.onChange.bind(this);
            }

            onChange(testValue) {
                this.setState({ testValue });
            }

            render() {
                return (
                    <Form>
                        <Form.CheckboxGroup
                            required={required}
                            description={description}
                            options={this.state.testOptions}
                            value={this.state.testValue}
                            onChange={this.onChange}
                        />
                    </Form>
                );
            }
        }

        TestParent.propTypes = {
            testValue:   React.PropTypes.array,
            testOptions: React.PropTypes.array,
            onChange:    React.PropTypes.func,
        };

        // the initial value for the parent
        //
        const initialValue = ['1', '2'];

        // the new value for the parent - after we update the options & remove
        // the '1' option, the value should be truncated
        //
        const newValue = ['2'];

        // create the components
        //
        const parent = mount(<TestParent testValue={initialValue} testOptions={initialOptions} />);

        // check the TestParent value
        //
        expect(parent.state().testValue).to.equal(initialValue);

        // adjust the options
        //
        parent.setState({ testValue: parent.state().testValue, testOptions: newOptions });

        // check the TestParent value
        //
        expect(isEqual(parent.state().testValue, newValue)).to.equal(true);

    });
});

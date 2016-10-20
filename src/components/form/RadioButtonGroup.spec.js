// the eslint "no-unused-expressions" rule is triggered by the `expect`
// assertions in the tests. So, in order to avoid problems with eslint, I'm
// disabling that rule in this file
//
/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
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
a Form component containing a RadioButtonGroup
    should include a <Form.RadioButtonGroup> as a child
    should include a label if the label prop is set
    should not include a label if the label prop is not set
    should include a div.radio for each option
    should include a label for each option
    should include a span containing the option name for each option
    should include an input[type="radio"] for each option
    should select the first item if the value prop is not set
    should select the first item if the value prop is invalid
    should select the appropriate item if the value prop is set to a valid value
    should have a label.col-xs-3 when form is horizontal and labelColumns=3
    should have a div.col-xs-9 when form is horizontal and labelColumns=3
    should include the disabled flag on input elements when disabled is set
    should not include the disabled flag on input elements when disabled is not set
*/
describe('a Form component containing a RadioButtonGroup', () => {

    const options = [
        { value: '1', name: 'One' },
        { value: '2', name: 'Two' },
        { value: '3', name: 'Three' },
    ];

    it('should include a <Form.RadioButtonGroup> as a child', () => {
        const component = shallow(
            <Form>
                <Form.RadioButtonGroup options={options} />
            </Form>
        );

        expect(component.find(Form.RadioButtonGroup)).to.have.length(1);
    });

    it('should include a label if the label prop is set', () => {

        const label = 'fee fi fo fum';

        const component = mount(
            <Form>
                <Form.RadioButtonGroup label={label} options={options} />
            </Form>
        );

        expect(component.find('label.control-label')).to.have.length(1);
        expect(component.find('label.control-label').text()).to.equal(label);
    });

    it('should not include a label if the label prop is not set', () => {

        const component = mount(
            <Form>
                <Form.RadioButtonGroup options={options} />
            </Form>
        );

        expect(component.find('label.control-label')).to.have.length(0);
    });

    it('should include a div.radio for each option', () => {

        const component = mount(
            <Form>
                <Form.RadioButtonGroup options={options} />
            </Form>
        );

        expect(component.find('div.radio')).to.have.length(options.length);
    });

    it('should include a label for each option', () => {

        const component = mount(
            <Form>
                <Form.RadioButtonGroup options={options} />
            </Form>
        );

        expect(component.find('div.radio label')).to.have.length(options.length);
    });

    it('should include a span containing the option name for each option', () => {

        const component = mount(
            <Form>
                <Form.RadioButtonGroup options={options} />
            </Form>
        );

        expect(component.find('div.radio span')).to.have.length(options.length);
        expect(component.find('div.radio span').at(0).text()).to.equal(options[0].name);
        expect(component.find('div.radio span').at(1).text()).to.equal(options[1].name);
        expect(component.find('div.radio span').at(2).text()).to.equal(options[2].name);
    });

    it('should include an input[type="radio"] for each option', () => {

        const component = mount(
            <Form>
                <Form.RadioButtonGroup options={options} />
            </Form>
        );

        expect(component.find('div.radio input[type="radio"]')).to.have.length(options.length);
        expect(component.find('div.radio input[type="radio"]').at(0).props().value)
            .to.equal(options[0].value);
        expect(component.find('div.radio input[type="radio"]').at(1).props().value)
            .to.equal(options[1].value);
        expect(component.find('div.radio input[type="radio"]').at(2).props().value)
            .to.equal(options[2].value);
    });

    it('should select the first item if the value prop is not set', () => {

        const label = 'peter piper';

        const component = mount(
            <Form>
                <Form.RadioButtonGroup label={label} options={options} />
            </Form>
        );

        expect(component.find('div.radio input[type="radio"]')).to.have.length(options.length);
        expect(component.find('div.radio input[type="radio"]').at(0).props().checked)
            .to.equal(true);
        expect(component.find('div.radio input[type="radio"]').at(1).props().checked)
            .to.equal(false);
        expect(component.find('div.radio input[type="radio"]').at(2).props().checked)
            .to.equal(false);
    });

    it('should select the first item if the value prop is invalid', () => {

        const label = 'peter piper';

        const value = 'not valid';

        const component = mount(
            <Form>
                <Form.RadioButtonGroup label={label} options={options} value={value} />
            </Form>
        );

        expect(component.find('div.radio input[type="radio"]')).to.have.length(options.length);
        expect(component.find('div.radio input[type="radio"]').at(0).props().checked)
            .to.equal(true);
        expect(component.find('div.radio input[type="radio"]').at(1).props().checked)
            .to.equal(false);
        expect(component.find('div.radio input[type="radio"]').at(2).props().checked)
            .to.equal(false);
    });

    it('should select the appropriate item if the value prop is set to a valid value', () => {

        const label = 'peter piper';

        const value = 2;

        const component = mount(
            <Form>
                <Form.RadioButtonGroup label={label} options={options} value={value} />
            </Form>
        );

        expect(component.find('div.radio input[type="radio"]')).to.have.length(options.length);
        expect(component.find('div.radio input[type="radio"]').at(0).props().checked)
            .to.equal(false);
        expect(component.find('div.radio input[type="radio"]').at(1).props().checked)
            .to.equal(true);
        expect(component.find('div.radio input[type="radio"]').at(2).props().checked)
            .to.equal(false);
    });

    it('should have a label.col-xs-3 when form is horizontal and labelColumns=3', () => {

        const label = 'peter piper';
        const columns = 3;

        const value = 2;

        const component = mount(
            <Form horizontal labelColumns={columns}>
                <Form.RadioButtonGroup label={label} options={options} value={value} />
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
                <Form.RadioButtonGroup label={label} options={options} value={value} />
            </Form>
        );

        expect(component.find('div.form-horizontal')).to.have.length(1, 'form-horizontal');
        expect(component.find('div.form-radiobuttongroup-input-columns').props().className)
            .to.contain('col-xs-9', 'col-xs-9');
    });

    it('should include the disabled flag on input elements when disabled is set', () => {

        const disabled = true;

        const label = 'peter piper';

        const value = 2;

        const component = mount(
            <Form>
                <Form.RadioButtonGroup
                    disabled={disabled}
                    label={label}
                    options={options}
                    value={value}
                />
            </Form>
        );

        expect(component.find('div.radio input[type="radio"]')).to.have.length(options.length);
        expect(component.find('div.radio input[type="radio"]').at(0).props().disabled)
            .to.equal(disabled);
        expect(component.find('div.radio input[type="radio"]').at(1).props().disabled)
            .to.equal(disabled);
        expect(component.find('div.radio input[type="radio"]').at(2).props().disabled)
            .to.equal(disabled);
    });

    it('should not include the disabled flag on input elements when disabled is not set', () => {

        const disabled = false;

        const label = 'peter piper';

        const value = 2;

        const component = mount(
            <Form>
                <Form.RadioButtonGroup
                    disabled={disabled}
                    label={label}
                    options={options}
                    value={value}
                />
            </Form>
        );

        expect(component.find('div.radio input[type="radio"]')).to.have.length(options.length);
        expect(component.find('div.radio input[type="radio"]').at(0).props().disabled)
            .to.equal(disabled);
        expect(component.find('div.radio input[type="radio"]').at(1).props().disabled)
            .to.equal(disabled);
        expect(component.find('div.radio input[type="radio"]').at(2).props().disabled)
            .to.equal(disabled);
    });


});

/* *****************************************************************************
when a radio button in the group is clicked
    the onChange handler should be called if a new value is clicked
    the onChange handler should not be called if the same value is clicked
    the new value should be selected and all others should not be selected
*/
describe('when a radio button in the group is clicked', () => {

    const options = [
        { value: '1', name: 'One' },
        { value: '2', name: 'Two' },
        { value: '3', name: 'Three' },
    ];

    it('the onChange handler should be called if a new value is clicked', () => {

        const onChange = sinon.spy();

        const label = 'little miss muffet';

        const value = '1';

        const clickedItem = 2;

        const component = mount(
            <Form>
                <Form.RadioButtonGroup
                    label={label}
                    options={options}
                    value={value}
                    onChange={onChange}
                />
            </Form>
        );

        expect(onChange.callCount).to.equal(0);

        component.find('div.radio input[type="radio"]').at(1).simulate('change', {
            target: { value: options[clickedItem].value }
        });

        expect(onChange.callCount).to.equal(1);
        expect(onChange.calledWith(options[clickedItem].value)).to.equal(true);
    });

    it('the onChange handler should not be called if the same value is clicked', () => {

        const onChange = sinon.spy();

        const label = 'little miss muffet';

        const value = '1';

        const clickedItem = 0;

        const component = mount(
            <Form>
                <Form.RadioButtonGroup
                    label={label}
                    options={options}
                    value={value}
                    onChange={onChange}
                />
            </Form>
        );

        expect(onChange.callCount).to.equal(0);

        component.find('div.radio input[type="radio"]').at(1).simulate('change', {
            target: { value: options[clickedItem].value }
        });

        expect(onChange.callCount).to.equal(0);
    });

    it('the new value should be selected and all others should not be selected', () => {

        const label = 'little miss muffet';

        const value = '1';

        const clickedItem = 1;

        const component = mount(
            <Form>
                <Form.RadioButtonGroup label={label} options={options} value={value} />
            </Form>
        );

        expect(component.find('div.radio input[type="radio"]')).to.have.length(options.length);
        expect(component.find('div.radio input[type="radio"]').at(0).props().checked)
            .to.equal(true, 'before - 0');
        expect(component.find('div.radio input[type="radio"]').at(1).props().checked)
            .to.equal(false, 'before - 1');
        expect(component.find('div.radio input[type="radio"]').at(2).props().checked)
            .to.equal(false, 'before - 2');

        component.find('div.radio input[type="radio"]').at(1).simulate('change', {
            target: { value: options[clickedItem].value }
        });

        expect(component.find('div.radio input[type="radio"]').at(0).props().checked)
            .to.equal(false, 'after - 0');
        expect(component.find('div.radio input[type="radio"]').at(1).props().checked)
            .to.equal(true, 'after - 1');
        expect(component.find('div.radio input[type="radio"]').at(2).props().checked)
            .to.equal(false, 'after - 2');
    });

});

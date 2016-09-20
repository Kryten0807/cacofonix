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

/*

<Dropdown
    options={stateOptions}

    label="State/Province"
    required
    description="The state or province"
    value={this.props.form.state || ''}
    labelColumns={{ xs: 2, md: 3 }}
    dropdownColumns={{ xs: 10, md: 9 }}
    onChange={(value) =>
        this.props.updateField('state', value)
    }
    onValidation={(isValid, message) =>
        this.onValidation('state', isValid, message)
    }
/>

*/

/* *****************************************************************************
a Form component containing a Dropdown
    should include a <Form.Dropdown> as a child
    should be a select.form-control
    should have the options specified in the `options` prop
    should not include a label if none was specified
    should include a label if one was specified
*/
describe('a Form component containing a Dropdown', () => {

    it('should include a <Form.Dropdown> as a child', () => {
        const component = shallow(
            <Form>
                <Form.Dropdown />
            </Form>
        );

        expect(component.find(Form.Dropdown)).to.have.length(1);
    });

    it('should be a select.form-control', () => {
        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
        ];

        const component = render(
            <Form>
                <Form.Dropdown options={options} />
            </Form>
        );


        expect(component.find('select.form-control')).to.have.length(1);
    });

    it('should have the options specified in the `options` prop', () => {

        const options = [
            { value: '1', name: 'one' },
            { value: '2', name: 'two' },
        ];

        const component = render(
            <Form>
                <Form.Dropdown options={options} />
            </Form>
        );

        expect(component.find('option')).to.have.length(options.length, 'options count');

        options.forEach((opt) => {
            expect(component.find(`option[value="${opt.value}"]`)).to.have.length(1, `value=${opt.value}`);
            expect(component.find(`option[value="${opt.value}"]`).text()).to.equal(opt.name, `name=${opt.name}`);

        });
    });

});

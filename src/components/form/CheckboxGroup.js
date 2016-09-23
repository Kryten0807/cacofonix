// dependencies
//
import React from 'react';
import uniqueId from 'lodash/uniqueId';


/*

<div class="form-group">

    <label for="checkboxgroup-107" class="control-label col-xs-2 col-md-3">
        Cycles
        <sup style="color: red;">
            <i class="glyphicon glyphicon-asterisk"></i>
        </sup>
    </label>

    <div class="col-xs-10 col-md-9">

        <div class="checkbox pull-left" style="margin-right: 1.5em;">
            <label>
                <input type="checkbox" value="1">
                <span>1</span>
            </label>
        </div>

        <div class="checkbox pull-left" style="margin-right: 1.5em;">
            <label>
                <input type="checkbox" value="2">
                <span>2</span>
            </label>
        </div>

    </div>

</div>

*/

const CheckboxGroup = ({ label, options }) => (
    <div className="form-group">
        {label
            ? <label className="checkboxgroup">{label}</label>
            : null
        }
        {options.map((opt) =>
            <div key={uniqueId('form-checkboxgroup-option-')} className="checkbox">
                <label>
                    <input type="checkbox" value={opt.value} />
                    <span>{opt.name}</span>
                </label>
            </div>
        )}
    </div>
);

export default CheckboxGroup;

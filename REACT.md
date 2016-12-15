`components/Alert.js` (component)
=================================

The Alert component
@param  {String}              style       The style of the alert
@param  {Boolean}             dismissible If true, then the alert is
                                          dismissible & will include a
                                          button which will remove the
                                          component when clicked
@param  {Array|React.Element} children    The child (or children) to display in this component
@return {React.Element}                   The React Element representing this component

Props
-----

### children

type: `union(element|arrayOf)`


### dismissible

type: `bool`


### style

type: `string`

`components/Form.js` (component)
================================

The Form component

Props
-----

### children (required)

type: `union(arrayOf|node)`


### horizontal

type: `bool`


### inline

type: `bool`


### labelColumns

type: `number`

`components/Panel.js` (component)
=================================

The Panel component
@param  {String|Undefined} header   The header for the component
@param  {Object|Array}     children The child elements/components that appear
                                    inside the panel
@return {React.Element}             The React element describing this component

Props
-----

### children

type: `union(arrayOf|node)`


### header

type: `string`


### style

type: `string`

`components/form/Button.js` (component)
=======================================

The Button component
@param  {Object} children  The children of this component
@param  {Boolean} disabled A flag to indicate whether the button should be
                           rendered as disabled
@param  {String} style     The style for the button
@param  {Function} onClick The onClick handler for the button
@return {React.Element}    The React element describing this component

Props
-----

### children

type: `union(arrayOf|node)`


### disabled

type: `bool`


### name

type: `string`


### onClick

type: `func`


### style

type: `string`

`components/form/CheckboxGroup.js` (component)
==============================================

The CheckboxGroup component

Props
-----

### description

type: `string`


### id

type: `string`


### label

type: `string`


### onChange

type: `func`


### options

type: `arrayOf[object Object]`


### required

type: `bool`


### validationMessage

type: `string`


### value

type: `union(arrayOf|arrayOf|string|number)`

`components/form/Dropdown.js` (component)
=========================================

The Dropdown component

Props
-----

### disabled

type: `bool`


### id

type: `string`


### label

type: `string`


### name

type: `string`


### onChange

type: `func`


### options (required)

type: `union(array|object)`


### value

type: `union(string|number)`

`components/form/RadioButtonGroup.js` (component)
=================================================

The RadioButtonGroup component

Props
-----

### disabled

type: `bool`


### label

type: `string`


### onChange

type: `func`


### options

type: `array`


### value

type: `union(string|number)`

`components/form/SubmitButton.js` (component)
=============================================

The SubmitButton component
@param  {String}   children   The label to display in the button
@param  {String}   name    The name for the component
@param  {String}   style   The style with which to display the button
@param  {Function} onClick The `onClick` handler for the button
@param  {Boolean}  isValid A flag (from the parent Form's context) indicating
                           whether the form to which this button is attached
                           is valid
@return {React.Element}    The React element describing this component

Props
-----

### children

type: `union(arrayOf|node)`


### name

type: `string`


### onClick

type: `func`


### style

type: `string`

`components/form/TextInput.js` (component)
==========================================

The TextInput component

Props
-----

### description

type: `string`


### format

type: `func`


### hidden

type: `bool`


### id

type: `string`


### inline

type: `bool`


### inlineWidth

type: `string`


### label

type: `string`


### name

type: `string`


### onChange

type: `func`


### parse

type: `func`


### password

type: `bool`


### pattern

type: `custom`


### placeholder

type: `string`


### readOnly

type: `bool`


### required

type: `bool`


### validationKey

type: `string`


### validationMessage

type: `union(string|object)`


### value

type: `union(string|number)`


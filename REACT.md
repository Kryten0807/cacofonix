`Alert` Component (components/Alert.js)
=======================================

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

The child(ren) to display in this component

type: `union(element|arrayOf)`


### dismissible

A flag to indicate whether this alert can be dismissed by the user (not
currently implementd)

type: `bool`


### style

The style of the Alert

type: `enum('danger'|'error'|'warning'|'warn'|'info'|'success'|'ok')`

`Form` Component (components/Form.js)
=====================================

The Form component

Props
-----

### children (required)

The child(ren) of this form

type: `union(arrayOf|node)`


### horizontal

A flag to indicate whether the components in this form should be rendered
horizontally

type: `bool`


### inline

A flag to indicate whether the components in this form should be rendered
inline

type: `bool`


### labelColumns

The width (in columns) of the component labels

type: `number`

`Panel` Component (components/Panel.js)
=======================================

The Panel component
@param  {String|Undefined} header   The header for the component
@param  {Object|Array}     children The child elements/components that appear
                                    inside the panel
@return {React.Element}             The React element describing this component

Props
-----

### children

The child(ren) of this panel

type: `union(arrayOf|node)`


### header

The header (title) for the panel

type: `string`


### style

The style of the panel

type: `enum('danger'|'error'|'warning'|'warn'|'info'|'success'|'ok')`

`Button` Component (components/form/Button.js)
==============================================

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

The child(ren) of the button

type: `union(arrayOf|node)`


### disabled

A flag to indicated whether this component is disabled

type: `bool`


### name

The button component name

type: `string`


### onClick

The `onClick` handler for the button

type: `func`


### style

The button style

type: `enum('danger'|'error'|'warning'|'warn'|'info'|'success'|'ok')`

`CheckboxGroup` Component (components/form/CheckboxGroup.js)
============================================================

The CheckboxGroup component

Props
-----

### description

The description of the component for use in validation error messages
(ie., "at least one item in <description> must be checked")

type: `string`


### id

The ID for the component

type: `string`


### label

The label for the checkbox group

type: `string`


### onChange

The `onChange` handler for the component

type: `func`


### options

The options for the checkbox group

type: `arrayOf[object Object]`


### required

A flag to indicated whether this component is required (ie. at least one
checkbox must be checked)

type: `bool`


### validationMessage

A custom validation error message for the component

type: `string`


### value

The value of the component

type: `union(arrayOf|arrayOf|string|number)`

`Dropdown` Component (components/form/Dropdown.js)
==================================================

The Dropdown component

Props
-----

### disabled

A flag to indicated whether this component is disabled

type: `bool`


### id

The ID for the component

type: `string`


### label

The label for the checkbox group

type: `string`


### name

The name for the select element

type: `string`


### onChange

The 'onChange' handler for the component

type: `func`


### options (required)

The options for the dropdown, in one of three possible forms:
+ An array of strings - the string is used as both the value & name for
  the option
+ An array of objects of the form  { value: 'x', name: 'y' }
+ An object where the key is the option group name and each value is
  either an array of strings or an array of objects as described above

type: `union(array|object)`


### value

The selected value

type: `union(string|number)`

`RadioButtonGroup` Component (components/form/RadioButtonGroup.js)
==================================================================

The RadioButtonGroup component

Props
-----

### disabled

A flag to indicated whether this component is disabled

type: `bool`


### label

The label for the checkbox group

type: `string`


### onChange

The `onChange` handler for the component

type: `func`


### options

The options for the radio button group

type: `array`


### value

The selected value in the radio button group

type: `union(string|number)`

`SubmitButton` Component (components/form/SubmitButton.js)
==========================================================

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

The child(ren) of this component

type: `union(arrayOf|node)`


### name

The name for the component

type: `string`


### onClick

The `onClick` handler for the button

type: `func`


### style

The style with which to display the button

type: `enum('danger'|'error'|'warning'|'warn'|'info'|'success'|'ok')`

`TextInput` Component (components/form/TextInput.js)
====================================================

The TextInput component

Props
-----

### description

The description for the component (used in validation error messages)

type: `string`


### format

A function used to format the value

type: `func`


### hidden

A flag to indicate whether this component is hidden

type: `bool`


### id

The ID for the component

type: `string`


### inline

A flag to indicate whether this component is to be rendered inline

type: `bool`


### inlineWidth

The width of the component if rendering inline

type: `string`


### label

The label for the component

type: `string`


### name

The name for the component

type: `string`


### onChange

The `onChange` handler for the component

type: `func`


### parse

A function used to parse the value which has been formatted by the
`format` function

type: `func`


### password

A flag to indicate whether this is a password input component

type: `bool`


### pattern

A regex used to validate values

type: `custom`


### placeholder

The placeholder for the component

type: `string`


### readOnly

A flag to indicate whether this component is read only

type: `bool`


### required

A flag to indicate whether this component is required

type: `bool`


### validationKey

The key used to identify this component by the parent Form component for
tracking validation errors in Form children

type: `string`


### validationMessage

A custom validation message, or set of messages

type: `union(string|object)`


### value

The value of the text input component

type: `union(string|number)`


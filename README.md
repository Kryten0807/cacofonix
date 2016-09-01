Components
==========

This is a set of Bootstrap-themed React components.

## Completed

1. **Alert** - a Bootstrap alert, complete with button for dismissal
1. **Label** - a label for a form element. This is generally intended for use as part of another form component.
1. **Panel** - a Bootstrap panel element
1. **TextInput** - a text input element
    1. add a custom error message to the `TextInput` component
    1. add `componentWillReceiveProps` testing for `TextInput`
1. **Dropdown** - a dropdown element
    1. add `componentWillReceiveProps` testing for `Dropdown`
1. **NumericInput** - a text input which requires input to be numeric, with configurable decimal places and an optional dollar sign/currency formatting when blurred

## In Progress

## To Do

### Components

1. **DateInput** - a text input which accepts a date value
1. **CheckboxGroup** - a group of checkboxes, optionally requiring at least one to be checked
1. **EmailInput** - a text input which requires input to be a valid email address (or blank if not required)
1. **FieldSet** - a form fieldset
1. **PhoneInput** - a text input which requires input to be numeric, and which formats the value as a phone number when blurred
1. **RadioButtonGroup** - a group of radio buttons
1. **ZipCodeInput** - a text input element which requires input to be numeric (for US zip codes) or alphanumeric (for Canadian postal codes) and formats the value appropriately on blur

### Sundry Improvements

1. tests for Alert `dismissible` property (it doesn't work in the browser)

## Validation

All of the form elements can be configured to validate their input. As part of this, each form element has two event handlers: `onChange` and `onValidation`.

+ `onChange` is called whenever the value changes and has one argument: `value`. This is the current value of the element
+ `onValidation` is called whenever the value is validated (regardless of whether it passes or fails). It is called with three arguments:
    1. `hasValidated` - a boolean value which is `true` if the element has validated in response to the user changing the value or `false` if the element is just validating the value (ie. when the component is first instantiated)
    1. `isValid` - a boolean value. `true` if the value is valid, `false` otherwise.
    1. `validationMessage` - a string describing the validation error or `null` if the value is valid.

The `hasValidated` flag is used to indicate whether the validation error message is (or should be) displayed. The idea is that when the component is initialized with an invalid value, it will not display the validation error message. Later on, after the user has changed the value, the `hasValidated` flag will be set to `true`, and any validation errors will be displayed. This value is passed along via the `onValidation` handler to allow the parent component to manage it's own `hasValidated` state.

The behaviour of the component looks like this:

+ when the component is initialized, no validation error message is displayed (`hasValidated` = false, `isValid` = true or false, depending)
+ when the user first starts editing, no validation error message is displayed, even if the user enters an invalid value (`hasValidated` = false, `isValid` = true or false, depending)
+ when the user tabs or clicks out of the control for the first time, the validation error message is displayed if the value is invalid (`hasValidated` = true, `isValid` = true or false, depending)
+ after that first tab/click out, any editing of the value will display the error message if the value is invalid (`hasValidated` = true, `isValid` = true or false, depending)

## Testing

In order to test these components, I want to write tests that hit all of the major "external" behaviours of the component. That means:

1. basic markup (ie. what the thing looks like)
1. validation error markup - what is displayed when a validation error occurs
1. `onValidation` handler - what is passed out of the component when a validation error occurs
1. `onChange` handler - what is passed out of the component when a change occurs
1. what happens `onFocus` - the components will not have explicit `onFocus` handlers, but may call `onValidation` or `onChange` when this event fires
1. what happens `onBlur` - the components will not have explicit `onBlur` handlers, but may call `onValidation` or `onChange` when this event fires
1. what happens when the parent passes new props to the component via `componentWillReceiveProps`

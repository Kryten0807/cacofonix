Cacofonix
=========

![Cacofonix](http://static.comicvine.com/uploads/scale_small/0/77/289381-110152-troubadix.png)

Develop ![Dev Build](https://travis-ci.org/Kryten0807/cacofonix.svg?branch=develop)
Master ![Dev Build](https://travis-ci.org/Kryten0807/cacofonix.svg?branch=master)
[History](https://travis-ci.org/Kryten0807/cacofonix/builds)

This is a set of Bootstrap-themed React components, centered primarily around a `Form` element that provides support for client-side form validation.

# IMPORTANT! This package is under heavy development and could undergo breaking changes at any time!

I'm developing this package to use in a couple of my personal projects. Eventually, I will settle on a final design for these components and, at that point, this will probably be a useful open source package. Until then, **use this package at your own risk!**

# Dependencies

These components are styled as [Bootstrap](http://getbootstrap.com) elements, so you will need to ensure that Bootstrap **styles** are included, either via a CDN or by building your own CSS file & including it.

The components also make use of [Font Awesome](http://fontawesome.io/) icons, so again you will need to either include it via a CDN or serve the CSS & font files from your own server. I *could* make this an optional dependency (see the [To Do Section](#todo)] below), but I prefer Font Awesome, so this is not a high priority.

# Components

## <Alert>

The basic Bootstrap [Alert](http://getbootstrap.com/components/#alerts), adapted for use as a React component.

### Properties

+ `style` (string) - The style of the alert. See the [Styles](#styles) section below
+ `dismissible` (bool) - Is the Alert dismissible? (Note: this does not currently work)
+ `children` (element or array of elements) -

## <Panel>

A Bootstrap [Panel](http://getbootstrap.com/components/#panels).

### Properties

+ `style` (string) - The style of the panel. See the [Styles](#styles) section below
+ `header` (string) - The (optional) header for the panel
+ `children` (node or array of nodes) - The content for the panel

## <Form>

## <Form.Button>

## <Form.CheckboxGroup>

## <Form.Dropdown>

## <Form.RadioButtonGroup>

## <Form.SubmitButton>

## <Form.TextInput>


# Validation


# Styles

Bootstrap provides a number of [standard styles used in coloring elements](http://getbootstrap.com/components/#alerts-examples). I have found the names of some of these styles to be kind of counterintuitive, so I've defined a few synonyms. You can, of course, use the original Bootstrap name if you wish. Note that all names are case-sensitive.

+---------------+----------+
| Boostrap Name | Synonyms |
+---------------+----------+
| success       | ok       |
| info          |          |
| warning       | warn     |
| danger        | error    |
| primary       |          |
| default       |          |
+---------------+----------+

The last two, `primary` and `default` are not used for `Alert` components - these are mapped to 'info' for alerts.

# To Do

1. map `primary` and `default` styles to `info` for `Alert` components
1. correct the `Alert` `dismissible` property
1. revise the prop types of the `Alert` component `children` property to handle text or React elements
1. make the use of icon fonts (Font Awesome vs. Glyphicons) conditional
1. in TextInput - if it's readonly, then format the value whenever the props change

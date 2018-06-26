# Unchained UI

## Input

[![NPM Version](https://img.shields.io/npm/v/uc-input.svg?style=flat-square)](https://www.npmjs.com/package/uc-input)
[![NPM Downloads](https://img.shields.io/npm/dt/uc-input.svg?style=flat-square)](https://www.npmjs.com/package/uc-input)

Base mixin for all input classes

### Usage

Check the [input-field](https://github.com/unchainedui/input-field) and [input-contenteditable](https://github.com/unchainedui/input-contenteditable) for more information

### Interface

#### el

Root HTMLElement

#### input

Input HTMLElement

#### setValue(val)

Sets the current value to the DOM

#### getValue()

Gets the current value from the DOM

#### setCarret(pos)

Sets the position of the carret

#### getCarret()

Gets the position of the carret

#### resetCarret(toBegin)

Sets the position of the carret to the end of the value. If `toBegin` is true, the sets the position to the begining

#### setPlaceholder(placeholder)

Optional. Sets the placeholder value to `placeholder`

#### removePlaceholder

Optional. Removes the placeholder

License MIT

© velocityzen


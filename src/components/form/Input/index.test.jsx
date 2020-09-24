import React from 'react'
import ReactDOM from 'react-dom'
import {act} from 'react-dom/test-utils'
import {I18nextProvider} from 'react-i18next'

import {
  describe,
  expect,
  test,
  beforeEach,
  afterEach,
} from 'jest-without-globals'

import Input from './index'

import i18n from '../../../i18n'

describe('registration component', () => {
  let container

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container = null
  })

  test('name prop', () => {
    const props = {name: 'text'}

    act(() => {
      ReactDOM.render(
        <I18nextProvider i18n={i18n}>
          <Input {...props} />
        </I18nextProvider>,
        container
      )
    })

    const input = container.querySelector('input')
    expect(input.name).toBe(props.name)
    expect(input.type).toBe(props.name)
    expect(input.placeholder).toBe(props.name)
    expect(input.id).toBe(props.name)
  })

  test('custom type and placeholder', () => {
    const props = {name: 'text', type: 'number', placeholder: 'holder'}

    act(() => {
      ReactDOM.render(
        <I18nextProvider i18n={i18n}>
          <Input {...props} />
        </I18nextProvider>,
        container
      )
    })

    const input = container.querySelector('input')
    expect(input.name).toBe(props.name)
    expect(input.type).toBe(props.type)
    expect(input.placeholder).toBe(props.placeholder)
  })

  test('input label', () => {
    const props = {name: 'text', label: 'some text'}

    act(() => {
      ReactDOM.render(
        <I18nextProvider i18n={i18n}>
          <Input {...props} />
        </I18nextProvider>,
        container
      )
    })

    const label = container.querySelector('label span')
    expect(label.textContent).toBe(`${props.label} :`)
    const asterisk = container.querySelector('label span + span')
    expect(asterisk).toBe(null)
  })

  test('required label', () => {
    const props = {name: 'text', required: true}

    act(() => {
      ReactDOM.render(
        <I18nextProvider i18n={i18n}>
          <Input {...props} />
        </I18nextProvider>,
        container
      )
    })

    const asterisk = container.querySelector('label span + span')
    expect(asterisk.textContent).toBe(' *')
  })

  test('validation - invalid', () => {
    const props = {name: 'text', validity: false}

    act(() => {
      ReactDOM.render(
        <I18nextProvider i18n={i18n}>
          <Input {...props} />
        </I18nextProvider>,
        container
      )
    })

    const input = container.querySelector('input')
    expect(input.className.includes('is-invalid')).toBe(true)
  })

  test('validation valid', () => {
    const props = {name: 'text', validity: true}

    act(() => {
      ReactDOM.render(
        <I18nextProvider i18n={i18n}>
          <Input {...props} />
        </I18nextProvider>,
        container
      )
    })

    const input = container.querySelector('input')
    expect(input.className.includes('is-valid')).toBe(true)
  })

  test('validation null', () => {
    const props = {name: 'text', validity: null}

    act(() => {
      ReactDOM.render(
        <I18nextProvider i18n={i18n}>
          <Input {...props} />
        </I18nextProvider>,
        container
      )
    })

    const input = container.querySelector('input')
    expect(input.className).toBe('form-control')
  })
})

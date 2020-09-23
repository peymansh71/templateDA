import React from 'react'
import ReactDOM from 'react-dom'
import {act} from 'react-dom/test-utils'
import {I18nextProvider} from 'react-i18next'
import {BrowserRouter as Router} from 'react-router-dom'

import {
  test,
  expect,
  describe,
  beforeEach,
  afterEach,
} from 'jest-without-globals'

import Login from './index'

import i18n from '../../i18n'

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

  test('registration page', () => {
    act(() => {
      ReactDOM.render(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Login />
          </I18nextProvider>
        </Router>,
        container
      )
    })

    const email = container.querySelector('#e-mail')
    const password = container.querySelector('#password')
    const submit = container.querySelector('#submit-btn')

    email.value = 'wrong-email.com'

    act(() => {
      submit.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    expect(email.className.includes('is-invalid')).toBe(true)
    expect(password.className.includes('is-invalid')).toBe(true)

    email.value = 'johndoe@mail.com'

    act(() => {
      submit.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    expect(email.className.includes('is-valid')).toBe(true)
    expect(password.className.includes('is-invalid')).toBe(true)

    password.value = 'secret'

    act(() => {
      submit.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    expect(!email.className.includes('is-valid')).toBe(true)
    expect(!password.className.includes('is-invalid')).toBe(true)
  })
})

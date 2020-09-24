import React from 'react'
import ReactDOM from 'react-dom'
import {act} from 'react-dom/test-utils'
import {I18nextProvider} from 'react-i18next'
import {BrowserRouter as Router} from 'react-router-dom'

import {
  describe,
  expect,
  test,
  beforeEach,
  afterEach,
} from 'jest-without-globals'

import Registration from './index'

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

  const selectFromDropDown = (input, index) => {
    for (let i = 0; i < index; i++) {
      act(() => {
        input.dispatchEvent(
          new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true})
        )
      })
    }
    act(() => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {key: 'Enter', bubbles: true})
      )
    })
  }

  test('registration page', () => {
    act(() => {
      ReactDOM.render(
        <Router>
          <I18nextProvider i18n={i18n}>
            <Registration />
          </I18nextProvider>
        </Router>,
        container
      )
    })

    // Step 1
    const stepperOrg = container.querySelector('#stepper_organization')
    expect(stepperOrg.className.includes('--active')).toBe(true)

    const organizationName = container.querySelector('#organization_name')
    organizationName.value = 'organization'

    const country = container.querySelector('#country')
    selectFromDropDown(country, 1)

    const state = container.querySelector('#state')
    selectFromDropDown(state, 1)

    const city = container.querySelector('#city')
    selectFromDropDown(city, 1)

    const email = container.querySelector('#email')
    email.value = 'test@test.com'

    const password = container.querySelector('#password')
    // Eight or more characters, with at least one lowercase and one uppercase letter.
    password.value = 'Aaaaaaaa'

    const policy = container.querySelector('#privacyPolicy')
    policy.checked = true

    const orgNextBtn = container.querySelector('#organization-next')

    act(() => {
      orgNextBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const structure = container.querySelector('#stepper_structure')
    expect(structure.className.includes('--active')).toBe(true)

    // Step 2
    const tierOption = container.querySelector('#2tires')
    tierOption.checked = true

    const structureNextBtn = container.querySelector('#structure-next')

    act(() => {
      structureNextBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const personal = container.querySelector('#stepper_personal')
    expect(personal.className.includes('--active')).toBe(true)

    // Step 3
    const firstName = container.querySelector('#firstName')
    firstName.value = 'firstName'

    const lastName = container.querySelector('#lastName')
    lastName.value = 'lastName'

    const birthYear = container.querySelector('#birthYear')
    selectFromDropDown(birthYear, 1)

    const gender = container.querySelector('#gender')
    selectFromDropDown(gender, 1)

    const disability = container.querySelector('#disability')
    selectFromDropDown(disability, 1)

    const education = container.querySelector('#education')
    selectFromDropDown(education, 1)

    const positionLevel = container.querySelector('#position_level')
    selectFromDropDown(positionLevel, 1)

    const positionType = container.querySelector('#position_type')
    selectFromDropDown(positionType, 1)

    const anonymousCheckbox = container.querySelector('#anonymous')
    anonymousCheckbox.checked = true

    const personalNextBtn = container.querySelector('#personal-next')

    act(() => {
      personalNextBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const countryBirthBtn = container.querySelector('#stepper_country_birth')
    expect(countryBirthBtn.className.includes('--active')).toBe(true)

    // Step 4
    const countryBirth = container.querySelector('#countryBirth')
    selectFromDropDown(countryBirth, 1)

    const stateBirth = container.querySelector('#stateBirth')
    selectFromDropDown(stateBirth, 1)

    const father = container.querySelector('#father')
    selectFromDropDown(father, 1)

    const mother = container.querySelector('#mother')
    selectFromDropDown(mother, 1)

    const paternalGrandfather = container.querySelector('#paternalGrandfather')
    selectFromDropDown(paternalGrandfather, 1)

    const maternalGrandfather = container.querySelector('#maternalGrandfather')
    selectFromDropDown(maternalGrandfather, 1)

    const paternalGrandmother = container.querySelector('#paternalGrandmother')
    selectFromDropDown(paternalGrandmother, 1)

    const maternalGrandmother = container.querySelector('#maternalGrandmother')
    selectFromDropDown(maternalGrandmother, 1)

    const countryBirthNext = container.querySelector('#country_birth_next')

    act(() => {
      countryBirthNext.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const ethnicityAppearance = container.querySelector(
      '#stepper_ethnicity_appearance'
    )
    expect(ethnicityAppearance.className.includes('--active')).toBe(true)

    // Step 5
    const ethnicity = container.querySelector('#ethnicity')
    selectFromDropDown(ethnicity, 1)
    selectFromDropDown(ethnicity, 2)
    selectFromDropDown(ethnicity, 3)

    const otherEthnicity = container.querySelector('#other_ethnicity')
    selectFromDropDown(otherEthnicity, 1)
    selectFromDropDown(otherEthnicity, 2)
    selectFromDropDown(otherEthnicity, 3)

    const appearanceCheck = container.querySelector('#appearanceCheck')
    act(() => {
      appearanceCheck.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const sexualOrientation = container.querySelector('#sexualOrientation')
    act(() => {
      sexualOrientation.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const ethnicityNext = container.querySelector('#ethnicity-next')

    act(() => {
      ethnicityNext.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const language = container.querySelector('#stepper_language')
    expect(language.className.includes('--active')).toBe(true)

    // Step 6
    const advanced = container.querySelector('#language_advanced')
    selectFromDropDown(advanced, 1)
    selectFromDropDown(advanced, 2)
    selectFromDropDown(advanced, 3)

    const intermediate = container.querySelector('#language_intermediate')
    selectFromDropDown(intermediate, 1)
    selectFromDropDown(intermediate, 2)
    selectFromDropDown(intermediate, 3)

    const basic = container.querySelector('#language_basic')
    selectFromDropDown(basic, 1)
    selectFromDropDown(basic, 2)
    selectFromDropDown(basic, 3)

    const languageNext = container.querySelector('#language-next')

    act(() => {
      languageNext.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const worldview = container.querySelector('#stepper_worldview')
    expect(worldview.className.includes('--active')).toBe(true)

    // back button
    const backBtn = container.querySelector('#worldview-back')
    act(() => {
      backBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })
    expect(language.className.includes('--active')).toBe(true)

    act(() => {
      languageNext.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })
    expect(worldview.className.includes('--active')).toBe(true)

    // Step 7
    const addMore = container.querySelector('#add-more-worldview')

    act(() => {
      addMore.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const hasWorld = container.querySelector('#hasWorldview')
    hasWorld.checked = true

    const worldviewSubmit = container.querySelector('#worldview-submit')

    act(() => {
      worldviewSubmit.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const worldview2 = container.querySelector('#stepper_worldview > span')
    expect(worldview2.className.includes('--completed')).toBe(true)
  })
})

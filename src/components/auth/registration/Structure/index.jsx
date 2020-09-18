import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useCallback,
} from 'react'

import {Row, Col, Container} from 'reactstrap'

import Input from '~components/form/Input'
import Select from '~components/form/Select'
import Password from '~components/form/Password'

import {validateEmail, validatePass} from '~utils'

const initialState = {org: null, country: null, email: null, password: null}

const Structure = (props, submitRef) => {
  const formRef = useRef(null)

  const [validity, setValidity] = useState(initialState)

  const onSubmit = useCallback(() => {
    const data = new FormData(formRef.current)

    const state = {...initialState}

    if (!data.get('organization_name').trim()) state.org = false
    else state.org = true

    if (!data.get('country').trim()) state.country = false
    else state.country = true

    if (!validateEmail(data.get('email'))) state.email = false
    else state.email = true

    if (!validatePass(data.get('password'))) state.password = false
    else state.password = true

    const status = Object.values(state).reduce((a, b) => a && b)

    if (status) return data

    setValidity(state)
    return false
  })

  useEffect(() => {
    submitRef.current = onSubmit
  }, [])

  const form = [
    {
      tag: Input,
      props: {
        name: 'organization_name',
        type: 'text',
        required: true,
        validity: validity.org,
        validationMessage: 'organization_name_required',
      },
    },
    {
      tag: Select,
      props: {
        name: 'country',
        required: true,
        validity: validity.country,
        validationMessage: 'country_required',
      },
    },
    {tag: Select, props: {name: 'state-province'}},
    {tag: Input, props: {name: 'city', type: 'text'}},
    {
      tag: Input,
      props: {
        name: 'email',
        type: 'email',
        label: 'email_address',
        required: true,
        validity: validity.email,
        validationMessage: 'invalid_email',
      },
    },
    {
      tag: Password,
      props: {
        name: 'password',
        hint: 'pass_hint',
        required: true,
        validity: validity.password,
        validationMessage: 'invalid_pass',
      },
    },
  ]

  return (
    <form ref={formRef}>
      <Container>
        <Row className='mt-3'>
          {form.map(item => (
            <Col sm='12' md='6' key={item.props.name}>
              <item.tag {...item.props} />
            </Col>
          ))}
        </Row>
      </Container>
    </form>
  )
}

export default forwardRef(Structure)

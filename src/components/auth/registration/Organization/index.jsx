import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {Row, Col, Container, CustomInput, Button} from 'reactstrap'

import Input from '~components/form/Input'
import Select from '~components/form/Select'
import Password from '~components/form/Password'

import {validateEmail, validatePass} from '~utils'

const initialState = {
  org: null,
  country: null,
  email: null,
  password: null,
  agreement: null,
}

const Organization = ({goNext, setHeight, isActive}) => {
  const {t} = useTranslation()

  const formRef = useRef(null)

  const [validity, setValidity] = useState(initialState)

  const [agreement, setAgreement] = useState(false)

  const submit = useCallback(() => {
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

    if (!data.get('privacyPolicy')) state.agreement = false
    else state.agreement = true

    const status = Object.values(state).reduce((a, b) => a && b)

    if (status) {
      setValidity(initialState)
      return data
    }

    setValidity(state)
    return false
  })

  const onClickNext = useCallback(() => {
    const status = submit()
    if (status) goNext()
  }, [])

  const onChangeAgreement = useCallback(e => setAgreement(e.target.checked), [])

  const AgreementLabel = useMemo(
    () => (
      <>
        {t('read&agree')}
        <Link to='/privacy-policy'>{t('read&agree')}</Link>
        {t('and')}
        <Link to='/code-of-conduct'>{t('codeConduct')}</Link>
      </>
    ),
    []
  )

  useEffect(() => {
    if (isActive) setHeight(formRef.current.offsetHeight)
  }, [isActive, validity])

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
    <div>
      <form ref={formRef}>
        <Container fluid>
          <Row className='mt-3'>
            {form.map(item => (
              <Col sm='12' md='6' key={item.props.name}>
                <item.tag {...item.props} />
              </Col>
            ))}
          </Row>
        </Container>
        <div className='mt-5 d-flex justify-content-between align-items-start px-3'>
          <CustomInput
            type='checkbox'
            id='privacyPolicy'
            name='privacyPolicy'
            checked={agreement}
            label={AgreementLabel}
            onChange={onChangeAgreement}
            invalid={validity.agreement === false}
          />
          <div className='d-flex justify-content-between'>
            <Button className='ml-3' onClick={onClickNext}>
              {t('next')}
              <i className='fa fa-chevron-right ml-2' />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Organization

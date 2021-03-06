import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import {Row, Col, Container, CustomInput, Button} from 'reactstrap'

import Input from '~components/form/Input'
import Select from '~components/form/Select'
import Password from '~components/form/Password'

import {validateEmail, validatePass} from '~utils'

import s from './styles.m.scss'

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
  }, [])

  const onClickNext = useCallback(() => {
    const status = submit()
    if (status) goNext()
  }, [])

  const onChangeAgreement = useCallback(e => setAgreement(e.target.checked), [])

  const AgreementLabel = useMemo(
    () => (
      <>
        <span>{t('read&agree')}</span>
        <Link to='/privacy-policy'>{t('privacy')}</Link>
        <span>{t('and')}</span>
        <Link to='/code-of-conduct'>{t('codeConduct')}</Link>
      </>
    ),
    []
  )

  useEffect(() => {
    if (isActive) setHeight(formRef.current)
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
    {tag: Select, props: {name: 'state'}},
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
    <div className={names(s.section, {[s['section--active']]: isActive})}>
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
        <div
          className={`${s.buttons} d-flex justify-content-between align-items-start`}
        >
          <div>
            <CustomInput
              type='checkbox'
              id='privacyPolicy'
              name='privacyPolicy'
              checked={agreement}
              label={AgreementLabel}
              onChange={onChangeAgreement}
            />
            <span
              className={names('invalid-feedback', {
                'd-block': validity.agreement === false,
              })}
            >
              {t('must_agree')}
            </span>
          </div>
          <div className='d-flex justify-content-between'>
            <Button
              className='ml-3'
              onClick={onClickNext}
              id='organization-next'
            >
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

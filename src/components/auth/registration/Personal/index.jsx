import React, {useRef, useState, useEffect, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import {Row, Col, Container, CustomInput, Button} from 'reactstrap'

import Input from '~components/form/Input'
import Select from '~components/form/Select'

import s from './styles.m.scss'

const initialState = {
  firstName: null,
  lastName: null,
  birthYear: null,
  gender: null,
}

const Personal = ({goNext, goPrev, setHeight, isActive}) => {
  const {t} = useTranslation()

  const formRef = useRef(null)

  const [validity, setValidity] = useState(initialState)

  const [anonymous, setAnonymous] = useState(false)

  const submit = useCallback(() => {
    const data = new FormData(formRef.current)

    const state = {...initialState}

    if (!data.get('firstName')?.trim() && !anonymous) state.firstName = false
    else state.firstName = true

    if (!data.get('lastName')?.trim() && !anonymous) state.lastName = false
    else state.lastName = true

    if (!data.get('birthYear').trim()) state.birthYear = false
    else state.birthYear = true

    if (!data.get('gender').trim()) state.gender = false
    else state.gender = true

    const status = Object.values(state).reduce((a, b) => a && b)

    if (status) {
      setValidity(initialState)
      return data
    }

    setValidity(state)
    return false
  }, [anonymous])

  const onClickNext = useCallback(() => {
    const status = submit()
    if (status) goNext()
  }, [anonymous])

  const onClickPrev = useCallback(goPrev, [])

  const onChangeAnonymous = useCallback(e => setAnonymous(e.target.checked), [])

  useEffect(() => {
    if (isActive) setHeight(formRef.current)
  }, [isActive, validity])

  const form = [
    {
      tag: Input,
      col: 6,
      props: {
        name: 'firstName',
        type: 'text',
        required: true,
        disabled: anonymous,
        validity: validity.firstName,
        validationMessage: 'first_name_required',
      },
    },
    {
      tag: Input,
      col: 6,
      props: {
        name: 'lastName',
        type: 'text',
        required: true,
        disabled: anonymous,
        validity: validity.lastName,
        validationMessage: 'last_name_required',
      },
    },
    {
      tag: Select,
      col: 4,
      props: {
        name: 'birthYear',
        placeholder: 'choose_year',
        required: true,
        validity: validity.birthYear,
        validationMessage: 'birth_year_required',
      },
    },
    {
      tag: Select,
      col: 4,
      props: {
        name: 'gender',
        placeholder: 'choose_your_gender',
        required: true,
        validity: validity.gender,
        validationMessage: 'gender_required',
      },
    },
    {
      tag: Select,
      col: 4,
      props: {
        name: 'disability',
        placeholder: 'if_you_have_choose_disability',
      },
    },
    {
      tag: Select,
      col: 4,
      props: {
        name: 'education',
        placeholder: 'choose_your_education',
      },
    },
    {
      tag: Select,
      col: 4,
      props: {
        name: 'position_level',
        placeholder: 'choose_your_position_level',
      },
    },
    {
      tag: Select,
      col: 4,
      props: {
        name: 'position_type',
        placeholder: 'choose_your_position_type',
      },
    },
  ]

  return (
    <div className={names(s.section, {[s['section--active']]: isActive})}>
      <form ref={formRef}>
        <Container fluid>
          <Row className='mt-3'>
            {form.map(item => (
              <Col sm='12' md={item.col} key={item.props.name}>
                <item.tag {...item.props} />
              </Col>
            ))}
          </Row>
        </Container>
        <div
          className={`${s.buttons} d-flex justify-content-between align-items-start`}
        >
          <CustomInput
            type='checkbox'
            id='anonymous'
            name='anonymous'
            checked={anonymous}
            label={t('i_want_to_stay_anonymous')}
            onChange={onChangeAnonymous}
          />
          <div className='d-flex justify-content-between'>
            <Button
              className={s.buttons__prev}
              color='dark'
              onClick={onClickPrev}
            >
              <i className='fa fa-chevron-left mr-2' />
              {t('previous')}
            </Button>
            <Button className='ml-3' onClick={onClickNext} id='personal-next'>
              {t('next')}
              <i className='fa fa-chevron-right ml-2' />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Personal

import React, {useRef, useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import {Row, Col, Container, Button} from 'reactstrap'

import Select from '~components/form/Select'

import s from './styles.m.scss'

const CountryBirth = ({goNext, goPrev, setHeight, isActive}) => {
  const {t} = useTranslation()

  const formRef = useRef(null)

  const [validity, setValidity] = useState(null)

  const submit = useCallback(() => {
    const data = new FormData(formRef.current)

    let status = null

    if (!data.get('countryBirth').trim()) status = false
    else status = true

    if (status) {
      setValidity(null)
      return data
    }

    setValidity(status)
    return false
  }, [])

  const onClickNext = useCallback(() => {
    const status = submit()
    if (status) goNext()
  }, [])

  const onClickPrev = useCallback(goPrev, [])

  useEffect(() => {
    if (isActive) setHeight(formRef.current)
  }, [isActive, validity])

  const form = [
    {
      tag: Select,
      col: 6,
      props: {
        name: 'countryBirth',
        placeholder: 'choose_county_birth',
        required: true,
        validity,
        validationMessage: 'country_birth_required',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'stateBirth',
        placeholder: 'choose_state_birth',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'father',
        placeholder: 'choose_father_country_birth',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'mother',
        placeholder: 'choose_mother_country_birth',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'paternalGrandfather',
        placeholder: 'paternal_grandfather_country_birth',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'maternalGrandfather',
        placeholder: 'maternal_grandfather_country_birth',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'paternalGrandmother',
        placeholder: 'paternal_grandmother_country_birth',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'maternalGrandmother',
        placeholder: 'maternal_grandmother_country_birth',
      },
    },
  ]

  const extra = [
    {
      tag: Select,
      col: 6,
      props: {
        isMulti: true,
        closeMenuOnSelect: false,
        name: 'other_countries',
        onChange: () => setTimeout(() => setHeight(formRef.current), 100),
        placeholder: 'choose_other_countries_2',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        isMulti: true,
        onChange: () => setTimeout(() => setHeight(formRef.current), 100),
        closeMenuOnSelect: false,
        name: 'nationalities_holding',
        placeholder: 'choose_nationalities_holding_2',
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
            <hr className='w-100' />
            {extra.map(item => (
              <Col sm='12' md='6' key={item.props.name}>
                <item.tag {...item.props} />
              </Col>
            ))}
          </Row>
        </Container>
        <div
          className={`${s.buttons} d-flex justify-content-between align-items-start`}
        >
          <div className={s.buttons__troubleShooting}>
            <i className='text-secondary test-large fa fa-question-circle' />
            <span>{t('cant_find_country')}</span>
            <span>{t('read_our')}</span>
            <Link to='faqs'>{t('FAQs')}</Link>
            <span>{t('or')}</span>
            <Link to='contact-us'>{t('contact_us')}.</Link>
          </div>
          <div className='d-flex justify-content-between'>
            <Button
              className={s.buttons__prev}
              color='dark'
              onClick={onClickPrev}
            >
              <i className='fa fa-chevron-left mr-2' />
              {t('previous')}
            </Button>
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

export default CountryBirth

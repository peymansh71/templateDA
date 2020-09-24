import React, {useRef, useEffect, useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import {Row, Col, Container, Button, CustomInput} from 'reactstrap'

import Select from '~components/form/Select'

import s from './styles.m.scss'

const initialState = {
  ethnicity: null,
  other_ethnicity: null,
  appearance: null,
  sexual_orientation: null,
}

const Ethnicity = ({goNext, goPrev, setHeight, isActive}) => {
  const {t} = useTranslation()

  const formRef = useRef(null)

  const ethnicity = useState(false)
  const aligned = useState(false)
  const appearance = useState(false)
  const sexualOrientation = useState(false)

  const [validity, setValidity] = useState(initialState)

  const submit = () => {
    const data = new FormData(formRef.current)

    const state = {...initialState}

    if (!data.get('ethnicity') && !ethnicity[0]) state.ethnicity = false
    else state.ethnicity = true

    if (!data.get('other_ethnicity') && !aligned[0])
      state.other_ethnicity = false
    else state.other_ethnicity = true

    if (!data.get('appearance') && !appearance[0]) state.appearance = false
    else state.appearance = true

    if (!data.get('sexual_orientation') && !sexualOrientation[0])
      state.sexual_orientation = false
    else state.sexual_orientation = true

    const status = Object.values(state).reduce((a, b) => a && b)

    if (status) {
      setValidity(initialState)
      return data
    }

    setValidity(state)
    return false
  }

  const onClickNext = () => {
    const status = submit()
    if (status) goNext()
  }

  const onClickPrev = useCallback(goPrev, [])

  useEffect(() => {
    if (isActive) setHeight(formRef.current)
  }, [isActive])

  const form = [
    {
      tag: Select,
      col: 6,
      props: {
        isMulti: true,
        isDisabled: ethnicity[0],
        onChange: () => setTimeout(() => setHeight(formRef.current), 100),
        closeMenuOnSelect: false,
        name: 'ethnicity',
        validity: validity.ethnicity,
        placeholder: 'choose_ethnicity_4',
      },
      checkbox: {state: ethnicity, name: 'ethnicityCheck'},
    },
    {
      tag: Select,
      col: 6,
      props: {
        isMulti: true,
        isDisabled: aligned[0],
        onChange: () => setTimeout(() => setHeight(formRef.current), 100),
        closeMenuOnSelect: false,
        label: 'other_ethnicity_aligned',
        validity: validity.other_ethnicity,
        name: 'other_ethnicity',
        placeholder: 'choose_other_ethnicity_4',
      },
      checkbox: {state: aligned, name: 'aligned'},
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'appearance',
        onChange: () => setTimeout(() => setHeight(formRef.current), 100),
        isDisabled: appearance[0],
        validity: validity.appearance,
        placeholder: 'choose_appearance',
      },
      checkbox: {state: appearance, name: 'appearanceCheck'},
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'sexual_orientation',
        onChange: () => setTimeout(() => setHeight(formRef.current), 100),
        isDisabled: sexualOrientation[0],
        validity: validity.sexual_orientation,
        placeholder: 'choose_sexual_orientation',
      },
      checkbox: {state: sexualOrientation, name: 'sexualOrientation'},
    },
  ]

  return (
    <div className={names(s.section, {[s['section--active']]: isActive})}>
      <form ref={formRef}>
        <Container fluid>
          <Row className='mt-3'>
            {form.map((item, index) => (
              <Col
                sm='12'
                md='6'
                key={item.props.name}
                className={s.section__col}
                style={{zIndex: 20 - index}}
              >
                <item.tag {...item.props} />
                <div>
                  <CustomInput
                    className='mb-3'
                    type='checkbox'
                    id={item.checkbox.name}
                    name={item.checkbox.name}
                    checked={item.checkbox.state[0]}
                    label={t('prefer_not_to_answer')}
                    onChange={() =>
                      item.checkbox.state[1](!item.checkbox.state[0])
                    }
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        <div className='mt-5 d-flex justify-content-between align-items-start px-3'>
          <span />
          <div className='d-flex justify-content-between'>
            <Button className={s.prev} color='dark' onClick={onClickPrev}>
              <i className='fa fa-chevron-left mr-2' />
              {t('previous')}
            </Button>
            <Button className='ml-3' onClick={onClickNext} id='ethnicity-next'>
              {t('next')}
              <i className='fa fa-chevron-right ml-2' />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Ethnicity

import React, {useRef, useEffect, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import {Row, Col, Container, Button} from 'reactstrap'

import Select from '~components/form/Select'

import s from './styles.m.scss'

const Language = ({goNext, goPrev, setHeight, isActive}) => {
  const {t} = useTranslation()

  const formRef = useRef(null)

  const submit = useCallback(() => {
    const data = new FormData(formRef.current)
    return data
  }, [])

  const onClickNext = useCallback(() => {
    const status = submit()
    if (status) goNext()
  }, [])

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
        onChange: () => setTimeout(() => setHeight(formRef.current), 100),
        closeMenuOnSelect: false,
        name: 'language_advanced',
        placeholder: 'choose_language_5',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        isMulti: true,
        onChange: () => setTimeout(() => setHeight(formRef.current), 100),
        closeMenuOnSelect: false,
        name: 'language_intermediate',
        placeholder: 'choose_language_5',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        onChange: () => setTimeout(() => setHeight(formRef.current), 100),
        isMulti: true,
        closeMenuOnSelect: false,
        name: 'language_basic',
        placeholder: 'choose_language_5',
      },
    },
  ]

  return (
    <div className={names(s.section, {[s['section--active']]: isActive})}>
      <form ref={formRef}>
        <Container fluid>
          <Row className='mt-3'>
            {form.map(item => (
              <Col sm='12' md='4' key={item.props.name}>
                <item.tag {...item.props} />
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

export default Language

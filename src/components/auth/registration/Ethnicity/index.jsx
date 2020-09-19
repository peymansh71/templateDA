import React, {useRef, useEffect, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import {Row, Col, Container, Button} from 'reactstrap'

import Select from '~components/form/Select'

import s from './styles.m.scss'

const Ethnicity = ({goNext, goPrev, setHeight, isActive}) => {
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
    if (isActive) setHeight(formRef.current.offsetHeight)
  }, [isActive])

  const form = [
    {
      tag: Select,
      col: 6,
      props: {
        name: 'ethnicity',
        placeholder: 'choose_ethnicity_4',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        label: 'other_ethnicity_aligned',
        name: 'other_ethnicity',
        placeholder: 'choose_other_ethnicity_4',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'appearance',
        placeholder: 'choose_appearance',
      },
    },
    {
      tag: Select,
      col: 6,
      props: {
        name: 'sexual_orientation',
        placeholder: 'choose_sexual_orientation',
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

export default Ethnicity

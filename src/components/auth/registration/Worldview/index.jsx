import React, {useRef, useEffect, useCallback, useState, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import {Row, Col, Container, Button, CustomInput} from 'reactstrap'

import Select from '~components/form/Select'

import s from './styles.m.scss'

const Worldview = ({goNext, goPrev, setHeight, isActive}) => {
  const {t} = useTranslation()

  const formRef = useRef(null)

  const [checked, setChecked] = useState(false)

  const [rows, setRows] = useState(1)

  const submit = useCallback(() => {
    const data = new FormData(formRef.current)
    return data
  }, [])

  const onClickNext = useCallback(() => {
    const status = submit()
    if (status) goNext()
  }, [])

  const onClickPrev = useCallback(goPrev, [])

  const onClickCopy = () => setRows(rows + 1)

  const onChangeChecked = useCallback(e => setChecked(e.target.checked), [])

  useEffect(() => {
    if (checked) setRows(1)
  }, [checked])

  useEffect(() => {
    if (isActive) setHeight(formRef.current)
  }, [isActive, rows])

  const getRow = row => [
    {
      tag: Select,
      col: 4,
      row,
      props: {
        isDisabled: checked,
        name: 'worldview_religion[]',
        label: 'worldview_religion',
        labelIcon: 'fa-question-circle',
        placeholder: 'choose_worldview_religion',
      },
    },
    {
      tag: Select,
      col: 4,
      row,
      props: {
        isDisabled: checked,
        name: 'worldview_branch[]',
        label: 'worldview_branch',
        labelIcon: 'fa-question-circle',
        placeholder: 'choose_worldview_branch',
      },
    },
    {
      tag: Select,
      col: 4,
      row,
      props: {
        isDisabled: checked,
        name: 'branch_subgroup[]',
        label: 'branch_subgroup',
        labelIcon: 'fa-question-circle',
        placeholder: 'choose_branch_subgroup',
      },
    },
  ]

  const data = useMemo(() => {
    const result = getRow(0)
    for (let i = 1; i < rows; i++) {
      result.push(...getRow(i))
    }
    return result
  }, [rows, checked])

  return (
    <div className={names(s.section, {[s['section--active']]: isActive})}>
      <form ref={formRef}>
        <Container fluid className={s.section__container}>
          <Row className='mt-3'>
            {data.map(item => (
              <Col sm='12' md='4' key={`${item.props.name}-${item.row}`}>
                <item.tag {...item.props} />
              </Col>
            ))}
          </Row>
          {rows < 3 && (
            <div className='d-flex justify-content-center align-items-center'>
              <Button
                outline
                disabled={checked}
                onClick={onClickCopy}
                color='success'
                className={`${s.copy} d-flex justify-content-center align-items-center`}
              >
                <i className='fa fa-plus-square' />
                <span>{t('add_another_worldview')}</span>
              </Button>
            </div>
          )}
        </Container>
        <div className='mt-5 d-flex justify-content-between align-items-start px-3'>
          <CustomInput
            type='checkbox'
            id='hasWorldview'
            name='hasWorldview'
            checked={checked}
            label={t('don_t_have_worldview')}
            onChange={onChangeChecked}
          />
          <div className='d-flex justify-content-between'>
            <Button className={s.prev} color='dark' onClick={onClickPrev}>
              <i className='fa fa-chevron-left mr-2' />
              {t('previous')}
            </Button>
            <Button className='ml-3' onClick={onClickNext}>
              {t('submit')}
              <i className='fa fa-chevron-right ml-2' />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Worldview

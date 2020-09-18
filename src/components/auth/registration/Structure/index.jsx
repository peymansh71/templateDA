import React, {useRef, useState, useEffect, useCallback} from 'react'
import {useTranslation} from 'react-i18next'

import {Row, Col, Container, Button} from 'reactstrap'

import tiers2URL from '~assets/images/registration/DA-org-reg-2-tiers.png'
import tiers3URL from '~assets/images/registration/DA-org-reg-3-tiers.png'
import tiers4URL from '~assets/images/registration/DA-org-reg-4-tiers.png'

import s from './styles.m.scss'

export const Structure = ({goNext, goPrev, setHeight, isActive}) => {
  const {t} = useTranslation()

  const formRef = useRef(null)

  const [selected, setSelected] = useState(null)

  const submit = useCallback(() => {
    const data = new FormData(formRef.current)

    let status = null

    if (!data.get('option')) status = false
    else status = true

    if (status) {
      return data
    }

    return false
  })

  const onClickNext = useCallback(() => {
    const status = submit()
    if (status) goNext()
  }, [])

  const onClickPrev = useCallback(goPrev, [])

  const onChangeOption = useCallback(e => setSelected(e.target.value), [])

  useEffect(() => {
    if (isActive) setHeight(formRef.current.offsetHeight)
  }, [isActive])

  const form = [
    {id: 1, image: tiers2URL},
    {id: 2, image: tiers3URL},
    {id: 3, image: tiers4URL},
  ]

  return (
    <div>
      <form ref={formRef}>
        <Container fluid>
          <div className='mt-3'>{t('tier_levels_explanation')}</div>
          <Row className='mt-2'>
            {form.map(item => (
              <Col sm='12' md='4' key={item.id} className='mt-3'>
                <div className={s.tier}>
                  <div className={s.tier__subheader}>
                    {`${t('OPTION')} ${t(item.id)}`}
                  </div>
                  <div className={s.tier__header}>
                    {`${t(item.id + 1)} ${t('TIERS')}`}
                  </div>
                  <img
                    className='w-100 mb-2'
                    src={item.image}
                    alt={`${t(item.id + 1)}-${t('TIERS')}`}
                  />
                  <div className='mb-4'>
                    <div>
                      <span className='text-primary'>
                        -{`${t('Tier')} ${t('1')}`}
                      </span>
                      <span>{t('tier_admin')}</span>
                    </div>
                    <div>
                      <span>-{`${t('Only')} `}</span>
                      <span className='text-primary'>
                        {`${t('Tier')} ${t('1')} `}
                      </span>
                      {item.id === 2 && (
                        <>
                          <span> {t('and')} </span>
                          <span className='text-secondary'>
                            {`${t('Tier')} ${t('2')} `}
                          </span>
                        </>
                      )}
                      {item.id === 3 && (
                        <>
                          <span>{t(',')} </span>
                          <span className='text-secondary'>
                            {`${t('Tier')} ${t('2')}`}
                          </span>
                          <span> {t('and')} </span>
                          <span className='text-success'>
                            {`${t('Tier')} ${t('3')} `}
                          </span>
                        </>
                      )}
                      <span>{t('tier_access')}</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`${s.tier__radio} d-flex justify-content-center align-items-center`}
                >
                  <div
                    className={`${s.tier__customRadio} custom-radio custom-control`}
                  >
                    <input
                      type='radio'
                      name='option'
                      id={`option${item.id}`}
                      value={`option${item.id}`}
                      onChange={onChangeOption}
                      className={`${s.tier__customInput} custom-control-input`}
                      checked={selected === `option${item.id}`}
                    />
                    <label
                      className={`${s.tier__customLabel} custom-control-label`}
                      htmlFor={`option${item.id}`}
                    >
                      {t('Choose_plan')}
                    </label>
                  </div>
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
            <Button className='ml-3' onClick={onClickNext}>
              {t('survey')}
              <i className='fa fa-chevron-right ml-2' />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Structure

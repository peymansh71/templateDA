import React, {useRef, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import names from 'classnames'

import {Row, Col, Container} from 'reactstrap'

import successImage from '~assets/images/registration/DA-org-reg-2-tiers.png'

import s from './styles.m.scss'

const Success = ({setHeight, isActive}) => {
  const {t} = useTranslation()

  const sectionRef = useRef(null)

  useEffect(() => {
    if (isActive) setHeight(sectionRef.current.offsetHeight)
  }, [isActive])

  return (
    <div className={names(s.section, {[s['section--active']]: isActive})}>
      <div ref={sectionRef}>
        <Container fluid>
          <Row>
            <Col sm='12' md='6'>
              <img
                className={s.success__image}
                alt='success'
                src={successImage}
              />
            </Col>
            <Col sm='12' md='6'>
              <div>
                <h1 className='text-secondary'>{t('success!')}</h1>
                <p>{t('now_registered')}</p>
                <Link className='btn btn-secondary' to='/login'>
                  {t('login')}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
        {/* <div
          className={`${s.success} d-flex justify-content-between align-items-center`}
        ></div> */}
      </div>
    </div>
  )
}

export default Success
